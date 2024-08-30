import { Route, BrowserRouter, Routes } from "react-router-dom";
import HomeLogic from "../pages/home/home-logic";

export const RoutesCore = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<HomeLogic />} />
      </Routes>
    </BrowserRouter>
  );
};
