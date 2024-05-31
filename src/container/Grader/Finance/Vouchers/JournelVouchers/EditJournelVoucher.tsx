import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { CostGroup } from "redux/types/Finance/PrimaryData/costgroup";
import { useNavigate, useParams } from "react-router-dom";
import ActionBarAddEdit from "shared/Components/ActionBarAddEdit/ActionBarAddEdit";
import { bankReceiptVoucherResolver } from "validators/graderValidator/Finance/bankReceiptVoucherResolver";
import {
  VoucherRequest,
  listOfVoucher,
  listOfVoucherRequest,
} from "redux/types/Finance/PrimaryData/bankreceiptvoucher";
import { useGetAllCostGroupQuery } from "redux/features/finance/primarydata/costgroupApiSlice";
import { useGetAllAccountsQuery } from "redux/features/finance/primarydata/accountApiSlice";
import {
  useEditVoucherMutation,
  useLazyGetVoucherByIdQuery,
} from "redux/features/finance/primarydata/bankreceiptvoucherApiSlice";
import { Account } from "redux/types/Finance/PrimaryData/account";
import { useGetBusinessCurrrencyQuery } from "redux/features/currency/currencyApiSlice";
import { useGetCashAccountQuery } from "redux/features/finance/primarydata/cashaccountApiSlice";
import { BusinessCurrency } from "redux/types/Settings/Finance/currency";
import { CashAccount } from "redux/types/Finance/PrimaryData/cashaccount";
import CashPaymentVoucherForm from "components/Finance/CashPaymentVoucherForm/CashPaymentVoucherForm";
import Loader from "shared/Components/Loader/Loader";
import EditableDataTable, {
  column,
} from "shared/Components/EditableDatatable/EditableDatatable";
import { OrderStatus } from "redux/types/common/orderStatus";
import { useGetOrderStatusQuery } from "redux/features/purchase/Order/OrderStatusApiSlice";
import { getDateFromMillis } from "helper/utility";
const defaultValues: VoucherRequest = {
  vochrd: "",
  voucherStatusId: 0,
  voucherId: 0,
  particulars: "",
  currencyId: 0,
  voucherExchangeRate: 1,
  voucherType: "",
};
export default function EditJournelVoucher() {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<VoucherRequest, null>({
    defaultValues,
    resolver: bankReceiptVoucherResolver,
  });
  const [isEdit, setIsEdit] = useState(false);
  const [editVoucher, { isLoading: AddLoading }] = useEditVoucherMutation();
  const [getVoucherById, result] = useLazyGetVoucherByIdQuery();
  const [rowData, setRowData] = useState<listOfVoucherRequest[]>([]);
  const { data: getCostGroup } = useGetAllCostGroupQuery(null);
  const { data: getAccount } = useGetAllAccountsQuery(null);
  const [costGroupData, setCostGroupData] = useState<CostGroup[]>([]);
  const { data: getBusinessCurrency } = useGetBusinessCurrrencyQuery(null);
  const { data: getCashAccount } = useGetCashAccountQuery(null);
  const [currencyData, setCurrencyData] = useState<BusinessCurrency[]>([]);
  const [cashData, setCashData] = useState<CashAccount[]>([]);
  const { data: getOrderStatus, isLoading: getOrderStatusLoading } =
    useGetOrderStatusQuery(null);
  const [orderStatusData, setOrderStatusData] = useState<OrderStatus[]>([]);

  const navigate = useNavigate();
  const params = useParams();
  const columns: column<"voucherAccountId", listOfVoucherRequest>[] = [
    {
      label: "Account",
      field: "accountId",
      sort: false,
      inputType: "select",
      options: getAccount?.length
        ? getAccount?.map((item: Account) => {
            return {
              text: item?.accountTitle ? item?.accountTitle : "",
              value: item?.accountId ? item?.accountId : 0,
            };
          })
        : [],
    },
    {
      label: "Narration",
      field: "narration",
      inputType: "text",
      sort: false,
    },
    {
      label: "Credit",
      field: "credit",
      inputType: "number",
      sort: false,
    },
    {
      label: "Cost Group",
      field: "costGroupId",
      sort: false,
      inputType: "select",
      options: costGroupData?.length
        ? costGroupData?.map((item: CostGroup) => {
            return {
              text: item?.name ? item?.name : "",
              value: item?.costGroupId ? item?.costGroupId : 0,
            };
          })
        : [],
    },
  ];
  useEffect(() => {
    let id;
    if (params.id) {
      id = params.id;
    }
    const vtype = "4";
    if (id) {
      getVoucherById({ id, vtype });
    }
  }, [getVoucherById, params.id]);

  useEffect(() => {
    if (result?.data) {
      if (result.data.vochrd) {
        setValue(
          "vochrd",
          result.data?.vochrd ? getDateFromMillis(result.data?.vochrd) : "-"
        );
      }

      setValue(
        "voucherId",
        result.data?.voucherId ? result.data?.voucherId : 0
      );
      setValue(
        "particulars",
        result?.data?.particulars ? result?.data?.particulars : "-"
      );

      setValue(
        "currencyId",
        result.data?.businessCurrency?.businesscurrencyId
          ? result.data?.businessCurrency?.businesscurrencyId
          : 0
      );
      setValue(
        "voucherType",
        result.data?.voucherType?.voucherTypeName
          ? result.data?.voucherType?.voucherTypeName
          : "-"
      );
      setValue(
        "voucherExchangeRate",
        result?.data?.voucherExchangeRate
          ? result?.data?.voucherExchangeRate
          : 0
      );

      setValue(
        "voucherStatusId",
        result?.data?.voucherStatusId ? result?.data?.voucherStatusId : 0
      );

      setRowData(
        result.data?.listOfVoucher
          ? result.data?.listOfVoucher?.map((item: listOfVoucher) => {
              return {
                narration: item?.narration ? item?.narration : "",
                credit: item?.credit ? item?.credit : 0,
                debit: item?.debit ? item?.debit : 0,
                accountId: item?.acc?.accountId ?? 0,
                voucherAccountId: item?.voucherAccountId
                  ? item?.voucherAccountId
                  : 0,
                costGroupId: item?.costGroupId ? item?.costGroupId : 0,
              };
            })
          : []
      );
    }
  }, [result.data, setValue]);
  useEffect(() => {
    if (getCostGroup && getCostGroup?.length > 0) {
      setCostGroupData(
        getCostGroup?.map((item: CostGroup) => {
          return {
            costGroupId: item?.costGroupId,
            name: item?.name,
          };
        })
      );
    }
  }, [getCostGroup]);

  const onSubmit = async (values: VoucherRequest) => {
    values = (({ voucherType, ...rest }) => rest)(values);
    const newObj = rowData.map((item) => ({
      ...item, // Spread the properties of the original object
      credit:
        typeof item?.credit === "string"
          ? parseInt(item?.credit, 10)
          : item?.credit, // Convert "credit" to an integer using parseInt()
    }));

    // Convert the "credit" property to an integer

    const updated: VoucherRequest = { ...values, listOfVoucher: newObj };
    updated.cashaccountId = result.data?.cashaccountId
      ? result.data?.cashaccountId
      : 0;
    updated.voucherTypeId = result.data?.voucherType?.voucherTypeId
      ? result.data?.voucherType?.voucherTypeId
      : 0;
    const res = await editVoucher(updated);
    if ("data" in res && res.data.status === "SUCCESS") {
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    }
  };
  useEffect(() => {
    if (getOrderStatus && getOrderStatus?.length > 0) {
      setOrderStatusData(
        getOrderStatus?.map((item: OrderStatus) => {
          return {
            orderStatusId: item?.orderStatusId,
            name: item?.name,
          };
        })
      );
    }
  }, [getOrderStatus]);

  useEffect(() => {
    if (getBusinessCurrency && getBusinessCurrency?.length > 0) {
      setCurrencyData(
        getBusinessCurrency?.map((item: BusinessCurrency) => {
          return {
            currencyName: item.currency?.name,
            currencyId: item?.currency?.currencyId,
            businesscurrencyId: item.businesscurrencyId,
          };
        })
      );
    }
  }, [getBusinessCurrency]);

  useEffect(() => {
    if (getCashAccount && getCashAccount?.length > 0) {
      setCashData(
        getCashAccount?.map((item: CashAccount) => {
          return {
            cashAccountId: item?.cashAccountId ?? 0,
            accountTitle: item?.cashAccountTitle ?? "",
          };
        })
      );
    }
  }, [getCashAccount]);
  return (
    <>
      <ActionBarAddEdit
        title="Journel Vouchers"
        mode={"EDIT"}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        onSubmit={handleSubmit(onSubmit)}
        isLoading={AddLoading}
      />
      {result.isLoading ? (
        <div style={{ marginTop: "25vh" }}>
          <Loader />{" "}
        </div>
      ) : (
        <>
          <CashPaymentVoucherForm
            mode={"EDIT"}
            isEdit={isEdit}
            setValue={setValue}
            control={control}
            errors={errors}
            currencyData={currencyData}
            cashData={cashData}
            orderStatusData={orderStatusData}
          />
          <EditableDataTable
            identifier="voucherAccountId"
            addText="Add Journel Voucher"
            columns={columns}
            rows={rowData}
            showSerialNumbers
            setRows={setRowData}
            isLoading={AddLoading}
            defaultEditable={isEdit}
          />
        </>
      )}
    </>
  );
}
