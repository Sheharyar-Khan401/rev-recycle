import { MDBSelect } from "mdb-react-ui-kit";
import CountBoxes from "components/Dashboard/CountBoxes";
import arrowRight from "assets/icons/arrow-right-icon.svg";
import { useNavigate } from "react-router-dom";
import {
  useLazyGetCodesCountQuery,
  useLazyGetContainersCountQuery,
  useLazyGetDailyProductionGraphDetailsQuery,
  useLazyGetIssuedMaterialGraphDetailsQuery,
  useLazyGetTotalDailyProductionQuery,
  useLazyGetTotalGatepassesQuery,
  useLazyGetTotalPurchaseOrderInventoryQuery,
} from "redux/features/Dashboard/dashboardApiSlice";
import { useEffect, useState } from "react";
import Loader from "shared/Components/Loader/Loader";
import DoughnutChartContainer from "components/Dashboard/Overview/prodDoghnutChartContainer";
import IssuedDoughnutChartContainer from "components/Dashboard/Overview/issuedMaterialChartContainer";
import { format, isValid } from "date-fns";
import { useGetAllProdPurchaseItemsQuery } from "redux/features/Settings/purchase/itemApiSlice";
import { useGetAllProductionItemsQuery } from "redux/features/Settings/Productions/productionItemApiSlice";
import RangePicker from "shared/Components/RangePicker";
import { Item } from "redux/types/Settings/Productions/items";
import CodesDetails from "components/Dashboard/CodesDetails";
import SaleOrderGraph from "./SaleOrderGraph";

type selectedids = {
  productionIds: string[];
  itemIds: string[];
};

