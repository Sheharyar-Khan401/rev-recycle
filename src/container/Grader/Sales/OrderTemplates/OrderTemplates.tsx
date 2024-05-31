import { useNavigate } from "react-router-dom";
import RoutingActionButton from "shared/Components/ActionButton/RoutingActionButton";
import { useEffect, useRef, useState } from "react";
import { itemTableDataResponse } from "redux/types/Sales/ordertemplate";
import {
  useDeleteOrderTemplateMutation,
  useLazyGetordertemplateQuery,
} from "redux/features/sales/ordertemplateApiSlice";
import { globalVariables } from "helper/globalVariables";
import DataTable from "shared/Components/DataTable";
import Filters from "shared/Components/Filters";
import { hasPermission } from "helper/utility";
import { useGetAllClientsQuery } from "redux/features/Clients/Clients/clientsApiSlice";
import { useGetAllBrandsQuery } from "redux/features/Settings/Productions/brandApiSlice";
export default function OrderTemplateTable() {
  const navigate = useNavigate();
  const ref = useRef<HTMLInputElement | null>(null);
  const [getOrderTemplates, result] = useLazyGetordertemplateQuery();
  const [deleteTemplate] = useDeleteOrderTemplateMutation();
  const { data: clientsData } = useGetAllClientsQuery(null);
  const { data: brandsData } = useGetAllBrandsQuery(null);
  const [queryParams, setQueryParams] = useState({
    pageNumber: 0,
    pageSize: globalVariables?.ItemsPerPageLimit,
  });
  const orderTemplatesList = result?.data?.payLoad;

  useEffect(() => {
    hasPermission("sal_ot_103") && getOrderTemplates(queryParams);
  }, [queryParams, getOrderTemplates]);

  const handleDelete = (id: number) => {
    if (id) {
      deleteTemplate(id);
    }
  };
  return (
    <div className="table-container">
      <Filters
        componentRef={ref}
        addRedirectPath={
          hasPermission("sal_ot_100") ? "/grader/sales/ordertemplates/add" : ""
        }
        exportAble={
          (orderTemplatesList && orderTemplatesList?.length > 0) ?? false
        }
        printAble={
          (orderTemplatesList && orderTemplatesList?.length > 0) ?? false
        }
        filters={[
          {
            label: "Client",
            name: "clientIds",
            inputType: "multiselect",
            options: clientsData
              ? clientsData?.map((client) => {
                  return {
                    text: client?.user?.fullName ? client?.user?.fullName : "",
                    value: client?.clientId ? client?.clientId : 0,
                  };
                })
              : [],
          },
          {
            label: "Brand",
            name: "brandIds",
            inputType: "multiselect",
            options: brandsData
              ? brandsData?.map((brand) => {
                  return {
                    text: brand?.name ? brand?.name : "",
                    value: brand?.brandId ? brand?.brandId : 0,
                  };
                })
              : [],
          },

          {
            label: "Searh",
            name: "name",
            inputType: "text",
          },
        ]}
        onSubmit={(query) => {
          if (Object.keys(query).length === 0) {
            setQueryParams({
              pageNumber: queryParams.pageNumber,
              pageSize: queryParams.pageSize,
            });
          } else setQueryParams({ ...queryParams, ...query });
        }}
      />
      {hasPermission("sal_ot_103") && (
        <DataTable
          ref={ref}
          tableTitle="Sales Order Templates"
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
            { label: "Sr.No", field: "saleOrderTemplateId" },
            { label: "Name", field: "saleOrderName" },
            { label: "Brand", field: "name" },
            { label: "Client", field: "clientName" },
            { label: "Actions", field: "action" },
          ]}
          rows={
            orderTemplatesList && orderTemplatesList?.length > 0
              ? orderTemplatesList?.map((item: itemTableDataResponse) => {
                  return {
                    saleOrderTemplateId: item?.saleOrderTemplateId
                      ? item?.saleOrderTemplateId
                      : 0,
                    saleOrderName: item?.name ? item?.name : "-",
                    name: item?.brand ? item.brand?.name : "-",
                    clientName: item?.client
                      ? item?.client?.user?.fullName
                      : "-",

                    action: (
                      <RoutingActionButton
                        onNavigate={
                          hasPermission("sal_ot_101")
                            ? () =>
                                navigate(
                                  "/grader/sales/ordertemplates/edit/" +
                                    item?.saleOrderTemplateId
                                )
                            : undefined
                        }
                        onDeleteClick={
                          hasPermission("sal_ot_102")
                            ? () => {
                                handleDelete(item?.saleOrderTemplateId);
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
