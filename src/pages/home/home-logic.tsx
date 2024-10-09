import { NavbarType } from "@/bus/shared/enums";
import { HomeView } from "@pages/home/home-view";

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
