import { Route, Routes } from "react-router-dom";
import HomeLogic from "../pages/home/home-logic";
import LoginLogic from "@/pages/login/login-logic";

export const RoutesCore = () => {
  return (
    
      <Routes>
        <Route path={"/"} element={<HomeLogic />} />
        <Route path={"/login"} element={<LoginLogic />} />
      </Routes>
  );
};
