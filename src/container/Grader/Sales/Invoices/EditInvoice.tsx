import { useEffect, useState } from "react";
import {
  MDBTabs,
  MDBTabsContent,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsPane,
} from "mdb-react-ui-kit";
import EditInvoiceCharges from "container/Grader/Sales/Invoices/EditInvoiceCharges";
import EditBasicInvoice from "container/Grader/Sales/Invoices/EditBasicInvoice";
import EditInvoiceDocuments from "container/Grader/Sales/Invoices/EditInvoiceDocuments";
import EditInvoiceItems from "container/Grader/Sales/Invoices/EditInvoiceItems";
import EditInvoiceSummary from "container/Grader/Sales/Invoices/EditInvoiceSummary";
import EditFinancialEntries from "container/Grader/Purchase/Invoices/EditFinancialEntries";
import { useLazyGetInvoiceByIdQuery } from "redux/features/Settings/purchase/invoiceTypeApiSlice";
import { useParams } from "react-router-dom";

export default function EditInvoice() {
  const params = useParams();
  const [verticalActive, setVerticalActive] = useState("tab1");
  const [getInvoiceById, result] = useLazyGetInvoiceByIdQuery();
  useEffect(() => {
    const id = params.id;
    if (id) {
      getInvoiceById(+id);
    }
  }, [getInvoiceById, params.id]);

  const handleVerticalClick = (value: string) => {
    if (value === verticalActive) {
      return;
    }
    setVerticalActive(value);
  };

  return (
    <>
        <MDBTabs>
          <MDBTabsItem>
            <MDBTabsLink
              onClick={() => handleVerticalClick("tab1")}
              active={verticalActive === "tab1"}
            >
              Basic Details
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink
              onClick={() => handleVerticalClick("tab2")}
              active={verticalActive === "tab2"}
            >
              Items
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink
              onClick={() => handleVerticalClick("tab3")}
              active={verticalActive === "tab3"}
            >
              Charges
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink
              onClick={() => handleVerticalClick("tab4")}
              active={verticalActive === "tab4"}
            >
              Documents
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink
              onClick={() => handleVerticalClick("tab5")}
              active={verticalActive === "tab5"}
            >
              Summary
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink
              onClick={() => handleVerticalClick("tab6")}
              active={verticalActive === "tab6"}
            >
              Financial Entries
            </MDBTabsLink>
          </MDBTabsItem>
        </MDBTabs>

        <MDBTabsContent className="col-12">
          <MDBTabsPane open={verticalActive === "tab1"} className="col-12">
            {verticalActive === "tab1" && <EditBasicInvoice />}
          </MDBTabsPane>
          <MDBTabsPane open={verticalActive === "tab2"}>
            {verticalActive === "tab2" && (
              <EditInvoiceItems
                posted={result.data?.posted ? result?.data?.posted : false}
              />
            )}
          </MDBTabsPane>
          <MDBTabsPane open={verticalActive === "tab3"}>
            {verticalActive === "tab3" && (
              <EditInvoiceCharges
                posted={result.data?.posted ? result?.data?.posted : false}
              />
            )}
          </MDBTabsPane>
          <MDBTabsPane open={verticalActive === "tab4"}>
            {verticalActive === "tab4" && (
              <EditInvoiceDocuments
                posted={result.data?.posted ? result?.data?.posted : false}
              />
            )}
          </MDBTabsPane>
          <MDBTabsPane open={verticalActive === "tab5"}>
            {verticalActive == "tab5" && <EditInvoiceSummary />}
          </MDBTabsPane>
          <MDBTabsPane open={verticalActive === "tab6"}>
            {verticalActive === "tab6" && <EditFinancialEntries />}
          </MDBTabsPane>
        </MDBTabsContent>
    </>
  );
}
