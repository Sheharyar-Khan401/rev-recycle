import { useEffect, useState } from "react";
import {
  MDBTabs,
  MDBTabsContent,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsPane,
} from "mdb-react-ui-kit";

import EditInvoiceCharges from "container/Grader/Purchase/Invoices/EditInvoiceCharges";

import EditBasicInvoice from "container/Grader/Purchase/Invoices/EditBasicInvoice";
import EditInvoiceDocuments from "container/Grader/Purchase/Invoices/EditInvoiceDocuments";
import EditInvoiceItems from "container/Grader/Purchase/Invoices/EditInvoiceItems";
import EditInvoiceCommissions from "container/Grader/Purchase/Invoices/EditInvoiceCommissions";
import EditInvoiceSummary from "container/Grader/Purchase/Invoices/EditInvoiceSummary";
import EditFinancialEntries from "container/Grader/Purchase/Invoices/EditFinancialEntries";
import { useLazyGetInvoiceByIdQuery } from "redux/features/Settings/purchase/invoiceTypeApiSlice";
import { useParams } from "react-router-dom";
import FreightData from "components/Purchase/FreightData/FreightData";

export default function EditInvoice() {
  const [verticalActive, setVerticalActive] = useState("tab1");
  const params = useParams();
  const [getInvoiceById, result] = useLazyGetInvoiceByIdQuery();

  const handleVerticalClick = (value: string) => {
    if (value === verticalActive) {
      return;
    }
    setVerticalActive(value);
  };
  useEffect(() => {
    const id = params.id;
    if (id) {
      getInvoiceById(+id);
    }
  }, [params.id, getInvoiceById]);
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
            Commission
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleVerticalClick("tab6")}
            active={verticalActive === "tab6"}
          >
            Summary
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleVerticalClick("tab7")}
            active={verticalActive === "tab7"}
          >
            Financial Entries
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleVerticalClick("tab8")}
            active={verticalActive === "tab8"}
          >
            Freight Data
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <div>
        <MDBTabsContent className="col-12">
          <MDBTabsPane open={verticalActive === "tab1"} className="col-12">
            {verticalActive === "tab1" && <EditBasicInvoice />}
          </MDBTabsPane>
          <MDBTabsPane open={verticalActive === "tab2"}>
            {verticalActive === "tab2" && (
              <EditInvoiceItems
                posted={result?.data?.posted ? result?.data?.posted : false}
              />
            )}
          </MDBTabsPane>
          <MDBTabsPane open={verticalActive === "tab3"}>
            {verticalActive === "tab3" && (
              <EditInvoiceCharges
                posted={result?.data?.posted ? result?.data?.posted : false}
              />
            )}
          </MDBTabsPane>
          <MDBTabsPane open={verticalActive === "tab4"}>
            {verticalActive === "tab4" && (
              <EditInvoiceDocuments
                posted={result?.data?.posted ? result?.data?.posted : false}
              />
            )}
          </MDBTabsPane>
          <MDBTabsPane open={verticalActive === "tab5"}>
            {verticalActive === "tab5" && (
              <EditInvoiceCommissions
                posted={result?.data?.posted ? result?.data?.posted : false}
              />
            )}
          </MDBTabsPane>
          <MDBTabsPane open={verticalActive === "tab6"}>
            {verticalActive === "tab6" && <EditInvoiceSummary />}
          </MDBTabsPane>
          <MDBTabsPane open={verticalActive === "tab7"}>
            {verticalActive === "tab7" && <EditFinancialEntries />}
          </MDBTabsPane>
          <MDBTabsPane open={verticalActive === "tab8"}>
            <FreightData />
          </MDBTabsPane>
        </MDBTabsContent>
      </div>
    </>
  );
}
