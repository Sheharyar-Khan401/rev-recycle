import { Route, Routes } from "react-router-dom";
import CategoriesNavigation from "container/Grader/Settings/Purchase/Categories/index";
import AlertsNavigation from "container/Grader/Settings/Purchase/Alerts/index";
import ChargeTypeNavigation from "container/Grader/Settings/Purchase/ChargeTypes/index";
import Items from "container/Grader/Settings/Purchase/Items/index";
import LocationsNavigation from "container/Grader/Settings/Purchase/Locations/index";
import PortsNavigation from "container/Grader/Settings/Purchase/Ports/index";
import TypesNavigation from "container/Grader/Settings/Purchase/Types/index";
import ShippingLine from "container/Grader/Settings/Purchase/ShippingLine/ShippingLine";
import NotificationsNavigation from "./Notifications";

export default function PurchaseNavigation() {
  return (
    <Routes>
      <>
        {/* <Route path="*" element={<AlertsNavigation />} /> */}
        <Route path="*" element={<CategoriesNavigation />} />
        <Route path="notifications/" element={<NotificationsNavigation />} />
        <Route path="categories/*" element={<CategoriesNavigation />} />
        <Route path="items/*" element={<Items />} />
        <Route path="types/*" element={<TypesNavigation />} />
        <Route path="ports/*" element={<PortsNavigation />} />
        <Route path="locations/*" element={<LocationsNavigation />} />
        <Route path="chargetypes/*" element={<ChargeTypeNavigation />} />
        <Route path="shippinglines/*" element={<ShippingLine />} />
      </>
    </Routes>
  );
}
