import React from "react";
import ReactDOM from "react-dom";
import { createMemoryHistory, createBrowserHistory } from "history";
import App from "./app";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";

// Auth0 config for local dev
const Auth0Wrapper = ({ children }) => (
  <Auth0Provider
    domain={process.env.AUTH0_DOMAIN}
    clientId={process.env.AUTH0_SECRET}
    redirectUri={window.location.origin}
  >
    {children}
  </Auth0Provider>
);

// A separate wrapper for local dev to leverage the Auth0 hooks, passing "onSignIn" from Auth0
const AppWrapper = (props) => {
  const { loginWithRedirect } = useAuth0();

  return <App {...props} onSignIn={loginWithRedirect} />;
};

// Mount to start up app
const mount = (
  el,
  { onNavigate, defaultHistory, initialPath, onSignIn },
  WrapperComponent
) => {
  const history =
    defaultHistory ||
    createMemoryHistory({
      initialEntries: [initialPath],
    });

  if (onNavigate) {
    history.listen(onNavigate);
  }

  if (WrapperComponent) {
    console.log("in Wrapper");
    ReactDOM.render(
      <WrapperComponent>
        <AppWrapper history={history} />
      </WrapperComponent>,
      el
    );
  } else {
    console.log("no wrapper component");
    ReactDOM.render(<App history={history} onSignIn={onSignIn} />, el);
  }

  return {
    onParentNavigate: ({ pathname: nextPathname }) => {
      const { pathname } = history.location;
      if (pathname !== nextPathname) {
        history.push(nextPathname);
      }
    },
  };
};

// if in dev && in isolation, call mount immediately
if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_auth-dev-root");
  if (devRoot) {
    mount(devRoot, { defaultHistory: createBrowserHistory() }, Auth0Wrapper);
  }
}

// We are running in container, export the mount function
export { mount };
