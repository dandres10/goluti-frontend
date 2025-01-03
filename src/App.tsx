import { useEffect, useState } from "react";
import { NAVBAR_TYPE } from "@bus/shared/enums";
import BusEvents from "@core/events/bus-events";
import { BrowserRouter } from "react-router-dom";
import { RoutesCore } from "@core/routes/routes-core";
import PlatformEvents from "@core/events/platform-events";
import OnboardingEvents from "@core/events/onboarding-events";
import CommercialEvents from "@core/events/commercial-events";
import AppointmentEvents from "@core/events/appointment-events";
import { FooterHomeUI, NavbarUI } from "@bus/shared/ui/molecules";
import { KEYS_SESSION_ENUM } from "@bus/core/enums/keys-session-enum";
import { IUiReduxDTO } from "@onboarding/domain/models/redux/bus/ui/i-ui-redux-dto";
import { InjectionEventFacade } from "@bus/facade/event/injection/injection-event-facade";
import { InjectionSessionFacade } from "@bus/facade/session/injection/injection-session-facade";
import { InjectionReduxFacade } from "@/bus/facade/redux";
import { IPlatformConfigurationDTO } from "@bus/domain/models/redux/bus/platform/i-platform-configuration-dto";
import { useSelector } from "react-redux";

const _uIEventFacade = InjectionEventFacade.UiEventFacade();
const _uISessionFacade = InjectionSessionFacade.UiSessionFacade();
const typeNavbar: IUiReduxDTO | null = _uISessionFacade.readNavbarType({
  key: KEYS_SESSION_ENUM.UI,
});

function App() {
  const [navbarType, setNavbarType] = useState(typeNavbar?.typeNavbar);

  useEffect(() => {
    listenerUpdateNavbarEvent();
  }, []);

  const listenerUpdateNavbarEvent = () => {
    _uIEventFacade.listenerUpdateNavbarEvent((message: IUiReduxDTO) => {
      setNavbarType(message.typeNavbar);
    });
  };

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
          navbarType={navbarType ? navbarType : NAVBAR_TYPE.HOME}
          className="home-view__navbar"
          platformConfiguration={platformConfiguration}
        />
        <RoutesCore />
        {navbarType && [NAVBAR_TYPE.HOME].includes(navbarType) && (
          <FooterHomeUI id="footer-home" />
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
