import { CodesCount } from "redux/types/Productions/codes";

export default function CodesDetails({
  title,
  codesCount,
  field,
}: {
  title: string;
  codesCount: CodesCount[];
  field: keyof CodesCount;
}) {
  return (
    <div
      style={{
        background: "#F7F9FB",
        borderRadius: "1rem",
      }}
      className="d-flex flex-column px-3 py-3 w-100"
    >
      <div className="d-flex justify-content-between">
        <div className="fw-bold">{title}</div>
        <div className="fw-bold">
          {codesCount.length > 0
            ? codesCount.reduce((total, curr) => {
                return total + curr.numberOfCodes;
              }, 0)
            : 0}
        </div>
      </div>
      <hr/>
      <div
        className="overflow-auto"
        // style={{ height: "100px" }}
      >
        {codesCount.map((c, i) => {
          return (
            <div key={i} className="d-flex justify-content-between mb-1">
              <div className="small text-black">{c[field]}</div>
              <div className="small text-black">{c.numberOfCodes ?? 0}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
