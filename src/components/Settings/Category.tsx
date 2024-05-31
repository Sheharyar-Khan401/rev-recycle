import {
  useAddCategoryMutation,
  useGetCategoryQuery,
} from "redux/features/Settings/purchase/categoryApiSlice";
import { useEffect, useState } from "react";
import EditableDataTable, {
  column,
} from "shared/Components/EditableDatatable/EditableDatatable";
import { MDBInput, MDBSelect } from "mdb-react-ui-kit";
import {
  Categories,
  CategoryRequest,
} from "redux/types/Settings/Purchase/categories";
import { SelectData } from "mdb-react-ui-kit/dist/types/pro/forms/SelectV2/types";
interface Props {
  isProduction: boolean;
  columns: column<"categoryId", CategoryRequest>[];
}
export default function Category({ isProduction, columns }: Props) {
  const [addCategory, { isLoading: AddLoading }] = useAddCategoryMutation();
  const { data, isLoading } = useGetCategoryQuery(isProduction);
  const [categoriesDisplayList, setCategoriesDisplayList] = useState<
    CategoryRequest[]
  >([]);
  const [categoriesList, setCategoriesList] = useState<CategoryRequest[]>([]);
  const [catId, setCatId] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState("");
  const onSubmit = () => {
    let rowDat = categoriesDisplayList.map((obj) => {
      const { parentCategoryId, ...rest } = obj;
      return rest;
    });
    addCategory({ rowDat, catId, isProduction });
  };

  useEffect(() => {
    if (data) {
      setCategoriesList(data);
      setCategoriesDisplayList(
        data.filter((item) => item?.parentCategoryId === catId)
      );
    }
  }, [data, catId]);

  const categoryDataList = (id: number) => {
    return categoriesList?.map((status: CategoryRequest) => {
      return {
        text: status.name,
        value: status.categoryId,
        defaultSelected: status.categoryId === id,
      };
    });
  };
  const FilterData = (data: SelectData, rem: CategoryRequest[]) => {
    if (data.value === undefined) {
      setCatId(0);
      setCategoriesDisplayList(categoriesList);
    } else {
      setCatId(+data?.value ?? 0);
      setCategoriesDisplayList(
        rem?.filter(
          (item: CategoryRequest) => item?.parentCategoryId === data?.value
        )
      );
    }
  };
  return (
    <>
      <div>
        <EditableDataTable
          identifier="categoryId"
          columns={columns}
          rows={categoriesDisplayList.filter((d) =>
            d.name.toLowerCase().includes(searchQuery.toLowerCase())
          )}
          setRows={setCategoriesDisplayList}
          isLoading={isLoading}
          submitLoading={AddLoading}
          onSubmit={onSubmit}
        >
          <div className="d-flex gap-2">
            <div style={{ width: "15rem" }}>
              <MDBSelect
                className="ms-3"
                size="sm"
                label="Select Category"
                data={categoryDataList(catId)}
                onValueChange={(data) => {
                  if ("value" in data) {
                    FilterData(data, categoriesList);
                  } else {
                    FilterData({}, categoriesList);
                  }
                }}
                search
                preventFirstSelection
                clearBtn
              />
            </div>
            <div style={{ width: "10rem" }}>
              <MDBInput
                label="Search"
                size="sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </EditableDataTable>
      </div>
    </>
  );
}
