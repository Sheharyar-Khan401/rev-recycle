import { Control, FieldErrorsImpl, Controller, UseFormWatch } from "react-hook-form";
import { MDBDatepicker, MDBInput, MDBRadio, MDBSelect } from "mdb-react-ui-kit";
import FormValidationError from "shared/Components/FormValidationError";
import { SaleInvoicesBillRequest } from "redux/types/Invoices/Invoices";
import { BusinessCurrency } from "redux/types/Settings/Finance/currency";
import { Client } from "redux/types/Clients/Clients/client";
import { useGetBusinessCurrrencyQuery } from "redux/features/currency/currencyApiSlice";
import { useGetAllAgentsQuery } from "redux/features/Clients/Agents/agentsApiSlice";
interface Props {
  isEdit: boolean;
  control: Control<SaleInvoicesBillRequest, null>;
  errors: Partial<FieldErrorsImpl<SaleInvoicesBillRequest>>;
  watch: UseFormWatch<SaleInvoicesBillRequest>;
}
export default function EditBillCustomInvoiceForm({
  isEdit,
  control,
  errors,
  watch
}: Props) {
  const { data: currencyData } = useGetBusinessCurrrencyQuery(null);
  const { data: AgentsData } = useGetAllAgentsQuery(null);

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
  const currencyDataList = (id: number) => {
    return currencyData
      ? currencyData?.map((account: BusinessCurrency) => {
          return {
            text: account.currency ? account.currency?.name : "",
            value: account.businesscurrencyId ? account.businesscurrencyId : 0,
            defaultSelected: account.businesscurrencyId === id,
          };
        })
      : [];
  };
  return (
    <div>
      <div className="row">
        <div className="col-lg-4 col-md-4 col-11 my-2">
          <span className="me-5 fw500">Bill</span>
          <Controller
            control={control}
            name="bill"
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
        <FormValidationError errorMessage={errors.bill?.message} />
      </div>
      {watch("bill") && (
        <div>
          <div className="row">
            <div className="col-lg-4 col-md-4 col-11 my-2">
              <Controller
                control={control}
                name="billDate"
                render={({ field: { onChange, value } }) => (
                  <MDBDatepicker
                    label="Bill Date*"
                    format="yyyy-mm-dd"
                    className={errors.billDate && "is-invalid"}
                    value={value}
                    disabled={!isEdit}
                    onChange={onChange}
                    inputLabel=" "
                    inline
                  />
                )}
              />
              <FormValidationError errorMessage={errors.billDate?.message} />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-4 col-11 my-2">
              <Controller
                control={control}
                name="billAmount"
                render={({ field: { onChange, value } }) => (
                  <MDBInput
                    className={`${errors.billAmount && "is-invalid"}`}
                    label="Bill Amount*"
                    type="number"
                    disabled={!isEdit}
                    onChange={onChange}
                    value={value}
                  />
                )}
              />
              <FormValidationError errorMessage={errors.billAmount?.message} />
            </div>
            <div className="col-lg-4 col-md-4 col-11 my-2">
              <Controller
                control={control}
                name="billAgentId"
                render={({ field: { onChange, value } }) => (
                  <MDBSelect
                    label="Bill Agent"
                    type="number"
                    inputClassName={`${errors.billAgentId && "is-invalid"}`}
                    data={AgentsDataList(value ?? 0)}
                    onValueChange={(data) => {
                      if ("value" in data) {
                        onChange(data.value);
                      }
                    }}
                    preventFirstSelection
                    search
                    disabled={!isEdit}
                  />
                )}
              />
              <FormValidationError errorMessage={errors.billAgentId?.message} />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-4 col-11 my-2">
              <Controller
                control={control}
                name="billCurrencyId"
                render={({ field: { onChange, value } }) => (
                  <MDBSelect
                    label="Bill Currency"
                    type="number"
                    inputClassName={`${errors.billCurrencyId && "is-invalid"}`}
                    data={currencyDataList(value ?? 0)}
                    onValueChange={(data) => {
                      if ("value" in data) {
                        onChange(data.value);
                      }
                    }}
                    preventFirstSelection
                    search
                    disabled={!isEdit}
                  />
                )}
              />
              <FormValidationError
                errorMessage={errors.billCurrencyId?.message}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-4 col-11 my-2">
              <Controller
                control={control}
                name="billNarration"
                render={({ field: { onChange, value } }) => (
                  <MDBInput
                    className={`${errors.billNarration && "is-invalid"}`}
                    label="Bill Narration"
                    disabled={!isEdit}
                    onChange={onChange}
                    value={value}
                  />
                )}
              />
              <FormValidationError
                errorMessage={errors.billNarration?.message}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
