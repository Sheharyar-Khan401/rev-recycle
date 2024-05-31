import EditableDataTable, {
  column,
} from "shared/Components/EditableDatatable/EditableDatatable";
import ActionBarAddEdit from "shared/Components/ActionBarAddEdit/ActionBarAddEdit";
import { useEffect, useState } from "react";
import {
  useLazyGetSaleInvoiceItemsQuery,
  usePostSaleInvoiceItemsMutation,
} from "redux/features/Settings/purchase/invoiceTypeApiSlice";
import { useParams } from "react-router-dom";
import { useGetquantityunitQuery } from "redux/features/quantityunit/quantityunitApiSlice";
import { useGetWeightUnitsQuery } from "redux/features/common/weightUintApiSlice";
import { useGetRateOnQuery } from "redux/features/purchase/Order/RateOnApiSlice";
import {
  ItemsBySaleOrderId,
  SaleOrderItemsRequest,
} from "redux/types/Orders/saleOrders";
import { useGetAllProductionItemsQuery } from "redux/features/Settings/Productions/productionItemApiSlice";
import { WeightUnit } from "redux/types/common/weightUnit";
import { Item } from "redux/types/Settings/Productions/items";
import { QuantityUnit } from "redux/types/common/quantityUnit";
import { RateOn } from "redux/types/common/rateOn";
import { roundValue, convertWghtToLbs } from "helper/utility";
import {
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
} from "mdb-react-ui-kit";
import { CrossIcon } from "helper/icons";
import CustomButton from "shared/Components/CustomButton";
import { useDispatch } from "react-redux";
import { setErrorMessage } from "redux/features/common/commonSlice";
interface Props {
  posted: boolean;
}

