import { MDBIcon } from "mdb-react-ui-kit";
import { useRef } from "react";
import DatePicker, { DatePickerRef } from "react-multi-date-picker";
interface props {
  onChange: (value: string[]) => void;
  value?: string | string[];
  onlyYearPicker?: boolean;
  multiple?: boolean;
  width?: string
}

export default function RangePicker({
  onChange,
  value,
  onlyYearPicker = false,
  multiple = true,
  width = "14.2rem"
}: props) {
  const datepickerRef = useRef<DatePickerRef>();
  return (
    <div>
      <DatePicker
        render={(value) => {
          return (
            <div
              className="form-outline rounded d-flex justify-content-between align-items-center"
              style={{
                border: "1px solid #bdbdbd",
                height: "1.85rem",
                width: width,
                paddingRight: "10px",
                paddingLeft: "10px",
                cursor: "pointer",
                fontSize: "13px",
              }}
              onClick={() => {
                datepickerRef.current?.openCalendar();
              }}
            >
              {typeof value === "object"
                ? `${value[0]} -> ${value[1] ?? "End date"}`
                : value}

              <MDBIcon size="xl" far icon="calendar" />
            </div>
          );
        }}
        className="rmdp-mobile"
        value={value}
        ref={datepickerRef}
        format="DD MMM, YYYY"
        title="Select a date"
        dateSeparator=" -> "
        range
        onlyYearPicker={onlyYearPicker}
        rangeHover
        onChange={(value) => {
          if (value) {
            let dates = value.toString().split(/(\d{1,2}\s\w+,\s\d{4}),/g);
            dates = dates.filter((date) => date.trim() !== "");
            onChange(dates);
          }
        }}
      />
    </div>
  );
}
