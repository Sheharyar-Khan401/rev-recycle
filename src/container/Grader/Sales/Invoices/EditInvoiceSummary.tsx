import { roundValue } from "helper/utility";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLazyGetInvoiceSummaryQuery } from "redux/features/Settings/purchase/invoiceTypeApiSlice";

export default function EditInvoiceSummary() {
  const [getInvoiceSummary, result] = useLazyGetInvoiceSummaryQuery();
  const params = useParams();

  useEffect(() => {
    const id = params.id;
    if (id) {
      getInvoiceSummary(+id);
    }
  }, [getInvoiceSummary, params.id]);
  const summary = result.data;
  return (
    <div className="m-3">
      <div className="row mx-0">
        <div className="col-11 mx-auto">
          <div className="row mx-0">
            <div className="col-12 col-md-6">
              <MDBTable bordered small className="border border-warning my-2">
                <MDBTableHead>
                  <tr className="table-warning">
                    <th
                      colSpan={5}
                      scope="col"
                      className="text-center fs-4 fw-bold p-0"
                    >
                      Total Amount
                    </th>
                  </tr>
                  <tr>
                    <th
                      colSpan={5}
                      scope="col"
                      className="text-center fs-5 fw-bold p-0"
                    >
                      {summary?.totalCost
                        ? roundValue(summary?.totalCost)
                        : "-"}
                    </th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  <tr>
                    <td className="fw-bold p-1">Sale Amount</td>
                    <td className={summary?.purchaseCost ? "p-1 text-end" : "p-1 text-center"}>
                      {summary?.purchaseCost
                        ? roundValue(summary?.purchaseCost)
                        : "-"}
                    </td>
                    <td></td>
                    <td className="fw-bold p-1">Weight LBs per bale</td>
                    <td className={summary?.baleWeightLbs ? "p-1 text-end" : "p-1 text-center"}>
                      {summary?.baleWeightLbs
                        ? roundValue(summary?.baleWeightLbs)
                        : "-"}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold p-1">Master Sale Amount</td>
                    <td className={summary?.freightCost ? "p-1 text-end" : "p-1 text-center"}>
                      {summary?.freightCost
                        ? roundValue(summary?.freightCost)
                        : "-"}
                    </td>
                    <td></td>
                    <td className="fw-bold p-1">Weight KGs Per bale</td>
                    <td className={summary?.baleWeightKgs ? "p-1 text-end" : "p-1 text-center"}>
                      {summary?.baleWeightKgs
                        ? roundValue(summary?.baleWeightKgs)
                        : "-"}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold p-1">Other Amount</td>
                    <td className={summary?.clearingCost ? "p-1 text-end" : "p-1 text-center"}>
                      {summary?.clearingCost
                        ? roundValue(summary?.clearingCost)
                        : "-"}
                    </td>
                    <td></td>
                    <td className="fw-bold p-1">Rate Per Package</td>
                    <td className={summary?.ratePerPackage ? "p-1 text-end" : "p-1 text-center"}>
                      {summary?.ratePerPackage
                        ? roundValue(summary?.ratePerPackage)
                        : "-"}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold p-1">Discount Amount</td>
                    <td className={summary?.deliveryOrderCost ? "p-1 text-end" : "p-1 text-center"}>
                      {summary?.deliveryOrderCost
                        ? roundValue(summary?.deliveryOrderCost)
                        : "-"}
                    </td>
                    <td></td>
                    <td className="fw-bold p-1">Rate Per KGs</td>
                    <td className={summary?.ratePerKgs ? "p-1 text-end" : "p-1 text-center"}>
                      {summary?.ratePerKgs
                        ? roundValue(summary?.ratePerKgs)
                        : "-"}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold p-1"> Total Amount</td>
                    <td className={summary?.otherCost ? "p-1 text-end" : "p-1 text-center"}>
                      {summary?.otherCost
                        ? roundValue(summary?.otherCost)
                        : "-"}
                    </td>
                    <td></td>
                    <td className="fw-bold p-1">Rate Per LBs</td>
                    <td className={summary?.ratePerLbs ? "p-1 text-end" : "p-1 text-center"}>
                      {summary?.ratePerLbs
                        ? roundValue(summary?.ratePerLbs)
                        : "-"}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold p-1"> Tax</td>
                    <td className={summary?.commissionCost ? "p-1 text-end" : "p-1 text-center"}>
                      {summary?.commissionCost
                        ? roundValue(summary?.commissionCost)
                        : "-"}
                    </td>
                    <td></td>
                    <td className="fw-bold p-1"></td>
                    <td className="p-1 text-end"></td>
                  </tr>
                  <tr>
                    <td className="fw-bold p-1"> Total Amount</td>
                    <td className={summary?.totalCost ? "p-1 text-end" : "p-1 text-center"}>
                      {summary?.totalCost
                        ? roundValue(summary?.totalCost)
                        : "-"}
                    </td>
                    <td></td>
                    <td className="fw-bold p-1"></td>
                    <td className="p-1 text-end"></td>
                  </tr>
                </MDBTableBody>
              </MDBTable>
            </div>
            <div className="col-12 col-md-6">
              <MDBTable bordered small className="border border-success my-2">
                <MDBTableHead>
                  <tr className="table-success">
                    <th
                      colSpan={5}
                      scope="col"
                      className="text-center fs-4 fw-bold p-0"
                    >
                      Total Amount
                    </th>
                  </tr>
                  <tr>
                    <th
                      colSpan={5}
                      scope="col"
                      className="text-center fs-5 fw-bold p-0"
                    >
                      {summary?.totalCost && summary?.exchangeRate
                        ? roundValue(summary?.totalCost * summary?.exchangeRate)
                        : "-"}
                    </th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  <tr>
                    <td className="fw-bold p-1">Sale Amount</td>
                    <td className="p-1 text-end">
                      {roundValue(
                        (summary?.purchaseCost ? summary?.purchaseCost : 0) *
                        (summary?.exchangeRate ? summary?.exchangeRate : 1)
                      )}
                    </td>
                    <td></td>
                    <td className="fw-bold p-1">Weight LBs per bale</td>
                    <td className="p-1 text-end">
                      {roundValue(
                        (summary?.exchangeRate ? summary?.exchangeRate : 0) *
                        (summary?.exchangeRate ? summary?.exchangeRate : 1)
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold p-1">Master Sale Amount</td>
                    <td className="p-1 text-end">
                      {roundValue(
                        (summary?.freightCost ? summary?.freightCost : 0) *
                        (summary?.exchangeRate ? summary?.exchangeRate : 1)
                      )}
                    </td>
                    <td></td>
                    <td className="fw-bold p-1">Weight KGs Per bale</td>
                    <td className="p-1 text-end">
                      {roundValue(
                        (summary?.baleWeightKgs ? summary?.baleWeightKgs : 0) *
                        (summary?.exchangeRate ? summary?.exchangeRate : 1)
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold p-1">Other Amount</td>
                    <td className="p-1 text-end">
                      {roundValue(
                        (summary?.clearingCost ? summary?.clearingCost : 0) *
                        (summary?.exchangeRate ? summary?.exchangeRate : 1)
                      )}
                    </td>
                    <td></td>
                    <td className="fw-bold p-1">Rate Per Package</td>
                    <td className="p-1 text-end">
                      {roundValue(
                        (summary?.ratePerPackage
                          ? summary?.ratePerPackage
                          : 0) *
                        (summary?.exchangeRate ? summary?.exchangeRate : 1)
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold p-1">Discount Amount</td>
                    <td className="p-1 text-end">
                      {roundValue(
                        (summary?.deliveryOrderCost
                          ? summary?.deliveryOrderCost
                          : 0) *
                        (summary?.exchangeRate ? summary?.exchangeRate : 1)
                      )}
                    </td>
                    <td></td>
                    <td className="fw-bold p-1">Rate Per KGs</td>
                    <td className="p-1 text-end">
                      {roundValue(
                        (summary?.ratePerKgs ? summary?.ratePerKgs : 0) *
                        (summary?.exchangeRate ? summary?.exchangeRate : 1)
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold p-1"> Total Amount</td>
                    <td className="p-1 text-end">
                      {roundValue(
                        (summary?.otherCost ? summary?.otherCost : 0) *
                        (summary?.exchangeRate ? summary?.exchangeRate : 1)
                      )}
                    </td>
                    <td></td>
                    <td className="fw-bold p-1">Rate Per LBs</td>
                    <td className="p-1 text-end">
                      {roundValue(
                        (summary?.ratePerLbs ? summary?.ratePerLbs : 0) *
                        (summary?.exchangeRate ? summary?.exchangeRate : 1)
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold p-1"> Tax</td>
                    <td className="p-1 text-end">
                      {roundValue(
                        (summary?.commissionCost
                          ? summary?.commissionCost
                          : 0) *
                        (summary?.exchangeRate ? summary?.exchangeRate : 1)
                      )}
                    </td>
                    <td></td>
                    <td className="fw-bold p-1"></td>
                    <td className="p-1 text-end"></td>
                  </tr>
                  <tr>
                    <td className="fw-bold p-1"> Total Amount</td>
                    <td className="p-1 text-end">
                      {roundValue(
                        (summary?.totalCost ? summary?.totalCost : 0) *
                        (summary?.exchangeRate ? summary?.exchangeRate : 1)
                      )}
                    </td>
                    <td></td>
                    <td className="fw-bold p-1"></td>
                    <td className="p-1 text-end"></td>
                  </tr>
                </MDBTableBody>
              </MDBTable>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <div className="row mx-0">
        <div className="col-3 my-2">
          <MDBTable bordered small>
            <MDBTableHead>
              <tr>
                <th
                  colSpan={2}
                  scope="col"
                  className="text-center fs-5 fw-bold p-0"
                >
                  Sale Amount
                </th>
              </tr>
              <tr>
                <th
                  colSpan={2}
                  scope="col"
                  className="text-center fs-6 fw-bold p-0"
                >
                  {roundValue(summary?.purchaseCost ? summary?.purchaseCost : 0)}
                </th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              <tr>
                <td className="fw-bold p-1">Total Packages</td>
                <td className="p-1 text-end">
                  {roundValue(summary?.totalPackages
                    ? summary?.totalPackages
                    : 0
                  )}
                </td>
              </tr>
              <tr>
                <td className="fw-bold p-1">Total Amount / Packages</td>
                <td className="p-1 text-end">
                  {roundValue(summary?.ratePerPackage
                    ? summary?.ratePerPackage
                    : 0
                  )}
                </td>
              </tr>
              <tr>
                <td className="fw-bold p-1">Total Weight (KGS)</td>
                <td className="p-1 text-end">
                  {roundValue(summary?.totalWeightKgs
                    ? summary?.totalWeightKgs
                    : 0
                  )}
                </td>
              </tr>
              <tr>
                <td className="fw-bold p-1">Total Weight (LGS)</td>
                <td className="p-1 text-end">
                  {roundValue(summary?.totalWeightLbs
                    ? summary?.totalWeightLbs
                    : 0
                  )}
                </td>
              </tr>
            </MDBTableBody>
          </MDBTable>
        </div>
        <div className="col-3 my-2">
          <MDBTable bordered small>
            <MDBTableHead>
              <tr>
                <th
                  colSpan={2}
                  scope="col"
                  className="text-center fs-5 fw-bold p-0"
                >
                  Other Amount
                </th>
              </tr>
              <tr>
                <th
                  colSpan={2}
                  scope="col"
                  className="text-center fs-6 fw-bold p-0"
                >
                  {roundValue(summary?.freightCost ? summary?.freightCost : 0)}
                </th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {summary?.freightCharges?.map((fc) => {
                return (
                  <tr>
                    <td className="fw-bold p-1">{fc?.chargeType?.name}</td>
                    <td className="p-1 text-end">
                      {roundValue(fc.amount ? fc?.amount : 0)}
                    </td>
                  </tr>
                );
              })}
            </MDBTableBody>
          </MDBTable>
        </div>
        <div className="col-3 my-2">
          <MDBTable bordered small>
            <MDBTableHead>
              <tr>
                <th
                  colSpan={2}
                  scope="col"
                  className="text-center fs-5 fw-bold p-0"
                >
                  Tax Amount
                </th>
              </tr>
              <tr>
                <th
                  colSpan={2}
                  scope="col"
                  className="text-center fs-6 fw-bold p-0"
                >
                  {roundValue(summary?.clearingCost ? summary?.clearingCost : 0)}
                </th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {summary?.clearingCharges?.map((cc) => {
                return (
                  <tr>
                    <td className="fw-bold p-1">{cc?.chargeType?.name}</td>
                    <td className="p-1 text-end">
                      {roundValue(cc.amount ? cc?.amount : 0)}
                    </td>
                  </tr>
                );
              })}
            </MDBTableBody>
          </MDBTable>
        </div>
        <div className="col-3 my-2">
          <MDBTable bordered small>
            <MDBTableHead>
              <tr>
                <th
                  colSpan={2}
                  scope="col"
                  className="text-center fs-5 fw-bold p-0"
                >
                  Discount Amount
                </th>
              </tr>
              <tr>
                <th
                  colSpan={2}
                  scope="col"
                  className="text-center fs-6 fw-bold p-0"
                >
                  {roundValue(summary?.deliveryOrderCost
                    ? summary?.deliveryOrderCost
                    : 0
                  )}
                </th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {summary?.deliveryOrderCharges?.map((dc) => {
                return (
                  <tr>
                    <td className="fw-bold p-1">{dc?.chargeType?.name}</td>
                    <td className="p-1 text-end">
                      {roundValue(dc.amount ? dc?.amount : 0)}
                    </td>
                  </tr>
                );
              })}
            </MDBTableBody>
          </MDBTable>
        </div>
        <div className="col-3 my-2">
          <MDBTable bordered small>
            <MDBTableHead>
              <tr>
                <th
                  colSpan={2}
                  scope="col"
                  className="text-center fs-5 fw-bold p-0"
                >
                  Freight Amount
                </th>
              </tr>
              <tr>
                <th
                  colSpan={2}
                  scope="col"
                  className="text-center fs-6 fw-bold p-0"
                >
                  {roundValue(summary?.commissionCost
                    ? summary?.commissionCost
                    : 0
                  )}
                </th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {summary?.commissions?.map((cc) => {
                return (
                  <tr>
                    <td className="fw-bold p-1">
                      {cc.agent?.user?.fullName
                        ? cc.agent?.user?.fullName
                        : "-"}
                    </td>
                    <td className="p-1 text-end">
                      {roundValue(cc.amount ? cc?.amount : 0)}
                    </td>
                  </tr>
                );
              })}
            </MDBTableBody>
          </MDBTable>
        </div>
        <div className="col-3 my-2">
          <MDBTable bordered small>
            <MDBTableHead>
              <tr>
                <th
                  colSpan={2}
                  scope="col"
                  className="text-center fs-5 fw-bold p-0"
                >
                  CNC / COC Amount
                </th>
              </tr>
              <tr>
                <th
                  colSpan={2}
                  scope="col"
                  className="text-center fs-6 fw-bold p-0"
                >
                  {roundValue(summary?.otherCost ? summary?.otherCost : 0)}
                </th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {summary?.otherCharges?.map((oc) => {
                return (
                  <tr>
                    <td className="fw-bold p-1">{oc?.chargeType?.name}</td>
                    <td className="p-1 text-end">
                      {roundValue(oc.amount ? oc?.amount : 0)}
                    </td>
                  </tr>
                );
              })}
            </MDBTableBody>
          </MDBTable>
        </div>
        <div className="col-3 my-2">
          <MDBTable bordered small>
            <MDBTableHead>
              <tr>
                <th
                  colSpan={2}
                  scope="col"
                  className="text-center fs-5 fw-bold p-0"
                >
                  Other Amount
                </th>
              </tr>
              <tr>
                <th
                  colSpan={2}
                  scope="col"
                  className="text-center fs-6 fw-bold p-0"
                >
                  {roundValue(summary?.commissionCost
                    ? summary?.commissionCost
                    : 0
                  )}
                </th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {summary?.commissions?.map((cc) => {
                return (
                  <tr>
                    <td className="fw-bold p-1">
                      {cc.agent?.user?.fullName
                        ? cc.agent?.user?.fullName
                        : "-"}
                    </td>
                    <td className="p-1 text-end">
                      {roundValue(cc.amount ? cc?.amount : 0)}
                    </td>
                  </tr>
                );
              })}
            </MDBTableBody>
          </MDBTable>
        </div>
        <div className="col-3 my-2">
          <MDBTable bordered small>
            <MDBTableHead>
              <tr>
                <th
                  colSpan={2}
                  scope="col"
                  className="text-center fs-5 fw-bold p-0"
                >
                  Other Amount
                </th>
              </tr>
              <tr>
                <th
                  colSpan={2}
                  scope="col"
                  className="text-center fs-6 fw-bold p-0"
                >
                  {roundValue(summary?.otherCost ? summary?.otherCost : 0)}
                </th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {summary?.otherCharges?.map((oc) => {
                return (
                  <tr>
                    <td className="fw-bold p-1">{oc?.chargeType?.name}</td>
                    <td className="p-1 text-end">
                      {roundValue(oc.amount ? oc?.amount : 0)}
                    </td>
                  </tr>
                );
              })}
            </MDBTableBody>
          </MDBTable>
        </div>
      </div>
    </div>
  );
}
