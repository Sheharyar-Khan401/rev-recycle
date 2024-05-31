import Sidebar from "shared/Components/Sidebar/Sidebar";
interface Props {
  type: number;
}
export default function PurchaseSideNav({ type }: Props) {
  return (
    <>
      <Sidebar
        title="Purchase Setup"
        type={type}
        navigations={[
          // {
          //   type: 11,
          //   name: "Alert Limits",
          //   route: "/grader/settings/purchase/Alerts",
          // },
          {
            type: 9,
            name: "Categories",
            route: "/grader/settings/purchase/categories",
          },
          {
            type: 4,
            name: "Items",
            route: "/grader/settings/purchase/items",
          },
          {
            type: 5,
            name: "Types",
            route: "/grader/settings/purchase/types",
          },
          {
            type: 6,
            name: "Ports",
            route: "/grader/settings/purchase/ports",
          },
          {
            type: 8,
            name: "Charge Types",
            route: "/grader/settings/purchase/chargetypes",
          },
          {
            type: 7,
            name: "Locations",
            route: "/grader/settings/purchase/locations",
          },
          {
            type: 10,
            name: "Shipping Lines",
            route: "/grader/settings/purchase/shippinglines",
          },
          {
            type: 12,
            name: "Notification Emails",
            route: "/grader/settings/purchase/notifications",
          },
        ]}
      />
    </>
  );
}
