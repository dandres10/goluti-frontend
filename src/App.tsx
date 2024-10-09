import { NavbarType } from "./bus/shared/enums";
import { FooterHomeUI, NavbarUI } from "@/bus/shared/ui/molecules";
import { RoutesCore } from "./routes/routes-core";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavbarUI
          id="navbar-core"
          navbarType={NavbarType.HOME}
          className="home-view__navbar"
        />
        <RoutesCore />
        <FooterHomeUI id="footer-home" />
      </BrowserRouter>
    </>
  );
}

export default App;
