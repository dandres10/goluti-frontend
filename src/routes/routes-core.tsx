import { Navigate, Route, Routes } from "react-router-dom";
import HomeLogic from "@/welcome/pages/home/home-logic";
import LoginLogic from "@/onboarding/pages/login/login-logic";
import { ROUTES } from "./routes";

export const RoutesCore = () => {
  return (
    <Routes>
      //raiz
      <Route path={ROUTES.RAIZ} element={<Navigate to={ROUTES.WELCOME_HOME} />} />
      //welcome
      <Route path={ROUTES.WELCOME_HOME} element={<HomeLogic />} />
      //onboarding
      <Route path={ROUTES.ONBOARDING_LOGIN} element={<LoginLogic />} />
      //*
      <Route path="*" element={<Navigate to={ROUTES.WELCOME_HOME} replace />} />
    </Routes>
  );
};
