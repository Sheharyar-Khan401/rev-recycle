import { useEffect, useState } from "react";
import { MDBInput } from "mdb-react-ui-kit";
import {
  useEditGatePassItemsMutation,
  useLazyGetGatePassesByIdQuery,
} from "redux/features/purchase/gatePassesApiSlice";
import DataTable from "shared/Components/DataTable";
import { PurchaseOrderItemsData } from "redux/types/Orders/orders";
import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalBody,
} from "mdb-react-ui-kit";
import { Codes } from "redux/types/Productions/codes";
import {
  useDeleteCodesMutation,
  useLazyGetCodesByItemIdQuery,
} from "redux/features/productions/codesApiSlice";
import Barcodes from "shared/Components/PrintBarcodes/Barcodes";
import {
  calculateWeights,
  convertWghtToLbs,
  getDateFromMillis,
  roundValue,
} from "helper/utility";
import RoutingActionButton from "shared/Components/ActionButton/RoutingActionButton";
import CustomButton from "shared/Components/CustomButton";
import { CrossIcon } from "helper/icons";
import { COLORS } from "helper/globalVariables";
export interface Props {
  purchaseOrderId: number;
}
export default function GatePassesItems({ purchaseOrderId }: Props) {
  const [getGatePassesById, result] = useLazyGetGatePassesByIdQuery();
  const [editGatePassItems, { isLoading }] = useEditGatePassItemsMutation();
  const [getCodes, codesResult] = useLazyGetCodesByItemIdQuery();
  const [getItemCodes, itemCodesResult] = useLazyGetCodesByItemIdQuery();
  const [deleteCodes] = useDeleteCodesMutation();
  const [codeId, setCodeId] = useState<number>(0);
  const [purchaseItems, setPurchaseItems] = useState<PurchaseOrderItemsData[]>(
    []
  );
  const [gatePassQuantity, setgatePassQuantity] = useState<number>(0);
  const [itemOrderId, setItemOrderId] = useState<number>(0);
  const [basicModal, setBasicModal] = useState<boolean>(false);
  const [units, setUnits] = useState<Codes[]>([]);
  const [selectedId, setSelectedId] = useState<number>(0);
  const [openPrint, setOpenPrint] = useState<boolean>(false);

  const toggleShow = () => setBasicModal(!basicModal);
  const handleDelete = async (id: number) => {
    if (id) {
      await deleteCodes(id);
      if (purchaseOrderId) getGatePassesById(purchaseOrderId);
    }
  };
  useEffect(() => {
    if (purchaseOrderId) getGatePassesById(purchaseOrderId);
  }, [purchaseOrderId, getGatePassesById]);

  useEffect(() => {
    if (result?.data?.purchaseOrder?.listofPurchaseOrderItems) {
      setPurchaseItems(result?.data?.purchaseOrder?.listofPurchaseOrderItems);
    }
  }, [result.data]);

  useEffect(() => {
    if (codesResult?.data?.payLoad) {
      setUnits(codesResult?.data?.payLoad);
    } else {
      setUnits([]);
    }
  }, [codesResult?.data]);

  return (
    <>
      <div className="row">
        <div className="col-12 my-2">
          <h6 className="fw-bold black mb-0 mt-3">Items</h6>
          <DataTable
            isLoading={result.isLoading}
            columns={[
              { label: "Item Name", field: "item" },
              { label: "Inv. Qty", field: "quantity", showSum: true },
              { label: "G.P Qty", field: "gPQuantity" },
              { label: "Unit Weight", field: "unitWeight", showSum: true },
              { label: "Weight (KGS)", field: "weightKg", showSum: true },
              { label: "Weight (LBS)", field: "weightLbs", showSum: true },
              { label: "Rate On", field: "rateOn" },
              { label: "Rate I.C", field: "rate", showSum: true },
              { label: "Amount", field: "amount", showSum: true },
              { label: "Action", field: "action" },
            ]}
            rows={
              purchaseItems
                ? purchaseItems.map((purchaseItems: PurchaseOrderItemsData) => {
                    return {
                      item: purchaseItems?.item
                        ? purchaseItems?.item?.name
                        : "-",
                      quantity: purchaseItems?.quantity
                        ? purchaseItems?.quantity
                        : 0,
                      gPQuantity: (
                        <>
                          <div
                            onClick={() => {
                              setgatePassQuantity(
                                purchaseItems?.gatePassQuantity
                                  ? purchaseItems?.gatePassQuantity
                                  : 0
                              );

                              setItemOrderId(
                                purchaseItems?.purchaseOrderItemId
                                  ? purchaseItems?.purchaseOrderItemId
                                  : 0
                              );
                              toggleShow();
                            }}
                            role="button"
                            style={{ color: "#3B71CA" }}
                          >
                            {purchaseItems?.gatePassQuantity
                              ? purchaseItems?.gatePassQuantity
                              : "-"}
                          </div>
                        </>
                      ),
                      unitWeight: purchaseItems?.unitWeight
                        ? roundValue(purchaseItems.unitWeight)
                        : "-",
                      weightKg:
                        purchaseItems?.weightUnit?.weightUnitId &&
                        purchaseItems.unitWeight &&
                        purchaseItems.gatePassQuantity
                          ? calculateWeights(
                              purchaseItems?.unitWeight,
                              purchaseItems.weightUnit?.weightUnitId
                            )[0] * purchaseItems.gatePassQuantity
                          : 0,
                      weightLbs:
                        purchaseItems?.weightUnit?.weightUnitId &&
                        purchaseItems.unitWeight &&
                        purchaseItems.gatePassQuantity
                          ? calculateWeights(
                              purchaseItems?.unitWeight,
                              purchaseItems.weightUnit?.weightUnitId
                            )[1] * purchaseItems.gatePassQuantity
                          : 0,
                      rateOn: purchaseItems?.rateOn
                        ? purchaseItems?.rateOn?.name
                        : "-",
                      rate: purchaseItems?.rate
                        ? roundValue(purchaseItems?.rate)
                        : "-",
                      amount: purchaseItems?.amount
                        ? roundValue(purchaseItems?.amount)
                        : "-",
                      action: purchaseItems?.gatePassQuantity !== 0 && (
                        <div className="d-flex">
                          <CustomButton
                            type="solid"
                            size="sm"
                            disabled={
                              selectedId ===
                                purchaseItems?.purchaseOrderItemId ||
                              purchaseItems?.gatePassQuantity === 0
                            }
                            onClick={() => {
                              setSelectedId(
                                purchaseItems?.purchaseOrderItemId ?? 0
                              );
                              getCodes({
                                itemId: purchaseItems?.purchaseOrderItemId,
                              });
                            }}
                            title={
                              codesResult?.isFetching &&
                              selectedId === purchaseItems?.purchaseOrderItemId
                                ? "Selecting..."
                                : selectedId ===
                                  purchaseItems?.purchaseOrderItemId
                                ? "Selected"
                                : "Select"
                            }
                          />

                          <CustomButton
                            type="hollow"
                            size="sm"
                            className="ms-2"
                            onClick={() => {
                              setCodeId(
                                purchaseItems?.purchaseOrderItemId ?? 0
                              );
                              getItemCodes({
                                itemId: purchaseItems?.purchaseOrderItemId,
                              });
                              setOpenPrint(true);
                            }}
                            disabled={
                              codeId === purchaseItems?.purchaseOrderItemId
                            }
                            title={
                              itemCodesResult?.isFetching &&
                              codeId === purchaseItems?.purchaseOrderItemId
                                ? "Printing..."
                                : "Print"
                            }
                          />
                        </div>
                      ),
                    };
                  })
                : []
            }
            rowStyles={{
              styles: { backgroundColor: COLORS[4], padding:"0 -20px" },
              indexes: [
                purchaseItems.findIndex(
                  (i) => i.purchaseOrderItemId == selectedId
                ),
              ],
            }}
          />
        </div>
        <div className="col-12 my-2">
          <h6 className="fw-bold black mb-0 mt-3">Units</h6>
          <DataTable
            isLoading={codesResult.isFetching}
            columns={[
              { label: "Sr.", field: "sr" },
              { label: "Item Code", field: "itemCode" },
              { label: "KGS", field: "kgs" },
              { label: "LBS", field: "lbs" },
              { label: "Iss.", field: "iss" },
              { label: "Iss. On", field: "issOn" },
              { label: "Iss. To", field: "issTo" },
              { label: "Action", field: "action" },
            ]}
            rows={
              units
                ? units.map((units: Codes, index: number) => {
                    return {
                      sr: index + 1,
                      itemCode: units?.code ? units?.code : "-",
                      kgs:
                        units?.purchaseOrderItem?.unitWeight &&
                        units?.purchaseOrderItem?.weightUnit?.weightUnitId
                          ? roundValue(
                              calculateWeights(
                                units?.purchaseOrderItem?.unitWeight,
                                units?.purchaseOrderItem?.weightUnit
                                  ?.weightUnitId
                              )[0]
                            )
                          : 0,
                      lbs:
                        units?.purchaseOrderItem?.unitWeight &&
                        units?.purchaseOrderItem?.weightUnit?.weightUnitId
                          ? roundValue(
                              calculateWeights(
                                units?.purchaseOrderItem?.unitWeight,
                                units?.purchaseOrderItem?.weightUnit
                                  ?.weightUnitId
                              )[1]
                            )
                          : 0,
                      iss: units?.productionIssuanceId ? "Yes" : "No",
                      issOn: units.issuedOn
                        ? getDateFromMillis(+units.issuedOn)
                        : "-",

                      issTo: units?.productionIssuanceId
                        ? units.productionIssuanceId
                        : "-",
                      action: !result?.data?.posted ? (
                        <RoutingActionButton
                          onDeleteClick={
                            !result?.data?.posted
                              ? () => {
                                  handleDelete(units?.codeId);
                                }
                              : undefined
                          }
                        />
                      ) : (
                        "-"
                      ),
                    };
                  })
                : []
            }
          />
        </div>
        <MDBModal open={basicModal} setOpen={setBasicModal} tabIndex="-1">
          <MDBModalDialog centered>
            <MDBModalContent>
              <MDBModalBody className="p-0 my-3">
                <div className="d-flex justify-content-between align-items-center col-11 mx-auto">
                  <h6 className=" fw-bold mb-0">Edit G.P. Quantity</h6>
                  <div onClick={toggleShow} role={"button"}>
                    <CrossIcon />
                  </div>
                </div>
                <hr />
                <div className="col-12 mx-auto my-2">
                  <div className="px-4">
                    <MDBInput
                      className="my-4"
                      value={gatePassQuantity}
                      type="number"
                      onChange={(e) => setgatePassQuantity(+e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === ".") {
                          e.preventDefault();
                        }
                      }}
                    />
                  </div>
                  <hr />
                  <div className="px-4 d-flex justify-content-between my-2">
                    <CustomButton
                      size="sm"
                      type="hollow"
                      onClick={toggleShow}
                      title="Close"
                    />

                    <CustomButton
                      size="sm"
                      type="solid"
                      onClick={async () => {
                        const res = await editGatePassItems({
                          purchaseOrderItemId: itemOrderId,
                          gatePassQuantity: gatePassQuantity,
                        });
                        if ("data" in res && res.data.status === "SUCCESS") {
                          setTimeout(() => {
                            setBasicModal(false);
                          }, 2000);
                          getCodes({
                            itemId: selectedId,
                          });
                        }
                      }}
                      disabled={isLoading}
                      title={isLoading ? "Saving..." : "Save"}
                    />
                  </div>
                </div>
              </MDBModalBody>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
        {openPrint && itemCodesResult?.data?.payLoad && (
          <Barcodes
            items={
              itemCodesResult?.data?.payLoad
                ? itemCodesResult?.data?.payLoad
                : []
            }
            onAfterPrint={() => {
              setOpenPrint(false);
              setCodeId(0);
            }}
            Format={2}
          />
        )}
      </div>
    </>
  );
}
