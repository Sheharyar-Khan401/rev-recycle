import { useForm } from "react-hook-form";
import ActionBarAddEdit from "shared/Components/ActionBarAddEdit/ActionBarAddEdit";
import { useState, useEffect } from "react";
import Loader from "shared/Components/Loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditDepartmentMutation,
  useLazyGetByIdDepartmentQuery,
} from "redux/features/Settings/Department/departmentApiSlice";
import { Department } from "redux/types/Settings/Productions/department";
import DepartmentsForm from "components/Settings/Productions/DepartmentsForm";
import { departmentsResolver } from "validators/graderValidator/Settings/Production/DepartmentsResolver";
const defaultValues: Department = {
  departmentId: 0,
  name: "",
  displayOrder: 0,
  hasBelt: false,
  rateDepartmentId: 0,
  scanCodePurchase: false,
  scanCodeProduction: false,
  applyFOHPurchase: false,
  applyFOHProduction: false,
};
export default function EditDepartment() {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Department, null>({
    defaultValues,
    resolver: departmentsResolver,
  });
  const navigate = useNavigate();
  const params = useParams();

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editDept, { isLoading: AddLoading }] = useEditDepartmentMutation();
  const [getDeptById, result] = useLazyGetByIdDepartmentQuery();

  useEffect(() => {
    const id = params.id;

    if (id) {
      getDeptById(id);
    }
  }, [getDeptById, params.id]);
  useEffect(() => {
    if (result?.data) {
      reset(result?.data);
    }
  }, [result, reset]);
  const onSubmit = async (values: Department) => {
    if (params.id) {
      values.departmentId = +params.id;
    }

    const result = await editDept(values);
    if ("data" in result && result.data.status === "SUCCESS") {
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    }
  };

  return (
    <>
      <div className="mt-3">
        <ActionBarAddEdit
          title="Departments"
          mode={"EDIT"}
          onSubmit={handleSubmit(onSubmit)}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          isLoading={AddLoading}
        />

        <div>
          {result.isLoading ? (
            <div style={{ marginTop: "25vh" }}>
              <Loader />{" "}
            </div>
          ) : (
            <DepartmentsForm
              mode={"EDIT"}
              isEdit={isEdit}
              control={control}
              errors={errors}
            />
          )}
        </div>
      </div>
    </>
  );
}
