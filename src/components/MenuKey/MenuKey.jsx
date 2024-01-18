import { useState } from "react";
import { MenuKeyContext } from "./Context";

const MenuKey = ({ children }) => {
  const [dashboardMenuKey, setDashboardMenuKey] = useState("jobs");
  const [uploadMenuKey, setUploadMenuKey] = useState("upload-single");

  return (
    <MenuKeyContext.Provider
      value={{
        dashboardMenuKey,
        setDashboardMenuKey,
        uploadMenuKey,
        setUploadMenuKey,
      }}
    >
      {children}
    </MenuKeyContext.Provider>
  );
};

export default MenuKey;
