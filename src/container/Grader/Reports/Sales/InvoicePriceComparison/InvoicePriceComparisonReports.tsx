import { useEffect, useRef } from "react";
import SalesReportsSideNav from "components/Reports/SalesReportsSidenav";
import { useLazyGetInvoicePriceComparisonQuery } from "redux/features/sales/Reports/InvoicePriceComparisonApiSlice";
import { getDateFromMillis } from "helper/utility";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit";
import styles from "container/Grader/Reports/Sales/InvoicePriceComparison/styles.module.css";
import Loader from "shared/Components/Loader/Loader";

export default function InvoicePriceComparisonReports() {
  const ref = useRef<HTMLInputElement | null>(null);
  const [getReports, reportsData] = useLazyGetInvoicePriceComparisonQuery();
  const queryParams = {};
  useEffect(() => {
    getReports(queryParams);
  }, []);

  const invoices = reportsData?.data?.payLoad?.invoices ?? [];
  const items = reportsData?.data?.payLoad?.items ?? [];
  return (
    <>
      <div className="d-lg-flex">
        <div>
          <SalesReportsSideNav type={7} />
        </div>
        <div className="table-container">
          <div ref={ref} className="my-2">
            {reportsData.isLoading ? (
              <div style={{ margin: "10rem auto" }}>
                <div>
                  <Loader />
                </div>
              </div>
            ) : (
              <MDBTable small responsive bordered>
                <MDBTableHead className={styles["header"]}>
                  <tr>
                    <th
                      className={styles[`header-column`]}
                      rowSpan={5}
                      colSpan={4}
                    ></th>
                    <th className={styles[`header-column`]}>Invoice</th>
                    {invoices.map((inv) => {
                      return (
                        <th
                          key={inv.invoiceId}
                          className={styles[`header-column`]}
                        >
                          {inv.invoiceNo ?? "-"}
                        </th>
                      );
                    })}
                  </tr>
                  <tr>
                    <th className={styles[`header-column`]}>Customer</th>
                    {invoices.map((inv) => {
                      return (
                        <th
                          key={inv.invoiceId}
                          className={styles[`header-column`]}
                        >
                          {inv.client?.user?.fullName ?? "-"}
                        </th>
                      );
                    })}
                  </tr>
                  <tr>
                    <th className={styles[`header-column`]}>Reference</th>
                    {invoices.map((inv) => {
                      return (
                        <th
                          key={inv.invoiceId}
                          className={styles[`header-column`]}
                        >
                          {inv.referenceNumber ?? "-"}
                        </th>
                      );
                    })}
                  </tr>
                  <tr>
                    <th className={styles[`header-column`]}>Container No</th>
                    {invoices.map((inv) => {
                      return (
                        <th
                          key={inv.invoiceId}
                          className={styles[`header-column`]}
                        >
                          {inv.containerNo ?? "-"}
                        </th>
                      );
                    })}
                  </tr>
                  <tr>
                    <th className={styles[`header-column`]}>Date</th>
                    {invoices.map((inv) => {
                      return (
                        <th
                          key={inv.invoiceId}
                          className={styles[`header-column`]}
                          rowSpan={2}
                          align="justify"
                        >
                          {getDateFromMillis(inv?.invoiceDate)}
                        </th>
                      );
                    })}
                  </tr>
                  <tr>
                    <th className={styles[`header-column`]}>Item</th>
                    <th className={styles[`header-column`]}>Code</th>
                    <th className={styles[`header-column`]}>Category</th>
                    <th className={styles[`header-column`]}>Type</th>
                    <th className={styles[`header-column`]}></th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {items?.map((item) => {
                    return (
                      <tr>
                        <td>
                          <span className={"elipses-1 " + styles["column"]}>
                            {item.name ?? "-"}
                          </span>
                        </td>
                        <td>
                          <span className={"elipses-1 " + styles["column"]}>
                            {item.itemCode ?? "-"}
                          </span>
                        </td>
                        <td>
                          <span className={"elipses-1 " + styles["column"]}>
                            {item.category?.name ?? "-"}
                          </span>
                        </td>
                        <td colSpan={2}>
                          <span className={"elipses-1 " + styles["column"]}>
                            {item.labelType?.name ?? "-"}
                          </span>
                        </td>

                        {invoices.map((inv) => {
                          return (
                            <td key={inv.invoiceId}>
                              <span className={"elipses-1 " + styles["column"]}>
                                {inv.items?.find(
                                  (it) => it.item?.itemId === item?.itemId
                                )?.amount ?? ""}
                              </span>
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                  {items?.length > 0 && (
                    <tr>
                      <td colSpan={5}>
                        <span
                          className={"elipses-1 fw-bold " + styles["column"]}
                        >
                          Totals
                        </span>
                      </td>

                      {invoices.map((inv) => {
                        return (
                          <td key={inv.invoiceId}>
                            <span className={"elipses-1 " + styles["column"]}>
                              {items.reduce((total, item) => {
                                return (
                                  total +
                                  (inv?.items?.find(
                                    (it) => it.item?.itemId === item?.itemId
                                  )?.amount ?? 0)
                                );
                              }, 0)}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  )}
                </MDBTableBody>
              </MDBTable>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
