/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import AdminLayout from "layouts/Admin.js";
import Login from "views/Login.js";

// User Flow
import UserDashboard from "views/user/UserDashboard.js";
import Profile from "views/user/Profile.js";
import History from "views/user/History.js";
import PickupPage from "views/user/PickupPage.js";
import SelectWaste from "views/user/SelectWaste.js";
import FindDriver from "views/user/FindDriver.js";

// Driver Flow
import DriverDashboard from "views/driver/DriverDashboard.js";
import OrderDetail from "views/driver/OrderDetail.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

const isLogin = localStorage.getItem("isLogin");

root.render(
  <BrowserRouter>
    <Switch>
      <Route path="/login" render={(props) => <Login {...props} />} />
      
      {/* User Routes */}
      <Route path="/user/dashboard" render={(props) => <UserDashboard {...props} />} />
      <Route path="/user/profile" render={(props) => <Profile {...props} />} />
      <Route path="/user/history" render={(props) => <History {...props} />} />
      <Route path="/user/pickup" render={(props) => <PickupPage {...props} />} />
      <Route path="/user/select-waste" render={(props) => <SelectWaste {...props} />} />
      <Route path="/user/find-driver" render={(props) => <FindDriver {...props} />} />
      
      {/* Driver Routes */}
      <Route path="/driver/dashboard" render={(props) => <DriverDashboard {...props} />} />
      <Route path="/driver/order/:id" render={(props) => <OrderDetail {...props} />} />

      {/* Admin Route */}
      <Route path="/admin" render={(props) => {
        // Protect the admin routes
        if (!localStorage.getItem("isLogin")) {
          return <Redirect to="/login" />;
        }
        return <AdminLayout {...props} />;
      }} />
      <Redirect from="/" to="/login" />
    </Switch>
  </BrowserRouter>
);
