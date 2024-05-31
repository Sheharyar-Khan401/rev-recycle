import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import RoutingActionButton from "shared/Components/ActionButton/RoutingActionButton";
import { globalVariables } from "helper/globalVariables";
import DataTable from "shared/Components/DataTable";
import ProductionDataSideNav from "components/Production/ProductionDataSideNav";
import {
  useDeleteIssuanceMutation,
  useLazyGetIssuanceQuery,
} from "redux/features/productions/issuanceApiSlice";
import { IssuanceResponse } from "redux/types/Productions/issuance";
import Filters from "shared/Components/Filters";
import {
  getDateFromMillis,
  hasPermission,
  roundValue,
  convertWghtToLbs,
} from "helper/utility";
import { useGetStationsQuery } from "redux/features/Settings/Productions/stationsApiSlice";
interface Props {
  issuanceTypeId: number;
}
export default function Issuances({ issuanceTypeId }: Props) {
  const navigate = useNavigate();
  const ref = useRef<HTMLInputElement | null>(null);
  const [getProductionIssuance, result] = useLazyGetIssuanceQuery();
  const { data: stationsData } = useGetStationsQuery(null);
  const [deleteWiperIssuance] = useDeleteIssuanceMutation();
  const [queryParams, setQueryParams] = useState({
    pageNumber: 0,
    pageSize: globalVariables?.ItemsPerPageLimit,
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 2)
      .toISOString()
      .split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
  });
  const productionIssuanceData = result?.data?.payLoad;

  const handleDelete = (id: number) => {
    if (id) {
      deleteWiperIssuance(id);
    }
  };

  useEffect(() => {
    hasPermission("pro_issu_103") &&
      getProductionIssuance({ ...queryParams, issuanceTypeId });
  }, [queryParams, getProductionIssuance, issuanceTypeId]);

  return (
    <>
      <div className="d-lg-flex">
        <ProductionDataSideNav type={issuanceTypeId} />
        <div className="table-container">
          <Filters
            componentRef={ref}
            printAble={
              (productionIssuanceData && productionIssuanceData.length > 0) ??
              false
            }
            exportAble={
              (productionIssuanceData && productionIssuanceData.length > 0) ??
              false
            }
            addRedirectPath={hasPermission("pro_issu_100") ? "add" : ""}
            filters={[
              {
                label: "Station",
                name: "stationId",
                inputType: "select",
                options: stationsData
                  ? stationsData?.map((station) => {
                      return {
                        text: station?.name ? station?.name : "",
                        value: station?.stationId ? station?.stationId : 0,
                      };
                    })
                  : [],
              },
              {
                label: "Id",
                name: "productionIssuanceId",
                inputType: "text",
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
          {hasPermission("pro_issu_103") && (
            <DataTable
              tableTitle="Production Issuance"
              ref={ref}
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
                { label: "issuanceId", field: "issuanceId" },
                { label: "Date", field: "date" },
                { label: "Cotton", field: "carton" },
                { label: "Remarks", field: "remarks" },
                { label: "Total Units", field: "units" },
                { label: "Total Weight(KGS)", field: "kgs" },
                { label: "Total Weight(LBS)", field: "lbs" },
                { label: "action", field: "action" },
              ]}
              rows={
                productionIssuanceData
                  ? productionIssuanceData
                      .filter(
                        (issuance: IssuanceResponse) =>
                          issuance?.issuanceType?.issuanceTypeId ===
                          issuanceTypeId
                      )
                      .map((issuance: IssuanceResponse) => {
                        return {
                          issuanceId: issuance?.productionIssuanceId
                            ? issuance?.productionIssuanceId
                            : 0,
                          date: getDateFromMillis(issuance?.issuanceDate),
                          carton: issuance?.carton
                            ? issuance?.carton.cartonId
                            : 0,
                          remarks: issuance?.remarks ? issuance?.remarks : "-",
                          units: issuance?.units ? issuance?.units : "-",
                          kgs: issuance?.kgs ? roundValue(issuance?.kgs) : 0,
                          lbs: issuance?.kgs
                            ? roundValue(convertWghtToLbs(issuance?.kgs))
                            : 0,
                          action: (
                            <RoutingActionButton
                              onNavigate={
                                hasPermission("pro_issu_101")
                                  ? () =>
                                      navigate(
                                        `edit/` + issuance.productionIssuanceId
                                      )
                                  : undefined
                              }
                              onDeleteClick={
                                hasPermission("pro_issu_102")
                                  ? () => {
                                      handleDelete(
                                        issuance?.productionIssuanceId
                                      );
                                    }
                                  : undefined
                              }
                            />
                          ),
                        };
                      })
                  : []
              }
            />
          )}
        </div>
      </div>
    </>
  );
}
