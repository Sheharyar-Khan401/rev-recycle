import { useState } from "react";
import {
  MDBTabs,
  MDBTabsContent,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsPane,
} from "mdb-react-ui-kit";
import EditBasicCustomInvoice from "container/Grader/Sales/Invoices/CustomInvoices/EditBasicCustomInvoice";
import EditBillCustomInvoice from "container/Grader/Sales/Invoices/CustomInvoices/EditBillCustomInvoice";

export default function EditCustomInvoice({
  systemInvoiceId,
}: {
  systemInvoiceId: number;
}) {
  const [verticalActive, setVerticalActive] = useState("tab1");
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
              Basic
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink
              onClick={() => handleVerticalClick("tab2")}
              active={verticalActive === "tab2"}
            >
              Bill
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink
              onClick={() => handleVerticalClick("tab3")}
              active={verticalActive === "tab3"}
            >
              Financial Entries
            </MDBTabsLink>
          </MDBTabsItem>
        </MDBTabs>

      <MDBTabsContent className="col-12">
        <MDBTabsPane open={verticalActive === "tab1"} className="col-12">
          <EditBasicCustomInvoice systemInvoiceId={systemInvoiceId} />
        </MDBTabsPane>
        <MDBTabsPane open={verticalActive === "tab2"}>
          <EditBillCustomInvoice systemInvoiceId={systemInvoiceId} />
        </MDBTabsPane>
        <MDBTabsPane open={verticalActive === "tab3"}></MDBTabsPane>
      </MDBTabsContent>
    </>
  );
}
