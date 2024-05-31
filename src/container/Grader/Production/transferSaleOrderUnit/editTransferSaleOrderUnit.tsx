import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ActionBarAddEdit from "shared/Components/ActionBarAddEdit/ActionBarAddEdit";
import { useNavigate, useParams } from "react-router-dom";
import TransferSaleOrderUnitForm from "components/Production/transferSaleOrderUnitForm";
import {
  SummaryItems,
  TransferredSaleOrderItems,
  transferSaleOrderUnitRequest,
} from "redux/types/Productions/transferSaleOrderUnit";

import {
  useEditTransferSaleOrderMutation,
  useLazyGetTransferSaleOrderUnitByIdQuery,
} from "redux/features/productions/transferSaleOrderUnitApiSlice";
import { useGetAllSaleOrdersQuery } from "redux/features/sales/Orders/saleOrdersApiSlice";
import { useGetStockRoomsQuery } from "redux/features/Settings/Productions/stockroomsApiSlice";
import { column } from "shared/Components/EditableDatatable/EditableDatatable";
import { CodesData } from "redux/types/Productions/codes";
import { getDateFromMillis } from "helper/utility";
import { transferSaleOrderUnitResolver } from "validators/graderValidator/Productions/transferSaleOrderUnitResolver";
const defaultValues: transferSaleOrderUnitRequest = {
  transferDate: "",
  description: "",
  saleOrderId: 0,
  stockRoomId: 0,
  smop: false,
  soitems: false,
  print: false,
};
export default function EditTransferSaleOrderUnit() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<transferSaleOrderUnitRequest, null>({
    defaultValues,
    resolver: transferSaleOrderUnitResolver,
  });
  const params = useParams();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [rowData, setRowData] = useState<TransferredSaleOrderItems[]>([]);
  const { data: stockRoomData } = useGetStockRoomsQuery(null);
  const { data: saleOrderData } = useGetAllSaleOrdersQuery(null);
  const [codeItem, setCodeItem] = useState<CodesData[]>([]);
  const [summaryItems, setSummaryItems] = useState<SummaryItems[]>([]);
  const [editTransferSaleOrderUnit, { isLoading }] =
    useEditTransferSaleOrderMutation();
  const [getTransferSaleOrderUnitById, result] =
    useLazyGetTransferSaleOrderUnitByIdQuery();

  useEffect(() => {
    if (params.id) getTransferSaleOrderUnitById(+params.id);
  }, [params.id, getTransferSaleOrderUnitById]);

  useEffect(() => {
    if (result?.data) {
      reset({
        transferDate: result?.data?.transferDate
          ? getDateFromMillis(result?.data?.transferDate)
          : "",
        description: result?.data?.description ? result?.data?.description : "",
      });
      setRowData(result?.data?.transferLogs ? result?.data?.transferLogs : []);
      result?.data.transferLogs?.forEach((dataItem) => {
        const existingItem = summaryItems.find(
          (item) => item?.itemId === dataItem?.saleOrderItem?.item?.itemId
        );
        if (existingItem) {
          existingItem.units++;
        } else {
          summaryItems.push({
            itemId: dataItem?.saleOrderItem?.item
              ? dataItem?.saleOrderItem?.item?.itemId
              : 0,
            itemName: dataItem?.saleOrderItem?.item
              ? dataItem?.saleOrderItem?.item?.name
              : "-",
            units: 1,
          });
        }
      });
    }
  }, [result.data, reset, summaryItems]);
  const columns: column<"codeId", CodesData>[] = [
    {
      label: "Id",
      field: "codeId",
      inputType: "number",
      sort: false,
      disabled: true,
    },
    {
      label: "Item",
      field: "item",
      inputType: "text",
      sort: false,
      disabled: true,
    },
    {
      label: "Date",
      field: "codeDate",
      inputType: "text",
      sort: false,
      disabled: true,
    },
    {
      label: "Unit Code",
      field: "code",
      inputType: "number",
      sort: false,
      disabled: true,
    },
    {
      label: "To Sale Order",
      field: "saleOderId",
      inputType: "select",
      nullable: true,
      options: saleOrderData?.payLoad?.length
        ? saleOrderData?.payLoad?.map((item) => {
            return {
              text: item?.reference,
              value: item?.saleOrderId,
            };
          })
        : [],
      mutateFieldsCallback(value, row) {
        return {
          stockRoomId: saleOrderData?.payLoad.find(
            (so) => so.saleOrderId === value
          )?.stockroom?.stockRoomId,
        };
      },
    },

    {
      label: "To Stock Room",
      field: "stockRoomId",
      inputType: "select",
      nullable: true,
      options: stockRoomData?.length
        ? stockRoomData?.map((item) => {
            return {
              text: item?.name,
              value: item?.stockRoomId,
            };
          })
        : [],
    },
    {
      label: "Created On",
      field: "creationDate",
      inputType: "date",
      sort: false,
      disabled: true,
    },
  ];
  const onSubmit = async (values: transferSaleOrderUnitRequest) => {
    const newObj = {
      transferDate: values.transferDate,
      description: values.description,
      transferId: params?.id,
      code: codeItem.map((item) => item.code),
      stockRoomId: codeItem.map((item) => item?.stockRoomId),
      saleOrderId: codeItem.map((item) => item?.saleOderId),
    };
    const res = await editTransferSaleOrderUnit(newObj);

    if ("data" in res && res.data.status === "SUCCESS") {
      navigate(-1);
    }
  };

  return (
    <>
      <ActionBarAddEdit
        title="Transfer Sale Order Units"
        mode={"EDIT"}
        isLoading={isLoading}
        onSubmit={handleSubmit(onSubmit)}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
      />
      <TransferSaleOrderUnitForm
        mode={"Edit"}
        isEdit={isEdit}
        control={control}
        errors={errors}
        rowData={rowData}
        columns={columns}
        codeItem={codeItem}
        setCodeItem={setCodeItem}
        summaryItems={summaryItems}
        saleOrdersData={saleOrderData?.payLoad ?? []}
        stockroomsData={stockRoomData ? stockRoomData : []}
        transferId={params.id}
      />
    </>
  );
}
