import {
  MDBInput,
  MDBSelect,
  MDBCheckbox,
  MDBDatepicker,
} from "mdb-react-ui-kit";
import {
  Control,
  Controller,
  FieldErrorsImpl,
  UseFormWatch,
  UseFormSetValue,
} from "react-hook-form";
import FormValidationError from "shared/Components/FormValidationError";

import { useGetLabelTypesQuery } from "redux/features/Settings/Productions/labeltypesApiSlice";
import { useGetAllDepartmentQuery } from "redux/features/Settings/Department/departmentApiSlice";
import { useGetFloorsQuery } from "redux/features/Settings/Productions/floorApiSlice";
import { useGetAllUsersQuery } from "redux/features/Settings/UserManagement/userApiSlice";
import { useGetGradesQuery } from "redux/features/common/gradeApiSlice";
import { useGetWeightUnitsQuery } from "redux/features/common/weightUintApiSlice";
import { useGetAllProductionItemsQuery } from "redux/features/Settings/Productions/productionItemApiSlice";
import { useGetQuantityUnitsQuery } from "redux/features/common/quantityUnitApiSlice";
import { CodeRequest } from "redux/types/Productions/codes";
import Loader from "shared/Components/Loader/Loader";
import { useEffect } from "react";
import { useGetAllClientsQuery } from "redux/features/Clients/Clients/clientsApiSlice";
import { Client } from "redux/types/Clients/Clients/client";
interface Props {
  mode: string;
  isEdit: boolean;
  control: Control<CodeRequest>;
  errors: Partial<FieldErrorsImpl<CodeRequest>>;
  watch?: UseFormWatch<CodeRequest>;
  setValue?: UseFormSetValue<CodeRequest>;
}
export default function CodesForm({
  mode,
  isEdit,
  control,
  errors,
  watch,
  setValue,
}: Props) {
  const { isLoading: isLabelTypesListLoading, data: labelTypesList } =
    useGetLabelTypesQuery(null);
  const { isLoading: isDepartmentListLoading, data: departmentList } =
    useGetAllDepartmentQuery(null);
  const { isLoading: isFloorsListLoading, data: floorsList } =
    useGetFloorsQuery(null);
  const { isLoading: isUsersListLoading, data: usersList } =
    useGetAllUsersQuery(null);
  const { isLoading: isGradeListLoading, data: gradeList } =
    useGetGradesQuery(null);
  const { isLoading: isWeightUnitListLoading, data: weightUnitList } =
    useGetWeightUnitsQuery(null);
  const { isLoading: isProductionItemsListLoading, data: productionItemsList } =
    useGetAllProductionItemsQuery(null);
  const { isLoading: isQuantityUnitListLoading, data: quantityUnitList } =
    useGetQuantityUnitsQuery(null);
  const { isLoading: isClientsLoading, data: clientsList } =
    useGetAllClientsQuery(null);

  const getLabelTypesOptions = (selectedValue?: number) => {
    if (labelTypesList?.length) {
      return labelTypesList.map((labelTypes) => {
        return {
          text: labelTypes?.name ? labelTypes?.name : "",
          value: labelTypes?.labelTypeId ? labelTypes?.labelTypeId : 0,
          defaultSelected: labelTypes?.labelTypeId === selectedValue,
        };
      });
    } else return [];
  };
  const getDepartmentsOptions = (selectedValue?: number) => {
    if (departmentList?.length) {
      return departmentList.map((department) => {
        return {
          text: department?.name ? department?.name : "",
          value: department?.departmentId ? department?.departmentId : 0,
          defaultSelected: department?.departmentId === selectedValue,
        };
      });
    } else return [];
  };
  const getFloorsOptions = (selectedValue?: number) => {
    if (floorsList?.length) {
      return floorsList.map((floor) => {
        return {
          text: floor?.name ? floor?.name : "",
          value: floor?.floorId ? floor?.floorId : 0,
          defaultSelected: floor?.floorId === selectedValue,
        };
      });
    } else return [];
  };
  const getGradesOptions = (selectedValue?: number) => {
    if (gradeList?.length) {
      return gradeList.map((grade) => {
        return {
          text: grade?.name ? grade?.name : "",
          value: grade?.gradeId ? grade?.gradeId : 0,
          defaultSelected: grade?.gradeId === selectedValue,
        };
      });
    } else return [];
  };
  const getUsersOptions = (selectedValue?: number) => {
    if (usersList?.length) {
      return usersList.map((user) => {
        return {
          text: user?.fullName ? user?.fullName : "",
          value: user?.userId ? user?.userId : 0,
          defaultSelected: user?.userId === selectedValue,
        };
      });
    } else return [];
  };
  const getWeightUnitOptions = (selectedValue?: number) => {
    if (weightUnitList?.length) {
      return weightUnitList.map((weightUnit) => {
        return {
          text: weightUnit?.name ? weightUnit?.name : "",
          value: weightUnit?.weightUnitId ? weightUnit?.weightUnitId : 0,
          defaultSelected: weightUnit?.weightUnitId === selectedValue,
        };
      });
    } else return [];
  };
  const getProductionItemsOptions = (selectedValue?: number) => {
    if (productionItemsList?.length) {
      return productionItemsList.map((productionItem) => {
        return {
          text: productionItem?.name ? productionItem?.name : "",
          value: productionItem?.itemId ? productionItem?.itemId : 0,
          defaultSelected: productionItem?.itemId === selectedValue,
        };
      });
    } else return [];
  };
  const getQuantityUnitOptions = (selectedValue?: number) => {
    if (quantityUnitList?.length) {
      return quantityUnitList.map((quantityUnit) => {
        return {
          text: quantityUnit?.name ? quantityUnit?.name : "",
          value: quantityUnit?.quantityUnitId
            ? quantityUnit?.quantityUnitId
            : 0,
          defaultSelected: quantityUnit?.quantityUnitId === selectedValue,
        };
      });
    } else return [];
  };
  const getClientsOptions = (id?: number) => {
    return (
      clientsList?.map((client: Client) => {
        return {
          text: client?.user?.fullName,
          value: client?.clientId,
          defaultSelected: client?.clientId === id,
        };
      }) ?? []
    );
  };
  useEffect(() => {
    if (
      watch?.("itemId") === 0 &&
      productionItemsList &&
      productionItemsList?.length > 0
    ) {
      setValue?.("itemId", productionItemsList[0]?.itemId);
      setValue?.("unitWeight", productionItemsList[0]?.unitWeight);
      setValue?.("labelTypeId", productionItemsList[0]?.labelType?.labelTypeId);
      // setValue?.("pieces", productionItemsList[0]?.unitPieces);
    }
    if (
      watch?.("departmentId") === 0 &&
      departmentList &&
      departmentList?.length > 0
    ) {
      setValue?.("departmentId", departmentList[0]?.departmentId);
    }
    if (watch?.("floorId") === 0 && floorsList && floorsList?.length > 0) {
      setValue?.("floorId", floorsList[0]?.floorId);
    }
    if (watch?.("gradeId") === 0 && gradeList && gradeList?.length > 0) {
      setValue?.("gradeId", gradeList[0]?.gradeId);
    }
    if (
      watch?.("wunitId") === 0 &&
      weightUnitList &&
      weightUnitList?.length > 0
    ) {
      setValue?.("wunitId", weightUnitList[0]?.weightUnitId);
    }
    if (
      watch?.("priQUnit") === 0 &&
      quantityUnitList &&
      quantityUnitList?.length > 0
    ) {
      setValue?.("priQUnit", quantityUnitList[0]?.quantityUnitId);
    }
    if (
      watch?.("secUnitId") === 0 &&
      quantityUnitList &&
      quantityUnitList?.length > 0
    ) {
      setValue?.("secUnitId", quantityUnitList[0]?.quantityUnitId);
    }
  }, [
    watch,
    setValue,
    productionItemsList,
    labelTypesList,
    departmentList,
    gradeList,
    floorsList,
    weightUnitList,
    quantityUnitList,
  ]);
  return (
    <div className="my-4">
      {isLabelTypesListLoading ||
      isDepartmentListLoading ||
      isFloorsListLoading ||
      isUsersListLoading ||
      isGradeListLoading ||
      isWeightUnitListLoading ||
      isProductionItemsListLoading ||
      isQuantityUnitListLoading ? (
        <div style={{ margin: "5rem" }}>
          <Loader />
        </div>
      ) : (
        <div>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-12 my-2">
              <Controller
                control={control}
                name="codeDate"
                render={({ field: { onChange, value } }) => (
                  <MDBDatepicker
                    format="yyyy-mm-dd"
                    className={`${errors.codeDate && "is-invalid"}`}
                    label="Date*"
                    inline
                    disabled={!isEdit}
                    onChange={onChange}
                    value={value}
                  />
                )}
              />
              <FormValidationError errorMessage={errors.codeDate?.message} />
            </div>
            <div className="col-lg-4 col-md-6 col-12 my-2">
              <Controller
                control={control}
                name="itemId"
                render={({ field: { onChange, value } }) => (
                  <MDBSelect
                    label="Item*"
                    inputClassName={errors.itemId && "is-invalid"}
                    data={getProductionItemsOptions(value)}
                    onValueChange={(data) => {
                      if ("value" in data) {
                        onChange(data.value);
                        const selectedItem = productionItemsList?.find(
                          (item) => item?.itemId === data?.value
                        );
                        if (selectedItem && isEdit) {
                          setValue?.("unitWeight", selectedItem?.unitWeight);
                          setValue?.("pieces", selectedItem?.unitPieces);
                          setValue?.("gradeId", selectedItem?.grade?.gradeId);
                          setValue?.(
                            "labelTypeId",
                            selectedItem?.labelType?.labelTypeId
                          );
                          setValue?.(
                            "priQUnit",
                            selectedItem?.quantityUnit?.quantityUnitId
                          );
                        }
                      }
                    }}
                    preventFirstSelection
                    search
                    disabled={!isEdit}
                    value={value}
                  />
                )}
              />
              <FormValidationError errorMessage={errors.itemId?.message} />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-12 my-2">
              <Controller
                control={control}
                name="labelTypeId"
                render={({ field: { onChange, value } }) => (
                  <MDBSelect
                    label="Label Type*"
                    inputClassName={errors.labelTypeId && "is-invalid"}
                    data={getLabelTypesOptions(value)}
                    onValueChange={(data) => {
                      if ("value" in data) {
                        onChange(data.value);
                      }
                    }}
                    preventFirstSelection
                    search
                    value={value}
                    disabled={!isEdit}
                  />
                )}
              />
              <FormValidationError errorMessage={errors.labelTypeId?.message} />
            </div>
            <div className="col-lg-4 col-md-6 col-12 my-2">
              <Controller
                control={control}
                name="tickets"
                render={({ field: { onChange, value } }) => (
                  <MDBInput
                    label="Tickets*"
                    type="number"
                    className={errors.tickets && "is-invalid"}
                    onChange={onChange}
                    value={value}
                    disabled={!isEdit}
                    onKeyDown={(e) => {
                      if (e.key === ".") {
                        e.preventDefault();
                      }
                    }}
                  />
                )}
              />
              <FormValidationError errorMessage={errors.tickets?.message} />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-12 my-2">
              <Controller
                control={control}
                name="departmentId"
                render={({ field: { onChange, value } }) => (
                  <MDBSelect
                    label="Department*"
                    inputClassName={errors.departmentId && "is-invalid"}
                    data={getDepartmentsOptions(value)}
                    onValueChange={(data) => {
                      if ("value" in data) {
                        onChange(data.value);
                      }
                    }}
                    preventFirstSelection
                    search
                    value={value}
                    disabled={!isEdit}
                  />
                )}
              />
              <FormValidationError
                errorMessage={errors.departmentId?.message}
              />
            </div>
            <div className="col-lg-4 col-md-6 col-12 my-2">
              <Controller
                control={control}
                name="floorId"
                render={({ field: { onChange, value } }) => (
                  <MDBSelect
                    label="Floor*"
                    inputClassName={errors.floorId && "is-invalid"}
                    data={getFloorsOptions(value)}
                    onValueChange={(data) => {
                      if ("value" in data) {
                        onChange(data.value);
                      }
                    }}
                    search
                    preventFirstSelection
                    value={value}
                    disabled={!isEdit}
                  />
                )}
              />
              <FormValidationError errorMessage={errors.floorId?.message} />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-12 my-2">
              <Controller
                control={control}
                name="gradeId"
                render={({ field: { onChange, value } }) => (
                  <MDBSelect
                    label="Grade*"
                    inputClassName={errors.gradeId && "is-invalid"}
                    data={getGradesOptions(value)}
                    onValueChange={(data) => {
                      if ("value" in data) {
                        onChange(data.value);
                      }
                    }}
                    search
                    preventFirstSelection
                    value={value}
                    disabled={!isEdit}
                  />
                )}
              />
              <FormValidationError errorMessage={errors.gradeId?.message} />
            </div>
            <div className="col-lg-4 col-md-6 col-12 my-2">
              <Controller
                control={control}
                name="unitWeight"
                render={({ field: { onChange, value } }) => (
                  <MDBInput
                    label="Unit Weight*"
                    className={errors.unitWeight && "is-invalid"}
                    onChange={onChange}
                    disabled={!isEdit}
                    value={value}
                  />
                )}
              />
              <FormValidationError errorMessage={errors.unitWeight?.message} />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-12 my-2">
              <Controller
                control={control}
                name="wunitId"
                render={({ field: { onChange, value } }) => (
                  <MDBSelect
                    label="W-Unit*"
                    inputClassName={errors.wunitId && "is-invalid"}
                    data={getWeightUnitOptions(value)}
                    onValueChange={(data) => {
                      if ("value" in data) {
                        onChange(data.value);
                      }
                    }}
                    preventFirstSelection
                    search
                    value={value}
                    disabled={!isEdit}
                  />
                )}
              />
              <FormValidationError errorMessage={errors.wunitId?.message} />
            </div>
            <div className="col-lg-4 col-md-6 col-12 my-2">
              <Controller
                control={control}
                name="pieces"
                render={({ field: { onChange, value } }) => (
                  <MDBInput
                    label="Pieces"
                    className={errors.pieces && "is-invalid"}
                    onChange={onChange}
                    value={value}
                    disabled={!isEdit}
                  />
                )}
              />
              <FormValidationError errorMessage={errors.pieces?.message} />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-12 my-2">
              <Controller
                control={control}
                name="priQUnit"
                render={({ field: { onChange, value } }) => (
                  <MDBSelect
                    label="Pri Q-Unit*"
                    inputClassName={errors.priQUnit && "is-invalid"}
                    data={getQuantityUnitOptions(value)}
                    onValueChange={(data) => {
                      if ("value" in data) {
                        onChange(data.value);
                      }
                    }}
                    preventFirstSelection
                    search
                    value={value}
                    disabled
                  />
                )}
              />
              <FormValidationError errorMessage={errors.priQUnit?.message} />
            </div>
            <div className="col-lg-4 col-md-6 col-12 my-2">
              <Controller
                control={control}
                name="secUnitId"
                render={({ field: { onChange, value } }) => (
                  <MDBSelect
                    label="Sec Q-Unit*"
                    inputClassName={errors.secUnitId && "is-invalid"}
                    data={getQuantityUnitOptions(value)}
                    onValueChange={(data) => {
                      if ("value" in data) {
                        onChange(data.value);
                      }
                    }}
                    preventFirstSelection
                    search
                    value={value}
                    disabled
                  />
                )}
              />
              <FormValidationError errorMessage={errors.secUnitId?.message} />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-12 my-2">
              <Controller
                control={control}
                name="clientId"
                render={({ field: { onChange, value } }) => (
                  <MDBSelect
                    label="Client"
                    inputClassName={errors.labelTypeId && "is-invalid"}
                    data={getClientsOptions(value)}
                    onValueChange={(data) => {
                      if ("value" in data) {
                        onChange(data.value);
                      }
                    }}
                    preventFirstSelection
                    search
                    value={value}
                    disabled={!isEdit}
                  />
                )}
              />
              <FormValidationError errorMessage={errors.labelTypeId?.message} />
            </div>
            <div className="col-lg-4 col-md-6 col-12 my-2">
              <Controller
                control={control}
                name="description"
                render={({ field: { onChange, value } }) => (
                  <MDBInput
                    label="Description"
                    className={errors.description && "is-invalid"}
                    onChange={onChange}
                    value={value}
                    disabled={!isEdit}
                  />
                )}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-12 my-2">
              <Controller
                control={control}
                name="isPrint"
                render={({ field: { onChange, value } }) => (
                  <MDBCheckbox
                    label="Print"
                    onChange={onChange}
                    checked={value ? value : false}
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
