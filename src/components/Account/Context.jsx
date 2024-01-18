import { createContext, useState } from "react";

export const AuthenticationContext = createContext();

const AuthenticationWrapper = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [authData, setAuthData] = useState("");

  return (
    <AuthenticationContext.Provider
      value={{ isAuth, setIsAuth, authData, setAuthData }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationWrapper;
