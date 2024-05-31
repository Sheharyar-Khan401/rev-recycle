import { MDBTable, MDBTableBody } from "mdb-react-ui-kit";
import Barcode from "react-barcode";
import { Codes } from "redux/types/Productions/codes";
import ReactToPrint from "react-to-print";
import { useEffect, useRef } from "react";
import { format } from "date-fns";
import { roundValue, convertWghtToLbs, calculateWeights } from "helper/utility";

interface Props {
  clientName?: string;
  items: Codes[];
  Format: number;
  onAfterPrint?: () => void;
}
export default function Barcodes({
  items,
  Format,
  onAfterPrint,
  clientName,
}: Props) {
  const ref = useRef<HTMLInputElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    if (items?.length > 0 && buttonRef?.current) {
      buttonRef?.current?.click();
    }
  }, [items, buttonRef]);
  return (
    <div className="d-none">
      <ReactToPrint
        trigger={() => <button ref={buttonRef} className="d-none"></button>}
        content={() => ref.current}
        onAfterPrint={onAfterPrint}
      />
      {items?.length > 0 && (
        <div ref={ref}>
          {items && items?.length > 0
            ? items?.map((item: Codes) => {
                return (
                  <div key={item.code}>
                    {Format === 2 ? (
                      <div>
                        <h6 className="fw-bold text-center my-3">
                          {item?.purchaseOrderItem
                            ? item?.purchaseOrderItem?.item?.name
                            : ""}
                        </h6>
                        <h6 className="fw-bold text-center my-3">
                          {item?.purchaseOrderItem?.purchaseOrder
                            ?.referenceNumber ?? ""}
                        </h6>
                        <div className="d-flex justify-content-center">
                          <MDBTable bordered responsive>
                            <MDBTableBody>
                              <tr>
                                <td className="fw-bold">WGT</td>
                                <td className="fw-bold">
                                  {item?.purchaseOrderItem?.weightKg ? (
                                    <>
                                      {roundValue(
                                        item?.purchaseOrderItem?.weightKg
                                      ) +
                                        " KGS " +
                                        (item?.purchaseOrderItem?.weightKg
                                          ? roundValue(
                                              convertWghtToLbs(
                                                item?.purchaseOrderItem
                                                  ?.weightKg
                                              )
                                            )
                                          : "") +
                                        " LBS"}
                                    </>
                                  ) : (
                                    ""
                                  )}
                                </td>
                              </tr>
                              <tr>
                                <td className="fw-bold">Grade</td>
                                <td className="fw-bold">
                                  {item?.grade ? item?.grade?.name : ""}
                                </td>
                              </tr>
                            </MDBTableBody>
                          </MDBTable>
                        </div>
                        <div className="d-flex mx-4 justify-content-center">
                          <Barcode
                            fontSize={24}
                            height={30}
                            value={item?.code?.toString()}
                          />
                        </div>
                      </div>
                    ) : Format === 1 ? (
                      <div className="my-3 text-center px-3">
                        <h3 className="fw-bold mb-2 mt-4">ITEM #</h3>
                        <h5 className="fw-bold my-2">
                          {format(new Date(), "dd/MM/yyyy hh:mm:ss")}
                        </h5>
                        <h3 className="fw-bold my-2">
                          {item?.purchaseOrderItem?.item?.name
                            ? item?.purchaseOrderItem?.item?.name
                            : item?.item?.name
                            ? item?.item?.name
                            : ""}
                        </h3>
                        <h3 className="fw-bold my-2">
                          Weight:{" "}
                          {item.purchaseOrderItem
                            ? `${roundValue(
                                item.purchaseOrderItem?.item?.weightUnit
                                  ?.weightUnitId &&
                                  item.purchaseOrderItem?.item?.unitWeight
                                  ? calculateWeights(
                                      item?.purchaseOrderItem?.item?.unitWeight,
                                      item?.purchaseOrderItem?.item?.weightUnit
                                        ?.weightUnitId
                                    )[0]
                                  : 0
                              )} KGS ${roundValue(
                                item.purchaseOrderItem?.item?.weightUnit
                                  ?.weightUnitId &&
                                  item.purchaseOrderItem?.item?.unitWeight
                                  ? calculateWeights(
                                      item?.purchaseOrderItem?.item?.unitWeight,
                                      item?.purchaseOrderItem?.item?.weightUnit
                                        ?.weightUnitId
                                    )[1]
                                  : 0
                              )} LBS`
                            : `${roundValue(
                                item?.weightUnit?.weightUnitId &&
                                  item?.unitWeight
                                  ? calculateWeights(
                                      item?.unitWeight,
                                      item?.weightUnit?.weightUnitId
                                    )[0]
                                  : 0
                              )} KGS ${roundValue(
                                item?.weightUnit?.weightUnitId &&
                                  item?.unitWeight
                                  ? calculateWeights(
                                      item?.unitWeight,
                                      item?.weightUnit?.weightUnitId
                                    )[1]
                                  : 0
                              )} LBS`}
                        </h3>
                        <div className="d-flex mx-4 justify-content-center">
                          <Barcode
                            fontSize={24}
                            height={30}
                            value={item?.code?.toString()}
                          />
                        </div>
                      </div>
                    ) : (
                      Format === 3 && (
                        <div
                          className="d-flex mx-3 my-4 p-1"
                          style={{ background: "#f5b20c" }}
                        >
                          <div className="mx-3 col-8">
                            <div className="border">
                              <div className="border-bottom text-center py-2 px-3">
                                {clientName ?? ""}
                              </div>
                              <div className="d-flex flex-row border-bottom">
                                <div
                                  className="h2 px-2 fw-bolder text-uppercase"
                                  style={{ width: "98%" }}
                                >
                                  {item.item?.name}
                                </div>
                                <div
                                  className="border-start"
                                  style={{ minHeight: "5rem" }}
                                >
                                  <div
                                    className="my-4"
                                    style={{ transform: "rotate(-90deg)" }}
                                  >
                                    {item?.codeId}
                                  </div>
                                </div>
                              </div>
                              <div className="row" style={{ height: "2.2rem" }}>
                                <div
                                  className="border-end"
                                  style={{ width: "9rem" }}
                                ></div>
                                <div
                                  className="border-end"
                                  style={{ width: "12.4rem" }}
                                ></div>
                                <div style={{ width: "3rem" }}>⋆⋆⋆⋆⋆</div>
                              </div>
                            </div>
                            <div className="d-flex mx-4 mt-1 justify-content-center">
                              <Barcode
                                fontSize={16}
                                height={34}
                                value={item?.code?.toString()}
                                width={4}
                                background="#f5b20c"
                              />
                            </div>
                          </div>
                          <div className="col-3">
                            <div className="d-flex">
                              <div
                                className="border text-center col-2"
                                style={{ width: "max-content" }}
                              >
                                {Array.from({ length: 5 }, (_, index) => (
                                  <div
                                    style={{ height: "10px", width: "2vw" }}
                                    key={index}
                                  >
                                    ⋆
                                  </div>
                                ))}
                                <div
                                  className="mt-3 border-top border-bottom"
                                  style={{ height: "8vh" }}
                                ></div>
                                <div
                                  className=""
                                  style={{ height: "4vh" }}
                                ></div>
                              </div>
                              <div
                                className="d-flex flex-column justify-content-center"
                                style={{
                                  width: "60%",
                                  alignItems: "center",
                                }}
                              >
                                <div
                                  className=""
                                  style={{
                                    transform: "rotate(270deg)",
                                    transformOrigin: "center",
                                    marginTop: "3rem",
                                  }}
                                >
                                  <div>
                                    <Barcode
                                      fontSize={14}
                                      height={30}
                                      width={1.5}
                                      value={item?.code?.toString()}
                                      background="#f5b20c"
                                    />
                                  </div>

                                  <div className="text-center small fw-bolder text-uppercase">
                                    {item.item?.name}
                                  </div>
                                </div>
                                <div
                                  className="text-end ms-3"
                                  style={{
                                    transform: "rotate(180deg)",
                                    width: "max-content",
                                    marginTop: "3rem",
                                  }}
                                >
                                  {item?.codeId}
                                </div>
                              </div>
                              <div style={{ width: "40%" }} className="ms-2">
                                <div
                                  className="text-center"
                                  style={{ marginBottom: "6.5rem" }}
                                >
                                  {item?.codeId}
                                </div>
                                <div
                                  style={{
                                    transform: "rotate(270deg)",
                                  }}
                                >
                                  <Barcode
                                    width={1.5}
                                    fontSize={14}
                                    height={34}
                                    value={item?.code?.toString()}
                                    background="#f5b20c"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                    <hr />
                  </div>
                );
              })
            : null}
        </div>
      )}
    </div>
  );
}
