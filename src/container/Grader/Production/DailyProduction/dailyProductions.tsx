import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import RoutingActionButton from "shared/Components/ActionButton/RoutingActionButton";
import DataTable from "shared/Components/DataTable";
import {
  useDeleteDailyProductionMutation,
  useLazyGetDailyProductionQuery,
} from "redux/features/productions/dailyProductionApiSlice";
import { globalVariables } from "helper/globalVariables";
import { dailyProductionResponse } from "redux/types/Productions/dailyProduction";
import Filters from "shared/Components/Filters";
import { useGetFloorsQuery } from "redux/features/Settings/Productions/floorApiSlice";
import { Floors } from "redux/types/common/floor";
import { useGetAllStationsQuery } from "redux/features/Settings/Productions/stationsApiSlice";
import { StationsData } from "redux/types/Settings/Productions/station";
import {
  getDateFromMillis,
  hasPermission,
  roundValue,
  convertWghtToLbs,
} from "helper/utility";

export default function DailyProduction() {
  const navigate = useNavigate();
  const ref = useRef<HTMLInputElement | null>(null);

  const [getDailyProduction, result] = useLazyGetDailyProductionQuery();
  const [deleteDailyProduction] = useDeleteDailyProductionMutation();
  const { data: FloorsData } = useGetFloorsQuery(null);
  const { data: stationsData } = useGetAllStationsQuery(null);
  const [queryParams, setQueryParams] = useState({
    pageNumber: 0,
    pageSize: globalVariables?.ItemsPerPageLimit,
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 2)
      .toISOString()
      .split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
  });
  const dailyProductionData = result?.data?.payLoad;
  const handleDelete = (id: number) => {
    if (id) {
      deleteDailyProduction(id);
    }
  };

  useEffect(() => {
    hasPermission("pro_dp_103") && getDailyProduction(queryParams);
  }, [queryParams, getDailyProduction]);

  return (
    <div className="table-container">
      <Filters
        componentRef={ref}
        printAble={
          (dailyProductionData && dailyProductionData.length > 0) ?? false
        }
        exportAble={
          (dailyProductionData && dailyProductionData.length > 0) ?? false
        }
        addRedirectPath={
          hasPermission("pro_dp_100")
            ? "/grader/production/productions/add"
            : ""
        }
        filters={[
          {
            label: "Daily Prod. Id",
            name: "dailyProductionId",
            inputType: "text",
          },
          {
            label: "Floor",
            name: "floorIds",
            inputType: "multiselect",
            options: FloorsData
              ? FloorsData?.map((item: Floors) => {
                  return {
                    text: item?.name ? item?.name : "",
                    value: item?.floorId ? item?.floorId : 0,
                  };
                })
              : [],
          },
          {
            label: "Station",
            name: "stationId",
            inputType: "select",
            options: stationsData
              ? stationsData?.map((item: StationsData) => {
                  return {
                    text: item?.name ? item?.name : "",
                    value: item?.stationId ? item?.stationId : 0,
                  };
                })
              : [],
          },
        ]}
        Dates={{
          fromDate: queryParams.startDate,
          toDate: queryParams.endDate,
        }}
        onDateChange={(startDate, endDate) => {
          setQueryParams({
            ...queryParams,
            startDate: startDate,
            endDate: endDate,
          });
        }}
        onSubmit={(query) => {
          if (Object.keys(query).length === 0) {
            setQueryParams({
              pageNumber: queryParams.pageNumber,
              pageSize: queryParams.pageSize,
              startDate: queryParams.startDate,
              endDate: queryParams.endDate,
            });
          } else setQueryParams({ ...queryParams, ...query });
        }}
      />
      {hasPermission("pro_dp_103") && (
        <DataTable
          ref={ref}
          tableTitle="Daily Production"
          isLoading={result?.isFetching}
          totalItems={
            result?.data?.numberOfItems ? result?.data?.numberOfItems : 0
          }
          setOffset={(offset, limit) => {
            setQueryParams({
              ...queryParams,
              pageNumber: offset,
              pageSize: limit ? limit : globalVariables.ItemsPerPageLimit,
            });
          }}
          columns={[
            { label: "Id", field: "id" },
            { label: "Date", field: "date" },
            { label: "Carton", field: "carton" },
            { label: "Station", field: "station" },
            { label: "Floor", field: "floor" },
            { label: "Units", field: "units" },
            { label: "(KGS)", field: "kgs" },
            { label: "(LBS)", field: "lbs" },
            { label: "action", field: "action" },
          ]}
          rows={
            dailyProductionData
              ? dailyProductionData?.map(
                  (dailyProduction: dailyProductionResponse) => {
                    return {
                      id: dailyProduction?.dailyProductionId
                        ? dailyProduction?.dailyProductionId
                        : 0,
                      date: getDateFromMillis(dailyProduction?.date),
                      carton: dailyProduction?.carton
                        ? dailyProduction?.carton?.name
                        : "-",
                      station: dailyProduction?.station
                        ? dailyProduction?.station?.name
                        : "-",
                      floor: dailyProduction?.floor
                        ? dailyProduction?.floor?.name
                        : "-",
                      units: dailyProduction?.units
                        ? dailyProduction?.units
                        : 0,
                      kgs: dailyProduction?.weight
                        ? roundValue(dailyProduction?.weight)
                        : 0,
                      lbs: dailyProduction?.weight
                        ? roundValue(convertWghtToLbs(dailyProduction?.weight))
                        : 0,
                      action: (
                        <RoutingActionButton
                          onNavigate={
                            hasPermission("pro_dp_101")
                              ? () =>
                                  navigate(
                                    "/grader/production/productions/edit/" +
                                      dailyProduction.dailyProductionId
                                  )
                              : undefined
                          }
                          onDeleteClick={
                            hasPermission("pro_dp_102")
                              ? () => {
                                  handleDelete(
                                    dailyProduction?.dailyProductionId
                                  );
                                }
                              : undefined
                          }
                        />
                      ),
                    };
                  }
                )
              : []
          }
        />
      )}
    </div>
  );
}
