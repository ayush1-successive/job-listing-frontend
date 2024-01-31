import React, { Suspense } from "react";
import { MenuKey } from "./modules/navbar";
import { Authentication } from "./modules/user";
import { Router } from "./routes";

const App = () => (
  <Suspense fallback={<>Loading...</>}>
    <MenuKey>
      <Authentication>
        <Router />
      </Authentication>
    </MenuKey>
  </Suspense>
);
export default App;
