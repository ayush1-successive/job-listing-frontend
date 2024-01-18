import { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../../components/Account/Context";
import apiInstance from "../../services/api";
import { MenuKeyContext } from "../../components/MenuKey/Context";

const PublicRoute = ({ children }) => {
  const { setIsAuth } = useContext(AuthenticationContext);
  const [isLoading, setIsLoading] = useState(true);

  const { setDashboardMenuKey, setUploadMenuKey } = useContext(MenuKeyContext);

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

        if (sessionStorage.length === 0) {
          sessionStorage.setItem("dashboardMenuKey", "jobs");
          sessionStorage.setItem("uploadMenuKey", "upload-single");
        }

        setDashboardMenuKey(sessionStorage.getItem("dashboardMenuKey"));
        setUploadMenuKey(sessionStorage.getItem("uploadMenuKey"));
      }
    };

    getUser();
  }, []);

  return isLoading ? null : children;
};

export default PublicRoute;
