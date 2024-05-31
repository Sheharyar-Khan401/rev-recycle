import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { newUserResolver } from "validators/userResolver";
import UserForm from "components/Users/UserForm";
import ActionBarAddEdit from "shared/Components/ActionBarAddEdit/ActionBarAddEdit";
import { useGetAllBranchRolesQuery } from "redux/features/roles/roleApiSlice";
import { Role } from "redux/types/Settings/role";
import { UserRequest } from "redux/types/Settings/user";
import { useAddUserMutation } from "redux/features/Settings/UserManagement/userApiSlice";
import { useNavigate } from "react-router-dom";

const defaultValues: UserRequest = {
  userName: "",
  fullName: "",
  email: "",
  password: "",
  phoneNo: "",
  userStatus: "",
  image: null,
  expiryDate: "",
  confirmPwd: "",
};
export default function AddUser() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UserRequest, null>({ defaultValues, resolver: newUserResolver });
  const [selectedStatus, setSelectedStatus] = useState("");
  const [roles, setRoles] = useState<number[]>([]);
  const [selectedDepts, setSelectedDepts] = useState<number[]>([]);
  const [selectedFloors, setSelectedFloors] = useState<number[]>([]);
  const [selectedInvoiceTypes, setSelectedInvoiceTypes] = useState<number[]>(
    []
  );
  const [rolesError, setRolesError] = useState<string>("");
  const [rolesList, setRolesList] = useState<Role[]>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [addUser, { isLoading: AddLoading }] = useAddUserMutation();
  const { data } = useGetAllBranchRolesQuery(null);

  const onSubmit = async (values: UserRequest) => {
    if (roles?.length === 0) {
      setRolesError("Roles are required");
    } else {
      let formData = new FormData();
      formData.append(
        "user",
        JSON.stringify({
          userName: values?.userName,
          fullName: values?.fullName,
          email: values?.email,
          password: values?.password,
          phoneNo: values?.phoneNo,
          userStatus: values?.userStatus,
          expiryDate: values?.expiryDate,
        })
      );
      formData.append("image", values?.image ? values?.image : "");
      const res = await addUser({
        user: formData,
        roles: roles,
        depts: selectedDepts,
        invoiceType: selectedInvoiceTypes,
        floors: selectedFloors,
      });

      if ("data" in res && res.data.status === "SUCCESS") {
        navigate(-1);
      }
    }
  };
  useEffect(() => {
    if (data) {
      setRolesList(data);
    }
  }, [data]);
  return (
    <>
      <ActionBarAddEdit
        title="Users"
        mode={"ADD"}
        isLoading={AddLoading}
        onSubmit={handleSubmit(onSubmit)}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
      />

      <UserForm
        mode={"ADD"}
        watch={watch}
        rolesList={rolesList}
        isEdit
        control={control}
        errors={errors}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        setValue={setValue}
        roles={roles}
        rolesError={rolesError}
        setRoles={setRoles}
        setRolesError={setRolesError}
        selectedDepts={selectedDepts}
        setSelectedDepts={setSelectedDepts}
        selectedFloors={selectedFloors}
        setSelectedFloors={setSelectedFloors}
        selectedInvoiceTypes={selectedInvoiceTypes}
        setSelectedInvoiceTypes={setSelectedInvoiceTypes}
      />
    </>
  );
}
