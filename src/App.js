import React from "react";
import { MenuKey } from "./components";
import { AuthenticationWrapper } from "./components/Account";
import { Router } from "./routes";

const App = () => (
  <MenuKey>
    <AuthenticationWrapper>
      <Router />
    </AuthenticationWrapper>
  </MenuKey>
);
export default App;
