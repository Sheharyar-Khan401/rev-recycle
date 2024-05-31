import { useEffect, useState } from "react";
import DataTable from "shared/Components/DataTable";
import { MDBInput } from "mdb-react-ui-kit";
import {
  SaleOrderItems,
  SaleOrderItemsResponse,
} from "redux/types/Orders/saleOrders";
import {
  useDeleteByItemIdMutation,
  useLazyGetSaleOrderItemsQuery,
  useLazyGetSalesGatePassesByIdQuery,
} from "redux/features/sales/gatePassesApiSlice";
import {
  GatePassItemsCodes,
  GatePassesResponse,
} from "redux/types/Sales/gatepasses";
import {
  Control,
  Controller,
  FieldErrorsImpl,
  UseFormWatch,
} from "react-hook-form";
import { useGetGatePassByCodeIdMutation } from "redux/features/productions/codesApiSlice";
import ForwardedEditableDataTable, {
  column,
} from "shared/Components/EditableDatatable/EditableDatatable";
import { GatePassItemsAgainstCode } from "redux/types/GatePasses/saleGatePass";
import RoutingActionButton from "shared/Components/ActionButton/RoutingActionButton";
import {
  calculateWeights,
  convertWghtToLbs,
  hasPermission,
  playSound,
  roundValue,
} from "helper/utility";
import { setErrorMessage } from "redux/features/common/commonSlice";
import { useAppDispatch } from "redux/hooks";
import CustomButton from "shared/Components/CustomButton";
import { BoxIcon, LbsIcon } from "helper/icons";
import styles from "components/Sales/GatePasses/styles.module.css";
import { useScannedCode } from "shared/Components/Hooks/useScannedCode";

