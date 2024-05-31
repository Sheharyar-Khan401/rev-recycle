import { COLORS } from "helper/globalVariables";
import { roundValue } from "helper/utility";
import { MDBBadge, MDBIcon } from "mdb-react-ui-kit";
import { dailyProductionGraphResponse } from "redux/types/Productions/dailyProduction";
import DoughnutChart from "shared/Components/DoughnutChart";

interface componentProps {
  graphData: {
    payLoad: {
      objectList: dailyProductionGraphResponse[];
      weightKgs: number;
      weightLbs: number;
    };
    numberOfItems: number;
  };
  type: string;
}

export default function DoughnutChartContainer({
  graphData,
  type,
}: componentProps) {
  let otherPercent = { label: "", value: 0 };

  const getGraphData = (data: dailyProductionGraphResponse[]) => {
    let graphDetails = [...data];

    let sumItemTotalWeightLbsPercent = 0;
    let sumItemTotalWeightLbs = 0;
    const totalweight =
      type === "category"
        ? graphData.payLoad.weightLbs
        : type === "label"
        ? graphData.payLoad.weightLbs
        : graphData.payLoad.weightLbs;

    if (totalweight) {
      sumItemTotalWeightLbsPercent = data.reduce(
        (sum, item) =>
          sum + roundValue((item.itemTotalWeightLbs / totalweight) * 100),
        0
      );
      sumItemTotalWeightLbs = data.reduce(
        (sum, item) => sum + roundValue(item.itemTotalWeightLbs),
        0
      );

      if (sumItemTotalWeightLbsPercent < 100) {
        const otherItem: dailyProductionGraphResponse = {
          dailyProductionDate: Date.now(),
          itemName: "Other",
          itemTotalWeightKgs: 0,
          itemTotalWeightLbs: 100 - sumItemTotalWeightLbsPercent,
          itemWeightKgs: 0,
          itemWeightLbs: totalweight - sumItemTotalWeightLbs,
          categoryName: "Other",
          labelType: "Other",
          totalWeightKgs: 0,
          totalWeightLbs: 0,
          units: 0,
          amount: 0,
        };
        graphDetails.push(otherItem);
        otherPercent = {
          label: "Other",
          value: roundValue(otherItem.itemWeightLbs),
        };
      }
    }

    return graphDetails?.map((res) => {
      return {
        name:
          type === "category"
            ? res.categoryName
            : type === "label"
            ? res.labelType
            : res.itemName,
        value:
          res?.itemTotalWeightLbs && totalweight && res?.labelType !== "Other"
            ? roundValue((res.itemTotalWeightLbs / totalweight) * 100)
            : res?.labelType === "Other"
            ? roundValue(res.itemTotalWeightLbs)
            : 0,
      };
    });
  };

  return (
    <div
      className="d-flex"
      style={{
        background: "#F7F9FB",
        borderRadius: "1rem",
      }}
    >
      <div
        className="align-items-center d-flex justify-content-center"
        style={{ width: "50%", minHeight: "18.75rem" }}
      >
        {graphData.payLoad.objectList &&
        graphData.payLoad.objectList.length > 0 ? (
          <DoughnutChart
            showLabel
            data={getGraphData(graphData.payLoad.objectList || [])}
          />
        ) : (
          <MDBBadge
            className="text-white py-3 px-4"
            pill
            light
            style={{ background: COLORS[1], fontSize: "13px" }}
          >
            No graph data available
          </MDBBadge>
        )}
      </div>
      <div className="d-flex flex-column text-start justify-content-center align-items-start">
        <div
          style={{
            color: "#747475",
            fontSize: "16px",
          }}
        >
          Total Production
        </div>
        <div className="h4 fw-bold">
          {graphData.payLoad.weightLbs
            ? graphData.payLoad.weightLbs.toFixed(0) + " LBs"
            : "0.00"}
        </div>
        <div>
          {graphData.payLoad.objectList &&
            graphData.payLoad.objectList.length > 0 &&
            graphData.payLoad.objectList.map((res, index) => {
              return (
                <div className="d-flex">
                  <div className="d-flex justify-content-center align-items-center me-2">
                    <MDBIcon
                      icon="circle"
                      style={{ color: COLORS[index], fontSize: "8px" }}
                    />
                  </div>
                  <span
                    style={{
                      color: "#747475",
                      fontSize: "13px",
                    }}
                  >
                    <span className="text-black me-1">
                      {type === "label"
                        ? res.labelType
                        : type === "category"
                        ? res.categoryName
                        : res.itemName}
                    </span>
                    ({`${roundValue(res.itemTotalWeightLbs)} `}
                    Lbs)
                  </span>
                </div>
              );
            })}
          {otherPercent.label && (
            <div className="d-flex">
              <div className="d-flex justify-content-center align-items-center me-2">
                <MDBIcon
                  icon="circle"
                  style={{
                    color: COLORS[graphData.numberOfItems],
                    fontSize: "8px",
                  }}
                />
              </div>
              <span
                style={{
                  color: "#747475",
                  fontSize: "13px",
                }}
              >
                <span className="text-black me-1">{otherPercent.label}</span>(
                {otherPercent.value} Lbs)
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
