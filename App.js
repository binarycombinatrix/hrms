import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import AdminLayout from "layouts/Admin.js";
import Login from "views/Login/Index.js";
import { useSelector } from "react-redux";

const hist = createBrowserHistory();

const All = () => {
  const accessToken = useSelector((state) => state.Auth.success);
  return (
    <Router history={hist}>
      <Route exact path="/login" component={Login} />
      <Switch>
        <Route
          path="/"
          exact
          render={(props) =>
            accessToken ? (
              <Redirect to="/admin/dashboard" {...props} />
            ) : (
              <>
                <Redirect to="/login" />
              </>
            )
          }
        />
        <Route
          path="/admin"
          render={(props) =>
            accessToken ? (
              <AdminLayout {...props} />
            ) : (
              <>
                <Redirect to="/login" />
              </>
            )
          }
        />
      </Switch>
    </Router>
  );
};

export default All;
