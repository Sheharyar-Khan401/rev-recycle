import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductionSideNav from "components/Settings/Productions/ProductionSidenav";
import {
  useDeleteBrandMutation,
  useLazyGetBrandsQuery,
} from "redux/features/Settings/Productions/brandApiSlice";
import { Brand } from "redux/types/Settings/Productions/brand";
import RoutingActionButton from "shared/Components/ActionButton/RoutingActionButton";
import DataTable from "shared/Components/DataTable";
import Filters from "shared/Components/Filters";
import { roundValue } from "helper/utility";

export default function BrandsListing() {
  const navigate = useNavigate();
  const ref = useRef<HTMLInputElement | null>(null);
  const [getBrands, result] = useLazyGetBrandsQuery();
  const [deleteBrand] = useDeleteBrandMutation();
  const [brandsList, setBrandsList] = useState<Brand[]>([]);

  const handleDelete = (id: number) => {
    if (id) {
      deleteBrand(id);
    }
  };

  useEffect(() => {
    if (result?.data) {
      setBrandsList(result?.data?.payLoad);
    }
  }, [result?.data]);
  useEffect(() => {
    getBrands({});
  }, [getBrands]);
  return (
    <>
      <div className="d-lg-flex">
        <ProductionSideNav type={11} />
        <div className="table-container">
          <Filters
            componentRef={ref}
            addRedirectPath="/grader/settings/productions/brands/add"
            printAble={brandsList && brandsList.length > 0}
            exportAble={brandsList && brandsList.length > 0}
          />
          <DataTable
            isLoading={result?.isFetching}
            columns={[
              { label: "Brand Name", field: "name" },
              { label: "Brand Code", field: "code" },
              { label: "Weight in Kgs", field: "weightInKgs" },
              { label: "Printable Name", field: "printableName" },
              { label: "Printable Weight Unit", field: "printableWeightUnit" },
              { label: "Show Weight on Print", field: "weightOnPrint" },
              { label: "Items", field: "items" },
              { label: "ACTION", field: "action" },
            ]}
            rows={
              brandsList
                ? brandsList?.map((item: Brand) => {
                    return {
                      name: item?.name ? item?.name : "-",
                      code: item?.code ? item?.code : "-",
                      weightInKgs: item?.weightInKgs
                        ? roundValue(item?.weightInKgs)
                        : 0.0,
                      printableName: item?.printableName
                        ? item?.printableName
                        : "-",
                      printableWeightUnit: item?.weightUnit
                        ? item?.weightUnit?.name
                        : "-",
                      weightOnPrint: item?.weightOnPrint ? "Yes" : "No",
                      items: (
                        <>
                          <span
                            className="cursor"
                            style={{ color: "#3b71ca" }}
                            onClick={() =>
                              navigate(
                                "/grader/settings/productions/brands/items/" +
                                  item?.brandId
                              )
                            }
                          >
                            Items
                          </span>
                        </>
                      ),
                      action: (
                        <RoutingActionButton
                          onNavigate={() =>
                            navigate(
                              "/grader/settings/productions/brands/edit/" +
                                item?.brandId
                            )
                          }
                          onDeleteClick={() => {
                            handleDelete(item?.brandId);
                          }}
                        />
                      ),
                    };
                  })
                : []
            }
          />
        </div>
      </div>
    </>
  );
}
