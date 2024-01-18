import { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../../components/Account/Context";
import apiInstance from "../../services/api";

const PublicRoute = ({ children }) => {
  const { setIsAuth } = useContext(AuthenticationContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        await apiInstance.get("/users/token");

        setIsAuth(true);
      } catch (error) {
        console.error(error);

        localStorage.clear();
        setIsAuth(false);
      } finally {
        setIsLoading(false);
      }
    };

    getUser();
  }, []);

  return isLoading ? null : children;
};

export default PublicRoute;
