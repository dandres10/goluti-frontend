import { ButtonUI } from "@/bus/shared/ui/atoms";
import { IPlatformLogicProps } from "./home-logic";
import "./home.scss";

export const PlatformView = (props: IPlatformLogicProps) => {
  const { goToAppointment } = props;
  return (
    <div className="platform-home">
      <div className="platform-home__head">
        <div className="platform-home__head__title">¿Qué quieres hacer?</div>
        <div className="platform-home__head__subtitle">
          Selecciona una tarjeta
        </div>
      </div>

      <div className="platform-home__container-cards">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((value) => (
          <div key={value}>
            <ButtonUI
              id={value.toString()}
              type="primary"
              size="large"
              text="Citas"
              onClick={goToAppointment}
              className="platform-home__container-cards__card"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
