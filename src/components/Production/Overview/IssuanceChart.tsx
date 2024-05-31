import { COLORS, months } from "helper/globalVariables";
import { roundValue } from "helper/utility";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  NameType,
  Payload,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import { IssuanceGraph } from "redux/types/Productions/issuance";

const IssuanceChart = ({
  issuanceData,
}: {
  issuanceData: IssuanceGraph[];
}) => {
  const [data, setData] = useState<Record<string, number | string>[]>([]);

  useEffect(() => {
    if (issuanceData) {
      let data: Record<string, number | string>[] = [];
      for (const month of months) {
        const x = issuanceData.find((r) => r.month == month.name);
        data = [
          ...data,
          {
            name: month.short,
            weightLbs: roundValue(x?.weightLbs ?? 0),
            noOfIssuances: x?.noOfIssuances ?? 0,
          },
        ];
      }
      setData(data);
    }
  }, [issuanceData]);

  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: Payload<ValueType, NameType>[];
    label: string;
  }) => {
    if (payload && payload.length) {
      return (
        <div className="bg-white px-4 py-2 rounded">
          {payload.map((p, i) => {
            return (
              <div key={i}>
                <div>
                  {"Total Bales Issued:  "}
                  <span className="fw-bold">{p.payload.noOfIssuances}</span>
                </div>
                <div>
                  {"Total Weight/Lbs :  "}
                  <span className="fw-bold">
                    {p.payload.weightLbs} / Lbs
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    return null;
  };

  return (
    <ResponsiveContainer width={"100%"} height={400}>
      <BarChart
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
          shared={false}
          cursor={{ fill: "transparent" }}
          content={({ active, payload, label }) => (
            <CustomTooltip active={active} payload={payload} label={label} />
          )}
        />
        <Bar
          dataKey="weightLbs"
          radius={[8, 8, 0, 0]}
          fill={COLORS[0]}
          maxBarSize={32}
          //   activeBar={<Rectangle fill={COLORS[1]} stroke={COLORS[0]} />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
export default IssuanceChart;
