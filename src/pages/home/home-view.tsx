import { PropsHomeLogic } from "@pages/home/home-logic";
import "@pages/home/home.scss";
import { ButtonUI } from "@/bus/shared/ui/atoms";


export const HomeView = (props: PropsHomeLogic) => {


  return (
    <div id="home-view" className="home-view">
      <div className="home-view__body">
        <div className="home-view__body__title">
          Gestiona tu negocio de manera simple con una plataforma fácil de usar.
        </div>
        <div className="home-view__body__create">
          <img
            className="home-view__body__create__img"
            src="/img/home-create-account.png"
            alt="home-create-account"
          />
          <ButtonUI
            id="create__button"
            className="home-view__body__create__button"
            text="Crear cuenta"
            type="primary"
          />
        </div>
      </div>
    </div>
  );
};
