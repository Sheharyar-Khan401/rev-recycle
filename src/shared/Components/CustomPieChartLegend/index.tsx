import { roundValue } from "helper/utility";
import { MDBIcon } from "mdb-react-ui-kit";

type props = {
    color: string,
    value: number,
    label?: string,
    showPercent?: boolean
}

export const PieChartLegend = ({color, value,label, showPercent}:props) => {
  return (
    <div className="d-flex">
      <div className="d-flex justify-content-center align-items-center me-2">
        <MDBIcon
          icon="circle"
          style={{
            color: color,
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
        {label && label+": "}
        {roundValue(value)}
        {showPercent && "%"}
      </span>
    </div>
  );
};
