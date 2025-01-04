import { Navigate, Route, Routes } from "react-router-dom";
import HomeLogic from "@/welcome/pages/home/home-logic";
import LoginLogic from "@/onboarding/pages/login/login-logic";
import { ROUTES } from "./routes";
import { CommercialLogic } from "@/commercial/pages/home/home-logic";
import ChatLogic from "@/commercial/pages/chat/chat-logic";
import ChatComponent from "@/commercial/pages/voice/voice-logic";
import AppointmentLogic from "@/appointment/pages/home/home-logic";
import PlatformLogic from "@/platform/pages/home/home-logic";
import { PrivateRoute } from "@/bus/core/routes";

export const RoutesCore = () => {
  return (
    <Routes>
      //raiz
      <Route
        path={ROUTES.RAIZ}
        element={<Navigate to={ROUTES.WELCOME_HOME} />}
      />
      //welcome
      <Route path={ROUTES.WELCOME_HOME} element={<HomeLogic />} />
      //onboarding
      <Route path={ROUTES.ONBOARDING_LOGIN} element={<LoginLogic />} />
      //commercial
      <Route
        path={ROUTES.COMMERCIAL_HOME}
        element={
          <PrivateRoute>
            <CommercialLogic />
          </PrivateRoute>
        }
      />
      <Route
        path={ROUTES.COMMERCIAL_CHAT}
        element={
          <PrivateRoute>
            <ChatLogic />
          </PrivateRoute>
        }
      />
      <Route
        path={ROUTES.COMMERCIAL_VOICE}
        element={
          <PrivateRoute>
            <ChatComponent />
          </PrivateRoute>
        }
      />
      //appointment
      <Route
        path={ROUTES.APPOINTMENT_HOME}
        element={
          <PrivateRoute>
            <AppointmentLogic />
          </PrivateRoute>
        }
      />
      //platform
      <Route
        path={ROUTES.PLATFORM_HOME}
        element={
          <PrivateRoute>
            <PlatformLogic />
          </PrivateRoute>
        }
      />
      //*
      <Route path="*" element={<Navigate to={ROUTES.WELCOME_HOME} replace />} />
    </Routes>
  );
};
