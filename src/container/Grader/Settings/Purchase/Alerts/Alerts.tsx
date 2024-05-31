import SetupSideNav from "components/Settings/Purchase/PurchaseSidenav";
import Category from "components/Settings/Category";
import EditableDataTable, {
  column,
} from "shared/Components/EditableDatatable/EditableDatatable";
import { CategoryRequest } from "redux/types/Settings/Purchase/categories";
import { MDBInput, MDBSelect } from "mdb-react-ui-kit";
import { useState } from "react";
import CustomButton from "shared/Components/CustomButton";

type alertOptions = {
  text: string;
  value: number;
  hidden?:boolean
};

export default function AlertLimits() {
  const [rowData, setRowData] = useState<CategoryRequest[]>([]);
  const [alertUserOption, setAlertUserOption] = useState<alertOptions[]>([
    {
      text: "Add new email",
      value: 0,
      hidden: true
    },
  ]);
  const [inputValue, setInputValue] = useState<string>();
  const columns: column<"categoryId", CategoryRequest>[] = [
    {
      label: "Changed date",
      field: "name",
      inputType: "date",
      sort: false,
    },
    {
      label: "Range",
      field: "range",
      inputType: "text",
      sort: false,
    },
    {
      label: "Range type",
      field: "rangeType",
      inputType: "text",
      sort: false,
    },
    {
      label: "Changed by",
      field: "changedBy",
      inputType: "text",
      sort: false,
      disabled: true,
    },
    {
      label: "Alert user",
      field: "alertUser",
      inputType: "select",
      options: alertUserOption,
      children: selectAlertUserChild(),
      sort: false,
      multiple: true
    },
  ];

  function selectAlertUserChild() {
    return (
      <div className="">
        <hr
          style={{
            margin: "15% -10%",
          }}
        />
        <MDBInput
          size="sm"
          className=""
          label="Add email"
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          value={inputValue}
        />
        <div className="w-auto d-flex justify-content-end mt-2">
          <CustomButton
            title="Add"
            type="solid"
            size="sm"
            className="w-auto"
            onClick={() => {
              setInputValue("")
              setAlertUserOption((prevOptions) => {
                const updatedOptions = prevOptions.filter(
                  (option) => option.value !== 0
                );
                return [
                  ...updatedOptions,
                  { text: inputValue ?? "", value: updatedOptions.length },
                ];
              });
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="d-lg-flex">
        <SetupSideNav type={11} />
        <div className="table-container">
          <EditableDataTable
            identifier="categoryId"
            columns={columns}
            rows={[]}
            setRows={setRowData}
            // isLoading={isLoading}
            // submitLoading={AddLoading}
            // onSubmit={onSubmit}
            showDeleteButton
            showEditButton
          >
            <MDBSelect
              className="ms-3"
              size="sm"
              label="Select Category"
              data={["A", "b", "C"]?.map((status) => {
                return {
                  text: status,
                  value: status,
                };
              })}
              search
              preventFirstSelection
              clearBtn
            />
          </EditableDataTable>
        </div>
      </div>
    </>
  );
}
