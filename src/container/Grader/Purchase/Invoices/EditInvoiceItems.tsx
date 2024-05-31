import EditableDataTable, {
  column,
} from "shared/Components/EditableDatatable/EditableDatatable";
import ActionBarAddEdit from "shared/Components/ActionBarAddEdit/ActionBarAddEdit";
import { useEffect, useState } from "react";
import {
  useLazyGetPurchaseInvoiceItemsQuery,
  usePostPurchaseInvoiceItemsMutation,
  usePostImportInvoiceItemsMutation,
} from "redux/features/Settings/purchase/invoiceTypeApiSlice";
import { useParams } from "react-router-dom";
import { useGetAllItemsinPurchaseOrdersQuery } from "redux/features/Settings/purchase/itemApiSlice";
import { useGetquantityunitQuery } from "redux/features/quantityunit/quantityunitApiSlice";
import { useGetWeightUnitsQuery } from "redux/features/common/weightUintApiSlice";
import { useGetRateOnQuery } from "redux/features/purchase/Order/RateOnApiSlice";
import {
  PurchaseOrderItemsData,
  listofImportOrderItems,
  listofPurchaseOrderItems,
} from "redux/types/Orders/orders";
import CustomButton from "shared/Components/CustomButton";
import { ExportIcon } from "helper/icons";
import ImportDialog from "shared/Components/ImportDialog";
import * as XLSX from "xlsx";
import { roundValue, convertWghtToLbs, calculateWeights } from "helper/utility";
interface Props {
  posted: boolean;
}

interface excelItems {
  Item: string;
  "Packaging Unit": string;
  Quantity: number;
  Rate: number;
  "Rate on": string;
  "Weight Unit": string;
  "Weight in Lbs": number;
}

