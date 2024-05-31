import { useEffect, useState } from "react";
import EditableDataTable, {
  column,
} from "shared/Components/EditableDatatable/EditableDatatable";
import { useGetAllProductionItemsQuery } from "redux/features/Settings/Productions/productionItemApiSlice";
import { BrandItemsRequest } from "redux/types/Settings/Productions/brand";
import {
  useAddBrandItemsMutation,
  useLazyGetBrandItemsQuery,
} from "redux/features/Settings/Productions/brandApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import ActionBarAddEdit from "shared/Components/ActionBarAddEdit/ActionBarAddEdit";
export interface ItemsData extends Record<string, number | string> {
  itemId: number;
  unitPieces: number;
  itemCode: string;
  weightInKgs: number;
}
export default function BrandItems() {
  const params = useParams();
  const navigate = useNavigate();
  const { data: itemsData } = useGetAllProductionItemsQuery(null);
  const [getBrandItems, result] = useLazyGetBrandItemsQuery();
  const [addItem, { isLoading: AddLoading }] = useAddBrandItemsMutation();
  const [rowData, setRowData] = useState<BrandItemsRequest[]>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  useEffect(() => {
    const id = params.id;
    if (id) {
      getBrandItems(id);
    }
  }, [params?.id, getBrandItems]);
  const columns: column<"brandItemId", BrandItemsRequest>[] = [
    {
      label: "Item Name",
      field: "itemId",
      inputType: "select",
      uneditable: false,
      mutateFieldsCallback: (value) => {
        const selectedItem = itemsData?.find((item) => item.itemId === value);
        if (selectedItem) {
          return {
            itemCode: selectedItem ? selectedItem?.itemCode : "",
            unitPieces: selectedItem ? selectedItem?.unitPieces : "",
          };
        } else return {};
      },
      options: itemsData?.length
        ? itemsData?.map((item) => {
            return {
              text: item?.name ? item?.name : "",
              value: item?.itemId ? item?.itemId : 0,
            };
          })
        : [],
    },
    {
      label: "Unit Pieces",
      field: "unitPieces",
      inputType: "number",
      disabled: true,
    },
    {
      label: "Code",
      field: "itemCode",
      inputType: "number",
      disabled: true,
    },
    {
      label: "Weight in Kgs",
      field: "weightKgs",
      inputType: "number",
    },
  ];
  useEffect(() => {
    if (result?.data) {
      setRowData(
        result?.data?.map((item) => {
          return {
            brandItemId: item?.brandItemId ? item?.brandItemId : 0,
            itemId: item.item ? item.item?.itemId : 0,
            unitPieces: item.item ? item.item?.unitPieces : 0,
            itemCode: item.item ? item.item?.itemCode : 0,
            weightKgs: item.item ? item.item?.weightKgs : 0,
          };
        })
      );
    }
  }, [result?.data]);
  const onSubmit = async () => {
    const res = await addItem({
      brandItemId: rowData?.map((item: { brandItemId: number }) =>
        item ? item?.brandItemId : +-1
      ),
      itemId: rowData?.length === 0 ? [] : rowData?.map((item) => item?.itemId),
      brandId: params?.id,
    });
    if ("data" in res && res.data.status === "SUCCESS") {
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    }
  };
  return (
    <>
      <ActionBarAddEdit
        title="Brand Items"
        mode={"EDIT"}
        isLoading={AddLoading}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        onSubmit={onSubmit}
      />
      <div className="col-11 mx-auto">
        <EditableDataTable
          identifier="brandItemId"
          columns={columns}
          rows={rowData}
          setRows={setRowData}
          isLoading={result?.isLoading}
          defaultEditable={isEdit}
        />
      </div>
    </>
  );
}
