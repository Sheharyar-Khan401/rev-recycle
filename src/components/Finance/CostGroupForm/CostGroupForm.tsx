import { MDBInput, MDBSelect } from "mdb-react-ui-kit";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormSetValue,
} from "react-hook-form";
import FormValidationError from "shared/Components/FormValidationError";
import { useGetCostGroupTypeQuery } from "redux/features/finance/primarydata/costgrouptypeApiSlice";
import { useGetAllCostGroupQuery } from "redux/features/finance/primarydata/costgroupApiSlice";
import {
  CostGroup,
  CostGroupRequest,
} from "redux/types/Finance/PrimaryData/costgroup";
import { useState, useEffect } from "react";
import Loader from "shared/Components/Loader/Loader";

interface Props {
  mode: string;
  isEdit: boolean;
  control: Control<CostGroupRequest, null>;
  errors: FieldErrors<CostGroupRequest>;
  setValue?: UseFormSetValue<CostGroupRequest>;
  parentCostgroupId?: number;
}
export default function CostGroupForm({
  mode,
  isEdit,
  control,
  errors,
  setValue,
  parentCostgroupId,
}: Props) {
  const { isLoading: costTypeLoading, data: costGroupType } =
    useGetCostGroupTypeQuery(null);
  const [costGroupTypeData, setCostGroupTypeData] = useState<
    CostGroupRequest[]
  >([]);
  const { isLoading, data } = useGetAllCostGroupQuery(null);
  const [costGroupData, setCostGroupData] = useState<CostGroup[]>([]);

  const CostGroupTypeList = (id: number) => {
    return costGroupTypeData?.map((status) => {
      return {
        text: status?.name,
        value: status?.costGroupTypeId,
        defaultSelected: status?.costGroupTypeId === id,
      };
    });
  };
  const CostGroupList = (id: number) => {
    return costGroupData
      ?.filter((item) => item?.costGroupId !== parentCostgroupId)
      ?.map((status) => {
        return {
          text: status?.name,
          value: status.costGroupId,
          defaultSelected: status.costGroupId === id,
        };
      });
  };

  useEffect(() => {
    if (costGroupType && costGroupType.length > 0) {
      setCostGroupTypeData(costGroupType);

      setValue &&
        setValue("costgrouptypeId", costGroupType[0]?.costGroupTypeId ?? 0);
    }
  }, [costGroupType]);
  useEffect(() => {
    if (data && data.length > 0) setCostGroupData(data);
  }, [data]);
  return (
    <>
      {isLoading || costTypeLoading ? (
        <div style={{ margin: "5rem" }}>
          <Loader />
        </div>
      ) : (
        <div>
          <div className="col-lg-4 col-md-6 col-11 my-3">
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <MDBInput
                  className={`${errors.name && "is-invalid"}`}
                  label="Cost Group Name*"
                  type="text"
                  disabled={!isEdit}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
            <FormValidationError errorMessage={errors.name?.message} />
          </div>
          <div className="col-lg-4 col-md-6 col-11 my-3">
            <Controller
              control={control}
              name="costgrouptypeId"
              render={({ field: { onChange, value } }) => (
                <MDBSelect
                  label="Cost Group Type*"
                  search
                  data={CostGroupTypeList(value ?? 0)}
                  inputClassName={`${errors.costgrouptypeId && "is-invalid"}`}
                  onValueChange={(data) => {
                    if ("value" in data) {
                      onChange(data.value);
                    }
                  }}
                  disabled={!isEdit}
                  value={value}
                />
              )}
            />

            <FormValidationError
              errorMessage={errors.costgrouptypeId?.message}
            />
          </div>
          <div className="col-lg-4 col-md-6 col-11 my-3">
            <Controller
              control={control}
              name="parentCostgroupId"
              render={({ field: { onChange, value } }) => (
                <MDBSelect
                  label="Parent"
                  search
                  data={CostGroupList(value ?? 0)}
                  onValueChange={(data) => {
                    if ("value" in data) {
                      onChange(data.value);
                    }
                  }}
                  preventFirstSelection
                  disabled={!isEdit}
                />
              )}
            />
          </div>
        </div>
      )}
    </>
  );
}
