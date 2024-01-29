import React from "react";
import { MenuKey } from "./modules/navbar";
import { Authentication } from "./modules/user";
import { Router } from "./routes";

const App = () => (
  <MenuKey>
    <Authentication>
      <Router />
    </Authentication>
  </MenuKey>
);
export default App;
