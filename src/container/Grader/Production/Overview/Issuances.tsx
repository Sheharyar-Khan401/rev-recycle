import IssuanceChart from "components/Production/Overview/IssuanceChart";
import { getYearsList } from "helper/utility";
import { MDBSelect } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { useGetAllDepartmentQuery } from "redux/features/Settings/Department/departmentApiSlice";
import { useLazyGetIssuanceGraphQuery } from "redux/features/productions/issuanceApiSlice";
import Loader from "shared/Components/Loader/Loader";

export default function Issuances() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [triggerGetData, issuanceData] = useLazyGetIssuanceGraphQuery();
  const { isLoading: isDepartmentListLoading, data: departmentList } =
    useGetAllDepartmentQuery(null);
  const [queryParams, setQueryParams] = useState({
    startDate: new Date().getFullYear() + "-01-01",
    endDate: new Date().getFullYear() + "-12-31",
    issuanceTypeIds: "",
  });

  useEffect(() => {
    triggerGetData(queryParams);
  }, [queryParams]);

  const getYearsData = (year: number) => {
    return getYearsList().map((y) => {
      return {
        text: y.toString(),
        value: y,
        defaultSelected: y == year,
      };
    });
  };
  const getDepartmentsOptions = (selectedValues: string) => {
    if (departmentList?.length) {
      return departmentList.map((department) => {
        return {
          text: department?.name ? department?.name : "",
          value: department?.departmentId ? department?.departmentId : 0,
          defaultSelected: selectedValues
            .split(",")
            .includes(department?.departmentId.toString()),
        };
      });
    } else return [];
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <h4 className=" fw500 black">Issuance Graph</h4>
        </div>
        <div className="d-flex align-item-center">
          <div className="mx-2">
            <MDBSelect
              label="Year"
              size="sm"
              search
              data={getYearsData(selectedYear)}
              onValueChange={(data) => {
                if ("value" in data && data.value) {
                  setSelectedYear(+data.value);
                  setQueryParams((prev) => {
                    return {
                      ...prev,
                      startDate: data.value + "-01-01",
                      endDate: data.value + "-12-31",
                    };
                  });
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
                  const value = data.map((d) => d.value).join(",");
                  setQueryParams((prev) => {
                    return {
                      ...prev,
                      issuanceTypeIds: value,
                    };
                  });
                } else if ("length" in data && data.length == 0) {
                  setQueryParams((prev) => {
                    return {
                      ...prev,
                      issuanceTypeIds: "",
                    };
                  });
                }
              }}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 col-sm-12 my-3">
          <div
            className="align-items-center d-flex justify-content-center"
            style={{
              background: "#F7F9FB",
              borderRadius: "1rem",
              minHeight: "18.75rem",
            }}
          >
            {issuanceData.isFetching || isDepartmentListLoading ? (
              <Loader />
            ) : issuanceData.data?.payLoad.length == 0 ? (
              <div>No Data Found</div>
            ) : (
              <IssuanceChart issuanceData={issuanceData.data?.payLoad ?? []} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
