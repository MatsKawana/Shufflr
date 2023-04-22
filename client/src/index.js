import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App"
import { Auth0Provider } from "@auth0/auth0-react";
import UserProvider from "./components/UserContext";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <Auth0Provider
    domain="dev-jpjm8isfknh00lyz.us.auth0.com"
    clientId="9oHiuzBJ3TytJ99I40yYm3D4QEpxpWVk"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <UserProvider>
      <App />
    </UserProvider>
  </Auth0Provider>,
);