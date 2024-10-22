import { NavbarType } from "@/bus/shared/enums";
import { BrowserRouter } from "react-router-dom";
import { RoutesCore } from "@/core/routes/routes-core";
import OnboardingEvents from "@/core/events/onboarding-events";
import AppointmentEvents from "@/core/events/appointment-events";
import { FooterHomeUI, NavbarUI } from "@/bus/shared/ui/molecules";
import ReduxProviderOnboarding from "@/onboarding/core/config/redux/redux-provider";
import ReduxProviderAppointment from "@/appointment/core/config/redux/redux-provider";

function App() {
  return (
    <ReduxProviderAppointment>
      <AppointmentEvents />
      <ReduxProviderOnboarding>
        <OnboardingEvents />
        <BrowserRouter>
          <NavbarUI
            id="navbar-core"
            navbarType={NavbarType.HOME}
            className="home-view__navbar"
          />
          <RoutesCore />
          <FooterHomeUI id="footer-home" />
        </BrowserRouter>
      </ReduxProviderOnboarding>
    </ReduxProviderAppointment>
  );
}

export default App;
