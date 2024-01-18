import React from "react";
import { Router } from "./routes";
import { AuthenticationWrapper } from "./components/Account";
import { MenuKey } from "./components/MenuKey";

const App = () => (
  <MenuKey>
    <AuthenticationWrapper>
      <Router />
    </AuthenticationWrapper>
  </MenuKey>
);
export default App;
