import { useState } from "react";
import { MDBRow, MDBCol, MDBInput, MDBCheckbox } from "mdb-react-ui-kit";
import styles from "components/Settings/RoleManagement/styles.module.css";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormWatch,
} from "react-hook-form";
import FormValidationError from "shared/Components/FormValidationError";
import { Role, Screen, ScreenAction } from "redux/types/Settings/role";
import Sidebar from "shared/Components/Sidebar2/Sidebar";
interface Props {
  isEdit: boolean;
  control: Control<Role>;
  errors: FieldErrors<Role>;
  mode: string;
  watch: UseFormWatch<Role>;
  screens: Screen[];
  selectedScreenActions: Array<ScreenAction>;
  setSelectedScreenActions: (actions: Array<ScreenAction>) => void;
}

export default function RolesForm({
  isEdit,
  control,
  errors,
  watch,
  screens,
  selectedScreenActions,
  setSelectedScreenActions,
}: Props) {
  const updatedSelected = selectedScreenActions?.flat();

  const screenData = () => {
    return screens?.map((value: Screen) => {
      return {
        mainId: value.screenGroupId,
        name: value.name,
        subCat: value.screens?.map((item: Screen) => ({
          id: item.screenId,
          screen: item.screen,
          actions: item.screenActions?.map((action: ScreenAction) => ({
            actionId: action.screenActionId,
            name: action.name,
          })),
        })),
      };
    });
  };

  const handleActionCheckboxChange = (action: ScreenAction) => {
    const index = updatedSelected.findIndex(
      (a) => a.screenActionId === action.screenActionId
    );
    if (index >= 0) {
      setSelectedScreenActions([
        ...updatedSelected.slice(0, index),
        ...updatedSelected.slice(index + 1),
      ]);
    } else {
      setSelectedScreenActions([...updatedSelected, action]);
    }
  };
  const [type, setType] = useState(1);
  const [subType, setSubType] = useState(1);
  const permissions =
    screenData()
      .find((sd) => sd?.mainId === type)
      ?.subCat?.find((sc) => sc.id === subType)
      ?.actions?.sort((a, b) =>
        a.name > b.name ? 1 : a.name < b.name ? -1 : 0
      ) ?? [];
  return (
    <>
      <div className="row">
        <div className={styles["marginBottom"] + " col-md-6 col-lg-4 col-12"}>
          <div>
            <Controller
              control={control}
              name="roleName"
              render={({ field: { onChange, value } }) => (
                <MDBInput
                  className={`${errors.roleName && "is-invalid"}`}
                  label="Role Name"
                  type="text"
                  disabled={!isEdit}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
            <FormValidationError errorMessage={errors.roleName?.message} />
            <br />
            <br />
          </div>
        </div>
      </div>
      {watch("roleName") !== "" && (
        <>
          <h5>Access Permissions</h5>
          <hr className="my-0" />
          <div className="my-3">
            <div className="d-flex ">
              <Sidebar
                type={type}
                subtype={subType}
                navigations={screenData().map((d) => {
                  return {
                    name: d.name,
                    type: d.mainId,
                    onClick: (v) => {
                      setType(v);
                      let selectedCategory = screenData().find(
                        (d) => d.mainId === v
                      );
                      if (
                        selectedCategory?.subCat &&
                        selectedCategory.subCat.length > 0
                      ) {
                        setSubType(selectedCategory.subCat[0].id);
                      }
                    },
                    subnavigations: d?.subCat?.map((sb) => {
                      return {
                        name: sb.screen,
                        subtype: sb.id,
                        onClick: (v) => setSubType(v),
                      };
                    }),
                  };
                })}
              />

              <div className="flex-fill">
                <h6 className="text-muted fw-bold">Permissions</h6>
                <MDBRow className="mx-0 px-0 w-50">
                  {permissions.map((item) => {
                    return (
                      <MDBCol size="6" className="m-0 p-0" key={item?.actionId}>
                        <div className="my-4">
                          <MDBCheckbox
                            value={item.actionId}
                            color="gray"
                            label={item.name}
                            disabled={!isEdit}
                            inline
                            checked={updatedSelected.some(
                              (a) => a.screenActionId === item.actionId
                            )}
                            onChange={() =>
                              handleActionCheckboxChange({
                                screenActionId: item.actionId,
                                name: item.name,
                              })
                            }
                          />
                        </div>
                      </MDBCol>
                    );
                  })}
                  {!permissions?.length && (
                    <div className="d-flex justify-content-center mt-5">
                      <p>No permissions found.</p>
                    </div>
                  )}
                </MDBRow>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
