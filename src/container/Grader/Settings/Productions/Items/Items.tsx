import { MDBInput, MDBSelect } from "mdb-react-ui-kit";
import ProductionSideNav from "components/Settings/Productions/ProductionSidenav";
import { useNavigate } from "react-router-dom";
import RoutingActionButton from "shared/Components/ActionButton/RoutingActionButton";
import { useState, useEffect, useRef } from "react";
import { CategoryRequest } from "redux/types/Settings/Purchase/categories";
import { useLazyGetCategoryQuery } from "redux/features/Settings/purchase/categoryApiSlice";
import { SelectData } from "mdb-react-ui-kit/dist/types/pro/forms/SelectV2/types";
import { useDeleteProductionItemMutation } from "redux/features/Settings/Productions/productionItemApiSlice";
import { Item } from "redux/types/Settings/Productions/items";
import { ActiveIcon, InactiveIcon } from "helper/icons";
import DataTable from "shared/Components/DataTable";
import { globalVariables } from "helper/globalVariables";
import Filters from "shared/Components/Filters";
import { roundValue, convertWghtToLbs } from "helper/utility";
import { useLazyFindAllItemsQuery } from "redux/features/Settings/purchase/itemApiSlice";

export default function Items() {
  const navigate = useNavigate();
  const ref = useRef<HTMLInputElement | null>(null);
  const [triggerGetCategories, resultGetCategories] = useLazyGetCategoryQuery();
  const [triggerGetItems, itemsData] = useLazyFindAllItemsQuery();
  const [deleteproductionItem] = useDeleteProductionItemMutation();
  const [queryParams, setQueryParams] = useState({
    pageNumber: 0,
    pageSize: globalVariables?.ItemsPerPageLimit,
    categoryIds: "" as string | number,
    itemName: "",
    production: true,
  });
  const handleDelete = (id: number) => {
    if (id) {
      deleteproductionItem(id);
    }
  };

  useEffect(() => {
    triggerGetItems(queryParams);
  }, [queryParams]);

  useEffect(() => {
    triggerGetCategories(true);
  }, []);

  const categoryDataList = () => {
    return resultGetCategories?.data
      ? resultGetCategories?.data?.map((status: CategoryRequest) => {
          return {
            text: status?.name,
            value: status?.categoryId,
            defaultSelected: status.categoryId === queryParams.categoryIds,
          };
        })
      : [];
  };
  const onSubmit = (id: number) => {
    setQueryParams({ ...queryParams, categoryIds: id });
  };

  const itemList = itemsData.data?.payLoad ?? [];
  return (
    <>
      <div className="d-lg-flex">
        <ProductionSideNav type={2} />
        <div className="table-container">
          <Filters
            printAble={(itemList && itemList?.length > 0) ?? false}
            exportAble={(itemList && itemList?.length > 0) ?? false}
            componentRef={ref}
            addRedirectPath="/grader/settings/productions/items/add"
          >
            <div className="d-flex gap-2">
              <div style={{ width: "15rem" }}>
                <MDBSelect
                className="ms-3"
                size="sm"
                  label="Category"
                  data={categoryDataList()}
                  onValueChange={(data: SelectData | SelectData[]) => {
                    if (!Array.isArray(data) && data.value) {
                      const value = +data.value;
                      setQueryParams((prev) => {
                        return { ...prev, categoryIds: value };
                      });
                      onSubmit(+data.value);
                    }
                  }}
                  search
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
              { label: "Sr. No.", field: "itemId" },
              {
                label: "Item Name",
                field: "itemName",
              },
              {
                label: `Label Type`,
                field: "labelType",
              },
              {
                label: "Weight Unit",
                field: "weightUnit",
              },
              {
                label: "Grade",
                field: "grade",
              },
              {
                label: "Pri. Q-Unit",
                field: "priQunit",
              },
              {
                label: "Unit Weight",
                field: "unitWeight",
              },
              {
                label: "UOM",
                field: "uom",
              },
              {
                label: "Unit Pieces",
                field: "unitPieces",
              },
              {
                label: "Weight(KGS)",
                field: "weightKgs",
              },
              {
                label: "Weight(LBS)",
                field: "lbswt",
              },
              {
                label: "Unit Rate",
                field: "unitRate",
              },
              {
                label: "Rate On",
                field: "rateOn",
              },
              {
                label: "Amount /LBS",
                field: "amountLbs",
              },
              {
                label: "exp. pro. qty",
                field: "expproqty",
              },
              {
                label: "Item Code",
                field: "code",
              },
              {
                label: "Status",
                field: "status",
              },
              { label: "Action", field: "action" },
            ]}
            rows={
              itemList && itemList?.length > 0
                ? itemList?.map((item: Item, index) => {
                    return {
                      itemId: index + 1,
                      itemName: item?.name ? item?.name : "-",
                      labelType: item?.labelType ? item?.labelType?.name : "-",
                      grade: item?.grade ? item?.grade?.name : "-",
                      priQunit: item?.quantityUnit
                        ? item?.quantityUnit?.name
                        : "-",
                      weightUnit: item?.weightUnit?.name
                        ? item?.weightUnit?.name
                        : "-",
                      unitWeight: item?.unitWeight ? item?.unitWeight : 0.0,
                      unitPieces: item?.unitPieces ? item?.unitPieces : 0.0,
                      uom: item?.uom ? item?.uom?.name : "-",
                      rateOn: item?.rateOn ? item?.rateOn?.name : "-",
                      amountLbs: item?.amount ? roundValue(item?.amount) : 0.0,
                      expproqty: item?.expProQty ? item?.expProQty : 0.0,
                      code: item?.itemCode ? item?.itemCode : "-",
                      unitRate: item?.unitRate ? item?.unitRate : 0.0,
                      weightKgs: item?.weightKgs ? item?.weightKgs : 0.0,
                      group: item?.group ? item?.group?.name : "-",
                      lbswt: item?.weightKgs
                        ? convertWghtToLbs(item?.weightKgs)?.toFixed(2)
                        : "-",
                      status: item?.active ? <ActiveIcon /> : <InactiveIcon />,
                      action: (
                        <RoutingActionButton
                          onNavigate={() =>
                            navigate(
                              "/grader/settings/productions/items/edit/" +
                                item?.itemId
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
          />
        </div>
      </div>
    </>
  );
}
