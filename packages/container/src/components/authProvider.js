import React from "react";

import { Auth0Provider } from "@auth0/auth0-react";

export const AuthProvider = ({ children }) => {
  return (
    <Auth0Provider
      domain={process.env.AUTH0_DOMAIN}
      clientId={process.env.AUTH0_SECRET}
      redirectUri={window.location.origin}
    >
      {children}
    </Auth0Provider>
  );
};
