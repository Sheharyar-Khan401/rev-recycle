import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { editUserResolver } from "validators/userResolver";
import UserForm from "components/Users/UserForm";
import ActionBarAddEdit from "shared/Components/ActionBarAddEdit/ActionBarAddEdit";
import { useLazyGetBranchRolesQuery } from "redux/features/roles/roleApiSlice";
import { Role } from "redux/types/Settings/role";
import {
  ListOfFloors,
  ListOfInvoiceTypes,
  ListofRoles,
  UserRequest,
} from "redux/types/Settings/user";
import {
  useEditUserMutation,
  useLazyGetByUserIdQuery,
} from "redux/features/Settings/UserManagement/userApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "shared/Components/Loader/Loader";
import { getDateFromMillis } from "helper/utility";

const defaultValues: UserRequest = {
  userId: 0,
  userName: "",
  fullName: "",
  email: "",
  password: "",
  phoneNo: "",
  userStatus: "",
  image: null,
  expiryDate: "",
};
export default function EditUser() {
  const params = useParams();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UserRequest, null>({ defaultValues, resolver: editUserResolver });

  const [isEdit, setIsEdit] = useState(false);
  const [rolesError, setRolesError] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState("Active");
  const [roles, setRoles] = useState<number[]>([]);
  const [rolesList, setRolesList] = useState<Role[]>([]);
  const [selectedDepts, setSelectedDepts] = useState<number[]>([]);
  const [selectedFloors, setSelectedFloors] = useState<number[]>([]);
  const [selectedInvoiceTypes, setSelectedInvoiceTypes] = useState<number[]>(
    []
  );
  const [editUser, { isLoading: AddLoading }] = useEditUserMutation();
  const [getUserById, result] = useLazyGetByUserIdQuery();
  const [getRoles, rolesResult] = useLazyGetBranchRolesQuery();

  const onSubmit = async (values: UserRequest) => {
    const id = params.id;
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
          phoneNo: values?.phoneNo,
          userStatus: values?.userStatus,
          expiryDate: values?.expiryDate,
          userId: id,
        })
      );
      formData.append("image", values?.image ? values?.image : "");
      const res = await editUser({
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
    const id = params.id;

    if (id) {
      getUserById(id);
    }
  }, [getUserById, params.id]);
  useEffect(() => {
    if (result?.data) {
      setValue("email", result?.data?.email ? result?.data?.email : "");
      setValue(
        "fullName",
        result?.data?.fullName ? result?.data?.fullName : ""
      );
      setValue(
        "userName",
        result?.data?.username ? result?.data?.username : ""
      );
      setValue("phoneNo", result?.data?.phoneNo ? result?.data?.phoneNo : "");
      setValue(
        "expiryDate",
        result?.data?.expiryDate
          ? getDateFromMillis(result?.data?.expiryDate)
          : ""
      );
      setValue(
        "userStatus",
        result?.data?.userStatus ? result?.data?.userStatus : ""
      );
      setValue("image", result?.data?.imageUrl ?? null);
      setRoles(
        result?.data?.listofuserrole
          ?.map((item: ListofRoles) => item?.role ?? { roleId: 0 })
          ?.map((newitem: { roleId: number }) => newitem?.roleId) ?? []
      );
      setSelectedDepts(
        result?.data?.listofuserdepts?.map(
          (item) => item?.dept?.departmentId ?? 0
        ) ?? []
      );
      setSelectedFloors(
        result?.data?.listofuserFloor?.map((item: ListOfFloors) =>
          item?.floor?.floorId ? item?.floor?.floorId : 0
        ) ?? []
      );
      setSelectedInvoiceTypes(
        result?.data?.listofuserInvoiceType?.map(
          (item: ListOfInvoiceTypes) => item?.invoiceType?.invoiceTypeId ?? 0
        ) ?? []
      );
    }
    // eslint-disable-next-line
  }, [result]);
  useEffect(() => {
    if (rolesResult?.data) {
      setRolesList(rolesResult?.data?.payLoad);
    }
  }, [rolesResult?.data]);
  useEffect(() => {
    getRoles({
      limit: 0,
      offset: 0,
    });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div style={{ marginTop: "1rem" }}>
        <ActionBarAddEdit
          title="Users"
          mode={"EDIT"}
          isLoading={AddLoading}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          onSubmit={handleSubmit(onSubmit)}
        />

        <div className="ms-2">
          {result?.isLoading || rolesResult?.isLoading ? (
            <div style={{ margin: "5rem" }}>
              <Loader />
            </div>
          ) : (
            <UserForm
              mode={"EDIT"}
              rolesList={rolesList}
              watch={watch}
              isEdit={isEdit}
              rolesError={rolesError}
              setRolesError={setRolesError}
              control={control}
              errors={errors}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              setValue={setValue}
              roles={roles}
              setRoles={setRoles}
              selectedDepts={selectedDepts}
              setSelectedDepts={setSelectedDepts}
              selectedFloors={selectedFloors}
              setSelectedFloors={setSelectedFloors}
              selectedInvoiceTypes={selectedInvoiceTypes}
              setSelectedInvoiceTypes={setSelectedInvoiceTypes}
            />
          )}
        </div>
      </div>
    </>
  );
}
