import { MDBSelect } from "mdb-react-ui-kit";
import { Control, Controller, FieldErrorsImpl } from "react-hook-form";
import {
  InvoicesTableData,
  PurchaseInvoicesRequest,
} from "redux/types/Invoices/Invoices";
import { SelectData } from "mdb-react-ui-kit/dist/types/pro/forms/SelectV2/types";
import { getDateFromMillis } from "helper/utility";
import CustomButton from "../CustomButton";

export default function InvoiceSideCard({
  name,
  label,
  getDataList,
  selectedInvoice,
  onAddClick,
  onViewClick,
  control,
  isEdit,
  errors,
  posted
}: {
  name: keyof PurchaseInvoicesRequest;
  label: string;
  getDataList: (v?: number) => {
    text: string;
    value: number;
    defaultSelected: boolean;
  }[];
  selectedInvoice?: InvoicesTableData;
  onAddClick: () => void;
  onViewClick: () => void;
  control: Control<PurchaseInvoicesRequest, null>;
  isEdit: boolean;
  errors: Partial<FieldErrorsImpl<PurchaseInvoicesRequest>>;
  posted?: boolean
}) {
  return (
    <div className="border p-2 rounded-1 bg-light my-3">
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <MDBSelect
            label={label}
            data={getDataList(typeof value === "number" ? value : 0)}
            inputClassName={errors?.freightInvoiceId && "is-invalid"}
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
      {selectedInvoice ? (
        <>
          <div className="d-flex justify-content-between my-2">
            <div className="d-flex mx-2">
              <div className="fw-bold me-1">Agent</div>
              <div>
                {selectedInvoice?.client
                  ? selectedInvoice?.client.user?.fullName
                  : "-"}
              </div>
            </div>
            <div className="d-flex mx-2">
              <div className="fw-bold me-1">Date</div>
              <div>{getDateFromMillis(selectedInvoice?.invoiceDate)}</div>
            </div>
          </div>
          <div className="d-flex justify-content-between my-2">
            <div className="d-flex mx-2">
              <div className="fw-bold me-1">Consignee</div>
              <div>
                {selectedInvoice?.placeOfReceipt
                  ? selectedInvoice?.placeOfReceipt
                  : "-"}
              </div>
            </div>
            <div className="d-flex mx-2">
              <div className="fw-bold me-1">Volume</div>
              <div>
                {selectedInvoice?.volume ? selectedInvoice?.volume : "-"}
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between my-2">
            <div className="d-flex mx-2">
              <div className="fw-bold me-1">Invoice No.</div>
              <div>
                {selectedInvoice?.invoiceNo ? selectedInvoice?.invoiceNo : "-"}
              </div>
            </div>
            <div className="d-flex mx-2">
              <div className="fw-bold me-1">Charges</div>
              <div>
                {selectedInvoice.totalCharges??"-"}
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between my-2">
            <div className="d-flex mx-2">
              <div className="fw-bold me-1">Bill To Supplier</div>
              <div>
                {selectedInvoice
                  ? selectedInvoice.billToSupplier
                    ? "Yes"
                    : "No"
                  : "-"}
              </div>
            </div>
            <div>
              {selectedInvoice && (
                <CustomButton
                  type="hollow"
                  size="sm"
                  onClick={onViewClick}
                  title="View"
                />
              )}
            </div>
          </div>
        </>
      ) : !posted && (
        <CustomButton
          type="hollow"
          className="mt-2"
          size="sm"
          onClick={onAddClick}
          title="Add"
        />
      )}
    </div>
  );
}
