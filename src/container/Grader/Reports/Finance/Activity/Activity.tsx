import FinanceReportsSideNav from "components/Reports/FinanceReportsSidenav";

export default function Activity() {
  return (
    <>
      <div>
        <div className="d-lg-flex">
          <FinanceReportsSideNav type={3} />
        </div>
      </div>
    </>
  );
}
