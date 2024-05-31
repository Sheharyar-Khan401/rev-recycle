import PrimaryDataSideNav from "components/Finance/PrimaryDataSidenav";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import RoutingActionButton from "shared/Components/ActionButton/RoutingActionButton";
import { ActiveIcon, InactiveIcon } from "helper/icons";
import {
  useDeleteFiscalYearMutation,
  useLazyGetFiscalYearQuery,
} from "redux/features/finance/primarydata/fiscalyearApiSlice";
import { getDateFromMillis, hasPermission } from "helper/utility";
import DataTable from "shared/Components/DataTable";
import { globalVariables } from "helper/globalVariables";
import Filters from "shared/Components/Filters";
import { FiscalYearResponse } from "redux/types/Finance/PrimaryData/fiscalyear";

export default function FiscalGroups() {
  const navigate = useNavigate();
  const ref = useRef<HTMLInputElement | null>(null);
  const [deleteFiscalYear] = useDeleteFiscalYearMutation();
  const [getFiscalGroups, result] = useLazyGetFiscalYearQuery();
  const [queryParams, setQueryParams] = useState({
    pageNumber: 0,
    pageSize: globalVariables?.ItemsPerPageLimit,
  });
  const fiscalGroupList = result?.data?.payLoad;
  const handleDelete = (id: number) => {
    if (id) {
      deleteFiscalYear(id);
    }
  };

  useEffect(() => {
    hasPermission("fin_pd_103") && getFiscalGroups(queryParams);
  }, [queryParams, getFiscalGroups]);

  return (
    <>
      <div className="d-lg-flex">
        <PrimaryDataSideNav type={1} />
        <div className="table-container">
          <Filters
            componentRef={ref}
            printAble={
              (fiscalGroupList && fiscalGroupList?.length > 0) ?? false
            }
            exportAble={
              (fiscalGroupList && fiscalGroupList?.length > 0) ?? false
            }
            addRedirectPath={
              hasPermission("fin_pd_100")
                ? "/grader/finance/primarydata/fiscalgroups/add"
                : ""
            }
          />
          {hasPermission("fin_pd_103") && (
            <DataTable
              ref={ref}
              tableTitle="Fiscal Groups"
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
                { label: "Fiscal Year", field: "name" },
                { label: "Start Date", field: "startDate" },
                { label: "End Date", field: "endDate" },
                { label: "Status", field: "active" },
                { label: "action", field: "action" },
              ]}
              rows={
                fiscalGroupList && fiscalGroupList?.length > 0
                  ? fiscalGroupList?.map((item: FiscalYearResponse) => {
                      return {
                        name: item?.name ? item?.name : "-",
                        startDate: getDateFromMillis(item?.startDate),
                        endDate: getDateFromMillis(item?.endDate),
                        active: item?.active ? (
                          <ActiveIcon />
                        ) : (
                          <InactiveIcon />
                        ),
                        action: (
                          <RoutingActionButton
                            onNavigate={
                              hasPermission("fin_pd_101")
                                ? () =>
                                    navigate(
                                      "/grader/finance/primarydata/fiscalgroups/edit/" +
                                        item?.fiscalYearId
                                    )
                                : undefined
                            }
                            onDeleteClick={
                              hasPermission("fin_pd_102")
                                ? () => {
                                    handleDelete(item.fiscalYearId);
                                  }
                                : undefined
                            }
                          />
                        ),
                      };
                    })
                  : []
              }
            ></DataTable>
          )}
        </div>
      </div>
    </>
  );
}
