import { HomeView } from "@pages/home/home-view";

export interface PropsHomeLogic {
  title: string;
}

export const HomeLogic = () => {
  const props: PropsHomeLogic = {
    title: "Home + vite + Felizzzzx ",
  };

  return <HomeView {...props}/>;
};


export default HomeLogic;
