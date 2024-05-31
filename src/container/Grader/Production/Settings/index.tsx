import { Navigate, Route, Routes } from "react-router-dom";
import OpeningBalance from "container/Grader/Production/Settings/OpeningBalance/OpeningBalance";
import FOHValuesNavigation from "container/Grader/Production/Settings/FohValues/index";

export default function ProductionSettingsNavigation() {
    return (
        <Routes >
            <>
                <Route path="fohValues/*" element={<FOHValuesNavigation />} />
                <Route path="openingbalances/*" element={<OpeningBalance />} />
                <Route path="*" element={<Navigate to="/grader/production/settings/fohValues" replace />} />
            </>
        </Routes>
    );
}
