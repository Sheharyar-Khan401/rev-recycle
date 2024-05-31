import EditableDataTable, {
  column,
} from "shared/Components/EditableDatatable/EditableDatatable";
import ActionBarAddEdit from "shared/Components/ActionBarAddEdit/ActionBarAddEdit";
import { useEffect, useState } from "react";
import { invoiceDocumentsRequest } from "redux/types/Invoices/Invoices";
import {
  useLazyGetInvoiceDocumentsQuery,
  usePostInvoiceDocumentsMutation,
} from "redux/features/Settings/purchase/invoiceTypeApiSlice";
import { useParams } from "react-router-dom";
import { useGetDocumentTypesQuery } from "redux/features/common/documentApiSlice";
import { getDateFromMillis } from "helper/utility";
interface Props {
  posted: boolean;
}

export default function EditInvoiceDocuments({ posted }: Props) {
  const params = useParams();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { isLoading, data: DocumentTypeList } = useGetDocumentTypesQuery(null);
  const [getInvoiceDocuments, result] = useLazyGetInvoiceDocumentsQuery();
  const [submitInvoiceDocuments, { isLoading: submitInvoiceDocumentsLoading }] =
    usePostInvoiceDocumentsMutation();
  const [invoiceDocumentsList, setinvoiceDocumentsList] = useState<
    invoiceDocumentsRequest[]
  >([]);

  useEffect(() => {
    const id = params.id;
    if (id) {
      getInvoiceDocuments(+id);
    }
  }, [params.id, getInvoiceDocuments]);

  useEffect(() => {
    if (result.data) {
      setinvoiceDocumentsList(
        result.data.map((d) => {
          return {
            invoiceDocumentId: d.invoiceDocumentId,
            documentTypeId: d.documentType?.documentTypeId ?? 0,
            receivedOn: d.receivedOn ? getDateFromMillis(d.receivedOn) : "",
            remarks: d.remarks,
            file: "",
            fileUrl: d.fileUrl,
          };
        })
      );
    }
  }, [result]);

  const columns: column<"invoiceDocumentId", invoiceDocumentsRequest>[] = [
    {
      label: "Type",
      field: "documentTypeId",
      sort: false,
      inputType: "select",
      options: DocumentTypeList?.length
        ? DocumentTypeList?.map((item) => {
            return {
              text: item?.name ? item?.name : "",
              value: item?.documentTypeId ? item?.documentTypeId : 0,
            };
          })
        : [],
    },
    {
      label: "Received On",
      field: "receivedOn",
      inputType: "date",
      sort: false,
    },
    {
      label: "Remarks",
      field: "remarks",
      inputType: "text",
      sort: false,
    },
    {
      label: "File",
      field: "file",
      fileNameField: "fileUrl",
      inputType: "file",
      sort: false,
    },
  ];
  const onSubmit = async () => {
    if (params.id) {
      const formData = new FormData();
      invoiceDocumentsList.forEach((item, index) => {
        formData.append(`files`, item.file);
        formData.append(
          `documents`,
          `${JSON.stringify({
            documentTypeId: item.documentTypeId,
            invoiceDocumentId: item.invoiceDocumentId,
            remarks: item.remarks,
            receivedOn: item.receivedOn,
          })}`
        );
      });
      const result = await submitInvoiceDocuments({
        body: formData,
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
          isLoading={submitInvoiceDocumentsLoading}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          onSubmit={onSubmit}
        />
      )}
      <EditableDataTable
        identifier="invoiceDocumentId"
        rows={invoiceDocumentsList}
        columns={columns}
        defaultEditable={isEdit}
        isLoading={
          result.isLoading || isLoading || submitInvoiceDocumentsLoading
        }
        setRows={setinvoiceDocumentsList}
      />
    </div>
  );
}
