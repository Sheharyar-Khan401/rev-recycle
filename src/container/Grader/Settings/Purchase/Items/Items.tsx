import { useEffect, useRef, useState } from "react";
import { MDBInput, MDBSelect } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";

import SetupSideNav from "components/Settings/Purchase/PurchaseSidenav";
import { useGetCategoryQuery } from "redux/features/Settings/purchase/categoryApiSlice";
import { CategoryRequest } from "redux/types/Settings/Purchase/categories";
import {
  useDeleteItemMutation,
  useLazyFindAllItemsQuery,
} from "redux/features/Settings/purchase/itemApiSlice";
import RoutingActionButton from "shared/Components/ActionButton/RoutingActionButton";
import DataTable from "shared/Components/DataTable";
import { globalVariables } from "helper/globalVariables";
import Filters from "shared/Components/Filters";

export default function Items() {
  const navigate = useNavigate();
  const ref = useRef<HTMLInputElement | null>(null);

  const { data: categoryList } = useGetCategoryQuery(false);
  const [triggerGetItems, itemsData] = useLazyFindAllItemsQuery();
  const [deleteItem] = useDeleteItemMutation();
  const [queryParams, setQueryParams] = useState({
    pageNumber: 0,
    pageSize: globalVariables?.ItemsPerPageLimit,
    categoryIds: "" as string | number,
    itemName: "",
    production: false,
  });

  useEffect(() => {
    triggerGetItems(queryParams);
  }, [queryParams]);

  const handleDelete = (id: number) => {
    if (id) {
      deleteItem(id);
    }
  };
  const itemList = itemsData.data?.payLoad ?? [];

  return (
    <>
      <div className="d-lg-flex">
        <SetupSideNav type={4} />
        <div className="table-container">
          <Filters
            printAble={(itemList && itemList?.length > 0) ?? false}
            exportAble={(itemList && itemList?.length > 0) ?? false}
            componentRef={ref}
            addRedirectPath="/grader/settings/purchase/items/add"
          >
            <div className="d-flex gap-2">
              <div style={{ width: "15rem" }}>
                <MDBSelect
                  className="ms-3"
                  size="sm"
                  label="Catogories"
                  data={
                    categoryList
                      ? categoryList?.map((status: CategoryRequest) => {
                          return {
                            text: status.name,
                            value: status.categoryId,
                            defaultSelected:
                              status.categoryId === queryParams.categoryIds,
                          };
                        })
                      : []
                  }
                  search
                  onValueChange={(data) => {
                    if ("value" in data && data.value) {
                      setQueryParams({
                        ...queryParams,
                        categoryIds: +data.value,
                      });
                    }
                  }}
                  preventFirstSelection
                />
              </div>
              <div style={{ width: "15rem" }}>
                <MDBInput
                  label="Search"
                  size="sm"
                  value={queryParams.itemName}
                  onChange={(e) =>
                    setQueryParams((prev) => {
                      return { ...prev, itemName: e.target.value };
                    })
                  }
                />
              </div>
            </div>
          </Filters>
          <DataTable
            ref={ref}
            isLoading={itemsData?.isFetching}
            totalItems={
              itemsData?.data?.numberOfItems
                ? itemsData?.data?.numberOfItems
                : 0
            }
            setOffset={(offset, limit) => {
              setQueryParams({
                ...queryParams,
                pageNumber: offset,
                pageSize: limit ? limit : globalVariables.ItemsPerPageLimit,
              });
            }}
            columns={[
              { label: "Item Name", field: "itemName" },
              { label: "Active", field: "active" },
              { label: "Category", field: "category" },
              { label: "Grade", field: "grade" },
              { label: "Action", field: "action" },
            ]}
            rows={
              itemList
                ? itemList?.map((item) => {
                    return {
                      itemName: item?.name ? item?.name : "-",
                      active: item?.active ? "Yes" : "No",
                      category: categoryList?.find(
                        (category) =>
                          category.categoryId === queryParams.categoryIds
                      )?.name,
                      grade: item.grade?.name,
                      action: (
                        <RoutingActionButton
                          onNavigate={() =>
                            navigate(
                              "/grader/settings/purchase/items/edit/" +
                                item.itemId
                            )
                          }
                          onDeleteClick={() => {
                            handleDelete(item?.itemId);
                          }}
                        />
                      ),
                    };
                  })
                : []
            }
          ></DataTable>
        </div>
      </div>
    </>
  );
}
