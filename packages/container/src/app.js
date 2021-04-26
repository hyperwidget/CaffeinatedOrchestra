import React, { lazy, Suspense, useState, useEffect } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
import { createBrowserHistory } from "history";
import { useAuth0 } from "@auth0/auth0-react";

import Header from "./components/header";
import Progress from "./components/progress";

const MarketingLazy = lazy(() => import("./components/marketingApp"));
const AuthLazy = lazy(() => import("./components/authApp"));
const DashboardLazy = lazy(() => import("./components/dashboardApp"));

const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});

const history = createBrowserHistory();

export default () => {
  const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();
  useEffect(() => {
    if (isAuthenticated) {
      history.push("/dashboard");
    }
  }, [isAuthenticated]);

  return (
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header
            isSignedIn={isAuthenticated}
            onSignOut={logout}
            name={user?.name}
          />
          <Suspense fallback={<Progress />}>
            <Switch>
              <Route path="/auth">
                <AuthLazy onSignIn={loginWithRedirect} />
              </Route>
              <Route path="/dashboard">
                {!isAuthenticated && <Redirect to="/" />}
                <DashboardLazy />
              </Route>
              <Route path="/" component={MarketingLazy} />
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </Router>
  );
};
