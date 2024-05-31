import EditableDataTable, {
  column,
} from "shared/Components/EditableDatatable/EditableDatatable";
import ActionBarAddEdit from "shared/Components/ActionBarAddEdit/ActionBarAddEdit";
import { useEffect, useState } from "react";
import { useGetChargeTypeQuery } from "redux/features/Settings/purchase/chargetypeApiSlice";
import {
  useLazyGetInvoiceChargesQuery,
  usePostInvoiceChargesMutation,
} from "redux/features/Settings/purchase/invoiceTypeApiSlice";
import { useParams } from "react-router-dom";
import { ChargeTypeRequest } from "redux/types/Settings/Purchase/chargetype";
interface Props {
  posted: boolean;
}
export default function EditInvoiceCharges({ posted }: Props) {
  const params = useParams();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { isLoading, data: ChargeTypeList } = useGetChargeTypeQuery(null);
  const [getInvoiceCharges, result] = useLazyGetInvoiceChargesQuery();
  const [submitInvoiceCharges, { isLoading: submitInvoiceChargesLoading }] =
    usePostInvoiceChargesMutation();
  const [invoiceChargesList, setInvoiceChargesList] = useState<
    ChargeTypeRequest[]
  >([]);
  useEffect(() => {
    const id = params.id;
    if (id) {
      getInvoiceCharges(+id);
    }
  }, [params.id, getInvoiceCharges]);

  useEffect(() => {
    if (result.data) {
      setInvoiceChargesList(
        result.data.map((d) => {
          return {
            amount: d?.amount ? d?.amount : 0,
            chargeTypeId: d.chargeType?.chargeTypeId
              ? d.chargeType?.chargeTypeId
              : 0,
            invoiceChargeTypeId: d?.invoiceChargeTypeId
              ? d?.invoiceChargeTypeId
              : 0,
          };
        })
      );
    }
  }, [result]);

  const columns: column<"invoiceChargeTypeId", ChargeTypeRequest>[] = [
    {
      label: "Charge Type",
      field: "chargeTypeId",
      sort: false,
      inputType: "select",
      options: ChargeTypeList?.length
        ? ChargeTypeList?.map((item) => {
            return {
              text: item?.name ? item?.name : "",
              value: item?.chargeTypeId ? item?.chargeTypeId : 0,
            };
          })
        : [],
    },
    {
      label: "Amount",
      field: "amount",
      inputType: "number",
      sort: false,
    },
  ];
  const onSubmit = async () => {
    if (params.id) {
      const result = await submitInvoiceCharges({
        body: invoiceChargesList,
        invoiceId: +params.id,
      });
      if ("data" in result && result.data.status === "SUCCESS") {
        setTimeout(() => {
          setIsEdit(false);
        }, 2000);
      }
    }
  };

  return (
    <div className="">
      {!posted && (
        <ActionBarAddEdit
          title="Charges"
          mode={"EDIT"}
          isLoading={
            result.isLoading || isLoading || submitInvoiceChargesLoading
          }
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          onSubmit={onSubmit}
        />
      )}
      <EditableDataTable
        identifier="invoiceChargeTypeId"
        rows={invoiceChargesList}
        columns={columns}
        defaultEditable={isEdit}
        isLoading={result.isLoading || isLoading || submitInvoiceChargesLoading}
        setRows={setInvoiceChargesList}
      />
    </div>
  );
}
