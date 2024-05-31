import IssuedDoughnutChartContainer from "components/Dashboard/Overview/issuedMaterialChartContainer";
import DoughnutChartContainer from "components/Dashboard/Overview/prodDoghnutChartContainer";
import { MDBSelect } from "mdb-react-ui-kit";
import React from "react";
import { useGetAllProductionItemsQuery } from "redux/features/Settings/Productions/productionItemApiSlice";
import { useGetAllProdPurchaseItemsQuery } from "redux/features/Settings/purchase/itemApiSlice";
import Loader from "shared/Components/Loader/Loader";
import RangePicker from "shared/Components/RangePicker";
import { Item } from "redux/types/Settings/Productions/items";
import {
  useLazyGetDailyProductionGraphDetailsQuery,
  useLazyGetIssuedMaterialGraphDetailsQuery,
} from "redux/features/Dashboard/dashboardApiSlice";
import {
  dailyProductionGraphResponse,
  issuedMaterialGraphResponse,
} from "redux/types/Productions/dailyProduction";
import { selectedids } from "container/Grader/Production/Overview/Overview";

type selectedDates = {
  labelStartDate: string;
  labelEndDate: string;
  itemStartDate: string;
  itemEndDate: string;
  CategorStartDate: string;
  CategorEndDate: string;
  productionStartDate: string;
  productionEndDate: string;
  prodLabelStartDate: string;
  prodLabelEndDate: string;
  prodCategoryStartDate: string;
  prodCategoryEndDate: string;
  totalIssuanceStartDate: string;
  totalIssuanceEndDate: string;
};

type results = {
  payLoad: {
    objectList: dailyProductionGraphResponse[];
    weightKgs: number;
    weightLbs: number;
  };
  numberOfItems: number;
};

type issuedItems = {
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
  data?: results;
  loading: boolean;
  issuanceLoading: boolean;
  issuanceData?: issuedItems;
}

function ItemsChartSection(props: Props) {
  const {
    setSelectedIds,
    selectedDates,
    setSelectedDates,
    selectedIds,
    data,
    loading,
    issuanceLoading,
    issuanceData,
  } = props;
  const { data: productionItemsList } = useGetAllProductionItemsQuery(null);
  const { data: allItems } = useGetAllProdPurchaseItemsQuery(null);

  const getProductionItemsList = () => {
    if (productionItemsList?.length) {
      return productionItemsList.map((res) => {
        return {
          text: res?.name ? res?.name : "",
          value: res?.itemId ? res?.itemId : 0,
          defaultSelected: selectedIds.productionIds.includes(`${res.itemId}`),
          disabled:
            !selectedIds.productionIds.includes(`${res.itemId}`) &&
            selectedIds.productionIds.length === 4,
        };
      });
    } else return [];
  };

  const getAllItemsOptions = () => {
    if (allItems?.length) {
      const itemIdMap: Record<string, number[]> = {};

      allItems.forEach((item: Item) => {
        const { itemId, name } = item;
        if (!itemIdMap[name]) {
          itemIdMap[name] = [];
        }
        itemIdMap[name].push(itemId);
      });

      const result = Object.keys(itemIdMap).map((name) => ({
        name,
        itemIds: itemIdMap[name].join(","),
      }));

      return result.map((res) => {
        return {
          text: res?.name ? res?.name : "",
          value: res?.itemIds ? res?.itemIds : 0,
          defaultSelected: selectedIds.itemIds.includes(res?.itemIds),
          disabled:
            !selectedIds.itemIds.includes(res?.itemIds) &&
            selectedIds.itemIds.length === 4,
        };
      });
    } else return [];
  };

  return (
    <>
      <div className="d-flex align-items-end mt-3 justify-content-between">
        <div className="d-flex">
          <div className="me-3">
            <RangePicker
              value={[
                selectedDates.productionStartDate,
                selectedDates.productionEndDate,
              ]}
              onChange={(value) => {
                if (value) {
                  setSelectedDates((prevSelectedIds) => ({
                    ...prevSelectedIds,
                    productionStartDate: value[0],
                    productionEndDate: value[1],
                  }));
                } else {
                  setSelectedDates((prevSelectedIds) => ({
                    ...prevSelectedIds,
                    productionStartDate: "",
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
              clearBtn
              preventFirstSelection
              label="Select Production Items"
              data={getProductionItemsList()}
              displayedLabels={2}
              optionsSelectedLabel={"items selected"}
              onValueChange={(data) => {
                if ("length" in data && data.length > 0) {
                  setSelectedIds((prevState) => ({
                    ...prevState,
                    productionIds: data.map((res) => `${res.value}` ?? 0),
                  }));
                } else {
                  setSelectedIds((prevState) => ({
                    ...prevState,
                    productionIds: [],
                  }));
                }
              }}
            />
          </div>
        </div>
        <div className="d-flex">
          <div className="me-3">
            <RangePicker
              value={[selectedDates.itemStartDate, selectedDates.itemEndDate]}
              onChange={(value) => {
                if (value) {
                  setSelectedDates((prevSelectedIds) => ({
                    ...prevSelectedIds,
                    itemStartDate: value[0],
                    itemEndDate: value[1],
                  }));
                } else {
                  setSelectedDates((prevSelectedIds) => ({
                    ...prevSelectedIds,
                    itemStartDate: "",
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
              clearBtn
              preventFirstSelection
              label="Select Issuance Items"
              data={getAllItemsOptions()}
              displayedLabels={2}
              optionsSelectedLabel={"items selected"}
              onValueChange={(data) => {
                if ("length" in data && data.length > 0) {
                  setSelectedIds((prevState) => ({
                    ...prevState,
                    itemIds: data.map((res) => `${res.value}` ?? 0),
                  }));
                } else {
                  setSelectedIds((prevState) => ({
                    ...prevState,
                    itemIds: [],
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
            data && <DoughnutChartContainer graphData={data} type="item" />
          )}
        </div>
        <div className="col-md-6 col-sm-12 my-3">
          {issuanceLoading ? (
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
            issuanceData && (
              <IssuedDoughnutChartContainer
                type="item"
                graphData={issuanceData}
              />
            )
          )}
        </div>
      </div>
    </>
  );
}

export default ItemsChartSection;
