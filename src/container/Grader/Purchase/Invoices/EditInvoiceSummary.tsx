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
  }, [params.id, getInvoiceSummary]);
  const summary = result.data;
  return (
    <div className="my-3">
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
                      Total Cost
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
                        : 0.0}
                    </th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  <tr>
                    <td className="fw-bold p-1">Purchase Cost</td>
                    <td className="p-1 text-end">
                      {summary?.purchaseCost
                        ? roundValue(summary?.purchaseCost)
                        : 0.0}
                    </td>
                    <td></td>
                    <td className="fw-bold p-1">Weight LBs per bale</td>
                    <td className="p-1 text-end">
                      {summary?.baleWeightLbs
                        ? roundValue(summary?.baleWeightLbs)
                        : 0.0}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold p-1">Fraight Cost</td>
                    <td className="p-1 text-end">
                      {summary?.freightCost
                        ? roundValue(summary?.freightCost)
                        : 0.0}
                    </td>
                    <td></td>
                    <td className="fw-bold p-1">Weight KGs Per bale</td>
                    <td className="p-1 text-end">
                      {summary?.baleWeightKgs
                        ? roundValue(summary?.baleWeightKgs)
                        : 0.0}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold p-1">Clearing Cost</td>
                    <td className="p-1 text-end">
                      {summary?.clearingCost
                        ? roundValue(summary?.clearingCost)
                        : 0.0}
                    </td>
                    <td></td>
                    <td className="fw-bold p-1">Rate Per Package</td>
                    <td className="p-1 text-end">
                      {summary?.ratePerPackage
                        ? roundValue(summary?.ratePerPackage)
                        : 0.0}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold p-1">Delivery Order Cost</td>
                    <td className="p-1 text-end">
                      {summary?.deliveryOrderCost
                        ? roundValue(summary?.deliveryOrderCost)
                        : 0.0}
                    </td>
                    <td></td>
                    <td className="fw-bold p-1">Rate Per KGs</td>
                    <td className="p-1 text-end">
                      {summary?.ratePerKgs
                        ? roundValue(summary?.ratePerKgs)
                        : 0.0}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold p-1"> Other Cost</td>
                    <td className="p-1 text-end">
                      {summary?.otherCost
                        ? roundValue(summary?.otherCost)
                        : 0.0}
                    </td>
                    <td></td>
                    <td className="fw-bold p-1">Rate Per LBs</td>
                    <td className="p-1 text-end">
                      {summary?.ratePerLbs
                        ? roundValue(summary?.ratePerLbs)
                        : 0.0}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold p-1"> Commissions</td>
                    <td className="p-1 text-end">
                      {summary?.commissionCost
                        ? roundValue(summary?.commissionCost)
                        : 0.0}
                    </td>
                    <td></td>
                    <td className="fw-bold p-1"></td>
                    <td className="p-1 text-end"></td>
                  </tr>
                  <tr>
                    <td className="fw-bold p-1"> Total Cost</td>
                    <td className="p-1 text-end">
                      {summary?.totalCost
                        ? roundValue(summary?.totalCost)
                        : 0.0}
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
                      Total Cost
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
                        : 0.0}
                    </th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  <tr>
                    <td className="fw-bold p-1">Purchase Cost</td>
                    <td className="p-1 text-end">
                      {roundValue(
                        (summary?.purchaseCost ? summary?.purchaseCost : 0) *
                          (summary?.exchangeRate ? summary?.exchangeRate : 1)
                      )}
                    </td>
                    <td></td>
                    <td className="fw-bold p-1">Weight LBs per bale</td>
                    <td className="p-1 text-end">
                      {summary?.baleWeightLbs
                        ? roundValue(summary?.baleWeightLbs)
                        : 0.0}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold p-1">Fraight Cost</td>
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
                    <td className="fw-bold p-1">Clearing Cost</td>
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
                    <td className="fw-bold p-1">Delivery Order Cost</td>
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
                    <td className="fw-bold p-1"> Other Cost</td>
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
                    <td className="fw-bold p-1"> Commissions</td>
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
                    <td className="fw-bold p-1"> Total Cost</td>
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
                  Purchase Cost
                </th>
              </tr>
              <tr>
                <th
                  colSpan={2}
                  scope="col"
                  className="text-center fs-6 fw-bold p-0"
                >
                  {roundValue(
                    summary?.purchaseCost ? summary?.purchaseCost : 0
                  )}
                </th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              <tr>
                <td className="fw-bold p-1">Total Packages</td>
                <td className="p-1 text-end">
                  {roundValue(
                    summary?.totalPackages ? summary?.totalPackages : 0
                  )}
                </td>
              </tr>
              <tr>
                <td className="fw-bold p-1">Total Cost / Packages</td>
                <td className="p-1 text-end">
                  {roundValue(
                    summary?.ratePerPackage ? summary?.ratePerPackage : 0
                  )}
                </td>
              </tr>
              <tr>
                <td className="fw-bold p-1">Total Weight (KGS)</td>
                <td className="p-1 text-end">
                  {roundValue(
                    summary?.totalWeightKgs ? summary?.totalWeightKgs : 0
                  )}
                </td>
              </tr>
              <tr>
                <td className="fw-bold p-1">Total Weight (LGS)</td>
                <td className="p-1 text-end">
                  {roundValue(
                    summary?.totalWeightLbs ? summary?.totalWeightLbs : 0
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
                  Freight Cost
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
                      {roundValue(fc.amount ? fc.amount : 0)}
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
                  Clearing Cost
                </th>
              </tr>
              <tr>
                <th
                  colSpan={2}
                  scope="col"
                  className="text-center fs-6 fw-bold p-0"
                >
                  {roundValue(
                    summary?.clearingCost ? summary?.clearingCost : 0
                  )}
                </th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {summary?.clearingCharges?.map((cc) => {
                return (
                  <tr>
                    <td className="fw-bold p-1">{cc?.chargeType?.name}</td>
                    <td className="p-1 text-end">
                      {roundValue(cc.amount ? cc.amount : 0)}
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
                  Delivery Order Cost
                </th>
              </tr>
              <tr>
                <th
                  colSpan={2}
                  scope="col"
                  className="text-center fs-6 fw-bold p-0"
                >
                  {roundValue(
                    summary?.deliveryOrderCost ? summary?.deliveryOrderCost : 0
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
                      {roundValue(dc.amount ? dc.amount : 0)}
                    </td>
                  </tr>
                );
              })}
            </MDBTableBody>
          </MDBTable>
        </div>
        <div className="col-3 my-2"></div>
        <div className="col-3 my-2">
          <MDBTable bordered small>
            <MDBTableHead>
              <tr>
                <th
                  colSpan={2}
                  scope="col"
                  className="text-center fs-5 fw-bold p-0"
                >
                  Commissions Cost
                </th>
              </tr>
              <tr>
                <th
                  colSpan={2}
                  scope="col"
                  className="text-center fs-6 fw-bold p-0"
                >
                  {roundValue(
                    summary?.commissionCost ? summary?.commissionCost : 0
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
                      {roundValue(cc.amount ? cc.amount : 0)}
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
                  Other Cost
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
                      {roundValue(oc.amount ? oc.amount : 0)}
                    </td>
                  </tr>
                );
              })}
            </MDBTableBody>
          </MDBTable>
        </div>
        <div className="col-3 my-2"></div>
      </div>
    </div>
  );
}
