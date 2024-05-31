import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  useDeleteClientMutation,
  useLazyGetClientQuery,
} from "redux/features/Clients/Clients/clientsApiSlice";
import { Client } from "redux/types/Clients/Clients/client";
import RoutingActionButton from "shared/Components/ActionButton/RoutingActionButton";
import { globalVariables } from "helper/globalVariables";
import DataTable from "shared/Components/DataTable";
import Filters from "shared/Components/Filters";
import { hasPermission } from "helper/utility";

export default function ClientListing() {
  const navigate = useNavigate();
  const ref = useRef<HTMLInputElement | null>(null);
  const [getClients, result] = useLazyGetClientQuery();
  const [deleteClient] = useDeleteClientMutation();
  const [queryParams, setQueryParams] = useState({
    pageNumber: 0,
    pageSize: globalVariables?.ItemsPerPageLimit,
    isClient: true,
  });

  const clientsList = result?.data?.payLoad;

  const handleDelete = (id: number) => {
    if (id) {
      deleteClient(id);
    }
  };

  useEffect(() => {
    hasPermission("cli_cl_103") && getClients(queryParams);
  }, [queryParams, getClients]);

  return (
    <div className="table-container">
      <Filters
        componentRef={ref}
        exportAble={(clientsList && clientsList.length > 0) ?? false}
        printAble={(clientsList && clientsList.length > 0) ?? false}
        addRedirectPath={
          hasPermission("cli_cl_100") ? "/grader/clients/clients/add" : ""
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
              isClient: true,
            });
          } else setQueryParams({ ...queryParams, ...query });
        }}
      />
      {hasPermission("cli_cl_103") && (
        <DataTable
          ref={ref}
          tableTitle="Clients"
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
            { label: "Name", field: "clientName" },
            { label: "Code", field: "code" },
            { label: "Currency", field: "currency" },
            { label: "Bank Account (Setup)", field: "bankaccount" },
            { label: "Sales account", field: "salesAccountId" },
            { label: "Payable account", field: "payableAccountId" },
            { label: "Active", field: "active" },
            { label: "Action", field: "action" },
          ]}
          rows={
            clientsList
              ? clientsList?.map((item: Client) => {
                  return {
                    active: item?.active ? "Yes" : "No",
                    clientName: item?.user ? item?.user?.fullName : "-",
                    code: item?.code ? item?.code : "-",
                    currency: item?.businessCurrency?.currency
                      ? item?.businessCurrency?.currency?.name
                      : "-",
                    bankaccount: item?.bankAccount
                      ? item?.bankAccount?.bankAccountTitle
                      : "-",
                    salesAccountId: item?.salesAccount
                      ? item?.salesAccount?.accountTitle
                      : "-",
                    payableAccountId: item?.payableAccount
                      ? item?.payableAccount?.accountTitle
                      : "-",

                    action: (
                      <RoutingActionButton
                        onNavigate={
                          hasPermission("cli_cl_101")
                            ? () =>
                                navigate(
                                  "/grader/clients/clients/edit/" +
                                    item?.clientId
                                )
                            : undefined
                        }
                        onDeleteClick={
                          hasPermission("cli_cl_102")
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
