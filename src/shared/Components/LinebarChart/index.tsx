import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface Barprops {
  data: dataTypes[]
}

interface dataTypes{
  name: string
  uv: number,
  pv: number,
  amt: number
}

const LineBarChart = ({data}:Barprops) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart width={500} height={300} data={data}>
        <CartesianGrid
          vertical={false}
          //   strokeDasharray="3 3"
          stroke="#EAEDED"
        />
        <XAxis
          axisLine={{ stroke: "lightgray" }}
          tick={{ fill: "lightgray", fontSize: 12 }}
          dataKey="name"
          padding={{ left: 30, right: 30 }}
          tickLine={{ display: "none" }}
        />
        <YAxis
          axisLine={{ stroke: "lightgray", strokeWidth: 0 }}
          tick={{ fill: "lightgray", fontSize: 12 }}
          tickLine={{ display: "none" }}
        />
        <Tooltip />
        <Legend
          align="right"
          iconSize={7}
          verticalAlign="top"
          wrapperStyle={{ fontSize: "14px", padding:10 }}
          payload={[
            {
              value: "Profit",
              type: "circle",
              id: "ID01",
              color: "#7F56D9",
            },
            { value: "Revenue", type: "circle", id: "ID02", color: "#7F56D9" },
          ]}
          formatter={(value, entry, index) => {
            return <span style={{color:'black'}}>{`Custom ${value}`}</span>
          }}
        />
        <Line type="monotone" dataKey="pv" stroke="#7F56D9" strokeWidth={2} />
        <Line type="monotone" strokeWidth={2} dataKey="uv" stroke="#9E77ED" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineBarChart;
