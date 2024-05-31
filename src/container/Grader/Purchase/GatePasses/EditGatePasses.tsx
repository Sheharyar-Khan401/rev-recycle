import { useState } from "react";
import {
  MDBTabs,
  MDBTabsContent,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsPane,
} from "mdb-react-ui-kit";
import GatePassesItems from "components/Purchase/GatePassesItems/gatePassesItems";
import GatePassesFiancialEnteries from "components/Purchase/GatePassesFinacialEnteries/gatePassesFinacialEnteries";
import EditGatePassBasic from "container/Grader/Purchase/GatePasses/EditGatePassBasic";
import QualityReport from "components/Purchase/QualityReport";

export default function EditGatePasses() {
  const [verticalActive, setVerticalActive] = useState("tab1");
  const [purchaseOrderId, setPurchaseOrderId] = useState<number>(0);
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
            Overview
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
            Financial Enteries
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleVerticalClick("tab4")}
            active={verticalActive === "tab4"}
          >
            Quality Report
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent className="col-12">
        <MDBTabsPane open={verticalActive === "tab1"} className="col-12">
          <EditGatePassBasic setPurchaseOrderId={setPurchaseOrderId} />
        </MDBTabsPane>
        <MDBTabsPane open={verticalActive === "tab2"}>
          <GatePassesItems purchaseOrderId={purchaseOrderId} />
        </MDBTabsPane>
        <MDBTabsPane open={verticalActive === "tab3"}>
          <GatePassesFiancialEnteries />
        </MDBTabsPane>
        <MDBTabsPane open={verticalActive === "tab4"}>
          <QualityReport />
        </MDBTabsPane>
      </MDBTabsContent>
    </>
  );
}
