import BusEvents from "@core/events/bus-events";
import { BrowserRouter } from "react-router-dom";
import { RoutesCore } from "@core/routes/routes-core";
import PlatformEvents from "@core/events/platform-events";
import OnboardingEvents from "@core/events/onboarding-events";
import CommercialEvents from "@core/events/commercial-events";
import AppointmentEvents from "@core/events/appointment-events";
import { FooterHomeUI, NavbarUI } from "@bus/shared/ui/molecules";
import { InjectionReduxFacade } from "@/bus/facade/redux";
import { IPlatformConfigurationDTO } from "@bus/domain/models/redux/bus/platform/i-platform-configuration-dto";
import { useSelector } from "react-redux";

function App() {
  const _injectionReduxFacade = InjectionReduxFacade.PlatformReduxFacade();
  const platformConfiguration: IPlatformConfigurationDTO | undefined =
    _injectionReduxFacade.platformConfiguration({
      selector: useSelector,
    });

  return (
    <>
      <BusEvents />
      <AppointmentEvents />
      <OnboardingEvents />
      <CommercialEvents />
      <PlatformEvents />
      <BrowserRouter>
        <NavbarUI
          id="navbar-core"
          className="home-view__navbar"
          platformConfiguration={platformConfiguration}
        />
        <RoutesCore />
        <FooterHomeUI id="footer-home" />
      </BrowserRouter>
    </>
  );
}

export default App;
