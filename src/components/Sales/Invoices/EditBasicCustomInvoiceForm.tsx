import { Control, FieldErrorsImpl, Controller } from "react-hook-form";
import { MDBDatepicker, MDBInput, MDBRadio, MDBSelect } from "mdb-react-ui-kit";
import FormValidationError from "shared/Components/FormValidationError";
import { SelectData } from "mdb-react-ui-kit/dist/types/pro/forms/SelectV2/types";
import { useGetAllAgentsQuery } from "redux/features/Clients/Agents/agentsApiSlice";
import { useGetCurrrencyQuery } from "redux/features/currency/currencyApiSlice";
import { useGetChargeTypeQuery } from "redux/features/Settings/purchase/chargetypeApiSlice";

import EditableDataTable, {
  column,
} from "shared/Components/EditableDatatable/EditableDatatable";
import { InvoicesRequest } from "redux/types/Invoices/Invoices";
import { CurrencyRequest } from "redux/types/Settings/Finance/currency";
import { ChargeTypeRequest } from "redux/types/Settings/Purchase/chargetype";
import { Client } from "redux/types/Clients/Clients/client";

interface Props {
  isEdit: boolean;
  control: Control<InvoicesRequest, null>;
  errors: Partial<FieldErrorsImpl<InvoicesRequest>>;
  rowData: ChargeTypeRequest[];
  setRowData: React.Dispatch<React.SetStateAction<ChargeTypeRequest[]>>;
}
export default function EditBasicCustomInvoiceForm({
  isEdit,
  control,
  errors,
  rowData,
  setRowData,
}: Props) {
  const { data: AgentsData } = useGetAllAgentsQuery(null);
  const { data: currencyData } = useGetCurrrencyQuery(null);
  const { data: chargeTypeData } = useGetChargeTypeQuery(null);

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
      ? currencyData?.map((item: CurrencyRequest) => {
          return {
            text: item?.name,
            value: item?.currencyId,
            defaultSelected: item?.currencyId === id,
          };
        })
      : [];
  };
  const columns: column<"invoiceChargeTypeId", ChargeTypeRequest>[] = [
    {
      label: "Charge Type",
      field: "chargeTypeId",
      sort: false,
      inputType: "select",
      options: chargeTypeData?.length
        ? chargeTypeData.map((item) => {
            return {
              text: item?.name ? item?.name : "-",
              value: item?.chargeTypeId,
            };
          })
        : [],
    },
    {
      label: "Amount",
      field: "amount",
      inputType: "number",
      sort: false,
    },
  ];
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
                  onValueChange={(data: SelectData | SelectData[]) => {
                    if (!Array.isArray(data)) {
                      onChange(data.value);
                    }
                  }}
                  inputClassName={`${errors.clientId && "is-invalid"}`}
                  search
                  disabled={!isEdit}
                  value={value}
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
                  label="Volume"
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
              name="invoiceNo"
              render={({ field: { onChange, value } }) => (
                <MDBInput
                  label="Invoice No*"
                  type="string"
                  onChange={onChange}
                  className={`${errors.invoiceNo && "is-invalid"}`}
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
              name="currencyId"
              render={({ field: { onChange, value } }) => (
                <MDBSelect
                  label="Currency"
                  data={CurrencyDataList(value)}
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
        </div>
        <div className="row align-items-center">
          <div className="col-md-5 col-11 my-2">
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
        <div className="my-4">
          <EditableDataTable
            identifier="invoiceChargeTypeId"
            addText="Add Charge Type"
            columns={columns}
            rows={rowData ? rowData : []}
            setRows={setRowData}
            isLoading={false}
            defaultEditable={isEdit}
          />
        </div>
      </div>
    </>
  );
}
