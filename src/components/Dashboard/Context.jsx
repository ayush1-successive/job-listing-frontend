import { createContext, useState } from "react";

export const DashboardContext = createContext();

const DashboardWrapper = ({ children }) => {
  const [selectedDashboardMenuKey, setSelectedDashboardMenuKey] =
    useState("jobs");

  const [selectedUploadMenuKey, setSelectedUploadMenuKey] =
    useState("upload-single");

  return (
    <DashboardContext.Provider
      value={{
        selectedDashboardMenuKey,
        setSelectedDashboardMenuKey,
        selectedUploadMenuKey,
        setSelectedUploadMenuKey,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardWrapper;
