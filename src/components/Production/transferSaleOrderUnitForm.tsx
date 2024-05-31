import { MDBInput, MDBDatepicker, MDBSelect } from "mdb-react-ui-kit";
import { Control, Controller, FieldErrors } from "react-hook-form";
import FormValidationError from "shared/Components/FormValidationError";
import DataTable from "shared/Components/DataTable";
import { useEffect, useState } from "react";
import {
  SummaryItems,
  TransferredSaleOrderItems,
  transferSaleOrderUnitRequest,
} from "redux/types/Productions/transferSaleOrderUnit";
import { CodesData } from "redux/types/Productions/codes";
import EditableDataTable, {
  column,
} from "shared/Components/EditableDatatable/EditableDatatable";
import { useLazyGetSaleOdersItemsByCodeQuery } from "redux/features/sales/Orders/saleOrdersApiSlice";
import { getDateFromMillis, playSound } from "helper/utility";
import { setErrorMessage } from "redux/features/common/commonSlice";
import { useAppDispatch } from "redux/hooks";
import CustomButton from "shared/Components/CustomButton";
import { SaleOrdersTableData } from "redux/types/Orders/saleOrders";
import { StockroomsData } from "redux/types/Settings/Productions/Stockroom";
import { useScannedCode } from "shared/Components/Hooks/useScannedCode";
interface Props {
  mode: string;
  isEdit: boolean;
  control: Control<transferSaleOrderUnitRequest, null>;
  errors: FieldErrors<transferSaleOrderUnitRequest>;
  rowData?: TransferredSaleOrderItems[];
  columns?: column<"codeId", CodesData>[];
  codeItem?: CodesData[];
  setCodeItem?: React.Dispatch<React.SetStateAction<CodesData[]>>;
  summaryItems?: SummaryItems[];
  saleOrdersData?: SaleOrdersTableData[];
  stockroomsData?: StockroomsData[];
  transferId?: string;
}
export default function TransferSaleOrderUnitForm({
  mode,
  isEdit,
  control,
  errors,
  rowData,
  columns,
  codeItem,
  setCodeItem,
  summaryItems,
  saleOrdersData,
  stockroomsData,
  transferId,
}: Props) {
  const [getItems, itemsResult] = useLazyGetSaleOdersItemsByCodeQuery();
  const [barcode, setBarcode] = useState<number | string>("");
  const dispatch = useAppDispatch();
  const [selectedSaleOrder, setSelectedSaleOrder] = useState(0);
  const [selectedStockroom, setSelectedStockroom] = useState(0);

  useScannedCode(
    (code) => {
      if (isEdit) {
        setBarcode(code);
        onScanSubmit();
      }
    },
    [isEdit]
  );

  const onScanSubmit = () => {
    if (barcode !== "" && (selectedSaleOrder || selectedStockroom)) {
      const res = getItems({
        code: barcode ? barcode : 0,
        stockRoomId: selectedStockroom,
        saleOrderId: selectedSaleOrder,
        transferId: transferId,
      });
      if ("data" in res) playSound("SUCCESS");
      else playSound("ERROR");
    } else if (barcode === "") {
      playSound("ERROR");
      dispatch(setErrorMessage("Code Could not be Empty"));
    } else if (!selectedSaleOrder || !selectedStockroom) {
      playSound("ERROR");
      dispatch(setErrorMessage("Please select Sale order or Stockroom"));
    }
    setBarcode("");
  };

  useEffect(() => {
    const isCodeUnique = codeItem?.every(
      (item) => item?.code !== itemsResult.data?.code
    );
    if (itemsResult.data && isCodeUnique && !itemsResult.isFetching) {
      setCodeItem &&
        setCodeItem([
          ...(codeItem ? codeItem : []),
          {
            codeId: itemsResult.data?.saleOrderItemId
              ? itemsResult.data?.saleOrderItemId
              : 0,
            codeDate: itemsResult?.data?.creationDate
              ? getDateFromMillis(itemsResult?.data?.creationDate)
              : "-",
            itemId: itemsResult?.data?.item
              ? itemsResult?.data?.item?.itemId
              : 0,
            code: itemsResult?.data?.code ? itemsResult?.data?.code : 0,
            item: itemsResult?.data?.item ? itemsResult?.data?.item?.name : "-",
            creationDate: itemsResult?.data?.creationDate
              ? getDateFromMillis(itemsResult?.data?.creationDate)
              : "-",
            stockRoomId: selectedStockroom,
            saleOderId: selectedSaleOrder,
          },
        ]);
    }
  }, [itemsResult]);

  return (
    <>
      {mode === "Add" ? (
        <div className="">
          <div className="col-lg-4 col-md-5 col-8 my-3">
            <Controller
              control={control}
              name="transferDate"
              render={({ field: { onChange, value } }) => (
                <MDBDatepicker
                  label="Transfer Date*"
                  format="yyyy-mm-dd"
                  className={errors.transferDate && "is-invalid"}
                  value={value ? value : ""}
                  onChange={onChange}
                  inline
                  disabled
                />
              )}
            />
            <FormValidationError errorMessage={errors.transferDate?.message} />
          </div>
          <div className="col-lg-4 col-md-5 col-8 my-3">
            <Controller
              control={control}
              name="description"
              render={({ field: { onChange, value } }) => (
                <MDBInput
                  label="Description"
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </div>
        </div>
      ) : (
        <div className="mt-4">
          <div className="d-flex flex-lg-row flex-column">
            <div className="col-lg-5 col-12">
              <Controller
                control={control}
                name="transferDate"
                render={({ field: { onChange, value } }) => (
                  <MDBDatepicker
                    format="yyyy-mm-dd"
                    inline
                    className={`${errors.transferDate && "is-invalid"}`}
                    label="Transfer Date"
                    disabled
                    onChange={onChange}
                    value={value}
                  />
                )}
              />
              <FormValidationError
                errorMessage={errors.transferDate?.message}
              />
              <Controller
                control={control}
                name="description"
                render={({ field: { onChange, value } }) => (
                  <MDBInput
                    label="Description"
                    className="mt-3"
                    onChange={onChange}
                    value={value}
                    disabled={!isEdit}
                  />
                )}
              />
            </div>
          </div>
          <div className="row my-4">
            <div className="col-7">
              <div className="border rounded">
                <div className="p-2 col-12 fw700 fs12 bg-light">
                  <span>SCAN</span>
                </div>
                <div className="d-flex">
                  <div className="py-2 ps-3 col-5">
                    <MDBInput
                      label="Barcode"
                      onChange={(e) => {
                        setBarcode(+e.target.value);
                      }}
                      value={barcode}
                      // disabled={!isEdit}
                    />
                  </div>
                </div>
                <div className="col-7 py-2 ps-3 mb-2">
                  <CustomButton
                    type="solid"
                    size="sm"
                    className="px-4"
                    disabled={itemsResult?.isFetching}
                    onClick={() => onScanSubmit()}
                    title={itemsResult?.isFetching ? "Scaning..." : "Scan"}
                  />
                </div>
              </div>
            </div>
            {summaryItems && summaryItems.length > 0 && (
              <div className="col-4 ms-3">
                <div style={{ maxHeight: "17rem", overflowY: "auto" }}>
                  <DataTable
                    isLoading={false}
                    columns={[
                      { label: "Item", field: "item" },
                      { label: "Units", field: "units" },
                    ]}
                    rows={
                      summaryItems
                        ? summaryItems.map((item: SummaryItems) => {
                            // Convert to seconds
                            return {
                              item: item?.itemName ? item?.itemName : "-",
                              units: item?.units ? item?.units : 0,
                            };
                          })
                        : []
                    }
                  />
                </div>
              </div>
            )}
          </div>

          <h5 className="fw700 darkGrey">New Scanned Items</h5>
          <hr />
          <h6 className="my-2 fw-bold">Select Defaults</h6>
          <div className="d-flex align-items-center my-2">
            <MDBSelect
              className="me-2"
              label="Sale Order"
              data={
                saleOrdersData?.map((saleOrder) => {
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
                  setSelectedStockroom(
                    saleOrdersData?.find((so) => so.saleOrderId === data.value)
                      ?.stockroom?.stockRoomId ?? 0
                  );
                }
              }}
              search
              preventFirstSelection
            />
            <MDBSelect
              className="mx-2"
              label="Stockroom"
              data={
                stockroomsData?.map((stockroom) => {
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
            />
          </div>
          <EditableDataTable
            identifier="codeId"
            showAddButton={false}
            columns={columns ? columns : []}
            rows={codeItem ? codeItem : []}
            setRows={setCodeItem ? setCodeItem : () => {}}
            isLoading={false}
            defaultEditable={isEdit}
          />

          {rowData && rowData.length > 0 && (
            <div className="d-flex mt-4">
              <div className="col-12">
                <h5 className="mb-0 ms-1 fw700 darkGrey">Items</h5>
                <div style={{ maxHeight: "27rem", overflowY: "auto" }}>
                  <DataTable
                    isLoading={false}
                    columns={[
                      { label: "Id", field: "id" },
                      { label: "Item", field: "item" },
                      { label: "Date", field: "date" },
                      { label: "Unit Code", field: "code" },
                      { label: "From Sale Order", field: "fromsaleorder" },
                      { label: "To Sale Order", field: "tosaleorder" },
                      { label: "From Stock Room", field: "fromstockroom" },
                      { label: "To Stock Room", field: "tostockroom" },
                      { label: "Created On", field: "createdon" },
                    ]}
                    rows={
                      rowData
                        ? rowData.map((item: TransferredSaleOrderItems) => {
                            // Convert to seconds
                            return {
                              id: item?.saleOrderTransferLogId
                                ? item?.saleOrderTransferLogId
                                : 0,
                              item: item?.saleOrderItem?.item
                                ? item?.saleOrderItem?.item?.name
                                : "-",
                              date: getDateFromMillis(+item?.date),

                              code: item?.itemCode ? item?.itemCode : 0,
                              fromsaleorder: item?.orderFrom?.reference
                                ? item?.orderFrom?.reference
                                : "-",
                              tosaleorder: item?.orderTo?.reference
                                ? item?.orderTo?.reference
                                : "-",
                              fromstockroom: item?.roomFrom?.name
                                ? item?.roomFrom?.name
                                : "-",
                              tostockroom: item?.roomTo?.name
                                ? item?.roomTo?.name
                                : "-",
                              createdon: getDateFromMillis(+item?.creationDate),
                            };
                          })
                        : []
                    }
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
