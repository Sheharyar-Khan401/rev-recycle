import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import RolesForm from "components/Settings/RoleManagement/RolesForm";
import { RoleResolver } from "validators/graderValidator/roleResolver";
import ActionBarAddEdit from "shared/Components/ActionBarAddEdit/ActionBarAddEdit";
import { Role, Screen, ScreenAction } from "redux/types/Settings/role";
import { useNavigate } from "react-router-dom";
import { useAddRoleMutation } from "redux/features/roles/roleApiSlice";
import { useGetScreenQuery } from "redux/features/roles/screenApiSlice";

const defaultValues = {
  roleName: "",
  screenAction: [],
  roleId: 0,
};

export default function AddRole() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<Role, null>({ defaultValues, resolver: RoleResolver });

  const [addRole, { isLoading: AddLoading }] = useAddRoleMutation();
  const { data } = useGetScreenQuery(null);
  const [screen, setScreen] = useState<Screen[]>([]);
  const [selectedScreenActions, setSelectedScreenActions] = useState<
    Array<ScreenAction>
  >([]);

  useEffect(() => {
    if (data) {
      setScreen(data);
    }
  }, [data]);

  const onSubmit = async (values: Role) => {
    const screenActionIds = selectedScreenActions.map(
      (action) => action.screenActionId
    );
    const result = await addRole({
      roleName: values.roleName,
      screenAction: screenActionIds,
    });
    if ("data" in result && result.data.status === "SUCCESS") {
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    }
  };
  return (
    <>
      <ActionBarAddEdit
        title="Roles"
        mode={"ADD"}
        isLoading={AddLoading}
        onSubmit={handleSubmit(onSubmit)}
      />

      <RolesForm
        mode={"ADD"}
        isEdit
        control={control}
        errors={errors}
        screens={screen}
        watch={watch}
        selectedScreenActions={selectedScreenActions}
        setSelectedScreenActions={setSelectedScreenActions}
      />
    </>
  );
}
