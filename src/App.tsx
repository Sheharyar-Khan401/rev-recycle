import ProtectedRoutes from "routes/protectedRoutes";
import PublicRoutes from "routes/publicRoutes";
import { useAppSelector } from "redux/hooks";
import MessageDialog from "shared/Components/MessageDialog/MessageDialog";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Pages } from "helper/globalVariables";

function App() {
  const token = useAppSelector((state) => state.auth.token);
  const { successMessage, errorMessage } = useAppSelector(
    (state) => state.common
  );
  const location = useLocation();
  useEffect(() => {
    document.title =
      Pages.find((page) => page.route === location.pathname)?.title ??
      "Revrecycle";
  }, [location]);
  return (
    <>
      {token ? <ProtectedRoutes /> : <PublicRoutes />}
      <MessageDialog
        message={successMessage}
        open={!!successMessage}
        type="success"
        setOpen={() => {}}
      />
      <MessageDialog
        message={errorMessage}
        open={!!errorMessage}
        type="failure"
        setOpen={() => {}}
      />
    </>
  );
}

export default App;
