import EditableDataTable, {
  column,
} from "shared/Components/EditableDatatable/EditableDatatable";
import ActionBarAddEdit from "shared/Components/ActionBarAddEdit/ActionBarAddEdit";
import { useEffect, useState } from "react";
import { invoiceCommissionsRequest } from "redux/types/Invoices/Invoices";
import {
  useLazyGetInvoiceCommissionsQuery,
  usePostInvoiceCommissionsMutation,
} from "redux/features/Settings/purchase/invoiceTypeApiSlice";
import { useParams } from "react-router-dom";
import { useGetAllAgentsQuery } from "redux/features/Clients/Agents/agentsApiSlice";
interface Props {
  posted: boolean;
}

export default function EditInvoiceCommissions({ posted }: Props) {
  const params = useParams();

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { isLoading, data: agentsList } = useGetAllAgentsQuery(null);
  const [getInvoiceCharges, result] = useLazyGetInvoiceCommissionsQuery();
  const [
    submitInvoiceCommissions,
    { isLoading: submitInvoiceCommissionsLoading },
  ] = usePostInvoiceCommissionsMutation();
  const [invoiceCommissionsList, setInvoiceCommissionsList] = useState<
    invoiceCommissionsRequest[]
  >([]);
  useEffect(() => {
    const id = params.id;
    if (id) {
      getInvoiceCharges(+id);
    }
  }, [params.id, getInvoiceCharges]);

  useEffect(() => {
    if (result.data) {
      setInvoiceCommissionsList(
        result.data.map((d) => {
          return {
            amount: d.amount,
            agentId: d.agent?.clientId ? d.agent.clientId : 0,
            invoiceCommissionId: d.invoiceCommissionId,
          };
        })
      );
    }
  }, [result]);

  const columns: column<"invoiceCommissionId", invoiceCommissionsRequest>[] = [
    {
      label: "Agent",
      field: "agentId",
      sort: false,
      inputType: "select",
      options: agentsList?.length
        ? agentsList?.map((item) => {
            return {
              text: item?.user?.fullName ? item?.user?.fullName : "",
              value: item?.clientId ? item?.clientId : 0,
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
      const result = await submitInvoiceCommissions({
        body: invoiceCommissionsList,
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
          title="Commissions"
          mode={"EDIT"}
          isLoading={
            result.isLoading || isLoading || submitInvoiceCommissionsLoading
          }
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          onSubmit={onSubmit}
        />
      )}
      <EditableDataTable
        identifier="invoiceCommissionId"
        rows={invoiceCommissionsList}
        columns={columns}
        defaultEditable={isEdit}
        isLoading={
          result.isLoading || isLoading || submitInvoiceCommissionsLoading
        }
        setRows={setInvoiceCommissionsList}
      />
    </div>
  );
}
