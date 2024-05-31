export interface InvoiceType {
  invoiceTypeId: number;
  name?: string;
}
export interface InvoiceTypeRequest extends Record<string, number | string> {
  invoiceTypeId: number;
  name: string;
}
