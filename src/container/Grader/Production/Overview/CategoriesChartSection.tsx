import IssuedDoughnutChartContainer from "components/Dashboard/Overview/issuedMaterialChartContainer";
import DoughnutChartContainer from "components/Dashboard/Overview/prodDoghnutChartContainer";
import { MDBSelect } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import Loader from "shared/Components/Loader/Loader";
import RangePicker from "shared/Components/RangePicker";
import { selectedDates, selectedids } from "./Overview";
import {
  AllCategoryItems,
  CategoryRequest,
} from "redux/types/Settings/Purchase/categories";
import {
  useGetAllCategoryItemsQuery,
  useGetCategoryQuery,
} from "redux/features/Settings/purchase/categoryApiSlice";
import { dailyProductionGraphResponse, issuedMaterialGraphResponse } from "redux/types/Productions/dailyProduction";

type results = {
  payLoad: {
    objectList: dailyProductionGraphResponse[];
    weightKgs: number;
    weightLbs: number;
  };
  numberOfItems: number;
};

type issuedresults = {
    payLoad: {
        objectList: issuedMaterialGraphResponse[];
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
  loading: boolean;
  categoryResults?: results;
  issuedCategoryResultsLoading: boolean
  issuedCategoryResults?: issuedresults
}
function CategoriesChartSection(props: Props) {
  const {
    setSelectedDates,
    selectedDates,
    setSelectedIds,
    selectedIds,
    loading,
    categoryResults,
    issuedCategoryResultsLoading,
    issuedCategoryResults
  } = props;
  const { data } = useGetCategoryQuery(true);
  const { data: allCategoryItems } = useGetAllCategoryItemsQuery(null);
  const [catData, setCatData] = useState<CategoryRequest[]>([]);

  const categoryDataList = (id: number) => {
    return catData?.map((status: CategoryRequest) => {
      return {
        text: status.name,
        value: status.categoryId,
        // defaultSelected: selectedIds.categoryIds.includes(
        //   `${status.categoryId}`
        // ),
      };
    });
  };

  const allCategoryDataList = () => {
    if (allCategoryItems?.length) {
      const itemIdMap: Record<string, number[]> = {};
      allCategoryItems.forEach((item: AllCategoryItems) => {
        const { categoryId, name } = item;
        if (!itemIdMap[name]) {
          itemIdMap[name] = [];
        }
        itemIdMap[name].push(categoryId);
      });
      const result = Object.keys(itemIdMap).map((name) => ({
        name,
        categoryId: itemIdMap[name].join(","),
      }));

      return result?.map((status) => {
        return {
          text: status.name,
          value: status.categoryId,
          // defaultSelected: selectedIds.prodCateoryIds.includes(
          //   `${status.categoryId}`
          // ),
        };
      });
    } else return [];
  };

  useEffect(() => {
    if (data) {
      setCatData(data);
    }
  }, [data]);

  return (
    <>
      <div className="d-flex align-items-end mt-3 justify-content-between">
        <div className="d-flex">
          <div className="me-3">
            <RangePicker
              value={[
                selectedDates.prodCategoryStartDate,
                selectedDates.prodCategoryEndDate,
              ]}
              onChange={(value) => {
                if (value) {
                  setSelectedDates((prevSelectedIds) => ({
                    ...prevSelectedIds,
                    prodCategoryStartDate: value[0],
                    prodCategoryEndDate: value[1],
                  }));
                } else {
                  setSelectedDates((prevSelectedIds) => ({
                    ...prevSelectedIds,
                    prodCategoryStartDate: "",
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
              data={categoryDataList(0)}
              clearBtn
              preventFirstSelection
              label="Select Category"
              defaultValue={""}
              onValueChange={(data) => {
                if ("length" in data && data.length > 0) {
                  setSelectedIds((prevState) => ({
                    ...prevState,
                    prodCateoryIds: data.map((res) => `${res.value}` ?? 0),
                  }));
                } else {
                  setSelectedIds((prevState) => ({
                    ...prevState,
                    prodCateoryIds: [],
                  }));
                }
              }}
            />
          </div>
        </div>
        <div className="d-flex">
          <div className="mx-3">
            <RangePicker
              value={[
                selectedDates.CategorStartDate,
                selectedDates.CategorEndDate,
              ]}
              onChange={(value) => {
                if (value) {
                  setSelectedDates((prevSelectedIds) => ({
                    ...prevSelectedIds,
                    CategorStartDate: value[0],
                    CategorEndDate: value[1],
                  }));
                } else {
                  setSelectedDates((prevSelectedIds) => ({
                    ...prevSelectedIds,
                    CategorStartDate: "",
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
              data={allCategoryDataList()}
              clearBtn
              preventFirstSelection
              label="Select Category"
              defaultValue={""}
              onValueChange={(data) => {
                if ("length" in data && data.length > 0) {
                  setSelectedIds((prevState) => ({
                    ...prevState,
                    categoryIds: data.map((res) => `${res.value}` ?? 0),
                  }));
                } else {
                  setSelectedIds((prevState) => ({
                    ...prevState,
                    categoryIds: [],
                  }));
                }
              }}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 col-sm-12 my-3">
          {loading ? (
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
            categoryResults && (
              <DoughnutChartContainer
                graphData={categoryResults}
                type="category"
              />
            )
          )}
        </div>
        <div className="col-md-6 col-sm-12 my-3">
          {issuedCategoryResultsLoading ? (
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
            issuedCategoryResults && (
              <IssuedDoughnutChartContainer
                graphData={issuedCategoryResults}
                type="category"
              />
            )
          )}
        </div>
      </div>
    </>
  );
}

export default CategoriesChartSection;
