import EditableDataTable, {
  column,
} from "shared/Components/EditableDatatable/EditableDatatable";
import { SaleOrderItemsRequest } from "redux/types/Orders/saleOrders";

interface Props {
  isEdit: boolean;
  columns: column<"saleOrderItemId", SaleOrderItemsRequest>[];
  rowData: SaleOrderItemsRequest[];
  setRowData: React.Dispatch<React.SetStateAction<SaleOrderItemsRequest[]>>;
}
export default function SaleOrderItemForm({
  isEdit,
  columns,
  rowData,
  setRowData,
}: Props) {
  return (
    <EditableDataTable
      identifier="saleOrderItemId"
      columns={columns}
      showSerialNumbers
      rows={rowData}
      setRows={setRowData}
      isLoading={false}
      defaultEditable={isEdit}
    />
  );
}
