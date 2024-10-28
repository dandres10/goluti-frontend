import { HomeView } from "./home-view";
import { NAVBAR_TYPE } from "@/bus/shared/enums";


export interface PropsHomeLogic {
  title: string;
  navbarType: NAVBAR_TYPE
}

export const HomeLogic = () => {
  const props: PropsHomeLogic = {
    title: "Home + vite + Felizzzzx ",
    navbarType: NAVBAR_TYPE.HOME
  };

  return <HomeView {...props}/>;
};


export default HomeLogic;
