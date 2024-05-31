import { Route, Routes } from "react-router-dom";
import AddBrand from "container/Grader/Settings/Productions/Brands/AddBrand";
import BrandsListing from "container/Grader/Settings/Productions/Brands/BrandsListing";
import EditBrand from "container/Grader/Settings/Productions/Brands/EditBrand";
import BrandItems from "container/Grader/Settings/Productions/Brands/BrandItems";

export default function BrandsNavigation() {
  return (
    <Routes >
      <>
        <Route path="*" element={<BrandsListing />} />
        <Route path="add/*" element={<AddBrand />} />
        <Route path="edit/:id/*" element={<EditBrand />} />
        <Route path="items/:id/*" element={<BrandItems />} />
      </>
    </Routes>
  );
}
