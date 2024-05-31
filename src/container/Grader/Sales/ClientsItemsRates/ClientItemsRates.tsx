import {
  MDBInput,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBRadio,
  MDBSelect,
} from "mdb-react-ui-kit";
import styles from "container/Grader/Sales/ClientsItemsRates/styles.module.css";
import { ClienItemRates } from "redux/types/Sales/ClientItemRates/clientitemsrates";
import { useEffect, useRef, useState } from "react";
import { SelectData } from "mdb-react-ui-kit/dist/types/pro/forms/SelectV2/types";
import {
  useDeleteClientItemRatesMutation,
  useLazyGetClientItemRatesQuery,
  useUpdateClientItemRatesMutation,
} from "redux/features/sales/clientitemrates/clientitemratesApiSlice";
import { useGetAllClientsQuery } from "redux/features/Clients/Clients/clientsApiSlice";
import { Client } from "redux/types/Clients/Clients/client";
import {
  calculateWeights,
  convertWghtToLbs,
  hasPermission,
  roundValue,
} from "helper/utility";
import { globalVariables } from "helper/globalVariables";
import DataTable from "shared/Components/DataTable";
import RoutingActionButton from "shared/Components/ActionButton/RoutingActionButton";
import Loader from "shared/Components/Loader/Loader";
import { CrossIcon } from "helper/icons";
import CustomButton from "shared/Components/CustomButton";
import { useNavigate } from "react-router-dom";
import { CategoryRequest } from "redux/types/Settings/Purchase/categories";
import { useLazyGetCategoryQuery } from "redux/features/Settings/purchase/categoryApiSlice";
import * as XLSX from "xlsx";

