import SetupSideNav from "components/Settings/Purchase/PurchaseSidenav";
import Category from "components/Settings/Category";
import { column } from "shared/Components/EditableDatatable/EditableDatatable";
import { CategoryRequest } from "redux/types/Settings/Purchase/categories";
export default function Categories() {
  const columns: column<"categoryId", CategoryRequest>[] = [
    {
      label: "Category Name",
      field: "name",
      inputType: "text",
      sort: false,
    },
    {
      label: "Apply FOH",
      field: "applyFoh",
      inputType: "checkbox",
      sort: false,
    },
  ];
  return (
    <>
      <div>
        <div className="d-lg-flex">
          <SetupSideNav type={9} />
          <div className="table-container">
            <Category isProduction={false} columns={columns} />
          </div>
        </div>
      </div>
    </>
  );
}
