import { Control, FieldErrorsImpl, Controller } from "react-hook-form";
import { MDBDatepicker, MDBInput, MDBRadio, MDBSelect } from "mdb-react-ui-kit";
import FormValidationError from "shared/Components/FormValidationError";
import { SelectData } from "mdb-react-ui-kit/dist/types/pro/forms/SelectV2/types";
import { useGetAllAgentsQuery } from "redux/features/Clients/Agents/agentsApiSlice";
import {
  useGetBusinessCurrrencyQuery,
  useGetCurrrencyQuery,
} from "redux/features/currency/currencyApiSlice";
import { InvoicesRequest } from "redux/types/Invoices/Invoices";
import {
  BusinessCurrency,
  CurrencyRequest,
} from "redux/types/Settings/Finance/currency";
import { Client } from "redux/types/Clients/Clients/client";
interface Props {
  isEdit: boolean;
  control: Control<InvoicesRequest, null>;
  errors: Partial<FieldErrorsImpl<InvoicesRequest>>;
  mode: string;
}
export default function CustomInvoiceForm({ isEdit, control, errors }: Props) {
  const { data: AgentsData } = useGetAllAgentsQuery(null);
  const { data: currencyData } = useGetBusinessCurrrencyQuery(null);
  const AgentsDataList = (id: number) => {
    return AgentsData
      ? AgentsData?.map((item: Client) => {
          return {
            text: item?.user?.fullName,
            value: item?.clientId,
            defaultSelected: item?.clientId === id,
          };
        })
      : [];
  };
  const CurrencyDataList = (id: number) => {
    return currencyData
      ? currencyData?.map((item: BusinessCurrency) => {
          return {
            text: item?.currency?.name,
            value: item?.businesscurrencyId,
            defaultSelected: item?.businesscurrencyId === id,
          };
        })
      : [];
  };
  return (
    <>
      <div className="m-3">
        <div className="row mx-0">
          <div className="col-md-5 col-11 m-2">
            <Controller
              control={control}
              name="invoiceDate"
              render={({ field: { onChange, value } }) => (
                <MDBDatepicker
                  label="Date*"
                  format="yyyy-mm-dd"
                  className={errors.invoiceDate && "is-invalid"}
                  value={value}
                  onChange={onChange}
                  inputLabel=" "
                  inline
                  disabled={!isEdit}
                />
              )}
            />
            <FormValidationError errorMessage={errors.invoiceDate?.message} />
          </div>
          <div className="col-md-5 col-11 m-2">
            <Controller
              control={control}
              name="containerNo"
              render={({ field: { onChange, value } }) => (
                <MDBInput
                  className={`${errors.containerNo && "is-invalid"}`}
                  label="Container No.*"
                  type="string"
                  onChange={onChange}
                  value={value}
                  disabled={!isEdit}
                />
              )}
            />
            <FormValidationError errorMessage={errors.containerNo?.message} />
          </div>
        </div>
        <div className="row mx-0">
          <div className="col-md-5 col-11 m-2">
            <Controller
              control={control}
              name="placeOfReceipt"
              render={({ field: { onChange, value } }) => (
                <MDBInput
                  label="Place Of Receipt"
                  type="string"
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
              name="clientId"
              render={({ field: { onChange, value } }) => (
                <MDBSelect
                  label="Select Agent*"
                  data={AgentsDataList(value ?? 0)}
                  onValueChange={(data: SelectData | SelectData[]) => {
                    if (!Array.isArray(data)) {
                      onChange(data.value);
                    }
                  }}
                  inputClassName={`${errors.clientId && "is-invalid"}`}
                  search
                  disabled={!isEdit}
                  preventFirstSelection
                />
              )}
            />
            <FormValidationError errorMessage={errors.clientId?.message} />
          </div>
        </div>
        <div className="row mx-0">
          <div className="col-md-5 col-11 m-2">
            <Controller
              control={control}
              name="volume"
              render={({ field: { onChange, value } }) => (
                <MDBInput
                  label="Volume"
                  type="number"
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
              name="invoiceNo"
              render={({ field: { onChange, value } }) => (
                <MDBInput
                  label="Invoice No*"
                  type="string"
                  className={`${errors.invoiceNo && "is-invalid"}`}
                  onChange={onChange}
                  value={value}
                  disabled={!isEdit}
                />
              )}
            />
            <FormValidationError errorMessage={errors.invoiceNo?.message} />
          </div>
        </div>
        <div className="row align-items-center mx-0">
          <div className="col-md-5 col-11 m-2">
            <Controller
              control={control}
              name="currencyId"
              render={({ field: { onChange, value } }) => (
                <MDBSelect
                  label="Currency"
                  data={CurrencyDataList(value)}
                  inputClassName={errors?.currencyId && "is-invalid"}
                  onValueChange={(data: SelectData | SelectData[]) => {
                    if (!Array.isArray(data)) {
                      onChange(data.value);
                    }
                  }}
                  search
                  disabled={!isEdit}
                  preventFirstSelection
                />
              )}
            />
          </div>
          <div className="col-md-5 col-11 m-2">
            <span className="me-5 fw500">Paid</span>
            <Controller
              control={control}
              name="paid"
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
                    label="No"
                    inline
                    onChange={() => onChange(false)}
                    checked={value === false}
                    disabled={!isEdit}
                  />
                </>
              )}
            />
          </div>
        </div>

        <div className="row align-items-center mx-0">
          <div className="col-md-5 col-11 m-2">
            <span className="me-5 fw500">Bill To Supplier</span>
            <Controller
              control={control}
              name="billToSupplier"
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
                    label="No"
                    inline
                    onChange={() => onChange(false)}
                    checked={value === false}
                    disabled={!isEdit}
                  />
                </>
              )}
            />
          </div>
        </div>
      </div>
    </>
  );
}
