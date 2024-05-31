import { MDBSelect, MDBDatepicker, MDBInput } from "mdb-react-ui-kit";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormWatch,
  UseFormSetValue,
} from "react-hook-form";
import FormValidationError from "shared/Components/FormValidationError";
import styles from "components/Production/styles.module.css";
import { useGetFloorsQuery } from "redux/features/Settings/Productions/floorApiSlice";
import { useGetAllStationsQuery } from "redux/features/Settings/Productions/stationsApiSlice";
import { StationsData } from "redux/types/Settings/Productions/station";
import { Floors } from "redux/types/common/floor";
import { useEffect, useState } from "react";
import { useGetDailyProductionByCodeIdMutation } from "redux/features/productions/codesApiSlice";
import EditableDataTable, {
  column,
} from "shared/Components/EditableDatatable/EditableDatatable";
import {
  ScannedItemsData,
  dailyProductionRequest,
  productionDepartment,
} from "redux/types/Productions/dailyProduction";
import { BoxIcon, LbsIcon } from "helper/icons";
import { useGetCartonsQuery } from "redux/features/Settings/Productions/cartonsApiSlice";
import { CartonsData } from "redux/types/Settings/Productions/carton";
import Loader from "shared/Components/Loader/Loader";
import { useScannedCode } from "shared/Components/Hooks/useScannedCode";
import { setErrorMessage } from "redux/features/common/commonSlice";
import { useAppDispatch } from "redux/hooks";
import { SaleOrdersTableData } from "redux/types/Orders/saleOrders";
import { StockroomsData } from "redux/types/Settings/Productions/Stockroom";
import { UserData } from "redux/types/Settings/user";
import CustomButton from "shared/Components/CustomButton";
import {
  calculateWeights,
  convertWghtToLbs,
  playSound,
  roundValue,
} from "helper/utility";
import { useLazyGetDailyProductionByIdQuery } from "redux/features/productions/dailyProductionApiSlice";
interface Props {
  mode: string;
  isEdit: boolean;
  control: Control<dailyProductionRequest, null>;
  errors: FieldErrors<dailyProductionRequest>;
  rowData?: ScannedItemsData[];
  setRowData?: React.Dispatch<React.SetStateAction<ScannedItemsData[]>>;
  columns?: column<"codeId", ScannedItemsData>[];
  displayRowData?: ScannedItemsData[];
  setDisplayRowData?: React.Dispatch<React.SetStateAction<ScannedItemsData[]>>;
  units?: number;
  weight?: number;
  // existingCodes?: ExistingCodes[];
  watch?: UseFormWatch<dailyProductionRequest>;
  setValue: UseFormSetValue<dailyProductionRequest>;
  stockRoomList?: StockroomsData[];
  usersList?: UserData[];
  saleOrderList?: SaleOrdersTableData[];
  productionDepartmentList?: productionDepartment[];
  productionId?: number;
}
export default function DailyProductionForm({
  mode,
  isEdit,
  control,
  errors,
  rowData,
  setRowData,
  columns,
  displayRowData,
  setDisplayRowData,
  units,
  weight,
  watch,
  setValue,
  stockRoomList,
  usersList,
  saleOrderList,
  productionDepartmentList,
  productionId,
}: Props) {
  const [barcode, setBarcode] = useState<number | string>("");
  const { data: floorsList, isLoading: floorLoading } = useGetFloorsQuery(null);
  const { data: stationsList, isLoading: stationLoading } =
    useGetAllStationsQuery(null);
  const dispatch = useAppDispatch();
  const { data: cartonList, isLoading: cartonLoading } =
    useGetCartonsQuery(null);
  const [
    editItemsByCode,
    { data: getItemByCode, isLoading: editDailyProductionLoading },
  ] = useGetDailyProductionByCodeIdMutation();
  const [getDailyProductuonById, result] = useLazyGetDailyProductionByIdQuery();
  const [selectedStockroom, setSelectedStockroom] = useState(0);
  const [selectedWorker, setSelectedWorker] = useState(0);
  const [selectedSaleOrder, setSelectedSaleOrder] = useState(0);
  const [selectedProductionDepartment, setSelectedProductionDepartment] =
    useState(0);

  useScannedCode(() => {
    if (isEdit) {
      setBarcode(barcode);
      scanCode();
    }
  }, [isEdit]);

  useEffect(() => {
    if (productionDepartmentList && productionDepartmentList.length > 0)
      setSelectedProductionDepartment(
        productionDepartmentList[0].productionDepartmentId
      );
  }, [productionDepartmentList]);

  useEffect(() => {
    if (getItemByCode) {
      if (floorsList && floorsList?.length > 0) {
        const isCodeUnique = rowData?.every(
          (item) => item?.code != getItemByCode?.code
        );
        if (isCodeUnique) {
          setRowData &&
            setRowData([
              ...(rowData ? rowData : []),
              {
                name: getItemByCode?.item ? getItemByCode?.item?.name : "",
                itemId: getItemByCode?.item ? getItemByCode?.item?.itemId : 0,
                codeId: getItemByCode?.codeId ? getItemByCode?.codeId : 0,
                uom: getItemByCode?.item?.uom
                  ? getItemByCode?.item?.uom?.name
                  : "",
                code: getItemByCode?.code ? getItemByCode?.code : 0,
                units: getItemByCode?.units ? getItemByCode?.units : 0,
                saleOrderId: selectedSaleOrder,
                productionDepartmentId: selectedProductionDepartment,
                workerId: selectedWorker,
                stockRoomId: selectedStockroom,
                weightKg:
                  getItemByCode?.weightUnit?.weightUnitId &&
                  getItemByCode.unitWeight
                    ? calculateWeights(
                        getItemByCode?.unitWeight,
                        getItemByCode.weightUnit?.weightUnitId
                      )[0]
                    : 0,
                weightLb:
                  getItemByCode?.weightUnit?.weightUnitId &&
                  getItemByCode.unitWeight
                    ? calculateWeights(
                        getItemByCode?.unitWeight,
                        getItemByCode.weightUnit?.weightUnitId
                      )[1]
                    : 0,
                floorId: getItemByCode?.floor
                  ? getItemByCode?.floor?.floorId
                  : floorsList[0]?.floorId,
              },
            ]);

          const isItemUnique = !rowData?.find(
            (item) =>
              item?.itemId === getItemByCode?.item?.itemId &&
              item?.stockRoomId === selectedStockroom
          );

          if (isItemUnique) {
            setDisplayRowData &&
              setDisplayRowData([
                ...(displayRowData ? displayRowData : []),
                {
                  name: getItemByCode?.item ? getItemByCode?.item?.name : "-",
                  itemId: getItemByCode?.item ? getItemByCode?.item?.itemId : 0,
                  codeId: getItemByCode?.codeId ? getItemByCode?.codeId : 0,
                  uom: getItemByCode?.item?.uom
                    ? getItemByCode?.item?.uom?.name
                    : "",
                  code: getItemByCode?.code,
                  units: 1,
                  saleOrderId: selectedSaleOrder,
                  productionDepartmentId: selectedProductionDepartment,
                  workerId: selectedWorker,
                  stockRoomId: selectedStockroom,
                  weightKg:
                    getItemByCode?.weightUnit?.weightUnitId &&
                    getItemByCode.unitWeight
                      ? calculateWeights(
                          getItemByCode?.unitWeight,
                          getItemByCode.weightUnit?.weightUnitId
                        )[0]
                      : 0,
                  weightLb:
                    getItemByCode?.weightUnit?.weightUnitId &&
                    getItemByCode.unitWeight
                      ? calculateWeights(
                          getItemByCode?.unitWeight,
                          getItemByCode.weightUnit?.weightUnitId
                        )[1]
                      : 0,
                  floorId: getItemByCode?.floor
                    ? getItemByCode?.floor?.floorId
                    : floorsList[0]?.floorId,
                },
              ]);
          } else {
            const updatedDisplayRowData = displayRowData?.map((item) =>
              item.itemId === getItemByCode?.item?.itemId &&
              item.stockRoomId === selectedStockroom
                ? { ...item, units: item?.units + 1 }
                : item
            );
            if (updatedDisplayRowData) {
              setDisplayRowData && setDisplayRowData(updatedDisplayRowData);
            }
          }
        }
      }
    }
  }, [getItemByCode]);

  const getFloorsOptions = (selectedValue?: number) => {
    if (floorsList?.length) {
      return floorsList.map((floor: Floors) => {
        return {
          text: floor?.name ? floor?.name : "",
          value: floor?.floorId ? floor?.floorId : 0,
          defaultSelected: floor?.floorId === selectedValue,
        };
      });
    } else return [];
  };

  const getStationsOptions = (selectedValue?: number) => {
    if (stationsList?.length) {
      return stationsList.map((station: StationsData) => {
        return {
          text: station?.name ? station?.name : "",
          value: station?.stationId ? station?.stationId : 0,
          defaultSelected: station?.stationId === selectedValue,
        };
      });
    } else return [];
  };

  const getCartonsOptions = (selectedValue?: number) => {
    if (cartonList?.length) {
      return cartonList.map((carton: CartonsData) => {
        return {
          text: carton?.name ? carton?.name : "",
          value: carton?.cartonId ? carton?.cartonId : 0,
          defaultSelected: carton?.cartonId === selectedValue,
        };
      });
    } else return [];
  };

  const scanCode = async () => {
    if (selectedStockroom === 0) {
      playSound("ERROR");
      dispatch(setErrorMessage("Please select stoock room first!"));
      return;
    }
    if (barcode !== "") {
      const isCodeUnique = rowData?.every(
        (item: ScannedItemsData) => item?.code !== barcode
      );
      if (barcode && isCodeUnique) {
        const res = await editItemsByCode({
          params: {
            production: true,
            productionId: productionId,
          },
          body: {
            code: barcode ? barcode : 0,
            saleOrderId: selectedSaleOrder,
            stockRoomId: selectedStockroom,
            workerId: selectedWorker,
            productionDepartmentId: selectedProductionDepartment,
            floorId: getItemByCode?.floor
              ? getItemByCode?.floor?.floorId
              : floorsList && floorsList[0]?.floorId,
          },
        });
        if ("data" in res && productionId) {
          playSound("SUCCESS");
          getDailyProductuonById(productionId);
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

  useEffect(() => {
    if (watch?.("cartonId") === 0 && cartonList && cartonList?.length > 0) {
      setValue("cartonId", cartonList[0]?.cartonId);
    }
    if (
      watch?.("stationId") === 0 &&
      stationsList &&
      stationsList?.length > 0
    ) {
      setValue("stationId", stationsList[0]?.stationId);
    }
  }, [watch, setValue, cartonList, stationsList]);

  return (
    <>
      {mode === "Add" ? (
        <>
          {stationLoading || floorLoading || cartonLoading ? (
            <Loader />
          ) : (
            <div>
              <div className="col-lg-5 col-md-6 col-11 my-3">
                <Controller
                  control={control}
                  name="date"
                  render={({ field: { onChange, value } }) => (
                    <MDBDatepicker
                      format="yyyy-mm-dd"
                      className={`${errors.date && "is-invalid"}`}
                      label="Date*"
                      inline
                      disabled={!isEdit}
                      onChange={onChange}
                      value={value}
                    />
                  )}
                />
                <FormValidationError errorMessage={errors.date?.message} />
              </div>
              <div className="col-lg-5 col-md-6 col-11 my-3">
                <Controller
                  control={control}
                  name="cartonId"
                  render={({ field: { onChange, value } }) => (
                    <MDBSelect
                      label="Carton*"
                      inputClassName={errors.cartonId && "is-invalid"}
                      data={getCartonsOptions(value)}
                      onValueChange={(data) => {
                        if ("value" in data) {
                          onChange(data.value);
                        }
                      }}
                      search
                      preventFirstSelection
                      disabled={!isEdit}
                    />
                  )}
                />
                <FormValidationError errorMessage={errors.cartonId?.message} />
              </div>
              <div className="col-lg-5 col-md-6 col-11 my-3">
                <Controller
                  control={control}
                  name="stationId"
                  render={({ field: { onChange, value } }) => (
                    <MDBSelect
                      label="Station*"
                      inputClassName={errors.stationId && "is-invalid"}
                      data={getStationsOptions(value)}
                      onValueChange={(data) => {
                        if ("value" in data) {
                          onChange(data.value);
                        }
                      }}
                      search
                      preventFirstSelection
                      disabled={!isEdit}
                    />
                  )}
                />
                <FormValidationError errorMessage={errors.stationId?.message} />
              </div>
              <div className="col-lg-5 col-md-6 col-11 my-3">
                <Controller
                  control={control}
                  name="floorId"
                  render={({ field: { onChange, value } }) => (
                    <MDBSelect
                      label="Floor"
                      data={getFloorsOptions(value)}
                      onValueChange={(data) => {
                        if ("value" in data) {
                          onChange(data.value);
                        }
                      }}
                      search
                      preventFirstSelection
                      disabled={!isEdit}
                    />
                  )}
                />{" "}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="mt-5">
          <div className="col-lg-9 col-12 mx-auto d-flex">
            <div
              className={
                styles["productionAmountDiv"] +
                " d-flex align-items-center py-2 ps-4"
              }
            >
              <div className="align-self-center">
                <BoxIcon />
              </div>
              <div className="ms-3 d-flex flex-column">
                <span className="fw600" style={{ fontSize: "14px" }}>
                  Total Units
                </span>
                <span>{units ? units : 0}</span>
              </div>
            </div>
            <div
              className={
                styles["productionAmountDiv"] +
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
                <span>{weight ? roundValue(weight) : 0}</span>
              </div>
            </div>
            <div
              className={
                styles["productionAmountDiv"] +
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
                <span>{convertWghtToLbs(weight ? weight : 0)}</span>
              </div>
            </div>
          </div>
          <div className="d-flex flex-lg-row flex-column mt-5">
            <div className="col-lg-6 col-12">
              <div
                className="col-lg-11"
                style={{
                  border: "0.3px solid rgba(156, 156, 156, 0.5)",
                  borderRadius: "6px 6px 0px 0px",
                }}
              >
                <div
                  style={{
                    background: "rgba(243, 243, 243, 0.5)",
                  }}
                  className="p-2"
                >
                  <span className="darkGrey fw600 fs12">INFO</span>
                </div>
                <div className="p-2">
                  <Controller
                    control={control}
                    name="date"
                    render={({ field: { onChange, value } }) => (
                      <MDBInput
                        label="Date"
                        onChange={onChange}
                        value={value}
                        disabled={!isEdit}
                      />
                    )}
                  />
                  <div className="mt-3 mb-2">
                    <Controller
                      control={control}
                      name="stationId"
                      render={({ field: { onChange, value } }) => (
                        <MDBSelect
                          label="Station"
                          data={getStationsOptions(value)}
                          onValueChange={(data) => {
                            if ("value" in data) {
                              onChange(data.value);
                            }
                          }}
                          search
                          value={value}
                          disabled={!isEdit}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-lg-6 col-12 mt-lg-0 mt-5"
              style={{
                border: "0.3px solid rgba(156, 156, 156, 0.5)",
                borderRadius: "6px 6px 0px 0px",
              }}
            >
              <div
                style={{
                  background: "rgba(243, 243, 243, 0.5)",
                }}
                className="p-2"
              >
                <span className="darkGrey fw600 fs12">SCAN BARCODES</span>
              </div>
              <div className="p-2">
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
              </div>
              <div className="d-flex p-2">
                <CustomButton
                  type="solid"
                  size="sm"
                  className="px-2"
                  disabled={!isEdit || editDailyProductionLoading}
                  onClick={() => {
                    scanCode();
                  }}
                  title={editDailyProductionLoading ? "Scaning..." : "Scan"}
                />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <h5 className="fw700 darkGrey">New Scanned Items</h5>
            <hr />
            <h6 className="my-2 fw-bold">Select Defaults</h6>
            <div className="d-flex align-items-center my-2">
              <MDBSelect
                className="me-2"
                label="Stockroom"
                data={
                  stockRoomList?.map((stockroom) => {
                    return {
                      text: stockroom.name,
                      value: stockroom.stockRoomId,
                      defaultSelected:
                        selectedStockroom === stockroom.stockRoomId,
                    };
                  }) ?? []
                }
                onValueChange={(data) => {
                  if ("value" in data && data.value) {
                    setSelectedStockroom(+data.value);
                  }
                }}
                search
                preventFirstSelection
                disabled={!isEdit}
              />
              <MDBSelect
                className="mx-2"
                label="Worker"
                data={
                  usersList?.map((user) => {
                    return {
                      text: user.fullName,
                      value: user.userId,
                      defaultSelected: selectedWorker === user.userId,
                    };
                  }) ?? []
                }
                onValueChange={(data) => {
                  if ("value" in data && data.value) {
                    setSelectedWorker(+data.value);
                  }
                }}
                search
                preventFirstSelection
                disabled={!isEdit}
              />
              <MDBSelect
                className="mx-2"
                label="Sale Order"
                data={
                  saleOrderList?.map((saleOrder) => {
                    return {
                      text: saleOrder.reference,
                      value: saleOrder.saleOrderId,
                      defaultSelected:
                        selectedSaleOrder === saleOrder.saleOrderId,
                    };
                  }) ?? []
                }
                onValueChange={(data) => {
                  if ("value" in data && data.value) {
                    setSelectedSaleOrder(+data.value);
                  }
                }}
                search
                preventFirstSelection
                disabled={!isEdit}
              />
              <MDBSelect
                className="mx-2"
                label="Production Department"
                data={
                  productionDepartmentList?.map((productionDepartment) => {
                    return {
                      text: productionDepartment.name,
                      value: productionDepartment.productionDepartmentId,
                      defaultSelected:
                        selectedProductionDepartment ===
                        productionDepartment.productionDepartmentId,
                    };
                  }) ?? []
                }
                onValueChange={(data) => {
                  if ("value" in data && data.value) {
                    setSelectedProductionDepartment(+data.value);
                  }
                }}
                search
                preventFirstSelection
                disabled={!isEdit}
              />
            </div>
            <EditableDataTable
              identifier="codeId"
              showAddButton={false}
              columns={columns ? columns : []}
              rows={displayRowData ? displayRowData : []}
              setRows={setDisplayRowData ? setDisplayRowData : () => {}}
              isLoading={false}
              defaultEditable={isEdit}
            />
          </div>
        </div>
      )}
    </>
  );
}