export default function Dashboard() {
  const navigate = useNavigate();
  const queryParams = {
    startDate: format(new Date(), "yyyy-MM-dd"),
    endDate: format(new Date(), "yyyy-MM-dd"),
  };
  const defaultStartDate = format(new Date(), "dd MMM, yyyy");

  const [getTotalGatePasses, gatePasses] = useLazyGetTotalGatepassesQuery();
  const [getTotalProduction, dailyProductionCount] =
    useLazyGetTotalDailyProductionQuery();
  const [getTotalPurchaseOrderInventory, orderInventory] =
    useLazyGetTotalPurchaseOrderInventoryQuery();
  const [getContainersCount, containerCount] = useLazyGetContainersCountQuery();
  const [getCodesCountForCategory, codesCountForCategory] =
    useLazyGetCodesCountQuery();
  const [getCodesCountForLabelType, codesCountForLabelType] =
    useLazyGetCodesCountQuery();
  const [getCodesCountForDepartment, codesCountForDepartment] =
    useLazyGetCodesCountQuery();
  const [getItemsGraphDetails, itemsResults] =
    useLazyGetDailyProductionGraphDetailsQuery();
  const [getItemsIssuedGraphDetails, issuedItemsResults] =
    useLazyGetIssuedMaterialGraphDetailsQuery();
  const { data: allItems, isLoading: itemsLoading } =
    useGetAllProdPurchaseItemsQuery(null);

  const { data: productionItemsList } = useGetAllProductionItemsQuery(null);

  const [selectedIds, setSelectedIds] = useState<selectedids>({
    productionIds: [],
    itemIds: [],
  });

  const [selectedDates, setSelectedDates] = useState({
    productionStartDate: defaultStartDate,
    productionEndDate: defaultStartDate,
    itemStartDate: defaultStartDate,
    itemEndDate: defaultStartDate,
  });

  useEffect(() => {
    getTotalGatePasses({ creationDate: format(new Date(), "yyyy-MM-dd") });
    getTotalPurchaseOrderInventory("");
    getContainersCount("");
    getCodesCountForCategory({
      // startDate: format(new Date(), "yyyy-MM-dd"),
      // endDate: format(new Date(), "yyyy-MM-dd"),
      field: "category",
    });
    getCodesCountForDepartment({
      // startDate: format(new Date(), "yyyy-MM-dd"),
      // endDate: format(new Date(), "yyyy-MM-dd"),
      field: "department",
    });
    getCodesCountForLabelType({
      // startDate: format(new Date(), "yyyy-MM-dd"),
      // endDate: format(new Date(), "yyyy-MM-dd"),
      field: "labeltype",
    });
    getTotalProduction("");
  }, []);

  useEffect(() => {
    const itemParams = { ...queryParams, field: "item" };
    const isStartDateValid = isValid(new Date(selectedDates.itemStartDate));
    const isendDateValid = isValid(new Date(selectedDates.itemEndDate));
    if (
      (selectedIds.itemIds.length > 0 ||
        selectedDates.itemStartDate.length > 0) &&
      isStartDateValid &&
      isendDateValid
    ) {
      getItemsIssuedGraphDetails({
        ...itemParams,
        startDate: format(new Date(selectedDates.itemStartDate), "yyyy-MM-dd"),
        endDate: format(new Date(selectedDates.itemEndDate), "yyyy-MM-dd"),
        itemIds: selectedIds.itemIds ?? null,
      });
    } else {
      getItemsIssuedGraphDetails(itemParams);
    }
  }, [selectedIds.itemIds, selectedDates.itemStartDate]);

  useEffect(() => {
    const itemParams = { ...queryParams, field: "item" };
    const isStartDateValid = isValid(
      new Date(selectedDates.productionStartDate)
    );
    const isEndDateValid = isValid(new Date(selectedDates.productionEndDate));
    if (
      (selectedIds.productionIds.length > 0 ||
        selectedDates.productionStartDate.length > 0) &&
      isStartDateValid &&
      isEndDateValid
    ) {
      getItemsGraphDetails({
        ...itemParams,
        startDate: format(
          new Date(selectedDates.productionStartDate),
          "yyyy-MM-dd"
        ),
        endDate: format(
          new Date(selectedDates.productionEndDate),
          "yyyy-MM-dd"
        ),
        itemIds: selectedIds.productionIds ?? null,
      });
    } else {
      getItemsGraphDetails(itemParams);
    }
  }, [selectedIds.productionIds, selectedDates.productionStartDate]);

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

      return result.map((res, index) => {
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

  return (
    <div>
      <div className="my-5">
        <h5 className="fw500 black">Performance & Overview</h5>
        <div className="d-flex gap-3 mt-3">
          <CountBoxes
            title="Containers In Transit"
            totalCount={containerCount.data?.payLoad ?? 0.0}
          />
          <CountBoxes
            title="Raw Material Inventory (LBs)"
            totalCount={
              orderInventory.data?.payLoad?.totalRawMaterialWeight ?? 0.0
            }
            info={
              Math.floor(
                (orderInventory.data?.payLoad?.totalRawMaterialWeight ?? 0) /
                  44000
              ) + " containers"
            }
          />
          <CountBoxes
            title="Raw Material Inventory (Price)"
            totalCount={
              orderInventory.data?.payLoad?.totalRawMaterialAmount ?? 0.0
            }
          />
          <CountBoxes
            title="Outward Gate Passes"
            totalCount={gatePasses.data?.payLoad?.saleGatePasses ?? 0}
          />
          <CountBoxes
            title="Finished Good Inventory(Ready for Sale)"
            totalCount={
              dailyProductionCount.data?.payLoad?.dailyProductionItems ?? 0.0
            }
          />
        </div>
      </div>
      <div className="my-5">
        <h5 className="fw500 black">Tickets Overview</h5>
        <div className="d-flex gap-3 mt-3">
          <CodesDetails
            title="Categories"
            codesCount={codesCountForCategory.data?.payLoad ?? []}
            field="category"
          />
          <CodesDetails
            title="Department"
            codesCount={codesCountForDepartment.data?.payLoad ?? []}
            field="department"
          />
          <CodesDetails
            title="Label Type"
            codesCount={codesCountForLabelType.data?.payLoad ?? []}
            field="labelType"
          />
        </div>
      </div>
      <h5 className="d-flex fw500 black mb-4">
        Production
        <span
          role="button"
          style={{ fontSize: "12px", color: "#1E3BB3" }}
          className="mx-3 mt-1 d-flex fw-normal align-items-center"
          onClick={() => navigate("/grader/production/overview")}
        >
          {`View All `}
          <img className="mx-1" width={9.4} height={9.4} src={arrowRight} />
        </span>
      </h5>
      <div className="row">
        <div className="col-md-6 col-sm-12 mb-3">
          <div className="d-flex my-2">
            <div className="me-3 ms-1">
              <RangePicker
                value={[
                  selectedDates.productionStartDate,
                  selectedDates.productionEndDate,
                ]}
                onChange={(value) => {
                  let startValue = value[0];
                  let endValue = value[1];
                  if (value) {
                    setSelectedDates((prevSelectedIds) => ({
                      ...prevSelectedIds,
                      productionStartDate: startValue,
                      productionEndDate: endValue,
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
                search
                size="sm"
                selectAll={false}
                multiple
                clearBtn
                preventFirstSelection
                displayedLabels={2}
                optionsSelectedLabel={"items selected"}
                label="Select Production Items"
                data={getProductionItemsList()}
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
          {itemsResults.isLoading ? (
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
            itemsResults.data && (
              <DoughnutChartContainer
                graphData={itemsResults.data}
                type="item"
              />
            )
          )}
        </div>
        <div className="col-md-6 col-sm-12 mb-3">
          <div className="d-flex justify-content-end my-2">
            <div className="me-3">
              <RangePicker
                value={[selectedDates.itemStartDate, selectedDates.itemEndDate]}
                onChange={(value) => {
                  let startValue = value[0];
                  let endValue = value[1];
                  if (value) {
                    setSelectedDates((prevSelectedIds) => ({
                      ...prevSelectedIds,
                      itemStartDate: startValue,
                      itemEndDate: endValue,
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
            <div style={{ width: "12.8rem" }} className="me-1">
              <MDBSelect
                search
                size="sm"
                clearBtn
                selectAll={false}
                multiple
                preventFirstSelection
                displayedLabels={2}
                optionsSelectedLabel={"items selected"}
                label="Select Issuance Items"
                data={getAllItemsOptions()}
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
          {issuedItemsResults.isLoading ? (
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
            issuedItemsResults.data && (
              <IssuedDoughnutChartContainer
                type="item"
                graphData={issuedItemsResults.data}
              />
            )
          )}
        </div>
      </div>
      <SaleOrderGraph/>

      {/********************** Commented Linebar chart from Dashboard to use later ******************/}
      {/* <div className="my-5">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="black">
              Sales
              <span
              role="button"
              style={{ fontSize: "12px", color:"#1E3BB3" }}
              className="mx-2 fw-normal"
            >
              {`View All `}
              <img width={9.4} height={9.4} src={arrowRight} />
            </span>
            </h5>
            <div className="d-flex align-items-center flex-md-row flex-column">
              <div className="mx-3">
                <MDBSelect
                  preventFirstSelection
                  placeholder="Select..."
                  defaultValue={""}
                  data={[
                    { text: "Weekly", value: 1 },
                    { text: "Monthly", value: 2 },
                    { text: "Yearly", value: 3 },
                  ]}
                />
              </div>
              <div>
                <MDBSelect
                  clearBtn
                  preventFirstSelection
                  placeholder="Select..."
                  defaultValue={""}
                  data={[
                    { text: "One", value: 1 },
                    { text: "Two", value: 2 },
                    { text: "Three", value: 3 },
                    { text: "Four", value: 4 },
                    { text: "Five", value: 5 },
                    { text: "Six", value: 6 },
                    { text: "Seven", value: 7 },
                    { text: "Eight", value: 8 },
                  ]}
                />
              </div>
            </div>
          </div>
          <div
            className="my-3 px-2 rounded-4 py-2"
            style={{ backgroundColor: "#F7F9FB" }}
          >
            <LineBarChart
              data={[
                {
                  name: "A",
                  uv: 3000,
                  pv: 6400,
                  amt: 2400,
                },
                {
                  name: "B",
                  uv: 4000,
                  pv: 2398,
                  amt: 2210,
                },
                {
                  name: "C",
                  uv: 3000,
                  pv: 4800,
                  amt: 2290,
                },
                {
                  name: "D",
                  uv: 4780,
                  pv: 2908,
                  amt: 2000,
                },
                {
                  name: "E",
                  uv: 1890,
                  pv: 4800,
                  amt: 2181,
                },
                {
                  name: "AF",
                  uv: 2390,
                  pv: 3800,
                  amt: 2500,
                },
                {
                  name: "G",
                  uv: 5490,
                  pv: 3300,
                  amt: 2100,
                },
              ]}
            />
          </div>
          <div className="my-5">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="black">
                Trends
                <span
              role="button"
              style={{ fontSize: "12px", color:"#1E3BB3" }}
              className="mx-2 fw-normal"
            >
              {`View All `}
              <img width={9.4} height={9.4} src={arrowRight} />
            </span>
              </h5>
              <div className="d-flex align-items-center flex-md-row flex-column">
                <div className="mx-3">
                  <MDBSelect
                    preventFirstSelection
                    placeholder="Select..."
                    defaultValue={""}
                    data={[
                      { text: "Weekly", value: 1 },
                      { text: "Monthly", value: 2 },
                      { text: "Yearly", value: 3 },
                    ]}
                  />
                </div>
                <div>
                  <MDBSelect
                    clearBtn
                    preventFirstSelection
                    placeholder="Select..."
                    defaultValue={""}
                    data={[
                      { text: "One", value: 1 },
                      { text: "Two", value: 2 },
                      { text: "Three", value: 3 },
                      { text: "Four", value: 4 },
                      { text: "Five", value: 5 },
                      { text: "Six", value: 6 },
                      { text: "Seven", value: 7 },
                      { text: "Eight", value: 8 },
                    ]}
                  />
                </div>
              </div>
            </div>
            <div
              className="my-3 px-2 rounded-4 py-2"
              style={{ backgroundColor: "#F7F9FB" }}
            >
              <LineBarChart
                data={[
                  {
                    name: "Jan",
                    uv: 4000,
                    pv: 2100,
                    amt: 2400,
                  },
                  {
                    name: "Feb",
                    uv: 3000,
                    pv: 1398,
                    amt: 2210,
                  },
                  {
                    name: "Mar",
                    uv: 2000,
                    pv: 5800,
                    amt: 2290,
                  },
                  {
                    name: "Apr",
                    uv: 2780,
                    pv: 3408,
                    amt: 2000,
                  },
                  {
                    name: "May",
                    uv: 1890,
                    pv: 4800,
                    amt: 2181,
                  },
                  {
                    name: "Jun",
                    uv: 2790,
                    pv: 3800,
                    amt: 2500,
                  },
                  {
                    name: "Jul",
                    uv: 3290,
                    pv: 4100,
                    amt: 2100,
                  },
                ]}
              />
            </div>
          </div>
        </div> */}
    </div>
  );
}
