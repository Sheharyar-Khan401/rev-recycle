import {
  MDBAccordion,
  MDBAccordionItem,
  MDBDatepicker,
  MDBSelect,
} from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import {
  useGetAllCategoryItemsQuery,
  useGetCategoryQuery,
} from "redux/features/Settings/purchase/categoryApiSlice";
import {
  AllCategoryItems,
  Categories,
  CategoryRequest,
} from "redux/types/Settings/Purchase/categories";
import { useGetLabelTypesQuery } from "redux/features/Settings/Productions/labeltypesApiSlice";
import { format, isValid } from "date-fns";
import { useGetAllProdPurchaseItemsQuery } from "redux/features/Settings/purchase/itemApiSlice";
import DoughnutChartContainer from "components/Dashboard/Overview/prodDoghnutChartContainer";
import IssuedDoughnutChartContainer from "components/Dashboard/Overview/issuedMaterialChartContainer";
import Loader from "shared/Components/Loader/Loader";
import {
  useLazyGetDailyProductionGraphDetailsQuery,
  useLazyGetIssuedMaterialGraphDetailsQuery,
} from "redux/features/Dashboard/dashboardApiSlice";
import { useGetAllProductionItemsQuery } from "redux/features/Settings/Productions/productionItemApiSlice";
import RangePicker from "shared/Components/RangePicker";
import { Item } from "redux/types/Settings/Productions/items";
import Issuances from "./Issuances";
import TotalIssuance from "./totalIssuance";
import ItemsChartSection from "container/Grader/Production/Overview/ItemsChartSection";
import CategoriesChartSection from "./CategoriesChartSection";

export type selectedids = {
  labelTypeIds: string[];
  itemIds: string[];
  categoryIds: string[];
  productionIds: string[];
  productionLabelTypeIds: string[];
  prodCateoryIds: string[];
  supplierIds: string[];
  issuanceTypeIds: string[];
};

