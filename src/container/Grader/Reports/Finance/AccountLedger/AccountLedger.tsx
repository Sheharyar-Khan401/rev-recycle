import FinanceReportsSideNav from "components/Reports/FinanceReportsSidenav";

export default function AccountLedger() {
  return (
    <>
      <div>
        <div className="d-lg-flex">
          <FinanceReportsSideNav type={2} />
        </div>
      </div>
    </>
  );
}
