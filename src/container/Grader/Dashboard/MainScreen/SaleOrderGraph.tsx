import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllSaleOrdersQuery } from "redux/features/sales/Orders/saleOrdersApiSlice";
import arrowRight from "assets/icons/arrow-right-icon.svg";
import { MDBSelect } from "mdb-react-ui-kit";
import { useLazyGetCurrentSaleOrderQuery } from "redux/features/Dashboard/dashboardApiSlice";
import CustomPieChart from "shared/Components/DoughnutChart";
import { roundValue } from "helper/utility";
import { PieChartLegend } from "shared/Components/CustomPieChartLegend";
import { COLORS } from "helper/globalVariables";
import { format } from "date-fns";
import RangePicker from "shared/Components/RangePicker";

export default function SaleOrderGraph() {
  const { data: saleOrderData } = useGetAllSaleOrdersQuery(null);

  const [triggerCurrentSaleOrdersData, currentSaleOrdersData] =
    useLazyGetCurrentSaleOrderQuery();
  const [queryParams, setQueryParams] = useState({
    startDate: format(
      new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      "dd MMM, yyyy"
    ),
    endDate: format(new Date(), "dd MMM, yyyy"),
    saleOrderIds: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    triggerCurrentSaleOrdersData({
      ...queryParams,
      startDate: format(new Date(queryParams.startDate), "yyyy-MM-dd"),
      endDate: format(new Date(queryParams.endDate), "yyyy-MM-dd"),
    });
  }, [queryParams]);

  return (
    <div>
      <div className="d-flex  mt-5 mb-3 justify-content-between">
        <h5 className="d-flex fw500 black">
          Current Sale Order
          <span
            role="button"
            style={{ fontSize: "12px", color: "#1E3BB3" }}
            className="mx-3 d-flex fw-normal align-items-center"
            onClick={() => navigate("/grader/sales/orders")}
          >
            {`View All `}
            <img className="mx-1" width={9.4} height={9.4} src={arrowRight} />
          </span>
        </h5>
        <div className="d-flex">
          <RangePicker
            value={[queryParams.startDate, queryParams.endDate]}
            onChange={(value) => {
              let startValue = value[0];
              let endValue = value[1];
              if (value) {
                setQueryParams((prev) => ({
                  ...prev,
                  startDate: startValue,
                  endDate: endValue,
                }));
              } else {
                setQueryParams((prev) => ({
                  ...prev,
                  startDate: "",
                  endDate: "",
                }));
              }
            }}
          />
          <div>
            <MDBSelect
              size="sm"
              className="ms-3"
              multiple
              search
              selectAll={false}
              displayedLabels={2}
              optionsSelectedLabel={"items selected"}
              preventFirstSelection
              placeholder="Select Sale Orders"
              defaultValue={""}
              clearBtn
              data={
                saleOrderData
                  ? saleOrderData?.payLoad?.map((saleOrder) => {
                      return {
                        text: saleOrder?.reference ? saleOrder?.reference : "",
                        value: saleOrder?.saleOrderId
                          ? saleOrder?.saleOrderId
                          : 0,
                        defaultSelected: queryParams.saleOrderIds
                          .split(",")
                          .includes(saleOrder.saleOrderId.toString()),
                      };
                    })
                  : []
              }
              onValueChange={(data) => {
                if ("length" in data && data.length > 0) {
                  setQueryParams((prev) => {
                    return {
                      ...prev,
                      saleOrderIds: data.map((d) => d.value).join(","),
                    };
                  });
                } else {
                  setQueryParams((prev) => {
                    return {
                      ...prev,
                      saleOrderIds: "",
                    };
                  });
                }
              }}
            />
          </div>
        </div>
      </div>
      <div className="row">
        {currentSaleOrdersData.data &&
        currentSaleOrdersData.data?.length > 0 ? (
          currentSaleOrdersData.data?.map((sso, i) => {
            return (
              <div
                key={sso.saleOrderId}
                className="col-md-4 col-sm-6 col-lg-4 col-xl-3 mb-4"
              >
                <div
                  className="d-flex px-2"
                  style={{
                    background: "#F7F9FB",
                    borderRadius: "1rem",
                  }}
                >
                  <div className="" style={{ width: "55%" }}>
                    <CustomPieChart
                      showLabel
                      size="sm"
                      data={[
                        { name: "Produced", value: roundValue(sso.produced) },
                        { name: "Remaining", value: roundValue(sso.remaining) },
                      ]}
                    />
                  </div>
                  <div className="d-flex flex-column text-start justify-content-center align-items-start">
                    <div style={{ fontSize: "12px", color: "#747475" }}>
                      Reference # {sso.referenceNo}
                    </div>
                    <div className="fw-bold small">
                      {sso.stockRoomName ?? "-"}
                    </div>
                    <PieChartLegend
                      color={COLORS[0]}
                      value={sso.produced}
                      label="Produced"
                      showPercent
                    />
                    <PieChartLegend
                      color={COLORS[1]}
                      value={sso.remaining}
                      label="Remaining"
                      showPercent
                    />
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="my-4 text-center">No Sale Order Selected!</div>
        )}
      </div>
    </div>
  );
}
