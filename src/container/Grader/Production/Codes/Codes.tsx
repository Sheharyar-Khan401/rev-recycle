import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import RoutingActionButton from "shared/Components/ActionButton/RoutingActionButton";
import { globalVariables } from "helper/globalVariables";
import DataTable from "shared/Components/DataTable";
import {
  useDeleteCodesMutation,
  useLazyGetCodesQuery,
} from "redux/features/productions/codesApiSlice";
import { Codes } from "redux/types/Productions/codes";
import Filters from "shared/Components/Filters";
import { useGetAllDepartmentQuery } from "redux/features/Settings/Department/departmentApiSlice";
import { useGetQuantityUnitsQuery } from "redux/features/common/quantityUnitApiSlice";
import { useGetCategoryQuery } from "redux/features/Settings/purchase/categoryApiSlice";
import { useGetAllProductionItemsQuery } from "redux/features/Settings/Productions/productionItemApiSlice";
import { useGetFloorsQuery } from "redux/features/Settings/Productions/floorApiSlice";
import { useGetAllUsersQuery } from "redux/features/Settings/UserManagement/userApiSlice";
import { useGetLabelTypesQuery } from "redux/features/Settings/Productions/labeltypesApiSlice";
import { Floors } from "redux/types/common/floor";
import { QuantityUnit } from "redux/types/common/quantityUnit";
import { Categories, CategoryRequest } from "redux/types/Settings/Purchase/categories";
import { Item } from "redux/types/Settings/Productions/items";
import { UserData } from "redux/types/Settings/user";
import { LabelTypesData } from "redux/types/Settings/Productions/labeltype";
import { Department } from "redux/types/Settings/Productions/department";
import {
  calculateWeights,
  convertWghtToLbs,
  getDateFromMillis,
  hasPermission,
  roundValue,
} from "helper/utility";
import { format } from "date-fns";

