import { HomeView } from "./home-view";
import { NavbarType } from "@/bus/shared/enums";


export interface PropsHomeLogic {
  title: string;
  navbarType: NavbarType
}

export const HomeLogic = () => {
  const props: PropsHomeLogic = {
    title: "Home + vite + Felizzzzx ",
    navbarType: NavbarType.HOME
  };

  return <HomeView {...props}/>;
};


export default HomeLogic;
