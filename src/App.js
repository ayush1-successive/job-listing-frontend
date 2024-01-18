import React from "react";
import { Router } from "./routes";
import { AuthenticationWrapper } from "./components/Account";

const App = () => (
  <AuthenticationWrapper>
    <Router />
  </AuthenticationWrapper>
);
export default App;
