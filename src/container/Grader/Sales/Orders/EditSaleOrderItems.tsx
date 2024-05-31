import { useNavigate, useParams } from "react-router-dom";
import ActionBarAddEdit from "shared/Components/ActionBarAddEdit/ActionBarAddEdit";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import SaleOrderItemForm from "components/Sales/SaleOrderForm/saleOrderItemForm";
import {
  ItemsBySaleOrderId,
  SaleOrderItemsRequest,
  SalesImportItemsRequest,
} from "redux/types/Orders/saleOrders";
import {
  useEditSaleOrderItemsMutation,
  useLazyGetAllSaleOrdersItemsQuery,
  useLazyGetByIdSaleOrderQuery,
} from "redux/features/sales/Orders/saleOrdersApiSlice";
import Loader from "shared/Components/Loader/Loader";
import { Item } from "redux/types/Settings/Productions/items";
import { column } from "shared/Components/EditableDatatable/EditableDatatable";
import { useGetquantityunitQuery } from "redux/features/quantityunit/quantityunitApiSlice";
import { useGetRateOnQuery } from "redux/features/purchase/Order/RateOnApiSlice";
import { RateOn } from "redux/types/common/rateOn";
import { QuantityUnit } from "redux/types/common/quantityUnit";
import { useGetAllProductionItemsQuery } from "redux/features/Settings/Productions/productionItemApiSlice";
import { useGetWeightUnitsQuery } from "redux/features/common/weightUintApiSlice";
import { WeightUnit } from "redux/types/common/weightUnit";
import { roundValue, convertWghtToLbs } from "helper/utility";
import CustomButton from "shared/Components/CustomButton";
import { usePostSaleImportInvoiceItemsMutation } from "redux/features/sales/Orders/saleOrdersApiSlice";
import ImportDialog from "shared/Components/ImportDialog";
import * as XLSX from "xlsx";

interface excelItems {
  "TANA/MADAGASCAR CONTAINER": string;
  QTY: number;
}

const itemsDefaultValues = {
  description: "",
};

