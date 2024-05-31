import IssuedDoughnutChartContainer from "components/Dashboard/Overview/issuedMaterialChartContainer";
import { format, isValid } from "date-fns";
import { MDBSelect } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { useGetAllSupplierQuery } from "redux/features/Clients/Suppliers/suppliersApiSlice";
import { useLazyGetIssuedMaterialGraphDetailsQuery } from "redux/features/Dashboard/dashboardApiSlice";
import { useGetAllDepartmentQuery } from "redux/features/Settings/Department/departmentApiSlice";
import Loader from "shared/Components/Loader/Loader";
import RangePicker from "shared/Components/RangePicker";
import { selectedDates, selectedids } from "./Overview";
import { dailyProductionGraphResponse, issuedMaterialGraphResponse } from "redux/types/Productions/dailyProduction";
import DoughnutChartContainer from "components/Dashboard/Overview/prodDoghnutChartContainer";

type issuedLabelsResultsType = {
  payLoad: {
    objectList: dailyProductionGraphResponse[];
    weightKgs: number;
    weightLbs: number;
  };
  numberOfItems: number;
};

interface Props {
  setSelectedIds: React.Dispatch<React.SetStateAction<selectedids>>;
  setSelectedDates: React.Dispatch<React.SetStateAction<selectedDates>>;
  selectedDates: selectedDates;
  selectedIds: selectedids;
  issuedLabelsResults?: issuedLabelsResultsType;
  issuedLabelsResultsLoading: boolean;
  getLabelTypesOptions: Function;
}

