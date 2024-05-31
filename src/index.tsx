import ReactDOM from "react-dom/client";
import reportWebVitals from "reportWebVitals";
import { Provider } from "react-redux";
import { persistor, store } from "redux/store";
import { PersistGate } from "redux-persist/integration/react";
import App from "App";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-phone-input-2/lib/style.css";
import "shared/global.css";
import "shared/override.css";
import "react-multi-date-picker/styles/layouts/mobile.css";

import { BrowserRouter } from "react-router-dom";

const rootDiv = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(rootDiv);
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

reportWebVitals();
