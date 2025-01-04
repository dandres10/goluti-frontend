import {
  InstagramFilled,
  LinkedinFilled,
  YoutubeFilled,
} from "@ant-design/icons";
import "@bus/shared/ui/molecules/footer-home-ui/footer-home-ui.scss";
import { LinkUI } from "@bus/shared/ui/atoms/index";
import { useEffect, useState } from "react";
import { NAVBAR_TYPE } from "@/bus/shared/enums";
import { InjectionSessionFacade } from "@/bus/facade/session/injection/injection-session-facade";
import { IUiReduxDTO } from "@/bus/domain/models/redux/bus/ui/i-ui-redux-dto";
import { KEYS_SESSION_ENUM } from "@/bus/core/enums/keys-session-enum";
import { InjectionEventFacade } from "@/bus/facade/event/injection/injection-event-facade";

export interface IFooterHomeUI {
  id: string;
}
const _uISessionFacade = InjectionSessionFacade.UiSessionFacade();
const ui: IUiReduxDTO | null = _uISessionFacade.readNavbarType({
  key: KEYS_SESSION_ENUM.UI,
});
const _uIEventFacade = InjectionEventFacade.UiEventFacade();

export const FooterHomeUI = (props: IFooterHomeUI) => {
  const { id } = props;
  const [navbarType, setNavbarType] = useState(
    ui ? ui.typeNavbar : NAVBAR_TYPE.HOME
  );
  useEffect(() => {
    listenerUpdateNavbarEvent();
    const type = ui ? ui.typeNavbar : NAVBAR_TYPE.HOME;
    setNavbarType(type);
  }, []);

  const listenerUpdateNavbarEvent = () => {
    _uIEventFacade.listenerUpdateNavbarEvent((message: IUiReduxDTO) => {
      setNavbarType(message.typeNavbar);
    });
  };

  return (
    navbarType &&
    [NAVBAR_TYPE.HOME].includes(navbarType) && (
      <footer key={id} className="footer-home">
        <div className="footer-home__start">
          <div className="footer-home__start__title-company">
            <div className="footer-home__start__title-company__initial">Go</div>
            <div>luti</div>
          </div>
          <div className="footer-home__start__networks">
            <LinkedinFilled />
            <InstagramFilled />
            <YoutubeFilled className="footer-home__start__networks__youtube" />
          </div>
        </div>

        <div className="footer-home__policies">
          <strong className="footer-home__policies__title">Politicas</strong>
          <LinkUI
            id="pd"
            text="Protección de datos"
            className="footer-home__policies__item"
          />
          <LinkUI
            id="pd"
            text="Política de seguridad"
            className="footer-home__policies__item"
          />
          <LinkUI
            id="pd"
            text="Términos y condiciones"
            className="footer-home__policies__item"
          />
        </div>

        <div className="footer-home__we">
          <strong className="footer-home__we__title">Nosotros</strong>
          <LinkUI
            id="pd"
            text="¿Quienes somos?"
            className="footer-home__we__item"
          />
          <LinkUI
            id="pd"
            text="Te explicamos"
            className="footer-home__we__item"
          />
        </div>
      </footer>
    )
  );
};
