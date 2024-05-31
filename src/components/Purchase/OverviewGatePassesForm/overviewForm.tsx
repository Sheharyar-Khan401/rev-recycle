import {
  MDBSelect,
  MDBDatepicker,
  MDBInput,
  MDBTimepicker,
} from "mdb-react-ui-kit";
import {
  Control,
  Controller,
  FieldErrorsImpl,
  UseFormWatch,
  UseFormSetValue,
} from "react-hook-form";
import FormValidationError from "shared/Components/FormValidationError";
import { overViewGatePasses } from "redux/types/GatePasses/gatePasses";
import { SelectData } from "mdb-react-ui-kit/dist/types/pro/forms/SelectV2/types";
import { useGetInvoiceTypesQuery } from "redux/features/Settings/purchase/invoiceTypeApiSlice";
import { InvoiceType } from "redux/types/Settings/Purchase/invoicetype";
import { useGetAllSupplierQuery } from "redux/features/Clients/Suppliers/suppliersApiSlice";
import { useGetStockRoomsQuery } from "redux/features/Settings/Productions/stockroomsApiSlice";
import { StockroomsData } from "redux/types/Settings/Productions/Stockroom";
import { useGetPurchaseMethodQuery } from "redux/features/Settings/Productions/purchaseMethodApiSlice";
import { PurchaseMethodData } from "redux/types/common/purchaseMethod";
import { useGetWeightUnitsQuery } from "redux/features/common/weightUintApiSlice";
import { Client } from "redux/types/Clients/Clients/client";
import { WeightUnit } from "redux/types/common/weightUnit";
interface Props {
  isEdit: boolean;
  control: Control<overViewGatePasses>;
  errors: Partial<FieldErrorsImpl<overViewGatePasses>>;
  watch?: UseFormWatch<overViewGatePasses>;
  setValue?: UseFormSetValue<overViewGatePasses>;
  getValues?: UseFormSetValue<overViewGatePasses>;
}
export default function OverViewForm({
  isEdit,
  control,
  errors,
  setValue,
}: Props) {
  const { data } = useGetInvoiceTypesQuery(null);
  const { data: supplierData } = useGetAllSupplierQuery(null);
  const { data: stockRoomData } = useGetStockRoomsQuery(null);
  const { data: purchaseMethodData } = useGetPurchaseMethodQuery(null);
  const { data: weightUnitData } = useGetWeightUnitsQuery(null);

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
  const getSupplierData = (selectedValue: number) => {
    if (supplierData?.length) {
      return supplierData.map((supplier: Client) => {
        return {
          text: supplier?.user?.fullName,
          value: supplier?.clientId,
          defaultSelected: supplier?.clientId === selectedValue,
        };
      });
    } else return [];
  };
  const getStockRoomData = (selectedValue: number) => {
    if (stockRoomData?.length) {
      return stockRoomData.map((stockRoom: StockroomsData) => {
        return {
          text: stockRoom?.name,
          value: stockRoom?.stockRoomId,
          defaultSelected: stockRoom?.stockRoomId === selectedValue,
        };
      });
    } else return [];
  };
  const getPurchaseMethodData = (selectedValue: number) => {
    if (purchaseMethodData?.length) {
      return purchaseMethodData.map((pMethod: PurchaseMethodData) => {
        return {
          text: pMethod?.purchaseMethodName ?? "",
          value: pMethod?.purchaseMethodId ?? 0,
          defaultSelected: pMethod?.purchaseMethodId === selectedValue,
        };
      });
    } else return [];
  };

  const getWeightUnitData = (selectedValue?: number) => {
    if (weightUnitData?.length) {
      return weightUnitData.map((weightUnit: WeightUnit) => {
        return {
          text: weightUnit?.name ?? "",
          value: weightUnit?.weightUnitId ?? 0,
          defaultSelected: weightUnit?.weightUnitId === selectedValue,
        };
      });
    } else return [];
  };

  return (
    <>
      <div className="my-3">
        <div className="row">
          <div className="col-md-5 col-11 my-2">
            <Controller
              control={control}
              name="passingDate"
              render={({ field: { onChange, value } }) => (
                <MDBDatepicker
                  label="Date*"
                  format="yyyy-mm-dd"
                  className={errors.passingDate && "is-invalid"}
                  value={value}
                  onChange={onChange}
                  inputLabel=" "
                  inline
                  disabled={!isEdit}
                />
              )}
            />
            <FormValidationError errorMessage={errors.passingDate?.message} />
          </div>
          <div className="col-md-5 col-11 my-2">
            <Controller
              control={control}
              name="containerNo"
              render={({ field: { onChange, value } }) => (
                <MDBInput
                  label="Container No*"
                  value={value}
                  onChange={onChange}
                  disabled={!isEdit}
                  className={errors.containerNo && "is-invalid"}
                />
              )}
            />
            <FormValidationError errorMessage={errors.containerNo?.message} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-5 col-11 my-2">
            <Controller
              control={control}
              name="arrivalTime"
              render={({ field: { onChange, value } }) => (
                <MDBTimepicker
                  inputLabel="Arrival Time"
                  format="12h"
                  value={value}
                  onChange={onChange}
                  disabled={!isEdit}
                  inline
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
                  inputLabel="Departure Time"
                  value={value}
                  onChange={onChange}
                  disabled={!isEdit}
                  inline
                />
              )}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-5 col-11 my-2">
            <Controller
              control={control}
              name="invoiceNo"
              render={({ field: { onChange, value } }) => (
                <MDBInput
                  label="Invoice No*"
                  onChange={onChange}
                  value={value}
                  disabled
                />
              )}
            />
          </div>
          <div className="col-md-5 col-11 my-2">
            <Controller
              control={control}
              name="vehicleNo"
              render={({ field: { onChange, value } }) => (
                <MDBInput
                  label="Vechicle No"
                  type="string"
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
              control={control}
              name="referenceNumber"
              render={({ field: { onChange, value } }) => (
                <MDBInput
                  label="Reference No"
                  type="string"
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
                  label="Invoice Type"
                  data={getInvoiceTypeData(value)}
                  onValueChange={(data: SelectData | SelectData[]) => {
                    if (!Array.isArray(data)) {
                      onChange(data.value);
                    }
                  }}
                  search
                  preventFirstSelection
                  disabled={!isEdit}
                  value={value}
                />
              )}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-5 col-11 my-2">
            <Controller
              control={control}
              name="clientId"
              render={({ field: { onChange, value } }) => (
                <MDBSelect
                  label="Supplier"
                  data={getSupplierData(value)}
                  onValueChange={(data: SelectData | SelectData[]) => {
                    if (!Array.isArray(data)) {
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
          </div>
          <div className="col-md-5 col-11 my-2">
            <Controller
              control={control}
              name="stockRoomId"
              render={({ field: { onChange, value } }) => (
                <MDBSelect
                  label="Stock Room"
                  data={getStockRoomData(value)}
                  onValueChange={(data: SelectData | SelectData[]) => {
                    if (!Array.isArray(data)) {
                      onChange(data.value);
                    }
                  }}
                  search
                  preventFirstSelection
                  disabled={!isEdit}
                  value={value}
                />
              )}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-5 col-11 my-2">
            <Controller
              control={control}
              name="purchaseMethodId"
              render={({ field: { onChange, value } }) => (
                <MDBSelect
                  label="Purchase Method*"
                  data={getPurchaseMethodData(value)}
                  inputClassName={errors?.purchaseMethodId && "is-invalid"}
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
            <FormValidationError
              errorMessage={errors.purchaseMethodId?.message}
            />
          </div>
        </div>

        <div>
          <h6 className="fw-bold mt-2">Weight Info</h6>

          <div className="row">
            <div className="col-md-5 col-11 my-2">
              <Controller
                control={control}
                name="totalWeightKgs"
                render={({ field: { onChange, value } }) => (
                  <MDBInput
                    label="Total Weight(KGS)*"
                    type="number"
                    className={errors?.totalWeightKgs && "is-invalid"}
                    onChange={onChange}
                    value={value.toFixed(0)}
                    disabled
                  />
                )}
              />
              <FormValidationError
                errorMessage={errors.totalWeightKgs?.message}
              />
            </div>
            <div className="col-md-5 col-11 my-2">
              <Controller
                control={control}
                name="totalWeightLbs"
                render={({ field: { onChange, value } }) => (
                  <MDBInput
                    label="Total Weight(LBS)*"
                    type="number"
                    onChange={onChange}
                    className={errors?.totalWeightLbs && "is-invalid"}
                    value={value.toFixed(0)}
                    disabled
                  />
                )}
              />
              <FormValidationError
                errorMessage={errors.totalWeightLbs?.message}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-5 col-11 my-2">
              <Controller
                control={control}
                name="kantaWeight"
                render={({ field: { onChange, value } }) => (
                  <MDBInput
                    label="Kanta Weight"
                    type="number"
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
                name="weightDifference"
                render={({ field: { onChange, value } }) => (
                  <MDBInput
                    label="Weight Diff"
                    type="number"
                    onChange={onChange}
                    value={value.toFixed(0)}
                    disabled
                  />
                )}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-5 col-11 my-1">
              <Controller
                name="kantaWeightUnit"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <MDBSelect
                    label="Kanta Weight Unit*"
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
              <FormValidationError
                errorMessage={errors.weightUnitId?.message}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
