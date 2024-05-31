import DataTable from "shared/Components/DataTable";
import {
  dailyProductionResponse,
  summaryData,
} from "redux/types/Productions/dailyProduction";
import { convertWghtToLbs, roundValue } from "helper/utility";

interface Props {
  summaryTable: dailyProductionResponse;
}
export default function SummaryTables({ summaryTable }: Props) {
  return (
    <>
      {summaryTable?.stockRoomSummary &&
        summaryTable.stockRoomSummary.length > 0 && (
          <div className="mt-4">
            <h6 className="fw700 darkGrey">Stock Rooms</h6>
            <DataTable
              isLoading={false}
              columns={[
                { label: "Name", field: "name" },
                { label: "Units", field: "units" },
                { label: "(KGS)", field: "kgs" },
                { label: "(LBS)", field: "lbs" },
              ]}
              tableTitle="StockRoom Summary"
              rows={
                summaryTable?.stockRoomSummary
                  ? summaryTable?.stockRoomSummary.map((item: summaryData) => {
                      // Convert to seconds
                      return {
                        name: item?.name ? item?.name : "-",
                        units: item?.quantity ? item?.quantity : 0,
                        kgs: item?.weightKg ? roundValue(item?.weightKg) : 0,
                        lbs: item?.weightKg
                          ? roundValue(convertWghtToLbs(item?.weightKg))
                          : 0,
                      };
                    })
                  : []
              }
            />
          </div>
        )}
      {summaryTable?.saleOrderSummmary &&
        summaryTable.saleOrderSummmary.length > 0 && (
          <div className="mt-4 mx-4 ps-2">
            <h6 className="fw700 darkGrey">Sale Orders</h6>
            <DataTable
              isLoading={false}
              columns={[
                { label: "Name", field: "name" },
                { label: "Units", field: "units" },
                { label: "(KGS)", field: "kgs" },
                { label: "(LBS)", field: "lbs" },
              ]}
              rows={
                summaryTable?.saleOrderSummmary
                  ? summaryTable?.saleOrderSummmary.map((item: summaryData) => {
                      // Convert to seconds
                      return {
                        name: item?.reference ? item?.reference : "-",
                        units: item?.quantity ? item?.quantity : 0,
                        kgs: item?.weightKg ? roundValue(item?.weightKg) : 0,
                        lbs: item?.weightKg
                          ? roundValue(convertWghtToLbs(item?.weightKg))
                          : 0,
                      };
                    })
                  : []
              }
            />
          </div>
        )}
      {summaryTable?.labelTypeSummary &&
        summaryTable.labelTypeSummary.length > 0 && (
          <div className="mt-4">
            <h6 className="fw700 darkGrey">Label Types</h6>
            <DataTable
              isLoading={false}
              columns={[
                { label: "Name", field: "name" },
                { label: "Units", field: "units" },
                { label: "(KGS)", field: "kgs" },
                { label: "(LBS)", field: "lbs" },
              ]}
              rows={
                summaryTable?.labelTypeSummary
                  ? summaryTable?.labelTypeSummary.map((item: summaryData) => {
                      // Convert to seconds
                      return {
                        name: item?.name ? item?.name : "-",
                        units: item?.quantity ? item?.quantity : 0,
                        kgs: item?.weightKg ? roundValue(item?.weightKg) : 0,
                        lbs: item?.weightKg
                          ? roundValue(convertWghtToLbs(item?.weightKg))
                          : 0,
                      };
                    })
                  : []
              }
            />
          </div>
        )}
      {summaryTable?.departmentSummary &&
        summaryTable.departmentSummary.length > 0 && (
          <div className="mt-4">
            <h6 className="fw700 darkGrey">Departments</h6>
            <DataTable
              isLoading={false}
              columns={[
                { label: "Name", field: "name" },
                { label: "Units", field: "units" },
                { label: "(KGS)", field: "kgs" },
                { label: "(LBS)", field: "lbs" },
              ]}
              rows={
                summaryTable?.departmentSummary
                  ? summaryTable?.departmentSummary.map((item: summaryData) => {
                      // Convert to seconds
                      return {
                        name: item?.name ? item?.name : "",
                        units: item?.quantity ? item?.quantity : 0,
                        kgs: item?.weightKg ? roundValue(item?.weightKg) : 0,
                        lbs: item?.weightKg
                          ? roundValue(convertWghtToLbs(item?.weightKg))
                          : 0,
                      };
                    })
                  : []
              }
            />
          </div>
        )}
      {summaryTable?.floorSummary && summaryTable.floorSummary.length > 0 && (
        <div className="mt-4">
          <h6 className="fw700 darkGrey">Floors</h6>
          <DataTable
            isLoading={false}
            columns={[
              { label: "Name", field: "name" },
              { label: "Units", field: "units" },
              { label: "(KGS)", field: "kgs" },
              { label: "(LBS)", field: "lbs" },
            ]}
            rows={
              summaryTable?.floorSummary
                ? summaryTable?.floorSummary.map((item: summaryData) => {
                    return {
                      name: item?.name ? item?.name : "-",
                      units: item?.quantity ? item?.quantity : 0,
                      kgs: item?.weightKg ? roundValue(item?.weightKg) : 0,
                      lbs: item?.weightKg
                        ? roundValue(convertWghtToLbs(item?.weightKg))
                        : 0,
                    };
                  })
                : []
            }
          />
        </div>
      )}
      {summaryTable?.workerSummary && summaryTable.workerSummary.length > 0 && (
        <div className="mt-4">
          <h6 className="fw700 darkGrey">Workers</h6>
          <DataTable
            isLoading={false}
            columns={[
              { label: "Name", field: "name" },
              { label: "Units", field: "units" },
              { label: "(KGS)", field: "kgs" },
              { label: "(LBS)", field: "lbs" },
            ]}
            rows={
              summaryTable?.workerSummary
                ? summaryTable?.workerSummary.map((item: summaryData) => {
                    // Convert to seconds
                    return {
                      name: item?.fullName ? item?.fullName : "-",
                      units: item?.quantity ? item?.quantity : 0,
                      kgs: item?.weightKg ? roundValue(item?.weightKg) : 0,
                      lbs: item?.weightKg
                        ? roundValue(convertWghtToLbs(item?.weightKg))
                        : 0,
                    };
                  })
                : []
            }
          />
        </div>
      )}
    </>
  );
}
