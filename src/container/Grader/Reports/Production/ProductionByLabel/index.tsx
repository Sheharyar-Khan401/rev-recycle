import Filters from "shared/Components/Filters";
import { useEffect, useState } from "react";
import ProductionReportsSidenav from "components/Reports/ProductionReporsSidenav";
import { format } from "date-fns/esm";
import { useLazyGetDailyProductionGraphDetailsQuery } from "redux/features/Dashboard/dashboardApiSlice";
import { MDBSelect } from "mdb-react-ui-kit";
import RangePicker from "shared/Components/RangePicker";
import DataTable from "shared/Components/DataTable";
import { roundValue } from "helper/utility";
import { useGetLabelTypesQuery } from "redux/features/Settings/Productions/labeltypesApiSlice";

export default function ProductionByLabel() {
  const [queryParams, setQueryParams] = useState({
    startDate: format(new Date(), "yyyy-MM-dd"),
    endDate: format(new Date(), "yyyy-MM-dd"),
    field: "labelType",
    all: true,
    labelTypeIds: [] as string[],
  });
  const { isLoading: isDepartmentListLoading, data: labelTypesList } =
    useGetLabelTypesQuery(null);
  const [getTotalIssuedItemsDetails, totalIssuedresults] =
    useLazyGetDailyProductionGraphDetailsQuery();

  useEffect(() => {
    getTotalIssuedItemsDetails(queryParams);
  }, [queryParams]);

  const getLabelTypesOptions = (selectedValues: string[]) => {
    if (labelTypesList?.length) {
      return labelTypesList.map((labelTypes) => {
        return {
          text: labelTypes?.name ? labelTypes?.name : "",
          value: labelTypes?.labelTypeId ? labelTypes?.labelTypeId : 0,
          defaultSelected: selectedValues.includes(
            labelTypes?.labelTypeId.toString()
          ),
        };
      });
    } else return [];
  };

  return (
    <>
      <div className="d-lg-flex fs12">
        <div>
          <ProductionReportsSidenav type={10} />
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
            <div className="mx-2">
              <MDBSelect
                label="Label Type"
                size="sm"
                search
                multiple
                preventFirstSelection
                data={getLabelTypesOptions(queryParams.labelTypeIds)}
                onValueChange={(data) => {
                  if ("length" in data && data.length > 0) {
                    setQueryParams((prevState) => ({
                      ...prevState,
                      labelTypeIds: data.map((res) => `${res.value}` ?? 0),
                    }));
                  } else {
                    setQueryParams((prevState) => ({
                      ...prevState,
                      labelTypeIds: [],
                    }));
                  }
                }}
              />
            </div>
          </Filters>
          <div>
            <DataTable
              isLoading={
                totalIssuedresults.isFetching || isDepartmentListLoading
              }
              columns={[
                { label: "SR No.", field: "sr" },
                { label: "Label", field: "label" },
                { label: "No of Bales", field: "bales" },
                { label: "Cost", field: "cost" },
                { label: "Weight (KGS)", field: "kgs" },
                { label: "Weight (LBS)", field: "lbs" },
              ]}
              rows={(totalIssuedresults?.data?.payLoad.objectList ?? []).map(
                (filteredItem, index: number) => {
                  return {
                    sr: index + 1,
                    label: filteredItem.labelType,
                    bales: filteredItem.units ?? "-",
                    cost: filteredItem.amount ?? "-",
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
