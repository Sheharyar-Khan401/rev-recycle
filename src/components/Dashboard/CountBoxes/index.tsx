import arrowFall from "../../../assets/icons/arrow-fall-icon.svg";
import arrowRise from "../../../assets/icons/arrow-rise.svg";
interface boxesProps {
  title: string;
  totalCount: number;
  scale?: number;
  info?: string;
}

export default function CountBoxes({
  title,
  totalCount,
  scale,
  info,
}: boxesProps) {
  return (
    <div
      style={{
        background: "#F7F9FB",
        borderRadius: "1rem",
      }}
      className="d-flex flex-column justify-content-between px-3 py-3 w-100"
    >
      <div className="mb-2 small ">{title}</div>
      <div className="d-flex justify-content-between">
        <div className="d-flex">
          <span className="fw-bold text-black me-2">
            {Math.floor(totalCount)}
          </span>
          {info && <span className="small">({info})</span>}
        </div>
        {scale && (
          <div className={`${scale > 0 ? "text-success" : "text-danger"}`}>
            {scale > 0 ? "+" + scale : +scale}%
            <img className="mx-2" src={scale > 0 ? arrowRise : arrowFall} />
          </div>
        )}
      </div>
    </div>
  );
}
