import FinanceReportsSideNav from "components/Reports/FinanceReportsSidenav";

export default function IncomeStatement() {
  return (
    <>
      <div>
        <div className="d-lg-flex">
          <FinanceReportsSideNav type={5} />
        </div>
      </div>
    </>
  );
}
