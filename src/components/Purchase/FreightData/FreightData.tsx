import { MDBTable } from "mdb-react-ui-kit";
import React from "react";
import FreightDataTable from "shared/Components/FreightDataTable";

interface Props {}
interface data {
  destination: string;
  awn: string[];
  anchor: string;
  knight: number;
  lowfreight: string;
  vector: string;
  comments: string;
  seaGold: string;
}
type column<K> = {
  label: string;
  field: keyof K & string;
  nestedColumns?: string[];
};

function FreightData(props: Props) {
  const {} = props;

  const columns: column<data>[] = [
    { label: "Destination", field: "destination" },
    { label: "AWN", field: "awn", nestedColumns: ["Port", "Door"] },
    { label: "Anchor", field: "anchor", nestedColumns: ["Port", "Door"] },
    { label: "Knight", field: "knight", nestedColumns: ["Port", "Door"] },
    {
      label: "Lowfreight",
      field: "lowfreight",
      nestedColumns: ["Port", "Door"],
    },
    { label: "Vector", field: "vector", nestedColumns: ["Port", "Door"] },
    { label: "Sea Gold", field: "seaGold", nestedColumns: ["Port", "Door"] },
    { label: "Comments", field: "comments" },
  ];

  const rows = [
    {
      A: "Tiger Nixon",
      B: "AWN 1",
      C: "AWN 2",
      D: "anchor 1",
      E: "anchor 2",
      F: "k 1",
      G: "k 2",
      H: "lF 1",
      I: "lF 2",
      J: "$V 1",
      K: "$v 2",
      L: "$Sg 1",
      M: "$sg 2",
      N: "Lorem ipsum dolor sit amet.",
    },
    {
      A: "Tiger Nixon",
      B: "AWN 1",
      C: "AWN 2",
      D: "anchor 1",
      E: "anchor 2",
      F: "k 1",
      G: "k 2",
      H: "lF 1",
      I: "lF 2",
      J: "$V 1",
      K: "$v 2",
      L: "$Sg 1",
      M: "$sg 2",
      N: "Lorem ipsum dolor sit amet.",
    },
  ];

  return (
    <div>
      <FreightDataTable
        columns={columns}
        rows={rows}
        fixLastColumn
        addRedirectPath={"xzx"}
        importAble
      />
    </div>
  );
}

export default FreightData;
