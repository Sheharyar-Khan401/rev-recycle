import { MDBInput, MDBSelect, MDBCheckbox } from "mdb-react-ui-kit";
import { Control, Controller, FieldErrorsImpl } from "react-hook-form";
import FormValidationError from "shared/Components/FormValidationError";

import { ItemRequest } from "redux/types/Settings/Purchase/item";
import { useGetCategoryQuery } from "redux/features/Settings/purchase/categoryApiSlice";
import { useGetGradesQuery } from "redux/features/common/gradeApiSlice";
import Loader from "shared/Components/Loader/Loader";
interface Props {
  isEdit: boolean;
  control: Control<ItemRequest>;
  errors: Partial<FieldErrorsImpl<ItemRequest>>;
}
export default function ItemForm({ isEdit, control, errors }: Props) {
  const { isLoading: isCategoryListLoading, data: categoryList } =
    useGetCategoryQuery(false);
  const { isLoading: isGradeListLoading, data: gradeList } =
    useGetGradesQuery(null);

  const getCategoryListOptions = (selectedValue?: number) => {
    if (categoryList?.length) {
      return categoryList.map((category) => {
        return {
          text: category.name,
          value: category.categoryId,
          defaultSelected: category.categoryId === selectedValue,
        };
      });
    } else return [];
  };
  const getGradesListOptions = (selectedValue?: number) => {
    if (gradeList?.length) {
      return gradeList.map((grade) => {
        return {
          text: grade?.name,
          value: grade?.gradeId,
          defaultSelected: grade?.gradeId === selectedValue,
        };
      });
    } else return [];
  };

  return (
    <div className="m-2">
      {isGradeListLoading || isCategoryListLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="row mx-0">
            <div className="col-lg-5 col-md-6 col-12 my-2">
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, value } }) => (
                  <MDBInput
                    label="Item Name"
                    className={errors.name && "is-invalid"}
                    onChange={onChange}
                    value={value}
                    disabled={!isEdit}
                  />
                )}
              />
              <FormValidationError errorMessage={errors.name?.message} />
            </div>
          </div>
          <div className="row mx-0">
            <div className="col-lg-5 col-md-6 col-12 my-2">
              <Controller
                control={control}
                name="categoryId"
                render={({ field: { onChange, value } }) => (
                  <MDBSelect
                    label="Category"
                    inputClassName={errors.categoryId && "is-invalid"}
                    data={getCategoryListOptions(value)}
                    onValueChange={(data) => {
                      if ("value" in data) {
                        onChange(data.value);
                      }
                    }}
                    search
                    preventFirstSelection
                    disabled={!isEdit}
                  />
                )}
              />
              <FormValidationError errorMessage={errors.categoryId?.message} />
            </div>
          </div>
          <div className="row mx-0">
            <div className="col-lg-5 col-md-6 col-12 my-2">
              <Controller
                control={control}
                name="gradeId"
                render={({ field: { onChange, value } }) => (
                  <MDBSelect
                    label="Grade"
                    inputClassName={errors?.gradeId && "is-invalid"}
                    data={getGradesListOptions(value)}
                    onValueChange={(data) => {
                      if ("value" in data) {
                        onChange(data.value);
                      }
                    }}
                    search
                    preventFirstSelection
                    disabled={!isEdit}
                  />
                )}
              />
              <FormValidationError errorMessage={errors?.gradeId?.message} />
            </div>
          </div>
          <div className="row mx-0">
            <div className="col-lg-5 col-md-6 col-12 my-2">
              <Controller
                control={control}
                name="active"
                render={({ field: { onChange, value } }) => (
                  <MDBCheckbox
                    label="Active"
                    onChange={onChange}
                    checked={value}
                    disabled={!isEdit}
                  />
                )}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
