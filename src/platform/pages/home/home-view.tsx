import { ButtonUI } from "@/bus/shared/ui/atoms";
import { IPlatformLogicProps } from "./home-logic";
import "./home.scss";

export const PlatformView = (props: IPlatformLogicProps) => {
  const { goToAppointment, firstLevelMenu } = props;
  return (
    <div className="platform-home">
      <div className="platform-home__head">
        <div className="platform-home__head__title">¿Qué quieres hacer?</div>
        <div className="platform-home__head__subtitle">
          Selecciona una tarjeta
        </div>
      </div>

      <div className="platform-home__container-cards">
        {firstLevelMenu?.map((item) => (
          <div key={item.id}>
            <ButtonUI
              id={item.id}
              type="primary"
              size="large"
              text={item.name}
              onClick={() => goToAppointment(item.id, item.route)}
              className="platform-home__container-cards__card"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
