import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  useDeleteAgentMutation,
  useLazyGetAgentQuery,
} from "redux/features/Clients/Agents/agentsApiSlice";
import RoutingActionButton from "shared/Components/ActionButton/RoutingActionButton";
import { globalVariables } from "helper/globalVariables";
import DataTable from "shared/Components/DataTable";
import Filters from "shared/Components/Filters";
import { Client } from "redux/types/Clients/Clients/client";
import { hasPermission } from "helper/utility";

export default function AgentsListing() {
  const navigate = useNavigate();
  const ref = useRef<HTMLInputElement | null>(null);
  const [getAgents, result] = useLazyGetAgentQuery();
  const [deleteAgent] = useDeleteAgentMutation();
  const [queryParams, setQueryParams] = useState({
    isAgent: true,
    pageNumber: 0,
    pageSize: globalVariables?.ItemsPerPageLimit,
  });
  const agentsList = result?.data?.payLoad;

  const handleDelete = (id: number) => {
    if (id) {
      deleteAgent(id);
    }
  };

  useEffect(() => {
    hasPermission("cli_ag_103") && getAgents(queryParams);
  }, [queryParams, getAgents]);

  return (
    <div className="table-container">
      <Filters
        printAble={(agentsList && agentsList.length > 0) ?? false}
        exportAble={(agentsList && agentsList.length > 0) ?? false}
        componentRef={ref}
        addRedirectPath={
          hasPermission("cli_ag_100") ? "/grader/clients/agents/add" : ""
        }
        filters={[
          {
            label: "Name",
            name: "name",
            inputType: "text",
          },

          {
            label: "Active",
            name: "isActive",
            inputType: "boolean",
          },
        ]}
        onSubmit={(query) => {
          if (Object.keys(query).length === 0) {
            setQueryParams({
              pageNumber: queryParams.pageNumber,
              pageSize: queryParams.pageSize,
              isAgent: true,
            });
          } else setQueryParams({ ...queryParams, ...query });
        }}
      />
      {hasPermission("cli_ag_103") && (
        <DataTable
          ref={ref}
          isLoading={result?.isFetching}
          totalItems={
            result?.data?.numberOfItems ? result?.data?.numberOfItems : 0
          }
          tableTitle="Agents"
          setOffset={(offset, limit) => {
            setQueryParams({
              ...queryParams,
              pageNumber: offset,
              pageSize: limit ? limit : globalVariables.ItemsPerPageLimit,
            });
          }}
          columns={[
            { label: "Name", field: "clientName" },
            { label: "Code", field: "code" },
            { label: "Currency", field: "currency" },
            { label: "Payable account", field: "payacc" },
            { label: "Active", field: "active" },

            { label: "Action", field: "action" },
          ]}
          rows={
            agentsList
              ? agentsList?.map((item: Client) => {
                  return {
                    active: item?.active ? "Yes" : "No",
                    clientName: item?.user ? item?.user?.fullName : "-",
                    code: item?.code ? item?.code : "-",
                    currency: item?.businessCurrency?.currency
                      ? item?.businessCurrency?.currency?.name
                      : "-",
                    email: item?.email ? item?.email : "-",
                    payacc: item?.payableAccount
                      ? item?.payableAccount?.accountTitle
                      : "-",
                    action: (
                      <RoutingActionButton
                        onNavigate={
                          hasPermission("cli_ag_101")
                            ? () =>
                                navigate(
                                  "/grader/clients/agents/edit/" +
                                    item?.clientId
                                )
                            : undefined
                        }
                        onDeleteClick={
                          hasPermission("cli_ag_102")
                            ? () => {
                                handleDelete(item?.clientId);
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
  );
}