export default function EditInvoiceItems({ posted }: Props) {
  const params = useParams();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isImportModalOpen, setImportModalOpen] = useState<boolean>(false);
  const [importResult, setImportResult] = useState<listofImportOrderItems[]>(
    []
  );
  const [importError, setImportError] = useState<string[]>([]);

  const [getInvoiceItems, result] = useLazyGetPurchaseInvoiceItemsQuery();
  const [
    submitPurchaseInvoiceItems,
    { isLoading: submitPurchaseInvoiceItemsLoading },
  ] = usePostPurchaseInvoiceItemsMutation();
  const [submitImportInvoiceItems, { isLoading: importItemsLoading }] =
    usePostImportInvoiceItemsMutation();
  const { data: itemsData } = useGetAllItemsinPurchaseOrdersQuery(null);
  const { data: qUnitData } = useGetquantityunitQuery(null);
  const { data: weightUnitData } = useGetWeightUnitsQuery(null);
  const { data: rateOnData } = useGetRateOnQuery(null);
  const [invoiceItemsList, setInvoiceItemsList] = useState<
    listofPurchaseOrderItems[]
  >([]);
  useEffect(() => {
    const id = params.id;
    if (id) {
      getInvoiceItems(+id);
    }
  }, [params.id, getInvoiceItems]);

  useEffect(() => {
    if (result.data) {
      setInvoiceItemsList(
        result?.data
          ? result?.data?.map((item: PurchaseOrderItemsData) => {
              return {
                itemId: item?.item?.itemId ? item?.item?.itemId : 0,
                purchaseOrderItemId: item?.purchaseOrderItemId
                  ? item?.purchaseOrderItemId
                  : 0,
                quantity: item?.quantity ? item?.quantity : 0,
                unitWeight:
                  typeof item?.unitWeight === "number"
                    ? roundValue(item?.unitWeight)
                    : 0,
                unitKg:
                  typeof item?.unitKg === "number"
                    ? roundValue(item.unitKg)
                    : 0,
                weightKg:
                  item?.weightUnit?.weightUnitId && item.unitWeight
                    ? calculateWeights(
                        item?.unitWeight,
                        item.weightUnit?.weightUnitId
                      )[0]
                    : 0,
                weightLbs:
                  item?.weightUnit?.weightUnitId && item.unitWeight
                    ? calculateWeights(
                        item?.unitWeight,
                        item.weightUnit?.weightUnitId
                      )[1]
                    : 0,
                amount: item?.amount ? roundValue(item?.amount) : 0,
                rate: item?.rate ? roundValue(item?.rate) : 0,
                quantityUnitId: item?.quantityUnit
                  ? item?.quantityUnit?.quantityUnitId
                  : 0,
                rateOnId: item?.rateOn ? item?.rateOn?.rateOnId : 0,
                weightUnitId: item?.weightUnit
                  ? item?.weightUnit?.weightUnitId
                  : 0,
              };
            })
          : []
      );
    }
  }, [result]);

  const columns: column<"purchaseOrderItemId", listofPurchaseOrderItems>[] = [
    {
      label: "Item",
      field: "itemId",
      sort: false,
      inputType: "select",
      options: itemsData?.length
        ? itemsData?.map((item) => {
            return {
              text: item?.name ? item?.name : "",
              value: item?.itemId ? item?.itemId : 0,
            };
          })
        : [],
    },
    {
      label: "Qty",
      field: "quantity",
      inputType: "number",
      sort: false,
      showSum: true,
      mutateFieldsCallback: (value, row) => {
        if (value) {
          return {
            unitWeight: row.weightKg ? roundValue(row?.weightKg / +value) : 0,
            amount: row.rateOnId === 3 ? +value * row.rate : row.amount,
          };
        } else return {};
      },
    },
    {
      label: "Q-Unit",
      field: "quantityUnitId",
      sort: false,
      inputType: "select",
      options: qUnitData?.length
        ? qUnitData?.map((item) => {
            return {
              text: item?.name ? item?.name : "",
              value: item?.quantityUnitId ? item?.quantityUnitId : 0,
            };
          })
        : [],
    },
    {
      label: "W-Unit",
      field: "weightUnitId",
      sort: false,
      inputType: "select",
      options: weightUnitData?.length
        ? weightUnitData?.map((item) => {
            return {
              text: item?.name ? item?.name : "",
              value: item?.weightUnitId ? item?.weightUnitId : 0,
            };
          })
        : [],
      mutateFieldsCallback: (value, row) => {
        let updatedUnitWeight = +(value === 1
          ? row?.quantity
            ? roundValue(row.weightKg / row?.quantity)
            : 0
          : row?.quantity
          ? roundValue(row.weightLbs / row?.quantity)
          : 0);
        if (value) {
          return {
            unitWeight: updatedUnitWeight,
          };
        } else return {};
      },
    },
    {
      label: "Weight (KGS)",
      field: "weightKg",
      inputType: "number",
      sort: false,
      showSum: true,
      mutateFieldsCallback: (value, row) => {
        let updatedWeightLbs = value ? roundValue(convertWghtToLbs(+value)) : 0;
        let updatedUnitWeight = +(row.weightUnitId === 1
          ? row?.quantity
            ? roundValue(+value / row?.quantity)
            : 0
          : row?.quantity
          ? roundValue(updatedWeightLbs / row?.quantity)
          : 0);
        if (value) {
          return {
            weightLbs: updatedWeightLbs,
            unitWeight: updatedUnitWeight,
            amount: +(row.rateOnId === 1
              ? roundValue(+value * row?.rate)
              : row.rateOnId === 2
              ? roundValue(convertWghtToLbs(+value * row?.rate))
              : 0),
          };
        } else return {};
      },
    },
    {
      label: "Weight (LBS)",
      field: "weightLbs",
      inputType: "number",
      sort: false,
      showSum: true,
      mutateFieldsCallback: (value, row) => {
        if (value) {
          let updatedWeightKg = value ? roundValue(+value / 2.20462) : 0;
          let updatedUnitWeight = +(row.weightUnitId === 2
            ? row?.quantity
              ? roundValue(+value / row?.quantity)
              : 0
            : row?.quantity
            ? roundValue(updatedWeightKg / row?.quantity)
            : 0);
          return {
            weightKg: updatedWeightKg,
            unitWeight: updatedUnitWeight,
            amount: +(row.rateOnId === 1
              ? roundValue(+value * row?.rate) / 2.20462
              : row.rateOnId === 2
              ? roundValue(+value * row?.rate)
              : 0),
          };
        } else return {};
      },
    },
    {
      label: "U-Weight",
      field: "unitWeight",
      inputType: "number",
      disabled: true,
      sort: false,
    },
    {
      label: "Rate",
      field: "rate",
      inputType: "number",
      sort: false,
      mutateFieldsCallback: (value, row) => {
        if (value) {
          return {
            amount: +(row.rateOnId === 1
              ? roundValue(+value * row?.weightKg)
              : row.rateOnId === 2
              ? roundValue(+value * row?.weightLbs)
              : row.rateOnId === 3
              ? roundValue(+value * row?.quantity)
              : 0),
          };
        } else return {};
      },
    },
    {
      label: "Rate On",
      field: "rateOnId",
      sort: false,
      inputType: "select",
      mutateFieldsCallback: (value, row) => {
        if (value) {
          return {
            amount: +(value === 1
              ? roundValue(row?.rate * row?.weightKg)
              : value === 2
              ? roundValue(row?.rate * row?.weightLbs)
              : value === 3
              ? roundValue(row?.rate * row?.quantity)
              : 0),
          };
        } else return {};
      },
      options: rateOnData?.length
        ? rateOnData?.map((item) => {
            return {
              text: item?.name ? item?.name : "",
              value: item?.rateOnId ? item?.rateOnId : 0,
            };
          })
        : [],
    },
    {
      label: "Amount",
      field: "amount",
      inputType: "number",
      disabled: true,
      sort: false,
      showSum: true,
    },
  ];
  const onSubmit = async () => {
    if (params.id) {
      const result = await submitPurchaseInvoiceItems({
        body: invoiceItemsList,
        invoiceId: +params.id,
      });
      if ("data" in result && result.data.status === "SUCCESS") {
        setTimeout(() => {
          setIsEdit(false);
        }, 2000);
      }
    }
  };
  const handleModalState = () => {
    setImportModalOpen(false);
    setImportError([]);
    setImportResult([]);
  };
  const handleSubmit = async () => {
    if (importResult.length === 0) {
      setImportError(["Select a file to import"]);
      return;
    }

    if (params.id) {
      const result = await submitImportInvoiceItems({
        body: importResult,
        invoiceId: +params.id,
      });
      if ("data" in result && result.data.payLoad.length == 0) {
        setImportModalOpen(false);
        setImportResult([]);
      } else if ("data" in result && result.data.payLoad.length > 0) {
        let errorMsg = result.data.payLoad;
        setImportError(errorMsg);
      }
    }
  };
  const handleFileChange = (file: File) => {
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheetData = XLSX.utils.sheet_to_json<excelItems>(
          workbook.Sheets[sheetName]
        );
        setImportResult(
          sheetData.map((originalObject) => {
            return {
              itemName: originalObject.Item,
              quantity: originalObject.Quantity,
              packagingUnit: originalObject["Packaging Unit"],
              weightUnit: originalObject["Weight Unit"],
              weightLbs: originalObject["Weight in Lbs"],
              rate: originalObject.Rate,
              rateOn: originalObject["Rate on"],
            };
          })
        );
      };
      reader.readAsArrayBuffer(file);
      setImportError([]);
    } catch (err) {
      console.log(err);
      setImportError(["File format not supported"]);
    }
  };

  return (
    <div className="">
      {!posted && (
        <ActionBarAddEdit
          title="Items"
          mode={"EDIT"}
          isLoading={submitPurchaseInvoiceItemsLoading}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          onSubmit={onSubmit}
        >
          <CustomButton
            size="sm"
            type="hollow"
            onClick={() => setImportModalOpen(true)}
            title="Import"
          ></CustomButton>
        </ActionBarAddEdit>
      )}
      <EditableDataTable
        identifier="purchaseOrderItemId"
        columns={columns}
        rows={invoiceItemsList}
        setRows={setInvoiceItemsList}
        isLoading={false}
        defaultEditable={isEdit}
      />
      {isImportModalOpen && (
        <ImportDialog
          isImportModalOpen={isImportModalOpen}
          title="Import Records"
          onClose={() => handleModalState()}
          onSubmit={() => handleSubmit()}
          handleFileChange={handleFileChange}
          errorMsg={importError}
          isLoading={importItemsLoading}
        />
      )}
    </div>
  );
}
