import ProductionSideNav from "components/Settings/Productions/ProductionSidenav";
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
      label: "Show Weight In Code Print",
      field: "showWeightInCode",
      inputType: "checkbox",
      sort: false,
    },
    {
      label: "Manpower",
      field: "manpower",
      inputType: "number",
      sort: false,
    },
    {
      label: "Display Order",
      field: "displayOrder",
      inputType: "number",
      sort: false,
    },
    {
      label: "Show On Production Dashboard Graph",
      field: "showInDashboard",
      inputType: "checkbox",
      sort: false,
    },
  ];
  return (
    <>
      <div>
        <div className="d-lg-flex">
          <ProductionSideNav type={1} />
          <div className="table-container">
            <Category isProduction={true} columns={columns} />
          </div>
        </div>
      </div>
    </>
  );
}
