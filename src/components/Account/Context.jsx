import PropTypes from 'prop-types';
import { createContext, useMemo, useState } from "react";

export const AuthenticationContext = createContext();

const AuthenticationWrapper = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [authData, setAuthData] = useState("");

  const contextValue = useMemo(
    () => ({ isAuth, setIsAuth, authData, setAuthData }),
    [isAuth, authData]
  );

  return (
    <AuthenticationContext.Provider value={contextValue}>
      {children}
    </AuthenticationContext.Provider>
  );
};

AuthenticationWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthenticationWrapper;
