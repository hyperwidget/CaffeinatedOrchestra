import React, { useEffect } from "react";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";

// Auth0 config for local dev
export const Auth0Wrapper = ({ children }) => (
  <Auth0Provider
    domain={process.env.AUTH0_DOMAIN}
    clientId={process.env.AUTH0_SECRET}
    redirectUri={window.location.origin}
  >
    {children}
  </Auth0Provider>
);

export const AuthAppWrapper = ({ AppComponent, ...props }) => {
  const { loginWithRedirect, isAuthenticated, isLoading, user } = useAuth0();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect();
    }
  }, [isAuthenticated, isLoading]);

  return <AppComponent {...props} user={user} />;
};
