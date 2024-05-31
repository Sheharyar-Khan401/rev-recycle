import PrimaryDataSideNav from "components/Finance/PrimaryDataSidenav";
import { useNavigate } from "react-router-dom";
import RoutingActionButton from "shared/Components/ActionButton/RoutingActionButton";
import { useEffect, useRef, useState } from "react";
import {
  useDeleteCostGroupMutation,
  useLazyGetCostGroupQuery,
} from "redux/features/finance/primarydata/costgroupApiSlice";
import { CostGroup } from "redux/types/Finance/PrimaryData/costgroup";
import { globalVariables } from "helper/globalVariables";
import DataTable from "shared/Components/DataTable";
import Filters from "shared/Components/Filters";
import { hasPermission } from "helper/utility";
export default function CostGroups() {
  const navigate = useNavigate();
  const ref = useRef<HTMLInputElement | null>(null);

  const [getCostGroups, result] = useLazyGetCostGroupQuery();
  const [deleteCostGroup] = useDeleteCostGroupMutation();
  const [queryParams, setQueryParams] = useState({
    pageNumber: 0,
    pageSize: globalVariables?.ItemsPerPageLimit,
  });
  const costGroupList = result?.data?.payLoad;

  useEffect(() => {
    hasPermission("fin_pd_103") && getCostGroups(queryParams);
  }, [queryParams, getCostGroups]);

  const handleDelete = (id: number) => {
    if (id) {
      deleteCostGroup(id);
    }
  };
  return (
    <>
      <div className="d-lg-flex">
        <PrimaryDataSideNav type={2} />
        <div className="table-container">
          <Filters
            printAble={(costGroupList && costGroupList.length > 0) ?? false}
            exportAble={(costGroupList && costGroupList.length > 0) ?? false}
            componentRef={ref}
            addRedirectPath={
              hasPermission("fin_pd_100")
                ? "/grader/finance/primarydata/costgroups/add"
                : ""
            }
          />
          {hasPermission("fin_pd_103") && (
            <DataTable
              ref={ref}
              tableTitle="Cost Group"
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
                { label: "Cost Group Code", field: "costGroupCode" },
                { label: "Cost Group Name", field: "name" },
                { label: "Cost Group Type", field: "costgrouptype" },
                { label: "Parent", field: "parentCostgroupId" },
                { label: "Action", field: "action" },
              ]}
              rows={
                costGroupList
                  ? costGroupList?.map((item: CostGroup) => {
                      return {
                        costGroupCode: item?.costGroupId
                          ? item?.costGroupId
                          : 0,
                        name: item?.name ? item?.name : "-",
                        costgrouptype: item?.costgrouptype
                          ? item?.costgrouptype?.name
                          : "-",
                        parentCostgroupId: item?.costgroup
                          ? item?.costgroup?.name
                          : "-",

                        action: (
                          <RoutingActionButton
                            onNavigate={
                              hasPermission("fin_pd_101")
                                ? () =>
                                    navigate(
                                      "/grader/finance/primarydata/costgroups/edit/" +
                                        item?.costGroupId
                                    )
                                : undefined
                            }
                            onDeleteClick={
                              hasPermission("fin_pd_102")
                                ? () => {
                                    handleDelete(item?.costGroupId);
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
