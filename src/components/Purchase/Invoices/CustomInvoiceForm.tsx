import { Control, FieldErrorsImpl, Controller } from "react-hook-form";
import { MDBDatepicker, MDBInput, MDBRadio, MDBSelect } from "mdb-react-ui-kit";
import FormValidationError from "shared/Components/FormValidationError";
import { SelectData } from "mdb-react-ui-kit/dist/types/pro/forms/SelectV2/types";
import { useGetAllAgentsQuery } from "redux/features/Clients/Agents/agentsApiSlice";
import { useGetBusinessCurrrencyQuery } from "redux/features/currency/currencyApiSlice";
import { BusinessCurrency } from "redux/types/Settings/Finance/currency";
import { InvoicesRequest } from "redux/types/Invoices/Invoices";
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
  // const { data: shippingLineData } = useGetShippingLineQuery(null);

  const AgentsDataList = (id: number) => {
    return (
      AgentsData ? AgentsData?.map((item: Client) => {
        return {
          text: item?.user?.fullName ? item?.user?.fullName  :"",
          value: item?.clientId ? item?.clientId : 0,
          defaultSelected: item?.clientId === id,
        };
      }) : []
    );
  };
  const CurrencyDataList = (id: number) => {
    return (
      currencyData ? currencyData?.map((item: BusinessCurrency) => {
        return {
          text: item?.currency ? item?.currency?.name : "",
          value: item?.businesscurrencyId  ? item?.businesscurrencyId : 0,
          defaultSelected: item?.businesscurrencyId === id,
        };
      }) : []
    );
  };

  return (
    <>
      <div className="my-3">
        <div className="row">
          <div className="col-md-5 col-11 my-2">
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
                  disableFuture
                  disabled={!isEdit}
                />
              )}
            />
            <FormValidationError errorMessage={errors.invoiceDate?.message} />
          </div>
          <div className="col-md-5 col-11 my-2">
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
        <div className="row">
          <div className="col-md-5 col-11 my-2">
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
          <div className="col-md-5 col-11 my-2">
            <Controller
              control={control}
              name="clientId"
              render={({ field: { onChange, value } }) => (
                <MDBSelect
                  label="Select Agent*"
                  data={AgentsDataList(value??0)}
                  inputClassName={errors?.clientId && "is-invalid"}
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
            <FormValidationError errorMessage={errors.clientId?.message} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-5 col-11 my-2">
            <Controller
              control={control}
              name="volume"
              render={({ field: { onChange, value } }) => (
                <MDBInput
                  className={`${errors.volume && "is-invalid"}`}
                  label="Volume"
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
              name="invoiceNo"
              render={({ field: { onChange, value } }) => (
                <MDBInput
                  className={`${errors.invoiceNo && "is-invalid"}`}
                  label="Invoice No*"
                  type="string"
                  onChange={onChange}
                  value={value}
                  disabled={!isEdit}
                />
              )}
            />
            <FormValidationError errorMessage={errors.invoiceNo?.message} />
          </div>
        </div>
        <div className="row align-items-center">
        <div className="col-md-5 col-11 my-2">
            <Controller
              control={control}
              name="budgetAmount"
              render={({ field: { onChange, value } }) => (
                <MDBInput
                  label="Budget Amount"
                  type="number"
                  onChange={(e) => onChange(parseInt(e.target.value))}
                  value={value}
                  disabled = {!isEdit}
                />
              )}
            />
          </div>
          
          <div className="col-md-5 col-11 my-2">
            <Controller
              control={control}
              name="currencyId"
              render={({ field: { onChange, value } }) => (
                <MDBSelect
                  label="Currency*"
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
            <FormValidationError errorMessage={errors.currencyId?.message} />
          </div>
        </div>
        <div className="row">
        <div className="col-md-5 col-11 my-2">
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
          {/* <div className="col-md-5 col-11 my-2">
            <Controller
              control={control}
              name="shippingLineId"
              render={({ field: { onChange, value } }) => (
                <MDBSelect
                  label="Select Shipping Line"
                  data={ShippingLineDataList(value ?? 0)}
                  inputClassName={errors?.shippingLineId && "is-invalid"}
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
          </div> */}

         
          <div className="col-md-5 col-11 my-2" style={{alignSelf:"center"}}>
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
