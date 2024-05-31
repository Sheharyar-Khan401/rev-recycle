import { COLORS, months } from "helper/globalVariables";
import { roundValue } from "helper/utility";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  ComposedChart,
} from "recharts";
import {
  NameType,
  Payload,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import { ContainerCostsReport } from "redux/types/Invoices/Invoices";

const ContainersStackChart = ({
  containerCostReport,
  limit,
  onBarClick,
}: {
  limit: number;
  containerCostReport: ContainerCostsReport[];
  onBarClick: (month: string) => void;
}) => {
  const [selectedKey, setSelectedKey] = useState("");
  const [data, setData] = useState<Record<string, number | string>[]>([]);

  useEffect(() => {
    if (containerCostReport) {
      let data: Record<string, number | string>[] = [];
      for (const month of months) {
        let last = 0;
        const x: Record<string, number | string> = containerCostReport
          .filter((d) => d.month == month.name)
          .sort((a, b) => a.costPerLbs - b.costPerLbs)
          .reduce((accumulator, currentObject) => {
            accumulator[month.short + "-" + currentObject.referenceNo] =
              roundValue(currentObject.costPerLbs - last, 3);
            accumulator[
              month.short + "-" + currentObject.referenceNo + "-" + "supplier"
            ] = currentObject.supplier;
            // accumulator["supplier"] = currentObject.supplier;
            accumulator["month"] = month.name;
            if (currentObject.totalCostPerLb)
              accumulator["average"] = currentObject.totalCostPerLb?.toFixed(2);
            if (
              !accumulator.totalContainers ||
              currentObject.totalContainers > +accumulator.totalContainers
            )
              accumulator["totalContainers"] = currentObject.totalContainers;
            last = currentObject.costPerLbs;
            return accumulator;
          }, {} as Record<string, number | string>);
        data = [
          ...data,
          {
            name: month.short,
            ...x,
          },
        ];
      }
      setData(data);
    }
  }, [containerCostReport]);

  const keys = data.reduce((acc, entry) => {
    Object.keys(entry).forEach((key) => {
      if (
        key !== "name" &&
        key !== "month" &&
        key !== "totalCostPerLb" &&
        key !== "average" &&
        key !== "totalContainers" &&
        !key.split("-").includes("supplier") &&
        !acc.find((d) => d.key == key)
      ) {
        acc.push({ key: key, month: entry.month.toString() });
      }
    });
    return acc;
  }, [] as Record<string, string>[]);

  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: Payload<ValueType, NameType>[];
    label: string;
  }) => {
    const getModifiedData = (payload: Payload<ValueType, NameType>[]) => {
      let cummulativeSum: Payload<ValueType, NameType>[] = [];
      payload.forEach((element, i) => {
        const sum =
          i === 0
            ? element.value
            : (cummulativeSum[i - 1].value as number) +
              (element.value as number);
        cummulativeSum.push({
          ...element,
          value: roundValue(sum as number, 3),
        });
      });
      return cummulativeSum.reverse();
    };

    if (active && selectedKey && payload && payload.length) {
      return (
        <div className="bg-white px-4 py-2 rounded">
          {/* <p className="fw-bold">{`${label}`}</p> */}
          {getModifiedData(payload)
            .filter((p) => (selectedKey ? p.name == selectedKey : true))
            .map((p, i) => {
              return (
                <div key={i}>
                  <div>
                    {"Ref:  "}
                    <span className="fw-bold">
                      {p.dataKey
                        ?.toString()
                        .slice(4, p.dataKey.toString().length)}
                    </span>
                  </div>
                  <div>
                    {"Cost:  "}
                    <span className="fw-bold">${p.value} / Lbs</span>
                  </div>
                  <div>
                    {"Supplier:  "}
                    {p.dataKey && (
                      <span className="fw-bold">
                        {p.payload[p.dataKey.toString() + "-supplier"]}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      );
    }

    return (
      <div className="bg-white px-4 py-2 rounded">
        <div>
          {"Total Containers:  "}
          <span className="fw-bold">
            {payload &&
              payload?.length > 0 &&
              payload[0].payload.totalContainers}
          </span>
        </div>
        <div>
          {"Average Rate:  "}
          <span className="fw-bold">
            {payload && payload?.length > 0 && payload[0].payload.average}
          </span>
        </div>
      </div>
    );
  };

  return (
    <ResponsiveContainer width={"100%"} height={400}>
      <ComposedChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        barGap={5}
      >
        <CartesianGrid
          strokeDasharray="0"
          stroke="#f0f0f0"
          strokeWidth={1}
          vertical={false}
        />
        <XAxis
          dataKey={"name"}
          strokeWidth={0}
          fontSize={12}
          style={{ marginTop: 20 }}
        />
        <YAxis strokeWidth={0} fontSize={12} tickCount={6} />

        <Tooltip
          // shared={false}
          cursor={{ fill: "transparent" }}
          content={({ active, payload, label }) => (
            <CustomTooltip active={active} payload={payload} label={label} />
          )}
        />
        {keys.map((key, index) => {
          return (
            <Bar
              onClick={() => {
                onBarClick(key.month);
              }}
              onMouseEnter={() => setSelectedKey(key.key)}
              onMouseLeave={() => setSelectedKey("")}
              key={`bar-${index}`}
              dataKey={key.key}
              stackId="stack"
              // radius={(index + 1) % limit == 0 ? [8, 8, 0, 0] : [0, 0, 0, 0]}
              fill={COLORS[index % limit]}
              maxBarSize={32}
            ></Bar>
          );
        })}
        <Line type="monotone" dataKey="average" stroke="#000" />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default ContainersStackChart;
