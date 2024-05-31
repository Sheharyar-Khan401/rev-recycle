import {
  Control,
  FieldErrorsImpl,
  Controller,
  UseFormWatch,
  UseFormSetValue,
} from "react-hook-form";
import {
  MDBDatepicker,
  MDBInput,
  MDBSelect,
  MDBTextArea,
  MDBTimepicker,
} from "mdb-react-ui-kit";
import FormValidationError from "shared/Components/FormValidationError";
import { SelectData } from "mdb-react-ui-kit/dist/types/pro/forms/SelectV2/types";
import { useEffect } from "react";
import { BasicSaleGP } from "redux/types/Sales/gatepasses";
import { useGetInvoiceTypesQuery } from "redux/features/Settings/purchase/invoiceTypeApiSlice";
import { InvoiceType } from "redux/types/Settings/Purchase/invoicetype";
import { useGetWeightUnitsQuery } from "redux/features/common/weightUintApiSlice";
import { WeightUnit } from "redux/types/common/weightUnit";
import { Client } from "redux/types/Clients/Clients/client";
import { useGetAllClientsQuery } from "redux/features/Clients/Clients/clientsApiSlice";
interface Props {
  isEdit: boolean;
  control: Control<BasicSaleGP, null>;
  errors: Partial<FieldErrorsImpl<BasicSaleGP>>;
  watch: UseFormWatch<BasicSaleGP>;
  setValue: UseFormSetValue<BasicSaleGP>;
}
export default function EditBasicGPForm({
  isEdit,
  control,
  errors,
  watch,
  setValue,
}: Props) {
  const { data: suppliersData } = useGetAllClientsQuery(null);
  const { data } = useGetInvoiceTypesQuery(null);
  const { data: weightUnitList } = useGetWeightUnitsQuery(null);
  const getCustomerData = (selectedValue: number) => {
    if (suppliersData?.length) {
      return suppliersData.map((customer: Client) => {
        return {
          text: customer?.user ? customer?.user?.fullName : "",
          value: customer?.clientId ? customer?.clientId : 0,
          defaultSelected: customer?.clientId === selectedValue,
        };
      });
    } else return [];
  };
  const getInvoiceTypeData = (selectedValue: number) => {
    if (data?.length) {
      return data.map((invoice: InvoiceType) => {
        return {
          text: invoice?.name,
          value: invoice?.invoiceTypeId,
          defaultSelected: invoice?.invoiceTypeId === selectedValue,
        };
      });
    } else return [];
  };
  const getWeightUnitData = (selectedValue?: number) => {
    if (weightUnitList?.length) {
      return weightUnitList.map((weightUnit: WeightUnit) => {
        return {
          text: weightUnit?.name,
          value: weightUnit?.weightUnitId,
          defaultSelected: weightUnit?.weightUnitId === selectedValue,
        };
      });
    } else return [];
  };
  useEffect(() => {
    if (watch("invoiceTypeId") === 0 && data && data?.length > 0) {
      setValue("invoiceTypeId", data[0]?.invoiceTypeId);
    }
  }, [data, watch, setValue]);
  return (
    <>
      <div className="my-3">
        <div className="row">
          <div className="col-md-5 col-11 my-2">
            <Controller
              control={control}
              name="date"
              render={({ field: { onChange, value } }) => (
                <MDBDatepicker
                  label="Date*"
                  format="yyyy-mm-dd"
                  className={errors.date && "is-invalid"}
                  value={value}
                  onChange={onChange}
                  inputLabel=""
                  inline
                  disabled={!isEdit}
                />
              )}
            />
            <FormValidationError errorMessage={errors.date?.message} />
          </div>
          <div className="col-md-5 col-11 my-2">
            <Controller
              control={control}
              name="customerId"
              render={({ field: { onChange, value } }) => (
                <MDBSelect
                  label="Select Customer"
                  data={getCustomerData(value)}
                  inputClassName={errors?.customerId && "is-invalid"}
                  onValueChange={(data: SelectData | SelectData[]) => {
                    if (!Array.isArray(data)) {
                      onChange(data.value);
                    }
                  }}
                  disabled={!isEdit}
                  value={value}
                  search
                  preventFirstSelection
                />
              )}
            />
            <FormValidationError errorMessage={errors.customerId?.message} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-5 col-11 my-2">
            <Controller
              control={control}
              name="arrivalTime"
              render={({ field: { onChange, value } }) => (
                <MDBTimepicker
                  className={`${errors.arrivalTime && "is-invalid"}`}
                  inputLabel="Arrival Time"
                  format="12h"
                  value={value}
                  onChange={onChange}
                  disabled={!isEdit}
                />
              )}
            />
          </div>
          <div className="col-md-5 col-11 my-2">
            <Controller
              control={control}
              name="departureTime"
              render={({ field: { onChange, value } }) => (
                <MDBTimepicker
                  className={`${errors.departureTime && "is-invalid"}`}
                  inputLabel="Departure Time"
                  format="12h"
                  value={value}
                  onChange={onChange}
                  disabled={!isEdit}
                />
              )}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-5 col-11 my-2">
            <Controller
              control={control}
              name="containerNo"
              render={({ field: { onChange, value } }) => (
                <MDBInput
                  className={`${errors.containerNo && "is-invalid"}`}
                  label="Container No"
                  onChange={onChange}
                  value={value}
                  type="text"
                  disabled={!isEdit}
                />
              )}
            />
          </div>
          <div className="col-md-5 col-11 my-2">
            <Controller
              control={control}
              name="containerSerial"
              render={({ field: { onChange, value } }) => (
                <MDBInput
                  className={`${errors.containerSerial && "is-invalid"}`}
                  label="Container Serial"
                  onChange={onChange}
                  value={value}
                  disabled={!isEdit}
                />
              )}
            />
          </div>
        </div>
        <div className="row align-items-center">
          <div className="col-md-5 col-11 my-2">
            <Controller
              control={control}
              name="referenceNumber"
              render={({ field: { onChange, value } }) => (
                <MDBInput
                  className={`${errors.referenceNumber && "is-invalid"}`}
                  label="Reference No"
                  onChange={onChange}
                  value={value}
                  disabled={!isEdit}
                />
              )}
            />
          </div>
          <div className="col-md-5 col-11 my-2">
            <Controller
              control={control}
              name="invoiceTypeId"
              render={({ field: { onChange, value } }) => (
                <MDBSelect
                  label="Invoice Type*"
                  data={getInvoiceTypeData(value)}
                  inputClassName={errors?.invoiceTypeId && "is-invalid"}
                  onValueChange={(data: SelectData | SelectData[]) => {
                    if (!Array.isArray(data)) {
                      onChange(data.value);
                    }
                  }}
                  search
                  value={value}
                  disabled={!isEdit}
                  preventFirstSelection
                />
              )}
            />
            <FormValidationError errorMessage={errors.invoiceTypeId?.message} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-5 col-11 my-2">
            <Controller
              control={control}
              name="vehicleNo"
              render={({ field: { onChange, value } }) => (
                <MDBInput
                  className={`${errors.vehicleNo && "is-invalid"}`}
                  label="Vehicle No"
                  onChange={onChange}
                  value={value}
                  disabled={!isEdit}
                />
              )}
            />
          </div>
        </div>
        <div>
          <h6 className="fw-bold mt-2">Weight</h6>
          <div className="row">
            <div className="col-md-5 col-11 my-2">
              <Controller
                control={control}
                name="kantaWeightUnitId"
                render={({ field: { onChange, value } }) => (
                  <MDBSelect
                    label="Kanta Weight Unit"
                    data={getWeightUnitData(value)}
                    inputClassName={errors?.weightUnitId && "is-invalid"}
                    onValueChange={(data: SelectData | SelectData[]) => {
                      if (!Array.isArray(data)) {
                        onChange(data.value);
                      }
                    }}
                    search
                    disabled={!isEdit}
                    value={value}
                    preventFirstSelection
                  />
                )}
              />
            </div>
            <div className="col-md-5 col-11 my-2">
              <Controller
                name="kantaWeight"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <MDBInput
                    label="Kanta Weight"
                    onChange={onChange}
                    value={value}
                    disabled={!isEdit}
                  />
                )}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-5 col-11 my-2">
              <Controller
                name="weightDifference"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <MDBInput
                    label="Weight Diff"
                    onChange={onChange}
                    value={value}
                    disabled
                  />
                )}
              />
            </div>
          </div>
          <div className="row">
            <div className=" col-11 my-2">
              <Controller
                name="remarks"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <MDBTextArea
                    label="Remarks"
                    rows={3}
                    value={value}
                    style={{ resize: "none" }}
                    onChange={onChange}
                    disabled={!isEdit}
                  />
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