export default function EditInvoiceItems({ posted }: Props) {
  const params = useParams();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [
    submitSaleInvoiceItems,
    {
      isLoading: submitSaleinvoiceItemsLoading,
      isSuccess: submitSaleInvoiceItemSuccess,
    },
  ] = usePostSaleInvoiceItemsMutation();
  const [getInvoiceItems, result] = useLazyGetSaleInvoiceItemsQuery();
  const { data: itemsData } = useGetAllProductionItemsQuery(null);
  const { data: getquantityunit } = useGetquantityunitQuery(null);
  const { data: getRateOn } = useGetRateOnQuery(null);
  const { data: uomData } = useGetWeightUnitsQuery(null);
  const [invoiceItemsList, setInvoiceItemsList] = useState<
    SaleOrderItemsRequest[]
  >([]);
  const [originalInvoiceItemsList, setOriginalInvoiceItemsList] = useState<
    SaleOrderItemsRequest[]
  >([]);
  const [editAbleInvoiceItemsList, setEditAbleInvoiceItemsList] = useState<
    SaleOrderItemsRequest[]
  >([]);
  const [changeRateModalOpen, setChangeRateModalOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const id = params.id;
    if (id) {
      getInvoiceItems(+id);
    }
  }, [getInvoiceItems, params.id, submitSaleInvoiceItemSuccess]);

  useEffect(() => {
    if (isRateChanged(originalInvoiceItemsList, editAbleInvoiceItemsList)) {
      setChangeRateModalOpen(true);
    }
  }, [editAbleInvoiceItemsList]);

  function isRateChanged(
    originalArray: SaleOrderItemsRequest[],
    updatedArray: SaleOrderItemsRequest[]
  ) {
    return (
      originalArray.length === updatedArray.length &&
      originalArray.some(
        (item, index) => item.rate !== updatedArray[index].rate
      )
    );
  }

  useEffect(() => {
    if (result?.data) {
      let originalData = [...result?.data];
      setInvoiceItemsList(
        originalData.map((item: ItemsBySaleOrderId) => {
          return {
            amount: roundValue(item?.amount) ?? 0,
            aqty: item?.aqty ?? 0,
            bal: item?.bal ?? 0,
            codesId: item?.item?.itemCode ?? "",
            description: item?.description ?? "",
            itemId: item?.item?.itemId ?? 0,
            masterRate: item?.masterRate ?? 0,
            pro: item?.pro ?? 0,
            ps: item?.ps ?? 0,
            psKgs: item?.pskgs ?? 0,
            psLbs: roundValue(item?.pslbs) ?? 0,
            quantity: item?.quantity ?? 0,
            quantityUnitId: item?.quantityUnit?.quantityUnitId ?? 0,
            rate: roundValue(item?.rate) ?? 0,
            rateOnId: item?.rateOn?.rateOnId ?? 0,
            saleOrderItemId: item?.saleOrderItemId ?? 0,
            sold: item?.sold ?? 0,
            unitofMeasurementId: item?.uom?.unitId ?? 0,
            unitPieces: roundValue(item?.unitPieces) ?? 0,
            unitWeight: roundValue(item?.unitWeight) ?? 0,
            weightKg: roundValue(item?.weightKg) ?? 0,
            weightLbs: roundValue(item?.weightLbs) ?? 0,
          };
        })
      );
      const itemMap = new Map<number, ItemsBySaleOrderId>();
      result?.data.forEach((item: ItemsBySaleOrderId) => {
        const itemId = item?.item?.itemId ?? 0;
        if (!itemMap.has(itemId)) {
          itemMap.set(itemId, { ...item, quantity: 1 });
        } else {
          const existingItem = itemMap.get(itemId);
          if (existingItem) {
            itemMap.set(itemId, {
              ...existingItem,
              quantity: existingItem.quantity + 1,
            });
          }
        }
      });
      setEditAbleInvoiceItemsList(
        [...itemMap.values()]?.map((item: ItemsBySaleOrderId) => {
          return {
            amount: roundValue(item?.amount) ?? 0,
            aqty: item?.aqty ?? 0,
            bal: item?.bal ?? 0,
            codesId: item?.item?.itemCode ?? "",
            description: item?.description ?? "",
            itemId: item?.item?.itemId ?? 0,
            masterRate: item?.masterRate ?? 0,
            pro: item?.pro ?? 0,
            ps: item?.ps ?? 0,
            psKgs: item?.pskgs ?? 0,
            psLbs: roundValue(item?.pslbs) ?? 0,
            quantity: item?.quantity ?? 0,
            quantityUnitId: item?.quantityUnit?.quantityUnitId ?? 0,
            rate: roundValue(item?.rate) ?? 0,
            rateOnId: item?.rateOn?.rateOnId ?? 0,
            saleOrderItemId: item?.saleOrderItemId ?? 0,
            sold: item?.sold ?? 0,
            unitofMeasurementId: item?.uom?.unitId ?? 0,
            unitPieces: roundValue(item?.unitPieces) ?? 0,
            unitWeight: roundValue(item?.unitWeight) ?? 0,
            weightKg: roundValue(item?.weightKg) ?? 0,
            weightLbs: roundValue(item?.weightLbs) ?? 0,
          };
        })
      );
      setOriginalInvoiceItemsList(
        [...itemMap.values()]?.map((item: ItemsBySaleOrderId) => {
          return {
            amount: roundValue(item?.amount) ?? 0,
            aqty: item?.aqty ?? 0,
            bal: item?.bal ?? 0,
            codesId: item?.item?.itemCode ?? "",
            description: item?.description ?? "",
            itemId: item?.item?.itemId ?? 0,
            masterRate: item?.masterRate ?? 0,
            pro: item?.pro ?? 0,
            ps: item?.ps ?? 0,
            psKgs: item?.pskgs ?? 0,
            psLbs: roundValue(item?.pslbs) ?? 0,
            quantity: item?.quantity ?? 0,
            quantityUnitId: item?.quantityUnit?.quantityUnitId ?? 0,
            rate: roundValue(item?.rate) ?? 0,
            rateOnId: item?.rateOn?.rateOnId ?? 0,
            saleOrderItemId: item?.saleOrderItemId ?? 0,
            sold: item?.sold ?? 0,
            unitofMeasurementId: item?.uom?.unitId ?? 0,
            unitPieces: roundValue(item?.unitPieces) ?? 0,
            unitWeight: roundValue(item?.unitWeight) ?? 0,
            weightKg: roundValue(item?.weightKg) ?? 0,
            weightLbs: roundValue(item?.weightLbs) ?? 0,
          };
        })
      );
    }
  }, [result]);

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
            weightKgs: roundValue(selectedItem.weightKgs) ?? "",
            weightLbs:
              roundValue(convertWghtToLbs(selectedItem.weightKgs)) ?? "",
            unitPieces: selectedItem.unitPieces ?? "",
            amount: roundValue(selectedItem?.amount) ?? 0,
            rateOnId: selectedItem?.rateOn?.rateOnId ?? 0,
            unitWeight: selectedItem?.unitWeight ?? 0,
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
              text: item?.name ?? "",
              value: item?.weightUnitId ?? 0,
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
      field: "balance",
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
      field: "aquantity",
      inputType: "text",
    },
  ];

  const onSubmit = async () => {
    if (params.id) {
      let updatedArray = invoiceItemsList.map((obj1) => {
        let matchingObject = editAbleInvoiceItemsList.find(
          (obj2) => obj2.itemId === obj1.itemId
        );
        return matchingObject
          ? {
              ...obj1,
              ...matchingObject,
              saleOrderItemId: obj1.saleOrderItemId,
              codesId: obj1.codesId,
            }
          : obj1;
      });
      const isInValid = updatedArray.find((i) => !i.quantityUnitId);
      if (!isInValid) {
        const result = await submitSaleInvoiceItems({
          body: updatedArray,
          invoiceId: +params.id,
        });
        if ("data" in result && result.data.status === "SUCCESS") {
          setTimeout(() => {
            setIsEdit(false);
          }, 2000);
        }
      } else {
        dispatch(setErrorMessage("Quantity unit of each item is required"));
      }
    }
  };

  return (
    <div className="">
      {!posted && (
        <ActionBarAddEdit
          title="Items"
          mode={"EDIT"}
          isLoading={submitSaleinvoiceItemsLoading}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          onSubmit={onSubmit}
        />
      )}
      <EditableDataTable
        identifier="saleOrderItemId"
        columns={columns}
        rows={editAbleInvoiceItemsList}
        setRows={setEditAbleInvoiceItemsList}
        isLoading={false}
        defaultEditable={isEdit}
        showAddButton={false}
      />
      <MDBModal
        open={changeRateModalOpen}
        setOpen={setChangeRateModalOpen}
        tabIndex="-1"
      >
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalBody className="p-0 my-3">
              <div className="d-flex justify-content-between align-items-center col-11 mx-auto">
                <h6 className=" fw-bold mb-0">Edit Rate</h6>
                <div
                  onClick={() => setChangeRateModalOpen(false)}
                  role={"button"}
                >
                  <CrossIcon />
                </div>
              </div>
              <hr />
              <div className="col-12 mx-auto my-2">
                <p className="px-4">
                  Do you wish to update the rate in client items rate as well?
                </p>
                <hr />
                <div className="d-flex justify-content-between my-2 px-4">
                  <CustomButton
                    size="sm"
                    type="hollow"
                    onClick={() => setChangeRateModalOpen(false)}
                    title="No"
                  />

                  <CustomButton
                    size="sm"
                    type="solid"
                    onClick={() => {
                      let updatedArray = invoiceItemsList.map((obj1) => {
                        let matchingObject = editAbleInvoiceItemsList.find(
                          (obj2) => obj2.itemId === obj1.itemId
                        );
                        return matchingObject
                          ? {
                              ...obj1,
                              ...matchingObject,
                              updateClientItemRate: true,
                            }
                          : obj1;
                      });
                      setInvoiceItemsList(updatedArray);
                      setChangeRateModalOpen(false);
                    }}
                    title={"Yes"}
                  />
                </div>
              </div>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
}
