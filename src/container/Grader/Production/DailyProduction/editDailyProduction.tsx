import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ActionBarAddEdit from "shared/Components/ActionBarAddEdit/ActionBarAddEdit";
import { useNavigate, useParams } from "react-router-dom";
import DataTable from "shared/Components/DataTable";
import DailyProductionForm from "components/Production/dailyProductionForm";
import {
  CodesAgainstItmesData,
  ScanItems,
  ScannedItemsData,
  ScannedItemsDataTable,
  dailyProductionRequest,
} from "redux/types/Productions/dailyProduction";
import { dailyProductionEditResolver } from "validators/graderValidator/Productions/dailyProductionResolver";
import {
  useDeleteCodeOnProductionItemIdMutation,
  useEditDailyProductionMutation,
  useLazyGetDailyProductionByIdQuery,
  useProductionDepartmentQuery,
} from "redux/features/productions/dailyProductionApiSlice";
import { useGetAllSaleOrdersQuery } from "redux/features/sales/Orders/saleOrdersApiSlice";
import { useGetStockRoomsQuery } from "redux/features/Settings/Productions/stockroomsApiSlice";
import { column } from "shared/Components/EditableDatatable/EditableDatatable";
import { useGetAllUsersQuery } from "redux/features/Settings/UserManagement/userApiSlice";
import SummaryTables from "components/Production/SummaryTables";
import { useGetFloorsQuery } from "redux/features/Settings/Productions/floorApiSlice";
import {
  getDateFromMillis,
  roundValue,
  calculateWeights,
} from "helper/utility";
import RoutingActionButton from "shared/Components/ActionButton/RoutingActionButton";
import CustomButton from "shared/Components/CustomButton";
import { COLORS } from "helper/globalVariables";
const defaultValues: dailyProductionRequest = {
  stationId: 0,
  date: "",
};
export default function EditDailyProduction() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<dailyProductionRequest, null>({
    defaultValues,
    resolver: dailyProductionEditResolver,
  });
  const params = useParams();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [getDailyProductuonById, result] = useLazyGetDailyProductionByIdQuery();
  const { data: saleOrderList } = useGetAllSaleOrdersQuery(null);
  const { data: stockRoomList } = useGetStockRoomsQuery(null);
  const { data: productionDepartmentList } = useProductionDepartmentQuery(null);
  const { data: usersList } = useGetAllUsersQuery(null);
  const { data: floorsList } = useGetFloorsQuery(null);
  const [rowData, setRowData] = useState<ScannedItemsData[]>([]);
  const [dataTableData, setDataTableData] = useState<ScannedItemsData[]>([]);
  const [codesData, setCodesData] = useState<CodesAgainstItmesData[]>([]);
  const [selectedId, setSelectedId] = useState<number>(0);
  const [displayRowData, setDisplayRowData] = useState<ScannedItemsData[]>([]);
  const [editDailyProduction, { isLoading: editDailyProductionLoading }] =
    useEditDailyProductionMutation();
  const [deleteCodee, { isLoading: deleteCodeLoading }] =
    useDeleteCodeOnProductionItemIdMutation();
  useEffect(() => {
    if (params.id) getDailyProductuonById(+params.id);
  }, [params.id, getDailyProductuonById]);
  useEffect(() => {
    if (selectedId && !result.isFetching) {
      getSelectedItem(selectedId);
    }
  }, [selectedId, result.isFetching]);

  useEffect(() => {
    if (result.data) {
      setValue(
        "date",
        result?.data?.date ? getDateFromMillis(result?.data?.date) : "-"
      );
      setValue("stationId", result?.data?.station?.stationId);
      const resultItems = result?.data?.items;
      const itemMap = new Map(); // Map to store items based on itemId
      if (resultItems) {
        resultItems.forEach((item) => {
          const itemId = item?.codes?.item?.itemId;
          if (!itemId) return;
          if (!itemMap.has(itemId)) {
            itemMap.set(itemId, {
              saleOrder: item?.saleOrder?.reference ?? "",
              stockRoom: item?.stockRoom?.name ? item?.stockRoom?.name : "-",
              worker: item?.worker ? item?.worker?.fullName : "-",
              productionDepartment: item?.productionDepartment?.name ?? "",
              code: item?.codes?.code ?? 0,
              codeId: item?.codes?.codeId ?? 0,
              itemId: itemId,
              uom: item?.codes?.item?.uom?.name ?? "",
              name: item?.codes?.item?.name ?? "",
              units: item?.units ?? 0,
              weightKg:
                item.codes?.weightUnit?.weightUnitId && item.codes?.unitWeight
                  ? calculateWeights(
                      item.codes.unitWeight,
                      item?.codes?.weightUnit?.weightUnitId
                    )[0]
                  : 0,
              weightLb:
                item.codes?.weightUnit?.weightUnitId && item.codes?.unitWeight
                  ? calculateWeights(
                      item.codes.unitWeight,
                      item?.codes?.weightUnit?.weightUnitId
                    )[1]
                  : 0,
              saleOrderId: item?.saleOrder?.saleOrderId ?? 0,
              stockRoomId: item?.stockRoom?.stockRoomId ?? 0,
              workerId: item?.worker?.userId ?? 0 ?? 0,
              floorId: item?.floor?.floorId ?? 0,
              productionDepartmentId:
                item?.productionDepartment?.productionDepartmentId ?? 0,
            });
          } else {
            let prevItem = itemMap.get(itemId);
            prevItem = {
              ...prevItem,
              weightKg:
                (item.codes?.weightUnit?.weightUnitId && item.codes?.unitWeight
                  ? calculateWeights(
                      item.codes.unitWeight,
                      item?.codes?.weightUnit?.weightUnitId
                    )[0]
                  : 0) + prevItem.weightKg,
              weightLb:
                (item.codes?.weightUnit?.weightUnitId && item.codes?.unitWeight
                  ? calculateWeights(
                      item.codes.unitWeight,
                      item?.codes?.weightUnit?.weightUnitId
                    )[1]
                  : 0) + prevItem.weightLb,
            };
            itemMap.set(itemId, prevItem);
          }
        });
      }
      const allScannedItems = Array.from(itemMap.values());
      setDataTableData(allScannedItems);
    }
  }, [result.data, setValue]);

  useEffect(() => {
    if (displayRowData.length === 0) {
      setRowData([]);
    }
  }, [displayRowData]);
  const columns: column<"codeId", ScannedItemsData>[] = [
    {
      label: "Id",
      field: "codeId",
      inputType: "number",
      sort: false,
      disabled: true,
    },
    {
      label: "Item",
      field: "name",
      inputType: "text",
      sort: false,
      disabled: true,
    },
    {
      label: "Units",
      field: "units",
      inputType: "number",
      sort: false,
      disabled: true,
    },
    {
      label: "Weight(Kgs)",
      field: "weightKg",
      inputType: "number",
      sort: false,
      disabled: true,
    },
    {
      label: "Weight(Lbs)",
      field: "weightLb",
      inputType: "number",
      sort: false,
      disabled: true,
    },
    {
      label: "UOM",
      field: "uom",
      inputType: "text",
      sort: false,
      disabled: true,
    },
    {
      label: "Stock Room",
      field: "stockRoomId",
      inputType: "select",
      options: stockRoomList?.length
        ? stockRoomList?.map((item) => {
            return {
              text: item?.name,
              value: item?.stockRoomId,
            };
          })
        : [],
    },

    {
      label: "Worker",
      field: "workerId",
      inputType: "select",
      options: usersList?.length
        ? usersList?.map((item) => {
            return {
              text: item?.fullName ? item?.fullName : "-",
              value: item?.userId ? item?.userId : 0,
            };
          })
        : [],
    },
    {
      label: "Sale Order",
      field: "saleOrderId",
      inputType: "select",
      options: saleOrderList?.payLoad?.length
        ? saleOrderList?.payLoad?.map((item) => {
            return {
              text: item?.reference ? item?.reference : "",
              value: item?.saleOrderId ? item?.saleOrderId : 0,
            };
          })
        : [],
    },
    {
      label: "Production Department",
      field: "productionDepartmentId",
      inputType: "select",
      options: productionDepartmentList?.length
        ? productionDepartmentList?.map((item) => {
            return {
              text: item?.name ? item?.name : "",
              value: item?.productionDepartmentId
                ? item?.productionDepartmentId
                : 0,
            };
          })
        : [],
    },
    {
      label: "Floor",
      field: "floorId",
      inputType: "select",
      options: floorsList?.length
        ? floorsList?.map((floor) => {
            return {
              text: floor?.name ? floor?.name : "",
              value: floor?.floorId ? floor?.floorId : 0,
            };
          })
        : [],
    },
  ];

  const getSelectedItem = (id: number | string) => {
    const filteredItems: ScanItems[] = result.data?.items?.filter(
      (res) => res.codes?.item?.itemId == id
    )!;

    if (filteredItems) {
      const mappedItems = filteredItems?.map((item) => {
        return {
          codeId: item?.codes?.code ?? 0,
          stockRoomName: item?.stockRoom?.name ? item?.stockRoom?.name : "-",
          weightKgs:
            item.codes?.weightUnit?.weightUnitId && item.codes?.unitWeight
              ? calculateWeights(
                  item.codes.unitWeight,
                  item?.codes?.weightUnit?.weightUnitId
                )[0]
              : 0,
          weightLbs:
            item.codes?.weightUnit?.weightUnitId && item.codes?.unitWeight
              ? calculateWeights(
                  item.codes.unitWeight,
                  item?.codes?.weightUnit?.weightUnitId
                )[1]
              : 0,
          saleOrderName: item?.saleOrder?.reference
            ? item?.saleOrder?.reference
            : "-",
          workerName: item?.worker?.fullName ? item?.worker?.fullName : "-",
          floorName: item?.codes?.floor?.name ?? "-",
          dailyProductionItemId: item?.dailyProductionItemId,
        };
      });
      setCodesData(mappedItems);
    }
  };

  const onSubmit = async (values: dailyProductionRequest) => {
    const updatedRowData = rowData
      .map((rowItem) => {
        const matchingDisplayItem = displayRowData.find(
          (displayItem) =>
            displayItem?.itemId === rowItem?.itemId &&
            displayItem.stockRoomId === rowItem.stockRoomId
        );

        if (matchingDisplayItem) {
          return {
            ...rowItem,
            saleOrderId: matchingDisplayItem.saleOrderId,
            productionDepartmentId: matchingDisplayItem.productionDepartmentId,
            workerId: matchingDisplayItem.workerId,
            floorId: matchingDisplayItem?.floorId,
            stockRoomId: matchingDisplayItem.stockRoomId,
          };
        }
      })
      .filter((item) => item !== undefined);

    const editDailyProductionData = {
      dailyProductionId: params?.id ? +params?.id : 0,
      stationId: values?.stationId,
      rowData: updatedRowData,
    };
    const res = await editDailyProduction(editDailyProductionData);
    if ("data" in res && res.data.status === "SUCCESS") {
      navigate(-1);
    }
  };

  const handleDelete = (id: number) => {
    if (id) {
      deleteCodee(id);
    }
  };
  return (
    <>
      <div style={{ marginTop: "mt-3" }}>
        <ActionBarAddEdit
          title="Daily Productions"
          mode={"EDIT"}
          isLoading={editDailyProductionLoading}
          onSubmit={handleSubmit(onSubmit)}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
        />

        <DailyProductionForm
          mode={"Edit"}
          columns={columns}
          rowData={rowData}
          setRowData={setRowData}
          isEdit={isEdit}
          control={control}
          errors={errors}
          displayRowData={displayRowData}
          setDisplayRowData={setDisplayRowData}
          units={result?.data?.units}
          weight={result?.data?.weight}
          setValue={setValue}
          stockRoomList={stockRoomList}
          usersList={usersList}
          saleOrderList={saleOrderList?.payLoad}
          productionDepartmentList={productionDepartmentList}
          productionId={params.id ? +params.id : -1}
        />
        {result?.data?.items && result.data.items.length > 0 && (
          <div className="mt-4">
            <h5 className="fw700 darkGrey">Existing Items</h5>
            <hr />

            <div style={{ maxHeight: "25rem", overflowY: "auto" }}>
              <DataTable
                isLoading={result.isFetching}
                columns={[
                  { label: "Id", field: "codeId" },
                  { label: "Item", field: "item" },
                  { label: "UOM", field: "uom" },
                  { label: "Units", field: "units" },
                  { label: "Weigh(KGS)", field: "kgs" },
                  { label: "Weight(LBS)", field: "lbs" },
                  { label: "Action", field: "action" },
                ]}
                rowStyles={{
                  styles: { backgroundColor: COLORS[4], padding: "0 -20px" },
                  indexes: [
                    dataTableData.findIndex((i) => i.itemId == selectedId),
                  ],
                }}
                rows={
                  dataTableData
                    ? dataTableData.map((item: ScannedItemsDataTable) => {
                        // Convert to seconds
                        return {
                          codeId: item?.codeId ? item?.codeId : 0,
                          item: item?.name ? item?.name : "-",
                          units: item?.units ? item?.units : 0,
                          kgs: item?.weightKg ? roundValue(item?.weightKg) : 0,
                          lbs: item?.weightKg ? roundValue(item?.weightLb) : 0,
                          uom: item?.uom ? item?.uom : "-",
                          action: (
                            <CustomButton
                              type="solid"
                              size="sm"
                              disabled={
                                item?.units <= 0 || item?.itemId === selectedId
                              }
                              onClick={() => {
                                if (item?.itemId && params.id) {
                                  setSelectedId(item.itemId);
                                  getSelectedItem(item?.itemId);
                                }
                              }}
                              title={
                                item?.itemId === selectedId
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
            </div>
          </div>
        )}
        {codesData && codesData.length ? (
          <div className="mt-4">
            <h6 className="fw700 darkGrey">Codes Details</h6>
            <div style={{ maxHeight: "25rem", overflowY: "auto" }}>
              <DataTable
                isLoading={deleteCodeLoading}
                columns={[
                  {
                    label: "Id",
                    field: "codeId",
                  },
                  {
                    label: "Stock Room",
                    field: "stockRoomName",
                  },

                  {
                    label: "Weight(Kgs)",
                    field: "weightKgs",
                  },
                  {
                    label: "Weight(Lbs)",
                    field: "weightLbs",
                  },
                  {
                    label: "Sale Order",
                    field: "saleOrderName",
                  },
                  {
                    label: "Floor",
                    field: "floorName",
                  },

                  {
                    label: "Worker",
                    field: "workerName",
                  },

                  { label: "Action", field: "action" },
                ]}
                rows={
                  codesData
                    ? codesData.map((item: CodesAgainstItmesData) => {
                        // Convert to seconds
                        return {
                          codeId: item?.codeId ? item?.codeId : 0,
                          weightKgs: item?.weightKgs ? item?.weightKgs : 0,
                          weightLbs: item?.weightLbs
                            ? roundValue(item?.weightLbs)
                            : 0,
                          stockRoomName: item?.stockRoomName
                            ? item?.stockRoomName
                            : "-",
                          floorName: item?.floorName ? item?.floorName : "-",
                          workerName: item?.workerName ? item?.workerName : "-",
                          saleOrderName: item?.saleOrderName
                            ? item?.saleOrderName
                            : "-",

                          action: (
                            <RoutingActionButton
                              onDeleteClick={() => {
                                handleDelete(item?.dailyProductionItemId);
                              }}
                            />
                          ),
                        };
                      })
                    : []
                }
              />
            </div>
          </div>
        ) : null}
        {result.data && <SummaryTables summaryTable={result.data} />}
      </div>
    </>
  );
}
