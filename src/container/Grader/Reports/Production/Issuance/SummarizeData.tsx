import { column } from "shared/Components/DataTable";

type IssuanceReportRow = {
  sr: number;
  item?: string;
  category?: string;
  grade?: string;
  floor?: string;
  date?: string;
  supplier?: string;
  qty: number;
  weightKgs: number;
  weightLbs: number;
  amount: number;
  foh: string;
  totalamt: number;
  percentage: string | number;
  amtkg: number;
  amtlbs: number;
};
export const SummarizeData = [
  {
    name: "Item",
    id: "itemName",
    value: "item",
  },
  {
    name: "None",
    id: "null",
    value: "null",
  },
  {
    name: "Category",
    id: "categoryName",
    value: "category",
  },
  {
    name: "Container",
    id: "container",
    value: "container",
  },
  {
    name: "Reference No",
    id: "referenceNo",
    value: "referenceNo",
  },
  {
    name: "Date",
    id: "date",
    value: "date",
  },
  {
    name: "Floor",
    id: "floorName",
    value: "floor",
  },
  {
    name: "Grade",
    id: "grade",
    value: "grade",
  },
  {
    name: "Origin",
    id: "origin",
    value: "origin",
  },
  {
    name: "Supplier",
    id: "supplier",
    value: "supplier",
  },
  {
    name: "Unit Code",
    id: "unitCode",
    value: "unitCode",
  },
  {
    name: "Item Floor",
    id: "itemFloor",
    value: "itemFloor",
  },
];

export const getFilterColumns = (field: string | number) => {
  return [
    "Sr. No.",

    ...[
      "Item",
      "Category",
      "Grade",
      "Floor",
      "Date",
      "Supplier",
      "Container",
      "Reference No",
      "Origin",
      "Category",
    ].filter((name) => (field === "null" ? true : name == field)),

    "Qty",
    "Weight LBS",
    "Weight Kgs",
    "Amount",
    "Foh",
    "Total Amount",
    "Percentage",
    "Amount/Kgs",
    "Amount/Lbs",
  ];
};
export const getTableDataColumns = (
  field: string | number
): column<IssuanceReportRow>[] => {
  return [
    { label: "Sr. No.", field: "sr" },
    ...([
      { label: "Item", field: "itemName" },
      { label: "Grade", field: "grade" },
      { label: "Floor", field: "floorName" },
      { label: "Floor", field: "itemFloor" },
      { label: "Date", field: "date" },
      { label: "Supplier", field: "supplier" },
      { label: "Origin", field: "origin" },
      { label: "Reference No", field: "referenceNo" },
      { label: "Container", field: "container" },
      { label: "Category", field: "categoryName" },
    ].filter((name) =>
      field === "null" ? true : name.field == field
    ) as column<IssuanceReportRow>[]),
    { label: "Qty", field: "qty" , showSum: true},
    { label: "Weight LBS", field: "weightLbs", showSum: true },
    { label: "Weight Kgs", field: "weightKgs", showSum: true },
    { label: "Amount", field: "amount", showSum: true },
    { label: "Foh", field: "foh" },
    { label: "Total Amount", field: "totalamt", showSum: true },
    { label: "Percentage", field: "percentage" },
    { label: "Amount/Kgs", field: "amtkg", showSum: true },
    { label: "Amount/Lbs", field: "amtlbs", showSum: true },
  ];
};
