import { PropsHomeLogic } from "@pages/home/home-logic";
import "@pages/home/home.scss";
import { NavbarUI } from "@/bus/shared/ui/molecules";



export const HomeView = (props: PropsHomeLogic) => {
  

  return (
    <div id="home-view" className="home-view">
      
      <NavbarUI id="navbar-core" navbarType={props.navbarType}/>
    
    </div>
  );
};
