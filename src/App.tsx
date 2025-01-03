import { useEffect, useState } from "react";
import { NAVBAR_TYPE } from "@bus/shared/enums";
import { BrowserRouter } from "react-router-dom";
import BusEvents from "@core/events/bus-events";
import { RoutesCore } from "@core/routes/routes-core";
import { KEYS_SESSION } from "@bus/core/const/keys-session";
import OnboardingEvents from "@core/events/onboarding-events";
import AppointmentEvents from "@core/events/appointment-events";
import PlatformEvents from "@core/events/platform-events";
import { FooterHomeUI, NavbarUI } from "@bus/shared/ui/molecules";
import ReduxProviderOnboarding from "@onboarding/core/config/redux/redux-provider";
import { IUiReduxDTO } from "@onboarding/domain/models/redux/bus/ui/i-ui-redux-dto";
import ReduxProviderAppointment from "@appointment/core/config/redux/redux-provider";
import { InjectionEventFacade } from "@bus/facade/event/injection/injection-event-facade";
import { InjectionSessionFacade } from "@bus/facade/session/injection/injection-session-facade";
import ReduxProviderCommercial from "@commercial/core/config/redux/redux-provider";
import CommercialEvents from "@core/events/commercial-events";
import ReduxProviderPlatform from "@platform/core/config/redux/redux-provider";
import ReduxProviderBus from "@bus/core/config/redux/redux-provider";
import { Provider } from "react-redux";
import { store } from "./core/redux/redux-core";

const _uIEventFacade = InjectionEventFacade.UiEventFacade();
const _uISessionFacade = InjectionSessionFacade.UiSessionFacade();
const typeNavbar: IUiReduxDTO | null = _uISessionFacade.readNavbarType({
  key: KEYS_SESSION.UI,
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

  return (
    <Provider store={store}>
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
        />
        <RoutesCore />
        {navbarType && [NAVBAR_TYPE.HOME].includes(navbarType) && (
          <FooterHomeUI id="footer-home" />
        )}
      </BrowserRouter>
    </Provider>
  );
}

export default App;
