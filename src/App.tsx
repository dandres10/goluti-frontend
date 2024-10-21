import { NavbarType } from "@/bus/shared/enums";
import { BrowserRouter } from "react-router-dom";
import { RoutesCore } from "./routes/routes-core";
import { FooterHomeUI, NavbarUI } from "@/bus/shared/ui/molecules";
import ReduxProviderOnboarding from "@/onboarding/core/config/redux/redux-provider";
import ReduxProviderAppointment from "@/appointment/core/config/redux/redux-provider";

function App() {
  return (
    <>
      <ReduxProviderAppointment
        children={
          <ReduxProviderOnboarding
            children={
              <BrowserRouter>
                <NavbarUI
                  id="navbar-core"
                  navbarType={NavbarType.HOME}
                  className="home-view__navbar"
                />
                <RoutesCore />
                <FooterHomeUI id="footer-home" />
              </BrowserRouter>
            }
          />
        }
      />
    </>
  );
}

export default App;