export default function EditSaleOrderItems({
  saleOrderId,
  gatePassId
}: {
  saleOrderId: number;
  gatePassId:number
}) {
  const { handleSubmit: handleItemsSubmit } = useForm({
    defaultValues: itemsDefaultValues,
  });
  const navigate = useNavigate();
  const params = useParams();
  const [editOrderItems, { isLoading: EditLoading }] =
    useEditSaleOrderItemsMutation();
  const [getOrderById, result] = useLazyGetByIdSaleOrderQuery();
  const { data: itemsData } = useGetAllProductionItemsQuery(null);
  const { data: getquantityunit } = useGetquantityunitQuery(null);
  const { data: getRateOn } = useGetRateOnQuery(null);
  const { data: uomData } = useGetWeightUnitsQuery(null);
  const [rowData, setRowData] = useState<SaleOrderItemsRequest[]>([]);
  const [getSaleOrderItems, saleOrderItems] =
    useLazyGetAllSaleOrdersItemsQuery();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isImportModalOpen, setImportModalOpen] = useState<boolean>(false);
  const [importError, setImportError] = useState<string[]>([]);
  const [importResult, setImportResult] = useState<SalesImportItemsRequest[]>(
    []
  );
  const [submitImportInvoiceItems, { isLoading: importItemsLoading }] =
    usePostSaleImportInvoiceItemsMutation();

  const columns: column<"saleOrderItemId", SaleOrderItemsRequest>[] = [
    {
      label: "Code",
      field: "codesId",
      sort: false,
      inputType: "text",
      disabled: true,
    },
    {
      label: "Item",
      field: "itemId",
      sort: false,
      inputType: "select",
      uneditable: false,
      mutateFieldsCallback: (value) => {
        const selectedItem = itemsData?.find((item) => item.itemId === value);
        if (selectedItem) {
          return {
            unitPieces: selectedItem?.unitPieces
              ? selectedItem?.unitPieces
              : "",
            amount: selectedItem?.amount ? roundValue(selectedItem?.amount) : 0,
            rateOnId: selectedItem?.rateOn ? selectedItem?.rateOn?.rateOnId : 0,
            unitWeight: selectedItem?.unitWeight ? selectedItem?.unitWeight : 0,
            masterRate: selectedItem?.unitRate ?? 0,
            codesId: selectedItem?.itemCode ?? "",
          };
        } else return {};
      },
      options: itemsData?.length
        ? itemsData?.map((item: Item) => {
            return {
              text: item?.name ? item?.name : "",
              value: item?.itemId ? item?.itemId : 0,
            };
          })
        : [],
    },
    {
      label: "UOM",
      field: "unitofMeasurementId",
      sort: false,
      inputType: "select",
      options: uomData?.length
        ? uomData?.map((item: WeightUnit) => {
            return {
              text: item?.name ? item?.name : "",
              value: item?.weightUnitId ? item?.weightUnitId : 0,
            };
          })
        : [],
      disabled: true,
    },

    {
      label: "QTY",
      field: "quantity",
      inputType: "number",
      sort: false,
      showSum: true,
      mutateFieldsCallback: (value, row) => {
        const selectedItem = itemsData?.find(
          (item) => item.itemId === row?.itemId
        );

        if (selectedItem) {
          return {
            weightKg: value ? roundValue(+value * row?.unitWeight) : "",
            weightLbs: value
              ? roundValue(convertWghtToLbs(+value * row?.unitWeight))
              : "",
            amount: value ? roundValue(+value * row?.rate) : "",
            bal: value ? +value : 0,
          };
        } else return {};
      },
    },

    {
      label: "Q-UNIT",
      field: "quantityUnitId",
      inputType: "select",
      sort: false,
      options: getquantityunit?.length
        ? getquantityunit?.map((item: QuantityUnit) => {
            return {
              text: item?.name ? item?.name : "",
              value: item?.quantityUnitId ? item?.quantityUnitId : 0,
            };
          })
        : [],
    },
    {
      label: "U Weight",
      sort: false,
      field: "unitWeight",
      inputType: "number",
      showSum: true,
      mutateFieldsCallback: (value, row) => {
        const selectedItem = itemsData?.find(
          (item) => item.itemId === row?.itemId
        );

        if (selectedItem) {
          return {
            weightKg: value ? roundValue(+value * row?.quantity) : "",
            weightLbs: value
              ? roundValue(convertWghtToLbs(+value * row?.quantity))
              : "",
          };
        } else return {};
      },
    },
    {
      label: "Unit Pieces",
      sort: false,
      disabled: true,
      field: "unitPieces",
      inputType: "number",
      showSum: true,
    },
    {
      label: "Kgs",
      sort: false,
      disabled: true,
      field: "weightKg",
      inputType: "number",
      showSum: true,
    },
    {
      label: "Lbs",
      sort: false,
      disabled: true,
      field: "weightLbs",
      inputType: "number",
      showSum: true,
    },
    {
      label: "Rate",
      sort: false,
      field: "rate",
      inputType: "number",
      showSum: true,
      mutateFieldsCallback: (value, row) => {
        const selectedItem = itemsData?.find(
          (item) => item.itemId === row?.itemId
        );

        if (selectedItem) {
          return {
            amount: value ? roundValue(+value * row?.quantity) : "",
          };
        } else return {};
      },
    },
    {
      label: "Master Rate",
      sort: false,
      field: "masterRate",
      inputType: "number",
      showSum: true,
      disabled: true,
    },
    {
      label: "Rate On",
      field: "rateOnId",
      inputType: "select",
      sort: false,
      options: getRateOn?.length
        ? getRateOn?.map((item: RateOn) => {
            return {
              text: item?.name ? item?.name : "",
              value: item?.rateOnId ? item?.rateOnId : 0,
            };
          })
        : [],
    },
    {
      label: "Amount",
      sort: false,
      disabled: true,
      field: "amount",
      inputType: "number",
      showSum: true,
    },
    {
      label: "Pro",
      sort: false,
      disabled: true,
      field: "pro",
      inputType: "number",
      showSum: true,
    },
    {
      label: "Bal",
      sort: false,
      disabled: true,
      field: "bal",
      inputType: "number",
      showSum: true,
    },
    {
      label: "Sold",
      sort: false,
      disabled: true,
      field: "sold",
      inputType: "number",
      showSum: true,
    },
    {
      label: "PS",
      sort: false,
      disabled: true,
      field: "ps",
      inputType: "number",
      showSum: true,
    },
    {
      label: "PS KGS",
      sort: false,
      disabled: true,
      field: "psKgs",
      inputType: "number",
      showSum: true,
    },
    {
      label: "PS LBS",
      sort: false,
      disabled: true,
      field: "psLbs",
      inputType: "number",
      showSum: true,
    },
    {
      label: "Description",
      sort: false,
      field: "description",
      inputType: "text",
    },
    {
      label: "A Qty",
      sort: false,
      disabled: true,
      field: "aqty",
      inputType: "text",
    },
  ];
  useEffect(() => {
    const id = params.id;
    if (id) {
      getSaleOrderItems(+id);
    }
  }, [params.id, getOrderById, getSaleOrderItems]);

  useEffect(() => {
    if (saleOrderItems?.data) {
      setRowData(
        saleOrderItems?.data?.map((item: ItemsBySaleOrderId) => {
          return {
            amount: item?.amount ? roundValue(item?.amount) : 0,
            aqty: item?.aqty ? item?.aqty : 0,
            bal: item?.bal ? item?.bal : 0,
            codesId: item?.code && item?.item?.itemCode? item?.item?.itemCode : "",
            description: item?.description ? item?.description : "",
            itemId: item?.item ? item?.item?.itemId : 0,
            masterRate: item?.masterRate ? item?.masterRate : 0,
            pro: item?.pro ? item?.pro : 0,
            ps: item?.ps ? item?.ps : 0,
            psKgs: item?.pskgs ? roundValue(item?.pskgs) : 0,
            psLbs: item?.pslbs ? roundValue(item?.pslbs) : 0,
            quantity: item?.quantity ? item?.quantity : 0,
            quantityUnitId: item?.quantityUnit
              ? item?.quantityUnit?.quantityUnitId
              : 0,
            rate: item?.rate ? item?.rate : 0,
            rateOnId: item?.rateOn ? item?.rateOn?.rateOnId : 0,
            saleOrderItemId: item?.saleOrderItemId ? item?.saleOrderItemId : 0,
            sold: item?.sold ? item?.sold : 0,
            unitofMeasurementId: item?.uom ? item?.uom?.unitId : 0,
            unitPieces: item?.unitPieces ? item?.unitPieces : 0,
            unitWeight: item?.unitWeight ? roundValue(item?.unitWeight) : 0,
            weightKg: item?.weightKg ? roundValue(item?.weightKg) : 0,
            weightLbs: item?.weightKg
              ? roundValue(convertWghtToLbs(item?.weightKg))
              : 0.0,
          };
        })
      );
    } else setRowData([]);
  }, [saleOrderItems.data]);

  const itemsSubmit = async () => {
    const result = await editOrderItems({
      saleOrderId: saleOrderId,
      rowData,
    });
    if ("data" in result && result?.data?.status === "SUCCESS") {
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    }
  };
  const handleModalState = () => {
    setImportModalOpen(false);
    setImportError([]);
    setImportResult([]);
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
              itemName: originalObject["TANA/MADAGASCAR CONTAINER"],
              quantity: originalObject.QTY,
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
  const handleSubmit = async () => {
    if (importResult.length === 0) {
      setImportError(["Select a file to import"]);
      return;
    }
    if (params.id) {
      const result = await submitImportInvoiceItems({
        body: importResult,
        orderId: saleOrderId,
      });
      if (
        "data" in result &&
        result.data.status === "SUCCESS" &&
        result.data.payLoad.length == 0
      ) {
        setImportModalOpen(false);
        setImportError([]);
      } else if ("data" in result && result.data.payLoad.length > 0) {
        let errorMsg = result.data.payLoad;
        setImportError(errorMsg);
      }
    }
  };
  return (
    <div>
      {result?.isLoading ? (
        <div style={{ margin: "5rem" }}>
          <Loader />
        </div>
      ) : (
        <>
          {!gatePassId && (
            <div className="pb-3">
              <ActionBarAddEdit
                title="Sale Order Items"
                mode={!gatePassId ? "EDIT" : ""}
                onSubmit={handleItemsSubmit(itemsSubmit)}
                isEdit={isEdit}
                setIsEdit={setIsEdit}
                isLoading={EditLoading}
              >
                <CustomButton
                  size="sm"
                  type="hollow"
                  onClick={() => setImportModalOpen(true)}
                  title="Import"
                />
              </ActionBarAddEdit>
            </div>
          )}
          <SaleOrderItemForm
            isEdit={isEdit}
            columns={columns}
            rowData={rowData}
            setRowData={setRowData}
          />
        </>
      )}
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
