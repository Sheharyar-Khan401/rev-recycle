import { COLORS } from "helper/globalVariables";
import { roundValue } from "helper/utility";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface dataTypes {
  name: string;
  value: number;
}

interface chartprops {
  data: dataTypes[];
  showLabel?: boolean;
  size?: "sm" | "lg";
  customColors?: string[];
}

interface chartLabelProps {
  cx: number;
  cy: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  midAngle: number;
  fill: string;
}

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  innerRadius,
  outerRadius,
  percent,
  fill,
  midAngle,
}: chartLabelProps) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  const brightness = getBrightness(fill);
  const textColor = brightness > 140 ? "black" : "#fff";

  return (
    <text
      x={x}
      y={y}
      fill={textColor}
      textAnchor={"middle"}
      dominantBaseline="central"
      style={{
        fontSize: "10px",
      }}
    >
      {percent * 100 > 5 ? `${roundValue(percent * 100)}%` : ""}
    </text>
  );
};

const getBrightness = (color: string) => {
  const hex = color.substring(1);
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000;
};

const DoughnutChart = ({ data, showLabel, size }: chartprops) => {
  return (
    <>
      <ResponsiveContainer width={"100%"} height={size === "sm" ? 200 : 300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            cx={"50%"}
            cy={"50%"}
            outerRadius={"85%"}
            innerRadius={"48%"}
            paddingAngle={0}
            startAngle={0}
            endAngle={360}
            stroke="none"
            strokeWidth={0}
            isAnimationActive={true}
            labelLine={false}
            label={showLabel && renderCustomizedLabel}
            // activeShape={
            //   <>
            //     {data.map((entry, index) => (
            //       <g>
            //         <text x={"50%"} y={"50%"} dy={8} textAnchor="middle">
            //           {entry.name}
            //         </text>
            //       </g>
            //     ))}
            //   </>
            // }
          >
            {data.map((entry, index) => (
              <Cell
                style={{ outline: "none" }}
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value}%`} />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
};

export default DoughnutChart;
