import FinanceReportsSideNav from "components/Reports/FinanceReportsSidenav";

export default function FinanceSummary() {
  return (
    <>
      <div>
        <div className="d-lg-flex">
          <FinanceReportsSideNav type={1} />
        </div>
      </div>
    </>
  );
}