export default function ClientItemRates() {
  const ref = useRef<HTMLInputElement | null>(null);
  const { isFetching, data } = useGetAllClientsQuery(null);
  const [clientsData, setClientData] = useState<Client[]>();
  const [triggerClientItemRates, resultClientItemRate] =
    useLazyGetClientItemRatesQuery();
  const [updateClientItemRate, { isLoading: updateClientItemRateLoading }] =
    useUpdateClientItemRatesMutation();
  const [deleteClientItemRate] = useDeleteClientItemRatesMutation();
  const [isPrintNameModalOpen, setIsPrintNameModalOpen] =
    useState<boolean>(false);
  const [isUnitRateModalOpen, setIsUnitRateModalOpen] =
    useState<boolean>(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [selectedClientItemRate, setSelectedClientItemRate] =
    useState<ClienItemRates | null>(null);
  const [exportWeight, setExportWeight] = useState(40);
  const [getCategories, categoriesData] = useLazyGetCategoryQuery();

  const [queryParams, setQueryParams] = useState({
    clientId: 0,
    production: true,
    pageNumber: 0,
    pageSize: globalVariables?.ItemsPerPageLimit,
    categoryIds: [] as number[],
    itemName: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (data && data.length > 0) {
      setClientData(data);
      setQueryParams((prev) => {
        return {
          ...prev,
          clientId: data[0]?.clientId ? data[0]?.clientId : 0,
        };
      });
    }
  }, [data]);

  useEffect(() => {
    if (queryParams.clientId) triggerClientItemRates(queryParams);
  }, [queryParams]);

  useEffect(() => {
    getCategories(queryParams.production);
  }, [queryParams.production]);

  const clientsDataList = (id: number | string) => {
    return clientsData
      ? clientsData?.map((item: Client) => {
          return {
            text: item?.user ? item?.user?.fullName : "",
            value: item?.clientId ? item?.clientId : 0,
            defaultSelected: item?.clientId === id,
          };
        })
      : [];
  };

  const handleDelete = (id: number) => {
    if (id) {
      deleteClientItemRate({
        clientItemRateId: +id,
      });
    }
  };
  const categoryDataList = (ids: number[]) => {
    return (
      categoriesData.data?.map((cat: CategoryRequest) => {
        return {
          text: cat.name,
          value: cat.categoryId,
          defaultSelected: ids.includes(cat.categoryId),
        };
      }) ?? []
    );
  };

  const toggleShowPrintModal = () =>
    setIsPrintNameModalOpen(!isPrintNameModalOpen);
  const toggleShowUnitRateModal = () =>
    setIsUnitRateModalOpen(!isUnitRateModalOpen);
  const toggleShowExportModal = () => setIsExportModalOpen(!isExportModalOpen);

  function handleExportButtonClick() {
    const rows = resultClientItemRate?.data?.payLoad
      ? resultClientItemRate?.data?.payLoad.map(
          (clientItemRate: ClienItemRates) => {
            return {
              Item: clientItemRate?.item?.name
                ? clientItemRate?.item?.name
                : "-",
              "Print Name": clientItemRate?.printName
                ? clientItemRate?.printName
                : "-",
              "Client Rate": clientItemRate?.amountPerLbs
                ? roundValue(
                    convertWghtToLbs(exportWeight) *
                      roundValue(clientItemRate?.amountPerLbs)
                  )
                : 0,
              "Master Rate": clientItemRate?.masterUnitRate
                ? roundValue(clientItemRate?.masterUnitRate)
                : 0,
              "Weight (KGS)": exportWeight,
              "Weight (LBS)": convertWghtToLbs(exportWeight),
              "Rate per LBS": clientItemRate?.amountPerLbs
                ? roundValue(clientItemRate?.amountPerLbs)
                : "-",
              Category: clientItemRate?.item?.category?.name,
            };
          }
        )
      : [];
    if (rows && rows.length > 0) {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(rows);

      XLSX.utils.sheet_add_aoa(ws, [], { origin: "A1" });
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      XLSX.writeFile(wb, "Revrecycle-Client-Item-Rates" + ".xlsx");
    }
  }
  return (
    <div className="table-container">
      {isFetching || resultClientItemRate.isLoading ? (
        <div style={{ margin: "5rem" }}>
          <Loader />
        </div>
      ) : (
        <>
          <div className="d-flex align-items-center justify-content-between my-2">
            <div className="d-flex align-items-center">
              <div>
                <MDBSelect
                  size="sm"
                  label="Client"
                  className={styles.Input}
                  data={clientsDataList(
                    queryParams.clientId ? queryParams.clientId : 0
                  )}
                  onValueChange={(data: SelectData | SelectData[]) => {
                    if (!Array.isArray(data)) {
                      setQueryParams((prev) => {
                        return {
                          ...prev,
                          clientId: data?.value ? +data?.value : 0,
                        };
                      });
                    }
                  }}
                  search
                  preventFirstSelection
                />
              </div>
              <div>
                <MDBSelect
                  className="mx-3"
                  size="sm"
                  label="Select Category"
                  multiple
                  selectAll={false}
                  data={categoryDataList(queryParams.categoryIds)}
                  onValueChange={(data) => {
                    if ("length" in data && data.length > 0) {
                      setQueryParams((prev) => {
                        return {
                          ...prev,
                          categoryIds: data.map((d) =>
                            d.value ? +d.value : 0
                          ),
                        };
                      });
                    }
                  }}
                  search
                  preventFirstSelection
                  clearBtn
                />
              </div>
              <div>
                <MDBInput
                  size="sm"
                  label="Search"
                  onChange={(e) => {
                    setQueryParams((prev) => {
                      return {
                        ...prev,
                        itemName: e.target.value,
                      };
                    });
                  }}
                />
              </div>
              {/* <div className=" my-2 d-flex mx-2">
                <MDBRadio
                  label="Purchase"
                  id="purchase"
                  inline
                  onChange={() => {
                    setQueryParams((prev) => {
                      return {
                        ...prev,
                        production: false,
                      };
                    });
                  }}
                  checked={!queryParams.production}
                />
                <MDBRadio
                  label="Production"
                  id="production"
                  inline
                  onChange={() => {
                    setQueryParams((prev) => {
                      return {
                        ...prev,
                        production: true,
                      };
                    });
                  }}
                  checked={queryParams.production}
                />
              </div> */}
            </div>
            <CustomButton
              type="hollow"
              size="sm"
              title="Export"
              onClick={() => setIsExportModalOpen(true)}
            />
          </div>
          {(hasPermission("sal_clr_100") ||
            hasPermission("sal_clr_101") ||
            hasPermission("sal_clr_102") ||
            hasPermission("sal_clr_103")) &&
            resultClientItemRate?.data?.payLoad &&
            resultClientItemRate?.data?.payLoad.length > 0 && (
              <div className="col-lg-12 col-md-12 col-12 mx-auto">
                <DataTable
                  ref={ref}
                  fixLastColumn
                  isLoading={
                    resultClientItemRate.isFetching ||
                    resultClientItemRate.isLoading
                  }
                  totalItems={
                    resultClientItemRate?.data?.numberOfItems
                      ? resultClientItemRate?.data?.numberOfItems
                      : 0
                  }
                  setOffset={(offset, limit) => {
                    setQueryParams({
                      ...queryParams,
                      pageNumber: offset,
                      pageSize: limit
                        ? limit
                        : globalVariables.ItemsPerPageLimit,
                    });
                  }}
                  columns={[
                    { label: "Item", field: "item" },
                    { label: "Print Name", field: "printName" },
                    { label: "Category", field: "category" },
                    { label: "Client Rate", field: "clientUnitRate" },
                    { label: "Master Rate", field: "masterUnitRate" },
                    { label: "Weight(KGS)", field: "weightLbs" },
                    { label: "Weight(LBS)", field: "weightKgs" },
                    { label: "Rate Per Lbs", field: "amountPerLbs" },
                    { label: "Action", field: "action" },
                  ]}
                  rows={
                    resultClientItemRate?.data?.payLoad
                      ? resultClientItemRate?.data?.payLoad.map(
                          (clientItemRate: ClienItemRates) => {
                            return {
                              item: clientItemRate?.item?.name
                                ? clientItemRate?.item?.name
                                : "-",
                              clientUnitRate: (
                                <>
                                  <div
                                    onClick={() => {
                                      setSelectedClientItemRate(clientItemRate);
                                      toggleShowUnitRateModal();
                                    }}
                                    role="button"
                                    style={{ color: "#3B71CA" }}
                                  >
                                    {clientItemRate?.clientUnitRate
                                      ? roundValue(
                                          clientItemRate?.clientUnitRate
                                        )
                                      : 0}
                                  </div>
                                </>
                              ),
                              masterUnitRate: clientItemRate?.masterUnitRate
                                ? roundValue(clientItemRate?.masterUnitRate)
                                : 0,
                              weightKgs:
                                clientItemRate?.item?.weightUnit &&
                                clientItemRate?.item?.unitWeight
                                  ? calculateWeights(
                                      clientItemRate?.item?.unitWeight,
                                      clientItemRate?.item?.weightUnit
                                        ?.weightUnitId
                                    )[0]
                                  : 0,
                              weightLbs:
                                clientItemRate?.item?.weightUnit &&
                                clientItemRate?.item?.unitWeight
                                  ? calculateWeights(
                                      clientItemRate?.item?.unitWeight,
                                      clientItemRate?.item?.weightUnit
                                        ?.weightUnitId
                                    )[1]
                                  : 0,
                              amountPerLbs: clientItemRate?.amountPerLbs
                                ? roundValue(clientItemRate?.amountPerLbs)
                                : "-",
                              category: clientItemRate?.item?.category?.name,
                              printName: (
                                <>
                                  <div
                                    onClick={() => {
                                      setSelectedClientItemRate(clientItemRate);
                                      toggleShowPrintModal();
                                    }}
                                    role="button"
                                    style={{ color: "#3B71CA" }}
                                  >
                                    {clientItemRate?.printName
                                      ? clientItemRate?.printName
                                      : "-"}
                                  </div>
                                </>
                              ),

                              action: (
                                <RoutingActionButton
                                  onDeleteClick={
                                    hasPermission("sal_clr_102")
                                      ? () => {
                                          handleDelete(
                                            clientItemRate?.clientItemRateId
                                          );
                                        }
                                      : undefined
                                  }
                                  onNavigate={() => navigate("edit")}
                                />
                              ),
                            };
                          }
                        )
                      : []
                  }
                />
              </div>
            )}
        </>
      )}
      <MDBModal
        open={isPrintNameModalOpen}
        setOpen={setIsPrintNameModalOpen}
        tabIndex="-1"
      >
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalBody className="p-0 my-3">
              <div className="d-flex justify-content-between align-items-center col-11 mx-auto">
                <h6 className=" fw-bold mb-0">Edit Print Name</h6>
                <div onClick={toggleShowPrintModal} role={"button"}>
                  <CrossIcon />
                </div>
              </div>
              <hr />
              <div className="col-12 mx-auto my-2">
                <div className="px-4">
                  <MDBInput
                    value={selectedClientItemRate?.printName}
                    type="text"
                    onChange={(e) =>
                      setSelectedClientItemRate((prev) => {
                        if (prev) return { ...prev, printName: e.target.value };
                        else return null;
                      })
                    }
                  />
                </div>
                <hr />
                <div className="px-4 d-flex justify-content-between my-2">
                  <CustomButton
                    size="sm"
                    type="hollow"
                    onClick={toggleShowPrintModal}
                    title="Close"
                  />

                  <CustomButton
                    size="sm"
                    type="solid"
                    onClick={async () => {
                      const res = await updateClientItemRate(
                        selectedClientItemRate
                      );
                      if ("data" in res && res.data.status === "SUCCESS") {
                        setTimeout(() => {
                          setIsPrintNameModalOpen(false);
                        }, 2000);
                      }
                    }}
                    disabled={updateClientItemRateLoading}
                    title={
                      updateClientItemRateLoading ? "Saving..." : "Save changes"
                    }
                  />
                </div>
              </div>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
      <MDBModal
        open={isUnitRateModalOpen}
        setOpen={setIsUnitRateModalOpen}
        tabIndex="-1"
      >
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalBody className="p-0 my-3">
              <div className="d-flex justify-content-between align-items-center col-11 mx-auto">
                <h6 className=" fw-bold mb-0">Edit Unit Rate</h6>
                <div onClick={toggleShowUnitRateModal} role={"button"}>
                  <CrossIcon />
                </div>
              </div>
              <hr />
              <div className="col-12 mx-auto my-2">
                <div className="px-4">
                  <MDBInput
                    value={selectedClientItemRate?.clientUnitRate}
                    type="number"
                    onChange={(e) =>
                      setSelectedClientItemRate((prev) => {
                        if (prev)
                          return { ...prev, clientUnitRate: +e.target.value };
                        else return null;
                      })
                    }
                    onKeyDown={(e) => {
                      if (e.key === ".") {
                        e.preventDefault();
                      }
                    }}
                  />
                </div>
                <hr />
                <div className="d-flex justify-content-between my-2 px-4">
                  <CustomButton
                    size="sm"
                    type="hollow"
                    onClick={toggleShowUnitRateModal}
                    title="Close"
                  />

                  <CustomButton
                    size="sm"
                    type="solid"
                    onClick={async () => {
                      const res = await updateClientItemRate(
                        selectedClientItemRate
                      );
                      if ("data" in res && res.data.status === "SUCCESS") {
                        setTimeout(() => {
                          setIsUnitRateModalOpen(false);
                        }, 2000);
                      }
                    }}
                    disabled={updateClientItemRateLoading}
                    title={updateClientItemRateLoading ? "Saving..." : "Save"}
                  />
                </div>
              </div>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
      <MDBModal
        open={isExportModalOpen}
        setOpen={setIsExportModalOpen}
        tabIndex="-1"
      >
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalBody className="p-0 my-3">
              <div className="d-flex justify-content-between align-items-center col-11 mx-auto">
                <h6 className=" fw-bold mb-0">Export Client Item Rates</h6>
                <div onClick={toggleShowExportModal} role={"button"}>
                  <CrossIcon />
                </div>
              </div>
              <hr />
              <div className="col-12 mx-auto my-2">
                <div className="px-4">
                  <MDBInput
                    label="Weight (KGS)"
                    value={exportWeight}
                    type="number"
                    onChange={(e) => setExportWeight(+e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === ".") {
                        e.preventDefault();
                      }
                    }}
                  />
                </div>
                <hr />
                <div className="d-flex justify-content-between my-2 px-4">
                  <CustomButton
                    size="sm"
                    type="hollow"
                    onClick={handleExportButtonClick}
                    title="Close"
                  />

                  <CustomButton
                    size="sm"
                    type="solid"
                    onClick={handleExportButtonClick}
                    title={"Export"}
                  />
                </div>
              </div>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
}
