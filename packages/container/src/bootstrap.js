import React from "react";
import ReactDOM from "react-dom";
import { Auth0Provider } from "@auth0/auth0-react";

import App from "./app";

ReactDOM.render(
  <Auth0Provider
    domain={process.env.AUTH0_DOMAIN}
    clientId={process.env.AUTH0_SECRET}
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>,
  document.querySelector("#root")
);
