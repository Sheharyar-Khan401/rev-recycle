import Filters from "shared/Components/Filters";
import { useEffect, useState } from "react";
import ProductionReportsSidenav from "components/Reports/ProductionReporsSidenav";
import { useGetAllSupplierQuery } from "redux/features/Clients/Suppliers/suppliersApiSlice";
import { format } from "date-fns/esm";
import { useGetAllDepartmentQuery } from "redux/features/Settings/Department/departmentApiSlice";
import { useLazyGetIssuedMaterialGraphDetailsQuery } from "redux/features/Dashboard/dashboardApiSlice";
import { MDBSelect } from "mdb-react-ui-kit";
import RangePicker from "shared/Components/RangePicker";
import DataTable from "shared/Components/DataTable";
import { roundValue } from "helper/utility";

export default function IssuanceBySupplier() {
  const { isLoading: isSupplierListLoading, data: suppliersData } =
    useGetAllSupplierQuery(null);
  const [queryParams, setQueryParams] = useState({
    startDate: format(new Date(), "yyyy-MM-dd"),
    endDate: format(new Date(), "yyyy-MM-dd"),
    field: "supplier",
    supplierIds: [] as string[],
    issuanceTypeIds: [] as string[],
    all: true,
  });
  const { isLoading: isDepartmentListLoading, data: departmentList } =
    useGetAllDepartmentQuery(null);
  const [getTotalIssuedItemsDetails, totalIssuedresults] =
    useLazyGetIssuedMaterialGraphDetailsQuery();

  const getSupplierItemsList = () => {
    if (suppliersData?.length) {
      return suppliersData.map((res) => {
        return {
          text: res?.user ? res?.user.fullName : "",
          value: res?.clientId ? res?.clientId : 0,
          disabled:
            !queryParams.supplierIds.includes(`${res.clientId}`) &&
            queryParams.supplierIds.length === 4,
          defaultSelected: queryParams.supplierIds.includes(`${res.clientId}`),
        };
      });
    } else return [];
  };

  useEffect(() => {
    getTotalIssuedItemsDetails(queryParams);
  }, [queryParams]);

  const getDepartmentsOptions = (selectedValues: string[]) => {
    if (departmentList?.length) {
      return departmentList.map((department) => {
        return {
          text: department?.name ? department?.name : "",
          value: department?.departmentId ? department?.departmentId : 0,
          defaultSelected: selectedValues.includes(
            department?.departmentId.toString()
          ),
        };
      });
    } else return [];
  };

  return (
    <>
      <div className="d-lg-flex fs12">
        <div>
          <ProductionReportsSidenav type={9} />
        </div>
        <div className="table-container">
          <Filters printAble={false} exportAble={false}>
            <div className="me-2">
              <RangePicker
                value={[
                  format(new Date(queryParams.startDate), "dd MMM, yyyy"),
                  format(new Date(queryParams.endDate), "dd MMM, yyyy"),
                ]}
                onChange={(value) => {
                  if (value) {
                    setQueryParams((prev) => ({
                      ...prev,
                      startDate: value[0],
                      endDate: value[1],
                    }));
                  } else {
                    setQueryParams((prevSelectedDates) => ({
                      ...prevSelectedDates,
                      totalIssuanceStartDate: "",
                      totalIssuanceEndDate: "",
                    }));
                  }
                }}
              />
            </div>
            <div style={{ width: "15rem" }}>
              <MDBSelect
                size="sm"
                search
                selectAll={false}
                multiple
                clearBtn
                preventFirstSelection
                label="Select Supplier"
                data={getSupplierItemsList()}
                displayedLabels={4}
                optionsSelectedLabel={"Supplier selected"}
                onValueChange={(data) => {
                  if ("length" in data && data.length > 0) {
                    setQueryParams((prevState) => ({
                      ...prevState,
                      supplierIds: data.map((res) => `${res.value}` ?? 0),
                    }));
                  } else {
                    setQueryParams((prevState) => ({
                      ...prevState,
                      supplierIds: [],
                    }));
                  }
                }}
              />
            </div>
            <div className="mx-2">
              <MDBSelect
                label="Department"
                size="sm"
                search
                multiple
                preventFirstSelection
                data={getDepartmentsOptions(queryParams.issuanceTypeIds)}
                onValueChange={(data) => {
                  if ("length" in data && data.length > 0) {
                    setQueryParams((prevState) => ({
                      ...prevState,
                      issuanceTypeIds: data.map((res) => `${res.value}` ?? 0),
                    }));
                  } else {
                    setQueryParams((prevState) => ({
                      ...prevState,
                      issuanceTypeIds: [],
                    }));
                  }
                }}
              />
            </div>
          </Filters>
          <div>
            <DataTable
              isLoading={
                totalIssuedresults.isFetching ||
                isDepartmentListLoading ||
                isSupplierListLoading
              }
              columns={[
                { label: "SR No.", field: "sr" },
                { label: "Supplier", field: "supplier" },
                { label: "No of Bales", field: "bales" },
                { label: "Cost", field: "bales" },
                { label: "Weight (KGS)", field: "kgs" },
                { label: "Weight (LBS)", field: "lbs" },
              ]}
              rows={(totalIssuedresults?.data?.payLoad.objectList ?? []).map(
                (filteredItem, index: number) => {
                  return {
                    sr: index + 1,
                    supplier: filteredItem.supplier ?? "Production Big Bales",
                    bales: filteredItem.units,
                    cost: filteredItem.amount,
                    kgs: roundValue(filteredItem.itemTotalWeightKgs),
                    lbs: roundValue(filteredItem.itemTotalWeightLbs),
                  };
                }
              )}
            />
          </div>
        </div>
      </div>
    </>
  );
}