export type selectedDates = {
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

export default function DashboardOverview() {
  const { data: labelTypesList } = useGetLabelTypesQuery(null);
  const [getCategoryGraphDetails, categoryResults] =
    useLazyGetDailyProductionGraphDetailsQuery();
  const [getLabelsGraphDetails, labelResults] =
    useLazyGetDailyProductionGraphDetailsQuery();
  const [getItemsGraphDetails, itemsResults] =
    useLazyGetDailyProductionGraphDetailsQuery();
  const [getCategoryIssuedGraphDetails, issuedCategoryResults] =
    useLazyGetIssuedMaterialGraphDetailsQuery();
  const [getLabelIssuedGraphDetails, issuedLabelsResults] =
    useLazyGetIssuedMaterialGraphDetailsQuery();
  const [getItemsIssuedGraphDetails, issuedItemsResults] =
    useLazyGetIssuedMaterialGraphDetailsQuery();

  const queryParams = {
    startDate: format(new Date(), "yyyy-MM-dd"),
    endDate: format(new Date(), "yyyy-MM-dd"),
  };
  const defaultStartDate = format(new Date(), "dd MMM, yyyy");

  const [selectedIds, setSelectedIds] = useState<selectedids>({
    labelTypeIds: [],
    itemIds: [],
    categoryIds: [],
    productionIds: [],
    productionLabelTypeIds: [],
    prodCateoryIds: [],
    supplierIds: [],
    issuanceTypeIds: [],
  });
  const [selectedDates, setSelectedDates] = useState({
    labelStartDate: defaultStartDate,
    labelEndDate: defaultStartDate,
    itemStartDate: defaultStartDate,
    itemEndDate: defaultStartDate,
    CategorStartDate: defaultStartDate,
    CategorEndDate: defaultStartDate,
    productionStartDate: defaultStartDate,
    productionEndDate: defaultStartDate,
    prodLabelStartDate: defaultStartDate,
    prodLabelEndDate: defaultStartDate,
    prodCategoryStartDate: defaultStartDate,
    prodCategoryEndDate: defaultStartDate,
    totalIssuanceStartDate: defaultStartDate,
    totalIssuanceEndDate: defaultStartDate,
  });

  useEffect(() => {
    const itemParams = { ...queryParams, field: "item" };
    const isStartDateValid = isValid(new Date(selectedDates.itemStartDate));
    const isendDateValid = isValid(new Date(selectedDates.itemEndDate));
    if (
      selectedIds.itemIds.length > 0 ||
      (selectedDates.itemStartDate.length > 0 &&
        isStartDateValid &&
        isendDateValid)
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
  }, [
    selectedIds.itemIds,
    selectedDates.itemStartDate,
    selectedDates.itemEndDate,
  ]);

  useEffect(() => {
    const itemParams = { ...queryParams, field: "item" };
    const isStartDateValid = isValid(
      new Date(selectedDates.productionStartDate)
    );
    const isendDateValid = isValid(new Date(selectedDates.productionEndDate));
    if (
      selectedIds.productionIds.length > 0 ||
      (selectedDates.productionStartDate.length > 0 &&
        isStartDateValid &&
        isendDateValid)
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
  }, [
    selectedIds.productionIds,
    selectedDates.productionStartDate,
    selectedDates.productionEndDate,
  ]);

  useEffect(() => {
    const categoryParams = { ...queryParams, field: "category" };
    const isStartDateValid = isValid(new Date(selectedDates.CategorStartDate));
    const isendDateValid = isValid(new Date(selectedDates.CategorEndDate));
    if (
      selectedIds.categoryIds.length > 0 ||
      (selectedDates.CategorStartDate.length > 0 &&
        isStartDateValid &&
        isendDateValid)
    ) {
      getCategoryIssuedGraphDetails({
        ...categoryParams,
        startDate: format(
          new Date(selectedDates.CategorStartDate),
          "yyyy-MM-dd"
        ),
        endDate: format(new Date(selectedDates.CategorEndDate), "yyyy-MM-dd"),
        categoryIds: selectedIds.categoryIds ?? null,
      });
    }
  }, [
    selectedIds.categoryIds,
    selectedDates.CategorStartDate,
    selectedDates.CategorEndDate,
  ]);

  useEffect(() => {
    const categoryParams = { ...queryParams, field: "category" };
    const isStartDateValid = isValid(
      new Date(selectedDates.prodCategoryStartDate)
    );
    const isendDateValid = isValid(new Date(selectedDates.prodCategoryEndDate));
    if (
      selectedIds.prodCateoryIds.length > 0 ||
      (selectedDates.prodCategoryStartDate.length > 0 &&
        isStartDateValid &&
        isendDateValid)
    ) {
      getCategoryGraphDetails({
        ...categoryParams,
        startDate: format(
          new Date(selectedDates.prodCategoryStartDate),
          "yyyy-MM-dd"
        ),
        endDate: format(
          new Date(selectedDates.prodCategoryEndDate),
          "yyyy-MM-dd"
        ),
        categoryIds: selectedIds.prodCateoryIds ?? null,
      });
    }
  }, [
    selectedIds.prodCateoryIds,
    selectedDates.prodCategoryStartDate,
    selectedDates.prodCategoryEndDate,
  ]);

  useEffect(() => {
    const labelParams = { ...queryParams, field: "labelType" };
    const isStartDateValid = isValid(new Date(selectedDates.labelStartDate));
    const isendDateValid = isValid(new Date(selectedDates.labelEndDate));
    if (
      selectedIds.labelTypeIds.length > 0 ||
      (selectedDates.labelStartDate.length > 0 &&
        isStartDateValid &&
        isendDateValid)
    ) {
      getLabelIssuedGraphDetails({
        ...labelParams,
        startDate: format(new Date(selectedDates.labelStartDate), "yyyy-MM-dd"),
        endDate: format(new Date(selectedDates.labelEndDate), "yyyy-MM-dd"),
        labelTypeIds: selectedIds.labelTypeIds ?? "null",
      });
    }
  }, [
    selectedIds.labelTypeIds,
    selectedDates.labelStartDate,
    selectedDates.labelEndDate,
  ]);

  useEffect(() => {
    const labelParams = { ...queryParams, field: "labelType" };
    const isStartDateValid = isValid(
      new Date(selectedDates.prodLabelStartDate)
    );
    const isendDateValid = isValid(new Date(selectedDates.prodLabelEndDate));
    if (
      selectedIds.productionLabelTypeIds.length > 0 ||
      (selectedDates.prodLabelStartDate.length > 0 &&
        isStartDateValid &&
        isendDateValid)
    ) {
      getLabelsGraphDetails({
        ...labelParams,
        startDate: format(
          new Date(selectedDates.prodLabelStartDate),
          "yyyy-MM-dd"
        ),
        endDate: format(new Date(selectedDates.prodLabelEndDate), "yyyy-MM-dd"),
        labelTypeIds: selectedIds.productionLabelTypeIds ?? null,
      });
    }
  }, [
    selectedIds.productionLabelTypeIds,
    selectedDates.prodLabelStartDate,
    selectedDates.prodLabelEndDate,
  ]);

  const getLabelTypesOptions = () => {
    if (labelTypesList?.length) {
      return labelTypesList.map((labelTypes) => {
        return {
          text: labelTypes?.name ? labelTypes?.name : "",
          value: labelTypes?.labelTypeId ? labelTypes?.labelTypeId : 0,
          // defaultSelected: selectedIds.labelTypeIds.includes(
          //   `${labelTypes.labelTypeId}`
          // ),
        };
      });
    } else return [];
  };

  const getLabelTypesOptionsForProd = () => {
    if (labelTypesList?.length) {
      return labelTypesList.map((labelTypes) => {
        return {
          text: labelTypes?.name ? labelTypes?.name : "",
          value: labelTypes?.labelTypeId ? labelTypes?.labelTypeId : 0,
          // defaultSelected: selectedIds.productionLabelTypeIds.includes(
          //   `${labelTypes.labelTypeId}`
          // ),
        };
      });
    } else return [];
  };

  return (
    <div className="my-5">
      <TotalIssuance
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
        selectedDates={selectedDates}
        setSelectedDates={setSelectedDates}
        issuedLabelsResults={labelResults.data}
        issuedLabelsResultsLoading={labelResults.isFetching}
        getLabelTypesOptions={getLabelTypesOptionsForProd}
      />

      <MDBAccordion flush>
        <MDBAccordionItem
          bodyClassName="px-0"
          headerClassName="px-0"
          collapseId={1}
          headerTitle={
            <h4
              className="d-flex align-items-center fw500 black"
              style={{
                marginLeft: -23,
                marginRight: -23,
              }}
            >
              Items & Categories
            </h4>
          }
        >
          <>
            <h4 className="d-flex align-items-center fw500 black">Items</h4>
            <ItemsChartSection
              selectedIds={selectedIds}
              setSelectedIds={setSelectedIds}
              selectedDates={selectedDates}
              setSelectedDates={setSelectedDates}
              data={itemsResults.data}
              loading={itemsResults.isFetching}
              issuanceLoading={issuedItemsResults.isFetching}
              issuanceData={issuedItemsResults.data}
            />

            <h4 className="d-flex align-items-center fw500 black">
              Categories
            </h4>
            <CategoriesChartSection
              loading={categoryResults.isFetching}
              categoryResults={categoryResults.data}
              selectedIds={selectedIds}
              setSelectedIds={setSelectedIds}
              selectedDates={selectedDates}
              setSelectedDates={setSelectedDates}
              issuedCategoryResultsLoading={issuedCategoryResults.isFetching}
              issuedCategoryResults={issuedCategoryResults.data}
            />
          </>
        </MDBAccordionItem>
      </MDBAccordion>

      {/* <h4 className="d-flex align-items-center fw500 black">Labels</h4>
      <div className="d-flex align-items-end mt-3 justify-content-between">
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
              data={getLabelTypesOptionsForProd()}
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
      </div> */}
      {/* <div className="row">
        <div className="col-md-6 col-sm-12 my-3">
          {labelResults.isFetching ? (
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
            labelResults.data && (
              <DoughnutChartContainer
                graphData={labelResults.data}
                type="label"
              />
            )
          )}
        </div>
        <div className="col-md-6 col-sm-12 my-3">
          {issuedLabelsResults.isFetching ? (
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
            issuedLabelsResults.data && (
              <IssuedDoughnutChartContainer
                graphData={issuedLabelsResults.data}
                type="label"
              />
            )
          )}
        </div>
      </div> */}
      <hr />
      <Issuances />
    </div>
  );
}
