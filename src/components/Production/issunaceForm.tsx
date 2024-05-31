import { MDBInput, MDBSelect, MDBDatepicker } from "mdb-react-ui-kit";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormWatch,
  UseFormSetValue,
} from "react-hook-form";
import FormValidationError from "shared/Components/FormValidationError";
import {
  IssuanceItemsAgainstCodeEditableDataTable,
  IssuanceResponse,
  issuanceRequest,
} from "redux/types/Productions/issuance";
import styles from "components/Production/styles.module.css";
import Loader from "shared/Components/Loader/Loader";
import { useScanItemsByCodeIdMutation } from "redux/features/productions/codesApiSlice";
import EditableDataTable, {
  column,
} from "shared/Components/EditableDatatable/EditableDatatable";
import { useEffect, useState } from "react";
import { AmountIcon, BoxIcon, KgIcon, LbsIcon } from "helper/icons";
import { useGetCartonsQuery } from "redux/features/Settings/Productions/cartonsApiSlice";
import { CartonsData } from "redux/types/Settings/Productions/carton";
import { useScannedCode } from "shared/Components/Hooks/useScannedCode";
import { useAppDispatch } from "redux/hooks";
import { setErrorMessage } from "redux/features/common/commonSlice";
import { Floors } from "redux/types/common/floor";
import { Belt } from "redux/types/Settings/Productions/belt";
import CustomButton from "shared/Components/CustomButton";
import {
  calculateWeights,
  convertWghtToLbs,
  playSound,
  roundValue,
} from "helper/utility";
import { useLazyGetIssuanceByIdQuery } from "redux/features/productions/issuanceApiSlice";
interface Props {
  mode: string;
  isEdit: boolean;
  control: Control<issuanceRequest, null>;
  errors: FieldErrors<issuanceRequest>;
  rowData?: IssuanceItemsAgainstCodeEditableDataTable[];
  columns?: column<"codeId", IssuanceItemsAgainstCodeEditableDataTable>[];
  setRowData?: React.Dispatch<
    React.SetStateAction<IssuanceItemsAgainstCodeEditableDataTable[]>
  >;
  displayRowData?: IssuanceItemsAgainstCodeEditableDataTable[];
  setDisplayRowData?: React.Dispatch<
    React.SetStateAction<IssuanceItemsAgainstCodeEditableDataTable[]>
  >;
  issuanceGetByIdData?: IssuanceResponse | undefined;
  watch?: UseFormWatch<issuanceRequest>;
  setValue: UseFormSetValue<issuanceRequest>;
  floorsList?: Floors[];
  beltsList?: Belt[];
  issuanceTypeId?: number;
  IssuanceId?: number;
}
export default function IssuanceForm({
  mode,
  isEdit,
  control,
  errors,
  columns,
  rowData,
  setRowData,
  displayRowData,
  setDisplayRowData,
  issuanceGetByIdData,
  watch,
  setValue,
  floorsList,
  beltsList,
  issuanceTypeId,
  IssuanceId,
}: Props) {
  const [barcode, setBarcode] = useState<number | string>("");
  const [selectedFloor, setSelectedFloor] = useState(0);
  const [selectedBelt, setSelectedBelt] = useState(0);
  const { isLoading: isCartonListLoading, data: cartonList } =
    useGetCartonsQuery(null);
  const dispatch = useAppDispatch();
  const [
    triggerGetItemsOnCodes,
    { data: getItemByCode, isLoading: editDailyProductionLoading },
  ] = useScanItemsByCodeIdMutation();
  const [triggerIussuanceById, result] = useLazyGetIssuanceByIdQuery();
  useScannedCode(
    (code) => {
      if (mode != "Add" && isEdit) {
        setBarcode(code);
        getItemsOnBarcode();
      }
    },
    [mode, isEdit]
  );
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

  useEffect(() => {
    if (floorsList && floorsList?.length > 0 && beltsList) {
      const isCodeUnique =
        rowData && rowData.every((item) => item?.code !== getItemByCode?.code);
      if (getItemByCode && isCodeUnique) {
        setRowData &&
          setRowData([
            ...(rowData ? rowData : []),
            {
              codeId: getItemByCode?.codeId ? getItemByCode?.codeId : 0,
              itemId: getItemByCode?.purchaseOrderItem?.item?.itemId
                ? getItemByCode?.purchaseOrderItem?.item?.itemId
                : 0,

              itemName: getItemByCode?.purchaseOrderItem?.item?.name
                ? getItemByCode?.purchaseOrderItem?.item?.name
                : getItemByCode?.item
                ? getItemByCode?.item.name
                : "-",
              unitOfMeasurement: getItemByCode?.purchaseOrderItem?.item?.uom
                ? getItemByCode?.purchaseOrderItem?.item?.uom?.name
                : getItemByCode?.item?.uom
                ? getItemByCode?.item?.uom.name
                : "-",
              units: 0,
              weightKgs:
                getItemByCode?.weightUnit?.weightUnitId &&
                getItemByCode?.unitWeight
                  ? calculateWeights(
                      getItemByCode?.unitWeight,
                      getItemByCode?.weightUnit?.weightUnitId
                    )[0]
                  : 0,
              weightLbs:
                getItemByCode?.weightUnit?.weightUnitId &&
                getItemByCode.unitWeight
                  ? calculateWeights(
                      getItemByCode?.unitWeight,
                      getItemByCode?.weightUnit?.weightUnitId
                    )[1]
                  : 0,

              floorId: getItemByCode?.floor
                ? getItemByCode?.floor?.floorId
                : selectedFloor,
              beltId: getItemByCode?.belt
                ? getItemByCode?.belt?.beltId
                : selectedBelt,
              code: getItemByCode?.code ? getItemByCode?.code : 0,
            },
          ]);

        const isItemUnique = !rowData?.find(
          (item) =>
            item?.itemId === getItemByCode?.purchaseOrderItem?.item?.itemId &&
            item?.beltId === selectedBelt &&
            item?.floorId === selectedFloor
        );

        if (isItemUnique) {
          setDisplayRowData &&
            setDisplayRowData([
              ...(displayRowData ? displayRowData : []),
              {
                codeId: getItemByCode?.codeId ? getItemByCode?.codeId : 0,
                itemId: getItemByCode?.purchaseOrderItem?.item?.itemId
                  ? getItemByCode?.purchaseOrderItem?.item?.itemId
                  : 0,
                itemName: getItemByCode?.purchaseOrderItem?.item?.name
                  ? getItemByCode?.purchaseOrderItem?.item?.name
                  : getItemByCode?.item
                  ? getItemByCode.item.name
                  : "-",
                unitOfMeasurement: getItemByCode?.purchaseOrderItem?.item?.uom
                  ? getItemByCode?.purchaseOrderItem?.item?.uom?.name
                  : getItemByCode?.item?.uom
                  ? getItemByCode?.item?.uom.name
                  : "-",
                units: 1,
                weightKgs:
                  getItemByCode?.weightUnit?.weightUnitId &&
                  getItemByCode.unitWeight
                    ? calculateWeights(
                        getItemByCode.unitWeight,
                        getItemByCode?.weightUnit?.weightUnitId
                      )[0]
                    : 0,
                weightLbs:
                  getItemByCode?.weightUnit?.weightUnitId &&
                  getItemByCode.unitWeight
                    ? calculateWeights(
                        getItemByCode.unitWeight,
                        getItemByCode?.weightUnit?.weightUnitId
                      )[1]
                    : 0,
                floorId: getItemByCode?.floor
                  ? getItemByCode?.floor?.floorId
                  : selectedFloor,
                beltId: getItemByCode?.belt
                  ? getItemByCode?.belt?.beltId
                  : selectedBelt,
                code: getItemByCode?.code ? getItemByCode?.code : 0,
              },
            ]);
        } else {
          const updatedDisplayRowData = displayRowData?.map((item) =>
            item.itemId === getItemByCode?.purchaseOrderItem?.item?.itemId &&
            item.beltId === selectedBelt &&
            item.floorId === selectedFloor
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
    if (issuanceTypeId === 1 || issuanceTypeId === 2) {
      if (selectedFloor === 0) {
        playSound("ERROR");
        dispatch(setErrorMessage("Please select floor first!"));
        return;
      }
      if (selectedBelt === 0) {
        playSound("ERROR");
        dispatch(setErrorMessage("Please select belt first!"));
        return;
      }
    }
    if (barcode !== "") {
      const isCodeUnique = rowData?.every(
        (item: IssuanceItemsAgainstCodeEditableDataTable) =>
          item?.code != barcode
      );
      if (isCodeUnique) {
        const res = await triggerGetItemsOnCodes({
          params: {
            floorId: selectedFloor ?? 0,
            beltId: getItemByCode?.belt
              ? getItemByCode?.belt?.beltId
              : selectedBelt,
            code: barcode ? barcode : 0,
            production: false,
            issuanceTypeId: issuanceTypeId,
            IssuanceId: IssuanceId,
          },
        });
        if ("data" in res && IssuanceId) {
          playSound("SUCCESS");
          triggerIussuanceById(IssuanceId);
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
  }, [watch, setValue, cartonList]);
  return (
    <>
      {isCartonListLoading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <>
          {mode === "Add" ? (
            <div className="">
              <div className="col-lg-5 col-md-6 col-11 my-3">
                <Controller
                  control={control}
                  name="issuanceDate"
                  render={({ field: { onChange, value } }) => (
                    <MDBDatepicker
                      format="yyyy-mm-dd"
                      inline
                      className={`${errors.issuanceDate && "is-invalid"}`}
                      label="Date*"
                      disabled={!isEdit}
                      onChange={onChange}
                      value={value}
                    />
                  )}
                />
                <FormValidationError
                  errorMessage={errors.issuanceDate?.message}
                />
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
                      preventFirstSelection
                      search
                      disabled={!isEdit}
                    />
                  )}
                />
                <FormValidationError errorMessage={errors.cartonId?.message} />
              </div>

              <div className="col-lg-5 col-md-6 col-11 my-3">
                <Controller
                  control={control}
                  name="remarks"
                  render={({ field: { onChange, value } }) => (
                    <MDBInput
                      label="Remarks"
                      onChange={onChange}
                      value={value}
                      disabled={!isEdit}
                    />
                  )}
                />
              </div>
            </div>
          ) : (
            <div className="mt-3">
              <div className="d-flex flex-wrap">
                <div
                  className={
                    styles["amountDiv"] +
                    " d-flex align-items-center ps-3 py-2 me-2"
                  }
                >
                  <div className="align-self-center">
                    <AmountIcon />
                  </div>
                  <div className="ms-3 d-flex flex-column">
                    <span className="fw600" style={{ fontSize: "14px" }}>
                      Total Amount
                    </span>
                    <span>
                      {issuanceGetByIdData?.amount
                        ? issuanceGetByIdData?.amount?.toFixed(2)
                        : 0}
                    </span>
                  </div>
                </div>
                <div
                  className={
                    styles["amountDiv"] +
                    " d-flex align-items-center ps-3 py-2 me-2"
                  }
                >
                  <div className="align-self-center">
                    <LbsIcon />
                  </div>
                  <div className="ms-3 d-flex flex-column">
                    <span className="fw600" style={{ fontSize: "14px" }}>
                      Avg. Rate
                    </span>
                    <span>
                      {issuanceGetByIdData?.units && issuanceGetByIdData?.rate
                        ? (
                            issuanceGetByIdData?.rate /
                            issuanceGetByIdData?.units
                          )?.toFixed()
                        : 0}
                    </span>
                  </div>
                </div>
                <div
                  className={
                    styles["amountDiv"] +
                    " d-flex align-items-center ps-3 py-2 me-2"
                  }
                >
                  <div className="align-self-center">
                    <BoxIcon />
                  </div>
                  <div className="ms-3 d-flex flex-column">
                    <span className="fw600" style={{ fontSize: "14px" }}>
                      Total Units
                    </span>
                    <span>
                      {issuanceGetByIdData?.units
                        ? roundValue(issuanceGetByIdData?.units)
                        : 0}
                    </span>
                  </div>
                </div>
                <div
                  className={
                    styles["amountDiv"] +
                    " d-flex align-items-center ps-3 py-2 me-2"
                  }
                >
                  <div className="align-self-center">
                    <LbsIcon />
                  </div>
                  <div className="ms-3 d-flex flex-column">
                    <span className="fw600" style={{ fontSize: "14px" }}>
                      Total LBS
                    </span>
                    <span>
                      {issuanceGetByIdData?.kgs
                        ? convertWghtToLbs(issuanceGetByIdData?.kgs)
                        : 0}
                    </span>
                  </div>
                </div>
                <div
                  className={
                    styles["amountDiv"] +
                    " d-flex align-items-center ps-3 py-2 me-2"
                  }
                >
                  <div className="align-self-center">
                    <KgIcon />
                  </div>
                  <div className="ms-3 d-flex flex-column">
                    <span className="fw600" style={{ fontSize: "14px" }}>
                      Total KGS
                    </span>
                    <span>
                      {issuanceGetByIdData?.kgs
                        ? issuanceGetByIdData?.kgs?.toFixed(2)
                        : 0}
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-lg-10 col-11 d-flex">
                <div
                  className="my-4 pb-3"
                  style={{
                    border: "0.3px solid rgba(156, 156, 156, 0.5)",
                    borderRadius: "6px 6px 0px 0px",
                  }}
                >
                  <div
                    style={{
                      background: "rgba(243, 243, 243, 0.5)",
                      fontWeight: "700",
                    }}
                    className="p-2 col-12"
                  >
                    <small>INFO</small>
                  </div>
                  <div className="d-flex mt-2 p-2 justify-content-between">
                    <div className="me-2">
                      <Controller
                        control={control}
                        name="issuanceDate"
                        render={({ field: { onChange, value } }) => (
                          <MDBDatepicker
                            format="yyyy-mm-dd"
                            inline
                            className={`${errors.issuanceDate && "is-invalid"}`}
                            label="Date"
                            disabled={!isEdit}
                            onChange={onChange}
                            value={value}
                          />
                        )}
                      />
                      <FormValidationError
                        errorMessage={errors.issuanceDate?.message}
                      />
                    </div>
                    <div className="me-2">
                      <Controller
                        control={control}
                        name="cartonId"
                        render={({ field: { onChange, value } }) => (
                          <MDBSelect
                            label="Carton"
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
                      <FormValidationError
                        errorMessage={errors.cartonId?.message}
                      />
                    </div>

                    <div>
                      <Controller
                        control={control}
                        name="remarks"
                        render={({ field: { onChange, value } }) => (
                          <MDBInput
                            label="Remarks"
                            onChange={onChange}
                            value={value}
                            disabled={!isEdit}
                          />
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div
                className="col-lg-5 col-6"
                style={{
                  border: "0.3px solid rgba(156, 156, 156, 0.5)",
                  borderRadius: "6px 6px 0px 0px",
                }}
              >
                <div
                  style={{
                    background: "rgba(243, 243, 243, 0.5)",
                    fontWeight: "700",
                  }}
                  className="p-2 col-12"
                >
                  <small>SCAN</small>
                </div>
                <div className="mt-2 p-2">
                  <div className="">
                    <MDBInput
                      label="Barcode"
                      onChange={(e) => {                        
                        setBarcode(+e.target.value);
                      }}
                      value={barcode}
                      disabled={!isEdit}
                      type="number"
                    />
                  </div>
                </div>
                <div
                  className="d-flex justify-content-end p-2 mb-2"
                  onClick={() => {
                    getItemsOnBarcode();
                  }}
                >
                  <CustomButton
                    type="solid"
                    size="sm"
                    className="px-4"
                    disabled={!isEdit}
                    title={editDailyProductionLoading ? "Scaning..." : "Scan"}
                  />
                </div>
              </div>
              <div className="mt-4">
                <h5 className="fw700 darkGrey">New Scanned Items</h5>
                {(issuanceTypeId === 1 || issuanceTypeId === 2) && (
                  <>
                    <hr />
                    <h6 className="my-2 fw-bold">Select Defaults</h6>
                    <div className="d-flex align-items-center my-2">
                      <MDBSelect
                        className="me-2"
                        label="Floor"
                        data={
                          floorsList?.map((floor) => {
                            return {
                              text: floor.name,
                              value: floor.floorId,
                              defaultSelected: selectedFloor === floor.floorId,
                            };
                          }) ?? []
                        }
                        onValueChange={(data) => {
                          if ("value" in data && data.value) {
                            setSelectedFloor(+data.value);
                          }
                        }}
                        search
                        preventFirstSelection
                        disabled={!isEdit}
                      />
                      <MDBSelect
                        className="mx-2"
                        label="Belt"
                        data={
                          beltsList?.map((belt) => {
                            return {
                              text: belt.name,
                              value: belt.beltId,
                              defaultSelected: selectedBelt === belt.beltId,
                            };
                          }) ?? []
                        }
                        onValueChange={(data) => {
                          if ("value" in data && data.value) {
                            setSelectedBelt(+data.value);
                          }
                        }}
                        search
                        preventFirstSelection
                        disabled={!isEdit}
                      />
                    </div>
                  </>
                )}
                <div style={{ maxHeight: "13rem", overflowY: "auto" }}>
                  <EditableDataTable
                    identifier="codeId"
                    showAddButton={false}
                    columns={
                      columns
                        ? columns.filter((col) =>
                            issuanceTypeId === 1 || issuanceTypeId === 2
                              ? true
                              : !(
                                  col.field === "floorId" ||
                                  col.field === "beltId"
                                )
                          )
                        : []
                    }
                    rows={displayRowData ? displayRowData : []}
                    setRows={setDisplayRowData ? setDisplayRowData : () => {}}
                    isLoading={false}
                    showEditButton={
                      issuanceTypeId === 1 || issuanceTypeId === 2
                    }
                    defaultEditable={isEdit}
                  />
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
