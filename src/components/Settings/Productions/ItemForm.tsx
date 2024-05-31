import { MDBInput, MDBRadio, MDBSelect } from "mdb-react-ui-kit";
import {
  Control,
  Controller,
  FieldErrorsImpl,
  UseFormWatch,
  UseFormSetValue,
} from "react-hook-form";
import FormValidationError from "shared/Components/FormValidationError";
import { ProductionItemsRequest } from "redux/types/Settings/Productions/items";
import { SelectData } from "mdb-react-ui-kit/dist/types/pro/forms/SelectV2/types";
import { useLazyGetCategoryQuery } from "redux/features/Settings/purchase/categoryApiSlice";
import {
  Categories,
  CategoryRequest,
} from "redux/types/Settings/Purchase/categories";
import { useEffect, useState } from "react";
import { useGetLabelTypesQuery } from "redux/features/Settings/Productions/labeltypesApiSlice";
import { LabelTypesData } from "redux/types/Settings/Productions/labeltype";
import { useLazyGetGradesQuery } from "redux/features/Settings/Productions/gradeApiSlice";
import { useLazyGetGroupsQuery } from "redux/features/Settings/Productions/groupApiSlice";
import { Group } from "redux/types/common/group";
import { useLazyGetQuantityUnitsQuery } from "redux/features/Settings/Productions/quantityUnitApiSlice";
import { useLazyGetWeightUnitQuery } from "redux/features/Settings/Productions/weightUnitApiSlice";
import { WeightUnit } from "redux/types/common/weightUnit";
import { useLazyGetuomQuery } from "redux/features/uom/uomApiSlice";
import { UnitOfMeasurement } from "redux/types/common/uom";
import { QuantityUnit } from "redux/types/common/quantityUnit";
import { useGetRateOnQuery } from "redux/features/purchase/Order/RateOnApiSlice";
import { RateOn } from "redux/types/common/rateOn";
import { useGetAllBrandsQuery } from "redux/features/Settings/Productions/brandApiSlice";
import { Brand } from "redux/types/Settings/Productions/brand";
import { Grade } from "redux/types/common/grade";
import { calculateWeights, convertWghtToLbs, roundValue } from "helper/utility";
interface Props {
  isEdit: boolean;
  control: Control<ProductionItemsRequest>;
  errors: Partial<FieldErrorsImpl<ProductionItemsRequest>>;
  mode: string;
  selectedBrands: number[];
  setSelectedBrands: React.Dispatch<React.SetStateAction<number[]>>;
  watch: UseFormWatch<ProductionItemsRequest>;
  setValue: UseFormSetValue<ProductionItemsRequest>;
}
export default function ItemForm({
  isEdit,
  control,
  mode,
  errors,
  selectedBrands,
  setSelectedBrands,
  watch,
  setValue,
}: Props) {
  const [triggerGetCategories, resultGetCategories] = useLazyGetCategoryQuery();
  const { data } = useGetLabelTypesQuery(null);
  const [triggerGetGrade, resultGetGrade] = useLazyGetGradesQuery();
  const { data: rateonData } = useGetRateOnQuery(null);
  const { data: brandsData } = useGetAllBrandsQuery(null);
  const [triggerGetGroup, resultGetGroup] = useLazyGetGroupsQuery();
  const [triggerGetQuantityUnit, resultGetQuantityUnit] =
    useLazyGetQuantityUnitsQuery();
  const [triggerGetWeightUnit, resultGetWeightUnit] =
    useLazyGetWeightUnitQuery();
  const [triggerGetUOM, resultGetUOM] = useLazyGetuomQuery();
  const [categoryData, setCategoryData] = useState<CategoryRequest[]>([]);
  const [gradesData, setGradesData] = useState<Grade[]>([]);
  const [groupData, setGroupData] = useState<Group[]>([]);
  const [quantityUnitData, setQuantityUnitData] = useState<QuantityUnit[]>([]);
  const [weightUnitData, setWeightUnitData] = useState<WeightUnit[]>([]);
  const [uomData, setUOMData] = useState<UnitOfMeasurement[]>([]);

  useEffect(() => {
    let categories = resultGetCategories?.data;
    if (categories && categories.length > 0) {
      setCategoryData(categories);
    } else {
      const isProduction = true;
      triggerGetCategories(isProduction);
    }
  }, [resultGetCategories.data, triggerGetCategories]);

  useEffect(() => {
    let grades = resultGetGrade?.data;
    if (grades && grades.length > 0) {
      setGradesData(grades);
    } else {
      triggerGetGrade(null);
    }
  }, [resultGetGrade.data, triggerGetGrade]);

  useEffect(() => {
    let groups = resultGetGroup?.data;
    if (groups && groups.length > 0) {
      setGroupData(groups);
    } else {
      triggerGetGroup(null);
    }
  }, [resultGetGroup.data, triggerGetGroup]);

  useEffect(() => {
    let quantityUnit = resultGetQuantityUnit?.data;
    if (quantityUnit && quantityUnit.length > 0) {
      setQuantityUnitData(quantityUnit);
    } else {
      triggerGetQuantityUnit(null);
    }
  }, [resultGetQuantityUnit.data, triggerGetQuantityUnit]);

  useEffect(() => {
    let weightUnit = resultGetWeightUnit?.data;
    if (weightUnit && weightUnit.length > 0) {
      setWeightUnitData(weightUnit);
    } else {
      triggerGetWeightUnit(null);
    }
  }, [resultGetWeightUnit.data, triggerGetWeightUnit]);

  useEffect(() => {
    let uom = resultGetUOM?.data;
    if (uom && uom.length > 0) {
      setUOMData(uom);
    } else {
      triggerGetUOM(null);
    }
  }, [resultGetUOM.data, triggerGetUOM]);

  const labelTypeDataList = (id: number) => {
    return data
      ? data?.map((label: LabelTypesData) => {
          return {
            text: label?.name,
            value: label?.labelTypeId,
            defaultSelected: label?.labelTypeId === id,
          };
        })
      : [];
  };
  const RateonDataList = (id: number) => {
    return rateonData
      ? rateonData?.map((label: RateOn) => {
          return {
            text: label?.name,
            value: label?.rateOnId,
            defaultSelected: label?.rateOnId === id,
          };
        })
      : [];
  };
  const categoryDataList = (id: number) => {
    return categoryData?.map((cat: CategoryRequest) => {
      return {
        text: cat?.name,
        value: cat?.categoryId,
        defaultSelected: cat?.categoryId === id,
      };
    });
  };
  const gradeDataList = (id: number) => {
    return gradesData?.map((grade: Grade) => {
      return {
        text: grade?.name,
        value: grade?.gradeId,
        defaultSelected: grade?.gradeId === id,
      };
    });
  };
  const groupDataList = (id: number) => {
    return groupData?.map((group: Group) => {
      return {
        text: group?.name,
        value: group?.groupId,
        defaultSelected: group?.groupId === id,
      };
    });
  };
  const quantityUnitDataList = (id: number) => {
    return quantityUnitData?.map((qunit: QuantityUnit) => {
      return {
        text: qunit?.name ? qunit?.name : "",
        value: qunit?.quantityUnitId ? qunit?.quantityUnitId : 0,
        defaultSelected: qunit?.quantityUnitId === id,
      };
    });
  };
  const weightUnitUnitDataList = (id: number) => {
    return weightUnitData?.map((wunit: WeightUnit) => {
      return {
        text: wunit?.name ? wunit?.name : "",
        value: wunit?.weightUnitId ? wunit?.weightUnitId : 0,
        defaultSelected: wunit?.weightUnitId === id,
      };
    });
  };
  const uomDataList = (id: number) => {
    return uomData?.map((uom: UnitOfMeasurement) => {
      return {
        text: uom?.name ? uom?.name : "",
        value: uom?.unitId ? uom?.unitId : 0,
        defaultSelected: uom?.unitId === id,
      };
    });
  };
  useEffect(() => {
    setValue(
      "weightKgs",
      watch("unitPieces") *
        calculateWeights(+watch("unitWeight"), watch("weightUnitId"))[0]
    );
  }, [watch("unitPieces"), watch("unitWeight"), watch("weightUnitId")]);
  useEffect(() => {
    setValue(
      "weightLbs",
      watch("unitPieces") *
        calculateWeights(+watch("unitWeight"), watch("weightUnitId"))[1]
    );
  }, [watch("unitPieces"), watch("unitWeight"), watch("weightUnitId")]);
  useEffect(() => {
    if (watch("unitRate") && watch("weightLbs") && watch("unitPieces")) {
      setValue(
        "amount",
        (watch("unitRate") * watch("unitPieces")) / watch("weightLbs")
      );
    }
    // watch("rateOnId") === 2 && watch("weightLbs")
    // ? setValue("amount", watch("unitRate") / watch("weightLbs"))
    //   : watch("rateOnId") === 1 && watch("unitWeight")
    //   ? setValue("amount", watch("unitRate") / watch("weightKgs"))
    //   : watch("rateOnId") === 3 && watch("unitPieces")
    //   ? setValue("amount", watch("unitRate") / watch("unitPieces"))
    //   : "";
  }, [
    watch("unitRate"),
    watch("unitWeight"),
    watch("unitPieces"),
    watch("weightUnitId"),
    watch("rateOnId"),
  ]);
  return (
    <div className="mx-3 my-3">
      <div className="row mx-0">
        <div className="col-md-5 col-11 m-2">
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <MDBInput
                className={`${errors.name && "is-invalid"}`}
                label="Item Name"
                type="text"
                disabled={!isEdit}
                onChange={onChange}
                value={value}
              />
            )}
          />
          <FormValidationError errorMessage={errors.name?.message} />
        </div>
        <div className="col-md-5 col-11 m-2">
          <Controller
            control={control}
            name="labelTypeId"
            render={({ field: { onChange, value } }) => (
              <MDBSelect
                label="Label Type"
                inputClassName={`${errors.labelTypeId && "is-invalid"}`}
                data={labelTypeDataList(value)}
                disabled={!isEdit}
                onValueChange={(data: SelectData | SelectData[]) => {
                  if (!Array.isArray(data)) {
                    onChange(data.value);
                  }
                }}
                search
                preventFirstSelection
              />
            )}
          />
          <FormValidationError errorMessage={errors.labelTypeId?.message} />
        </div>
      </div>
      <div className="row mx-0">
        <div className="col-md-5 col-11 m-2">
          <Controller
            control={control}
            name="categoryId"
            render={({ field: { onChange, value } }) => (
              <MDBSelect
                inputClassName={`${errors.categoryId && "is-invalid"}`}
                label="Category"
                type="text"
                data={categoryDataList(value)}
                disabled={!isEdit}
                onValueChange={(data: SelectData | SelectData[]) => {
                  if (!Array.isArray(data)) {
                    onChange(data.value);
                  }
                }}
                search
                preventFirstSelection
              />
            )}
          />
          <FormValidationError errorMessage={errors.categoryId?.message} />
        </div>
        <div className="col-md-5 col-11 m-2">
          <Controller
            control={control}
            name="itemCode"
            render={({ field: { onChange, value } }) => (
              <MDBInput
                label="Item Code"
                type="text"
                disabled={!isEdit}
                onChange={onChange}
                value={value}
              />
            )}
          />
        </div>
      </div>
      <div className="row mx-0">
        <div className="col-md-5 col-11 m-2">
          <Controller
            control={control}
            name="gradeId"
            render={({ field: { onChange, value } }) => (
              <MDBSelect
                label="Grade"
                type="text"
                data={gradeDataList(value)}
                disabled={!isEdit}
                onValueChange={(data: SelectData | SelectData[]) => {
                  if (!Array.isArray(data)) {
                    onChange(data.value);
                  }
                }}
                search
                preventFirstSelection
              />
            )}
          />
        </div>
        <div className="col-md-5 col-11 m-2">
          <span className="me-5">Active</span>
          <Controller
            control={control}
            name="active"
            render={({ field: { onChange, value } }) => (
              <>
                <MDBRadio
                  label="Yes"
                  inline
                  onChange={() => onChange(true)}
                  disabled={!isEdit}
                  checked={value === true}
                />
                <MDBRadio
                  id="transaction"
                  label="No"
                  inline
                  onChange={() => onChange(false)}
                  checked={value === false}
                  disabled={!isEdit}
                />
              </>
            )}
          />
          <FormValidationError errorMessage={errors.active?.message} />
        </div>
      </div>
      <div className="row mx-0">
        <div className="col-md-5 col-11 m-2">
          <Controller
            control={control}
            name="expProQty"
            render={({ field: { onChange, value } }) => (
              <MDBInput
                className={`${errors.expProQty && "is-invalid"}`}
                label="Exp Pro Qty"
                type="text"
                disabled={!isEdit}
                onChange={onChange}
                value={value}
              />
            )}
          />
          <FormValidationError errorMessage={errors.expProQty?.message} />
        </div>
        <div className="col-md-5 col-11 m-2">
          <Controller
            control={control}
            name="expProKgs"
            render={({ field: { onChange, value } }) => (
              <MDBInput
                className={`${errors.expProKgs && "is-invalid"}`}
                label="Exp Pro Kgs"
                type="number"
                disabled={!isEdit}
                onChange={onChange}
                value={value}
              />
            )}
          />
          <FormValidationError errorMessage={errors.expProKgs?.message} />
        </div>
      </div>
      <div className="row mx-0">
        <div className="col-md-5 col-11 m-2">
          <Controller
            control={control}
            name="groupId"
            render={({ field: { onChange, value } }) => (
              <MDBSelect
                label="Group"
                type="text"
                data={groupDataList(value)}
                disabled={!isEdit}
                onValueChange={(data: SelectData | SelectData[]) => {
                  if (!Array.isArray(data)) {
                    onChange(data.value);
                  }
                }}
                search
                preventFirstSelection
              />
            )}
          />
        </div>
        <div className="col-md-5 col-11 m-2">
          <Controller
            control={control}
            name="quantityUnitId"
            render={({ field: { onChange, value } }) => (
              <MDBSelect
                inputClassName={`${errors.quantityUnitId && "is-invalid"}`}
                label="Pri Q-Unit"
                type="text"
                data={quantityUnitDataList(value)}
                disabled={!isEdit}
                onValueChange={(data: SelectData | SelectData[]) => {
                  if (!Array.isArray(data)) {
                    onChange(data.value);
                  }
                }}
                search
                preventFirstSelection
              />
            )}
          />
          <FormValidationError errorMessage={errors.quantityUnitId?.message} />
        </div>
      </div>
      <div className="row mx-0">
        <div className="col-md-5 col-11 m-2">
          <Controller
            control={control}
            name="weightUnitId"
            render={({ field: { onChange, value } }) => (
              <MDBSelect
                label="Weight Unit"
                type="text"
                data={weightUnitUnitDataList(value ? value : 0)}
                disabled={!isEdit}
                onValueChange={(data: SelectData | SelectData[]) => {
                  if (!Array.isArray(data)) {
                    onChange(data.value);
                  }
                }}
                search
                preventFirstSelection
              />
            )}
          />
        </div>
        <div className="col-md-5 col-11 m-2">
          <Controller
            control={control}
            name="unitOfMeasurementId"
            render={({ field: { onChange, value } }) => (
              <MDBSelect
                inputClassName={`${errors.unitOfMeasurementId && "is-invalid"}`}
                label="UOM"
                type="text"
                data={uomDataList(value)}
                disabled={!isEdit}
                onValueChange={(data: SelectData | SelectData[]) => {
                  if (!Array.isArray(data)) {
                    onChange(data.value);
                  }
                }}
                search
                preventFirstSelection
              />
            )}
          />
          <FormValidationError
            errorMessage={errors.unitOfMeasurementId?.message}
          />
        </div>
      </div>
      <div className="row mx-0">
        <div className="col-md-5 col-11 m-2">
          <Controller
            control={control}
            name="unitRate"
            render={({ field: { onChange, value } }) => (
              <MDBInput
                label="Unit Rate"
                type="text"
                value={value}
                disabled={!isEdit}
                onChange={onChange}
              />
            )}
          />
        </div>
        <div className="col-md-5 col-11 m-2">
          <Controller
            control={control}
            name="rateOnId"
            render={({ field: { onChange, value } }) => (
              <MDBSelect
                inputClassName={`${errors.rateOnId && "is-invalid"}`}
                label="Rate On"
                type="text"
                data={RateonDataList(value ? value : 0)}
                value={value}
                disabled={!isEdit}
                onValueChange={(data: SelectData | SelectData[]) => {
                  if (!Array.isArray(data)) {
                    onChange(data.value);
                  }
                }}
                search
                preventFirstSelection
              />
            )}
          />
          <FormValidationError errorMessage={errors.rateOnId?.message} />
        </div>
      </div>
      <div className="row mx-0">
        <div className="col-md-5 col-11 m-2">
          <Controller
            control={control}
            name="unitPieces"
            render={({ field: { onChange, value } }) => (
              <MDBInput
                label="Unit Pieces"
                type="text"
                onChange={onChange}
                value={value}
                disabled={!isEdit}
              />
            )}
          />
        </div>
        <div className="col-md-5 col-11 m-2">
          <Controller
            control={control}
            name="unitWeight"
            render={({ field: { onChange, value } }) => (
              <MDBInput
                label="Unit Weight"
                type="number"
                disabled={!isEdit}
                onChange={onChange}
                value={value}
              />
            )}
          />
        </div>
      </div>
      <div className="row mx-0">
        <div className="col-md-5 col-11 m-2">
          <Controller
            control={control}
            name="weightKgs"
            render={({ field: { onChange, value } }) => (
              <MDBInput
                label="Weight(Kgs)"
                type="text"
                value={value ? roundValue(value) : 0.0}
                disabled
                onChange={onChange}
              />
            )}
          />
        </div>
        <div className="col-md-5 col-11 m-2">
          <Controller
            control={control}
            name="weightLbs"
            render={({ field: { onChange, value } }) => (
              <MDBInput
                label="Weight(Lbs)"
                type="text"
                value={value ? roundValue(value) : 0.0}
                disabled
                onChange={onChange}
              />
            )}
          />
        </div>
      </div>
      <div className="row mx-0">
        <div className="col-md-5 col-11 m-2">
          <Controller
            control={control}
            name="amount"
            render={({ field: { onChange, value } }) => (
              <MDBInput
                label={"Amount/Lbs"}
                type="text"
                value={value ? roundValue(value, 4) : 0.0}
                disabled
                onChange={onChange}
              />
            )}
          />
        </div>
        {mode === "ADD" && (
          <div className="col-md-5 col-11 m-2">
            <MDBSelect
              multiple
              search
              name="selectedBrands"
              selectAll={false}
              displayedLabels={1}
              optionsSelectedLabel={"Brands selected"}
              placeholder="Brands"
              data={
                brandsData
                  ? brandsData?.map((data: Brand) => {
                      return {
                        text: data?.name ? data?.name : "",
                        value: data?.brandId ? data?.brandId : 0,
                        defaultSelected: !!selectedBrands?.find(
                          (id) => id === data.brandId
                        ),
                      };
                    })
                  : []
              }
              onValueChange={(data) => {
                if ("map" in data) {
                  setSelectedBrands(data.map((d) => +(d?.value ?? 0)));
                }
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
