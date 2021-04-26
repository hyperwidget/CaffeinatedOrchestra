import React from "react";
import ReactDOM from "react-dom";
import { createMemoryHistory, createBrowserHistory } from "history";

import { Auth0Wrapper, AuthAppWrapper } from "auth/DevAuthWrapper";

import App from "./app";

// Mount to start up app
const mount = (
  el,
  { onNavigate, defaultHistory, initialPath, ...props },
  WrapperComponent = null
) => {
  const history =
    defaultHistory || createMemoryHistory({ initialEntries: [initialPath] });

  if (onNavigate) {
    history.listen(onNavigate);
  }

  if (WrapperComponent) {
    ReactDOM.render(
      <WrapperComponent>
        <AuthAppWrapper AppComponent={App} history={history} {...props} />
      </WrapperComponent>,
      el
    );
  } else {
    console.log("no wrapper component");
    ReactDOM.render(<App history={history} {...props} />, el);
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
  const devRoot = document.querySelector("#_marketting-dev-root");
  if (devRoot) {
    mount(devRoot, { defaultHistory: createBrowserHistory() }, Auth0Wrapper);
  }
}

// We are running in container, export the mount function
export { mount };
