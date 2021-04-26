import React from "react";
import { Switch, Route, Router } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
// import SignInAuth from "./components/auth0Login";
import SignIn from "./components/Signin";
import SignUp from "./components/Signup";
import { useAuth0 } from "@auth0/auth0-react";

const generateClassName = createGenerateClassName({
  productionPrefix: "au",
});

export default ({ history, onSignIn }) => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isAuthenticated) {
    console.log(`HI ${user.name}!`);
  }

  return (
    <div>
      <StylesProvider generateClassName={generateClassName}>
        <Router history={history}>
          <Switch>
            <Route path="/auth/signin">
              <SignIn onSignIn={onSignIn} />
            </Route>
            <Route path="/auth/signup">
              <SignUp onSignIn={onSignIn} />
            </Route>
          </Switch>
        </Router>
      </StylesProvider>
    </div>
  );
};
