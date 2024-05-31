import FinanceReportsSideNav from "components/Reports/FinanceReportsSidenav";

export default function BalanceSheet() {
  return (
    <>
      <div>
        <div className="d-lg-flex">
          <FinanceReportsSideNav type={4} />
        </div>
      </div>
    </>
  );
}
