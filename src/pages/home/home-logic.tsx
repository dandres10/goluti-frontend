import { NavbarType } from "@/bus/shared/enums";
import { HomeView } from "@pages/home/home-view";

export interface PropsHomeLogic {
  title: string;
  navbarType: NavbarType
}

export const HomeLogic = () => {
  const props: PropsHomeLogic = {
    title: "Home + vite + Felizzzzx ",
    navbarType: NavbarType.DASHBOARD
  };

  return <HomeView {...props}/>;
};


export default HomeLogic;