export interface Props {
  saleOrderId: number;
  salesItems: SaleOrderItemsResponse[];
  totalSalesOrderItems: SaleOrderItems[];
  isEdit: boolean;
  control: Control<GatePassItemsCodes, null>;
  errors: Partial<FieldErrorsImpl<GatePassItemsCodes>>;
  watch: UseFormWatch<GatePassItemsCodes>;
  columns: column<"codeId", GatePassItemsAgainstCode>[];
  displayRowData?: GatePassItemsAgainstCode[];
  setDisplayRowData?: React.Dispatch<
    React.SetStateAction<GatePassItemsAgainstCode[]>
  >;
  rowData?: GatePassItemsAgainstCode[];
  setRowData?: React.Dispatch<React.SetStateAction<GatePassItemsAgainstCode[]>>;
  gatePassId?: number;
  getItems?: () => void;
  gpResponse?: GatePassesResponse;
}
export default function EditItemsGPForm({
  saleOrderId,
  salesItems,
  isEdit,
  control,
  columns,
  displayRowData,
  setDisplayRowData,
  rowData,
  setRowData,
  gatePassId,
  getItems,
  gpResponse,
  totalSalesOrderItems,
}: Props) {
  const dispatch = useAppDispatch();
  // const [getItemByIds, itemsResult] = useLazyGetSaleOrderItemsQuery();
  const [triggerGetItemsOnCode, getItemByCode] =
    useGetGatePassByCodeIdMutation();
  const [getGatePassesById, result] = useLazyGetSalesGatePassesByIdQuery();
  const [deleteItems] = useDeleteByItemIdMutation();
  const [barcode, setBarcode] = useState<number | string>("");
  const [items, setItems] = useState<SaleOrderItems[]>([]);
  const [selectedId, setSelectedId] = useState<number>(0);
  const [selectedItemsId, setSelectedItemsId] = useState<number>(0);

  useEffect(() => {
    if (selectedItemsId) {
      getItemById(selectedItemsId);
    }
  }, [salesItems]);

  useScannedCode(
    (code) => {
      if (isEdit) {
        setBarcode(code);
        getItemsOnBarcode();
      }
    },
    [isEdit]
  );

  const handleDelete = (id: number) => {
    if (id) {
      deleteItems(id);
    }
  };

  const getItemById = (id: number | string) => {
    const getItems = totalSalesOrderItems.filter(
      (res) => res.item?.itemId === id
    );
    setItems(getItems);
  };

  useEffect(() => {
    if (getItemByCode.data && !getItemByCode?.isLoading) {
      const isCodeUnique =
        rowData &&
        rowData.every((item) => item?.unitCode != getItemByCode.data?.code);
      if (getItemByCode.data && isCodeUnique) {
        setRowData &&
          setRowData([
            ...(rowData ? rowData : []),
            {
              codeId: getItemByCode.data?.codeId
                ? getItemByCode.data?.codeId
                : 0,
              itemName: getItemByCode.data?.item?.name
                ? getItemByCode.data?.item?.name
                : "-",
              itemId: getItemByCode.data?.item?.itemId
                ? getItemByCode.data?.item?.itemId
                : 0,
              unitOfMeasurement: getItemByCode.data?.item?.uom
                ? getItemByCode.data?.item?.uom?.name
                : "-",
              units: getItemByCode?.data?.units
                ? getItemByCode?.data?.units
                : 0,
              weightKgs: getItemByCode?.data?.weightUnit?.weightUnitId
                ? calculateWeights(
                    getItemByCode?.data.unitWeight,
                    getItemByCode?.data.weightUnit.weightUnitId
                  )[0]
                : 0,
              weightLbs: getItemByCode?.data?.weightUnit?.weightUnitId
                ? calculateWeights(
                    getItemByCode?.data.unitWeight,
                    getItemByCode?.data.weightUnit.weightUnitId
                  )[1]
                : 0,
              stockRoom: "-",
              soUnits: getItemByCode.data?.soUnits,
              unitCode: getItemByCode.data?.code ? getItemByCode.data?.code : 0,
            },
          ]);
        const isItemUnique = displayRowData?.every(
          (item) => item?.itemId != getItemByCode.data?.item?.itemId
        );

        if (isItemUnique) {
          setDisplayRowData &&
            setDisplayRowData([
              ...(displayRowData ? displayRowData : []),
              {
                codeId: getItemByCode.data?.codeId
                  ? getItemByCode.data?.codeId
                  : 0,
                itemName: getItemByCode.data?.item?.name
                  ? getItemByCode.data?.item?.name
                  : "-",
                itemId: getItemByCode.data?.item?.itemId
                  ? getItemByCode.data?.item?.itemId
                  : 0,
                unitOfMeasurement: getItemByCode.data?.item?.uom?.name
                  ? getItemByCode.data?.item?.uom?.name
                  : "-",
                units: 1,
                weightKgs: getItemByCode?.data?.weightUnit?.weightUnitId
                  ? calculateWeights(
                      getItemByCode?.data.unitWeight,
                      getItemByCode?.data.weightUnit.weightUnitId
                    )[0]
                  : 0,
                weightLbs: getItemByCode?.data?.weightUnit?.weightUnitId
                  ? calculateWeights(
                      getItemByCode?.data.unitWeight,
                      getItemByCode?.data.weightUnit.weightUnitId
                    )[1]
                  : 0,
                stockRoom: "-",
                soUnits: getItemByCode.data?.soUnits,
                unitCode: getItemByCode.data?.code
                  ? getItemByCode.data?.code
                  : 0,
              },
            ]);
        } else {
          const updatedDisplayRowData = displayRowData?.map((item) =>
            item?.itemId === getItemByCode.data?.item?.itemId
              ? { ...item, units: item?.units + 1 }
              : item
          );
          if (updatedDisplayRowData) {
            setDisplayRowData && setDisplayRowData(updatedDisplayRowData);
          }
        }
      }
    }
  }, [getItemByCode]);

  const getItemsOnBarcode = async () => {
    if (barcode !== "") {
      const isCodeUnique = rowData?.every(
        (item: GatePassItemsAgainstCode) => item?.unitCode !== barcode
      );

      if (barcode && isCodeUnique) {
        const res = await triggerGetItemsOnCode({
          params: {
            code: barcode ? barcode : 0,
            gatepass: true,
            saleOrderId: saleOrderId,
            production: true,
            gatePassId: gatePassId,
          },
        });
        if ("data" in res && gatePassId) {
          playSound("SUCCESS");
          getGatePassesById(gatePassId);
          getItems && getItems();
        } else {
          playSound("ERROR");
        }
      } else {
        playSound("ERROR");
        dispatch(setErrorMessage("Code Already Scanned"));
      }
    } else {
      playSound("ERROR");
      dispatch(setErrorMessage("Code Could not be Empty"));
    }
    setBarcode("");
  };

  return (
    <>
      <div className="col-lg-9 col-12 mx-auto d-flex my-4">
        <div
          className={
            styles["TotalAmountDiv"] + " d-flex align-items-center py-2 ps-4"
          }
        >
          <div className="align-self-center">
            <BoxIcon />
          </div>
          <div className="ms-3 d-flex flex-column">
            <span className="fw600" style={{ fontSize: "14px" }}>
              Total Units
            </span>
            <span>{gpResponse?.units ? gpResponse?.units : 0}</span>
          </div>
        </div>
        <div
          className={
            styles["TotalAmountDiv"] +
            " d-flex align-items-center py-2 ms-3 ps-4"
          }
        >
          <div className="align-self-center">
            <LbsIcon />
          </div>
          <div className="ms-3 d-flex flex-column">
            <span className="fw600" style={{ fontSize: "14px" }}>
              Total (KGS)
            </span>
            <span>
              {gpResponse?.totalWeightKgs
                ? roundValue(gpResponse.totalWeightKgs)
                : 0}
            </span>
          </div>
        </div>
        <div
          className={
            styles["TotalAmountDiv"] +
            " d-flex align-items-center py-2 ms-3 ps-4"
          }
        >
          <div className="align-self-center">
            <LbsIcon />
          </div>
          <div className="ms-3 d-flex flex-column">
            <span className="fw600" style={{ fontSize: "14px" }}>
              Total (LBS)
            </span>
            <span>
              {roundValue(
                gpResponse?.totalWeightLbs ? gpResponse.totalWeightLbs : 0
              )}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-2 pt-2 d-flex align-items-center">
        <div className="col-lg-5">
          <Controller
            control={control}
            name="barcode"
            render={({ field: { onChange, value } }) => (
              <MDBInput
                label="Barcode"
                className="me-2"
                disabled={!isEdit}
                onChange={(e) => {
                  setBarcode(+e.target.value);
                }}
                value={barcode}
                type="number"
              />
            )}
          />
        </div>

        <div
          className="d-flex justify-content-end ms-3"
          onClick={() => {
            getItemsOnBarcode();
          }}
        >
          <CustomButton
            size="sm"
            type="solid"
            className="px-2"
            disabled={!isEdit}
            title={getItemByCode?.isLoading ? "Scaning..." : "Scan"}
          />
        </div>
      </div>
      {salesItems?.length > 0 && (
        <>
          <h6 className="fw-bold black mt-4 mb-2">Items Summary</h6>
          <DataTable
            isLoading={false}
            columns={[
              // { label: "Code", field: "code" },
              { label: "Item Name", field: "itemName" },
              { label: "UOM", field: "uom" },
              { label: "S.O. Units", field: "soUnits" },
              { label: "Units", field: "units" },
              { label: "Weight (KGS)", field: "weightKgs" },
              { label: "Weight (LBS)", field: "weightLbs" },
              { label: "Action", field: "action" },
            ]}
            rows={
              salesItems
                ? salesItems.map((salesItems: SaleOrderItemsResponse) => {
                    // Convert to seconds

                    return {
                      // code: salesItems?.code ? salesItems?.code?.code : 0,
                      itemName: salesItems?.itemName
                        ? salesItems?.itemName
                        : "-",
                      uom: salesItems?.uom ? salesItems?.uom : "-",
                      // quantity: salesItems?.quantity
                      //   ? salesItems?.quantity
                      //   : 0,
                      units: salesItems?.unitPieces
                        ? salesItems?.unitPieces
                        : 0,
                      weightKgs: salesItems?.weightKgs
                        ? salesItems?.weightKgs
                        : 0,
                      soUnits: salesItems?.soUnits ? salesItems?.soUnits : 0,
                      weightLbs: salesItems?.weightKgs
                        ? roundValue(convertWghtToLbs(salesItems?.weightKgs))
                        : 0,
                      action: (
                        <CustomButton
                          type="solid"
                          size="sm"
                          onClick={() => {
                            setSelectedId(salesItems?.saleOrderItemId);
                            setSelectedItemsId(salesItems.itemId);
                            getItemById(
                              salesItems?.itemId ? salesItems?.itemId : 0
                            );
                          }}
                          disabled={
                            salesItems?.unitPieces <= 0 ||
                            salesItems?.saleOrderItemId === selectedId
                          }
                          title={
                            salesItems.saleOrderItemId === selectedId
                              ? "Selected"
                              : "Select"
                          }
                        />
                      ),
                    };
                  })
                : []
            }
          />
        </>
      )}
      <div className="mt-3 mb-5">
        <>
          {items.length > 0 && (
            <>
              <h6 className="fw-bold black mt-4 mb-2">Selected Items</h6>
              <DataTable
                columns={[
                  { label: "Sr. No.", field: "srNo" },
                  { label: "Unit Code", field: "unitCode" },
                  { label: "Stockroom", field: "stockRoom" },
                  { label: "KGS", field: "kgs" },
                  { label: "LBS", field: "lbs" },
                  { label: "Amount", field: "amount" },
                  { label: "(MIS)", field: "mis" },
                  { label: "Action", field: "action" },
                ]}
                rows={
                  items?.length > 0
                    ? items?.map((item: SaleOrderItems, index) => {
                        return {
                          srNo: index + 1,
                          unitCode: item?.code ? item?.code : "-",
                          stockRoom: item?.saleOrder?.stockroom
                            ? item?.saleOrder?.stockroom?.name
                            : "-",
                          kgs: item?.weightUnit?.weightUnitId
                            ? calculateWeights(
                                item?.unitWeight,
                                item?.weightUnit?.weightUnitId ?? 0
                              )[0]
                            : 0,
                          lbs: item?.weightUnit?.weightUnitId
                            ? calculateWeights(
                                item?.unitWeight,
                                item?.weightUnit?.weightUnitId ?? 0
                              )[1]
                            : 0,
                          amount: item?.amount ? item?.amount : "-",
                          mis: "-",
                          action: (
                            <RoutingActionButton
                              onDeleteClick={
                                hasPermission("sal_so_102") &&
                                !gpResponse?.posted
                                  ? () => handleDelete(item.saleOrderItemId)
                                  : undefined
                              }
                            />
                          ),
                        };
                      })
                    : []
                }
              />
            </>
          )}
        </>
      </div>
    </>
  );
}
