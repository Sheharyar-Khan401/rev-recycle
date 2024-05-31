import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import RolesForm from "components/Settings/RoleManagement/RolesForm";
import { RoleResolver } from "validators/graderValidator/roleResolver";
import ActionBarAddEdit from "shared/Components/ActionBarAddEdit/ActionBarAddEdit";
import { useNavigate, useParams } from "react-router-dom";
import {
  Role,
  Screen,
  ScreenAction,
  Screens,
} from "redux/types/Settings/role";
import {
  useEditRoleMutation,
  useLazyGetByRoleIdQuery,
} from "redux/features/roles/roleApiSlice";
import { useGetScreenQuery } from "redux/features/roles/screenApiSlice";
import Loader from "shared/Components/Loader/Loader";

const defaultValues = {
  roleName: "",
  screenAction: [],
  roleId: 0,
};

export default function EditRole() {
  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<Role, null>({ defaultValues, resolver: RoleResolver });

  const params = useParams();
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const [editRole, { isLoading: AddLoading }] = useEditRoleMutation();
  const [getByRoleId, result] = useLazyGetByRoleIdQuery();
  const [screen, setScreen] = useState<Screen[]>([]);
  const { data } = useGetScreenQuery(null);
  const [selectedScreenActions, setSelectedScreenActions] = useState<
    Array<ScreenAction>
  >([]);

  useEffect(() => {
    const id = params.id;
    if (id) {
      getByRoleId(id);
    }
  }, [getByRoleId, params.id]);

  useEffect(() => {
    if (data) {
      setScreen(data);
    }
  }, [data]);

  useEffect(() => {
    if (result.data) {
      reset(result.data);
      setSelectedScreenActions(
        result?.data?.screen && result?.data?.screen?.length > 0
          ? result?.data?.screen
              ?.map((si: Screen) =>
                si?.screenActions?.map((item: ScreenAction) => {
                  return {
                    name: item?.name ?? "",
                    screenActionId: item?.screenActionId ?? 0,
                  };
                })??[]
              )
              ?.flat()
          : []
      );
    }
  }, [result, reset]);

  const onSubmit = async (values: Role) => {
    const screenActionIds = selectedScreenActions
      ?.flat()
      ?.map((action) => action.screenActionId);
    const result = await editRole({
      roleId: values.roleId,
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
    <div>
      <div>
        {result?.isLoading ? (
          <div style={{ textAlign: "center", marginTop: "40vh" }}>
            <Loader />
          </div>
        ) : (
          <>
            <ActionBarAddEdit
              title="Roles"
              mode={"EDIT"}
              onSubmit={handleSubmit(onSubmit)}
              isEdit={isEdit}
              setIsEdit={setIsEdit}
              isLoading={AddLoading}
            />

            <RolesForm
              mode={"EDIT"}
              watch={watch}
              isEdit={isEdit}
              control={control}
              errors={errors}
              screens={screen}
              selectedScreenActions={selectedScreenActions}
              setSelectedScreenActions={setSelectedScreenActions}
            />
          </>
        )}
      </div>
    </div>
  );
}
