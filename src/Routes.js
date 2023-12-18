import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ErrorPage, Home } from "./components";

const Router = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