export default function CodesList() {
  const navigate = useNavigate();
  const ref = useRef<HTMLInputElement | null>(null);
  const [getCodes, result] = useLazyGetCodesQuery();
  const { data: deptData } = useGetAllDepartmentQuery(null);
  const { data: qUnitData } = useGetQuantityUnitsQuery(null);
  const { data: catData } = useGetCategoryQuery(true);
  const { data: itemsData } = useGetAllProductionItemsQuery(null);
  const { data: FloorsData } = useGetFloorsQuery(null);
  const { data: workersData } = useGetAllUsersQuery(null);
  const { data: labeltypeData } = useGetLabelTypesQuery(null);
  const [deleteCodes] = useDeleteCodesMutation();
  const codesData = result?.data?.payLoad;
  const [queryParams, setQueryParams] = useState({
    pageNumber: 0,
    pageSize: globalVariables?.ItemsPerPageLimit,
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    hasPermission("pro_co_103") && getCodes(queryParams);
  }, [queryParams, getCodes]);

  const handleDelete = (id: number) => {
    if (id) {
      deleteCodes(id);
    }
  };

  return (
    <div className="table-container">
      <Filters
        componentRef={ref}
        printAble={(codesData && codesData.length > 0) ?? false}
        exportAble={(codesData && codesData.length > 0) ?? false}
        addRedirectPath={
          hasPermission("pro_co_100") ? "/grader/production/codes/add" : ""
        }
        filters={[
          {
            label: "Department",
            name: "departmentId",
            inputType: "select",
            options: deptData
              ? deptData?.map((item: Department) => {
                  return {
                    text: item?.name ? item?.name : "",
                    value: item.departmentId ? item.departmentId : 0,
                  };
                })
              : [],
          },
          {
            label: "Q-Unit",
            name: "qUnitIds",
            inputType: "multiselect",
            options: qUnitData
              ? qUnitData?.map((item: QuantityUnit) => {
                  return {
                    text: item?.name ? item?.name : "",
                    value: item?.quantityUnitId ? item?.quantityUnitId : 0,
                  };
                })
              : [],
          },
          {
            label: "Categories",
            name: "categoryIds",
            inputType: "multiselect",
            options: catData
              ? catData?.map((item: CategoryRequest) => {
                  return {
                    text: item?.name ? item?.name : "",
                    value: item?.categoryId ? item?.categoryId : 0,
                  };
                })
              : [],
          },
          {
            label: "Items",
            name: "itemIds",
            inputType: "multiselect",
            options: itemsData
              ? itemsData?.map((item: Item) => {
                  return {
                    text: item?.name ? item?.name : "",
                    value: item?.itemId ? item?.itemId : 0,
                  };
                })
              : [],
          },
          {
            label: "Floors",
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
            label: "Workers",
            name: "workerIds",
            inputType: "multiselect",
            options: workersData
              ? workersData?.map((item: UserData) => {
                  return {
                    text: item?.fullName ? item?.fullName : "",
                    value: item?.userId ? item?.userId : 0,
                  };
                })
              : [],
          },
          {
            label: "Label Types",
            name: "labelTypeIds",
            inputType: "multiselect",
            options: labeltypeData
              ? labeltypeData?.map((item: LabelTypesData) => {
                  return {
                    text: item?.name ? item?.name : "",
                    value: item?.labelTypeId ? item?.labelTypeId : 0,
                  };
                })
              : [],
          },
          {
            label: "Users",
            name: "userIds",
            inputType: "multiselect",
            options: workersData
              ? workersData?.map((item: UserData) => {
                  return {
                    text: item?.fullName ? item?.fullName : "",
                    value: item?.userId ? item?.userId : 0,
                  };
                })
              : [],
          },
          {
            label: "Scanned",
            name: "scanned",
            inputType: "boolean",
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
      {hasPermission("pro_co_103") && (
        <DataTable
          ref={ref}
          tableTitle="Production Codes"
          fixLastColumn
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
            { label: "codes", field: "codes" },
            { label: "item", field: "item" },
            { label: "category", field: "category" },
            { label: "type", field: "type" },
            { label: "department", field: "department" },
            { label: "date", field: "date" },
            { label: "floor", field: "floor" },
            { label: "grade", field: "grade" },
            { label: "Kgs", field: "kgs" },
            { label: "lbs", field: "lbs" },
            { label: "tickets", field: "tickets" },
            { label: "pieces", field: "pieces" },
            { label: "unit rate", field: "unitRate" },
            { label: "amount", field: "amount" },
            { label: "UOM", field: "uom" },
            { label: "scanned", field: "scanned" },
            { label: "worker", field: "worker" },
            { label: "created on", field: "createdOn" },
            { label: "created by", field: "createdBy" },
            { label: "action", field: "action" },
          ]}
          rows={
            codesData
              ? codesData?.map((code: Codes) => {
                  return {
                    codes: code.code ? code.code : "-",
                    item: code?.item?.name ? code.item.name : "-",
                    category: code?.item?.category
                      ? code?.item?.category?.name
                      : "-",
                    type: code?.labeltype ? code?.labeltype?.name : "-",
                    department: code?.department ? code?.department?.name : "-",
                    date: getDateFromMillis(code?.codeDate),
                    floor: code?.floor?.name ? code?.floor?.name : "-",
                    grade: code?.grade ? code?.grade?.name : "-",
                    kgs: code?.weightUnit
                      ? calculateWeights(
                          code.unitWeight,
                          code.weightUnit.weightUnitId
                        )[0]
                      : 0,
                    lbs: code?.weightUnit
                      ? calculateWeights(
                          code.unitWeight,
                          code?.weightUnit?.weightUnitId
                        )[1]
                      : 0,
                    tickets: code.tickets ? code.tickets : 0,
                    pieces: code.pieces ? code.pieces : 0,
                    unitRate: code?.item?.unitRate
                      ? code?.item.unitRate?.toFixed(2)
                      : 0,
                    amount: code?.amount ? code.amount?.toFixed(2) : 0,
                    uom: code?.item?.uom ? code?.item?.uom?.name : "-",
                    scanned: code?.scanned ? "Yes" : "No",
                    worker: code.worker ? code?.worker?.fullName : "-",
                    createdOn: getDateFromMillis(code?.creationDate),
                    createdBy: code?.createdBy
                      ? code?.createdBy?.fullName
                      : "-",
                    action: (
                      <RoutingActionButton
                        onNavigate={
                          hasPermission("pro_co_101")
                            ? () =>
                                navigate(
                                  "/grader/production/codes/edit/" + code.codeId
                                )
                            : undefined
                        }
                        onDeleteClick={
                          hasPermission("pro_co_102")
                            ? () => {
                                handleDelete(code?.codeId);
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
