import { Route, Routes } from "react-router-dom";
import AddAgent from "container/Grader/Clients/Agents/AddAgents";
import AgentsListing from "container/Grader/Clients/Agents/AgentsListing";
import EditAgent from "container/Grader/Clients/Agents/EditAgents";
import { hasPermission } from "helper/utility";

export default function AgentsNavigation() {
  return (
    <Routes>
      <>
        <Route path="*" element={<AgentsListing />} />
        {hasPermission("cli_ag_100") && (
        <Route path="add/*" element={<AddAgent />} />
        )}
        {hasPermission("cli_ag_101") && (
        <Route path="edit/:id/*" element={<EditAgent />} />
        )}
      </>
    </Routes>
  );
}
