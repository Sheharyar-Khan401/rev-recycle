import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  useDeleteSupplierMutation,
  useLazyGetSupplierQuery,
} from "redux/features/Clients/Suppliers/suppliersApiSlice";
import RoutingActionButton from "shared/Components/ActionButton/RoutingActionButton";
import { globalVariables } from "helper/globalVariables";
import DataTable from "shared/Components/DataTable";
import Filters from "shared/Components/Filters";
import { Client } from "redux/types/Clients/Clients/client";
import { hasPermission } from "helper/utility";
export default function SupplierListing() {
  const navigate = useNavigate();
  const ref = useRef<HTMLInputElement | null>(null);
  const [getSuppliers, result] = useLazyGetSupplierQuery();
  const [deleteSupplier] = useDeleteSupplierMutation();
  const [queryParams, setQueryParams] = useState({
    isSupplier: true,
    pageNumber: 0,
    pageSize: globalVariables?.ItemsPerPageLimit,
  });
  const suppliersList = result?.data?.payLoad;

  const handleDelete = (id: number) => {
    if (id) {
      deleteSupplier(id);
    }
  };

  useEffect(() => {
    hasPermission("cli_sp_103") && getSuppliers(queryParams);
  }, [queryParams, getSuppliers]);

  return (
    <div className="table-container">
      <Filters
        componentRef={ref}
        printAble={(suppliersList && suppliersList?.length > 0) ?? false}
        exportAble={(suppliersList && suppliersList?.length > 0) ?? false}
        addRedirectPath={
          hasPermission("cli_sp_100") ? "/grader/clients/suppliers/add" : ""
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
              isSupplier: true,
            });
          } else setQueryParams({ ...queryParams, ...query });
        }}
      />
      {hasPermission("cli_sp_103") && (
        <DataTable
          ref={ref}
          tableTitle="Suppliers"
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
            { label: "Payable account", field: "payableAccountId" },
            { label: "Git account", field: "gitAccountId" },
            { label: "Active", field: "active" },

            { label: "Action", field: "action" },
          ]}
          rows={
            suppliersList
              ? suppliersList?.map((item: Client) => {
                  return {
                    active: item?.active ? "Yes" : "No",
                    clientName: item?.user ? item?.user?.fullName : "-",
                    code: item?.code ? item?.code : "-",
                    currency: item?.businessCurrency?.currency
                      ? item?.businessCurrency?.currency?.name
                      : "-",
                    payableAccountId: item?.payableAccount
                      ? item?.payableAccount?.accountTitle
                      : "-",
                    gitAccountId: item?.gitAccount
                      ? item?.gitAccount?.accountTitle
                      : "-",

                    action: (
                      <RoutingActionButton
                        onNavigate={
                          hasPermission("cli_sp_101")
                            ? () =>
                                navigate(
                                  "/grader/clients/suppliers/edit/" +
                                    item?.clientId
                                )
                            : undefined
                        }
                        onDeleteClick={
                          hasPermission("cli_sp_102")
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