function TotalIssuance(props: Props) {
  const {
    setSelectedIds,
    selectedDates,
    setSelectedDates,
    selectedIds,
    issuedLabelsResults,
    issuedLabelsResultsLoading,
    getLabelTypesOptions,
  } = props;

  const { data: suppliersData } = useGetAllSupplierQuery(null);
  const queryParams = {
    startDate: format(new Date(), "yyyy-MM-dd"),
    endDate: format(new Date(), "yyyy-MM-dd"),
  };
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
            !selectedIds.supplierIds.includes(`${res.clientId}`) &&
            selectedIds.supplierIds.length === 4,
          defaultSelected: selectedIds.supplierIds.includes(`${res.clientId}`),
        };
      });
    } else return [];
  };

  useEffect(() => {
    const itemParams = { ...queryParams, field: "supplier" };
    const isStartDateValid = isValid(
      new Date(selectedDates.totalIssuanceStartDate)
    );
    const isendDateValid = isValid(
      new Date(selectedDates.totalIssuanceEndDate)
    );
    if (
      selectedIds.supplierIds.length > 0 ||
      (isStartDateValid && isendDateValid)
    ) {
      getTotalIssuedItemsDetails({
        ...itemParams,
        startDate: format(
          new Date(selectedDates.totalIssuanceStartDate),
          "yyyy-MM-dd"
        ),
        endDate: format(
          new Date(selectedDates.totalIssuanceEndDate),
          "yyyy-MM-dd"
        ),
        supplierIds: selectedIds.supplierIds ?? null,
        issuanceTypeIds: selectedIds.issuanceTypeIds,
      });
    } else {
      getTotalIssuedItemsDetails(itemParams);
    }
  }, [
    selectedIds.supplierIds,
    selectedIds.issuanceTypeIds,
    selectedDates.totalIssuanceStartDate,
    selectedDates.totalIssuanceEndDate,
  ]);

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
      <div className="d-flex">
        <h4 className="d-flex align-items-center fw500 black">
          Total Issuance
        </h4>
        <div className="ms-3">
          <RangePicker
            value={[
              selectedDates.totalIssuanceStartDate,
              selectedDates.totalIssuanceEndDate,
            ]}
            onChange={(value) => {
              if (value) {
                setSelectedDates((prevSelectedDates) => ({
                  ...prevSelectedDates,
                  totalIssuanceStartDate: value[0],
                  totalIssuanceEndDate: value[1],
                  itemStartDate: value[0],
                  itemEndDate: value[1],
                  productionStartDate: value[0],
                  productionEndDate: value[1],
                  CategorStartDate: value[0],
                  CategorEndDate: value[1],
                  prodCategoryEndDate: value[1],
                  prodCategoryStartDate: value[0],
                  labelStartDate: value[0],
                  labelEndDate: value[1],
                  prodLabelStartDate: value[0],
                  prodLabelEndDate: value[1],
                }));
              } else {
                setSelectedDates((prevSelectedDates) => ({
                  ...prevSelectedDates,
                  totalIssuanceStartDate: "",
                  totalIssuanceEndDate: "",
                }));
              }
            }}
          />
        </div>
      </div>
      <div className="d-flex align-items-end mt-3 justify-content-between">
        <div className="d-flex">
          <div style={{ width: "20rem" }}>
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
                  setSelectedIds((prevState) => ({
                    ...prevState,
                    supplierIds: data.map((res) => `${res.value}` ?? 0),
                  }));
                } else {
                  setSelectedIds((prevState) => ({
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
              data={getDepartmentsOptions(selectedIds.issuanceTypeIds)}
              onValueChange={(data) => {
                if ("length" in data && data.length > 0) {
                  setSelectedIds((prevState) => ({
                    ...prevState,
                    issuanceTypeIds: data.map((res) => `${res.value}` ?? 0),
                  }));
                } else {
                  setSelectedIds((prevState) => ({
                    ...prevState,
                    issuanceTypeIds: [],
                  }));
                }
              }}
            />
          </div>
        </div>
        <div className="d-flex">
          <div className="me-3">
            <RangePicker
              value={[
                selectedDates.prodLabelStartDate,
                selectedDates.prodLabelEndDate,
              ]}
              onChange={(value) => {
                if (value) {
                  setSelectedDates((prevSelectedIds) => ({
                    ...prevSelectedIds,
                    prodLabelStartDate: value[0],
                    prodLabelEndDate: value[1],
                  }));
                } else {
                  setSelectedDates((prevSelectedIds) => ({
                    ...prevSelectedIds,
                    prodLabelStartDate: "",
                  }));
                }
              }}
            />
          </div>
          <div style={{ width: "12.8rem" }}>
            <MDBSelect
              size="sm"
              search
              selectAll={false}
              multiple
              data={getLabelTypesOptions()}
              clearBtn
              preventFirstSelection
              label="Select Label"
              onValueChange={(data) => {
                if ("length" in data && data.length > 0) {
                  setSelectedIds((prevState) => ({
                    ...prevState,
                    productionLabelTypeIds: data.map(
                      (res) => `${res.value}` ?? 0
                    ),
                  }));
                } else {
                  setSelectedIds((prevState) => ({
                    ...prevState,
                    productionLabelTypeIds: [],
                  }));
                }
              }}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 col-sm-12 my-3">
          {totalIssuedresults.isFetching ? (
            <div
              className="align-items-center d-flex justify-content-center"
              style={{
                background: "#F7F9FB",
                borderRadius: "1rem",
                minHeight: "18.75rem",
              }}
            >
              <Loader />
            </div>
          ) : (
            totalIssuedresults.data && (
              <IssuedDoughnutChartContainer
                graphData={totalIssuedresults.data}
                type="supplier"
              />
            )
          )}
        </div>
        <div className="col-md-6 col-sm-12 my-3">
          {issuedLabelsResultsLoading ? (
            <div
              className="align-items-center d-flex justify-content-center"
              style={{
                background: "#F7F9FB",
                borderRadius: "1rem",
                minHeight: "18.75rem",
              }}
            >
              <Loader />
            </div>
          ) : (
            issuedLabelsResults && (
              <DoughnutChartContainer
                graphData={issuedLabelsResults}
                type="label"
              />
            )
          )}
        </div>
      </div>
    </>
  );
}

export default TotalIssuance;
