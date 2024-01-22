import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App.tsx";
import "./index.css";

import HomePage from "./screens/HomePage.tsx";
import RegisterPage from "./screens/RegisterPage.tsx";
import LoginPage from "./screens/LoginPage.tsx";
import { store } from "./redux/store.ts";
import AccountPage from "./screens/account_page/AccountPage.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";
import MyPropertyPage from "./screens/my_property_page/MyPropertyPage.tsx";
import AddPropertyPage from "./screens/my_property_page/add_property_page/AddPropertyPage.tsx";
import PropertyHomePage from "./screens/my_property_page/PropertyHomePage.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" index={true} element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Private Routes */}
      <Route path="" element={<PrivateRoute />}>

        <Route path="/account" element={<AccountPage />} />
        
        <Route path="/my_property" element={<MyPropertyPage />}>
          <Route path="/my_property" element={<PropertyHomePage />} />
          <Route
            path="/my_property/add_property"
            element={<AddPropertyPage />}
          />
        </Route>

      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
