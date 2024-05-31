import Sidebar from "shared/Components/Sidebar/Sidebar";
interface Props {
  type: number;
}
export default function VouchersSideNav({ type }: Props) {
  return (
    <>
      <Sidebar
        title="Vouchers"
        type={type}
        navigations={[
          {
            type: 1,
            name: "Cash Payment Vouchers",
            route: "/grader/finance/vouchers/cashpaymentvouchers",
          },
          {
            type: 2,
            name: "Cash Reciept Vouchers",
            route: "/grader/finance/vouchers/cashreceiptvouchers",
          },
          {
            type: 3,
            name: "Bank Reciept Vouchers",
            route: "/grader/finance/vouchers/bankreceiptvouchers",
          },
          {
            type: 4,
            name: "Bank Payment Vouchers",
            route: "/grader/finance/vouchers/bankpaymentvouchers",
          },
          {
            type: 5,
            name: "Journel Vouchers",
            route: "/grader/finance/vouchers/journelvouchers",
          },
        ]}
      />
    </>
  );
}
