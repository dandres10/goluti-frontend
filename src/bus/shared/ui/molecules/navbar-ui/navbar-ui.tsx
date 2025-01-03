import { useEffect, useState } from "react";
import "./navbar-ui.scss";
import { NAVBAR_TYPE } from "@/bus/shared/enums";
import { ButtonUI } from "@/bus/shared/ui/atoms/index";
import {
  AimOutlined,
  AppstoreOutlined,
  ArrowLeftOutlined,
  AuditOutlined,
  HomeOutlined,
  MenuOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { DrawerUI } from "@bus/shared/ui/molecules/index";
import { useFullWidth } from "@bus/shared/hooks";
import { MenuHomeUI } from "../menu-home-ui/menu-home-ui";
import { useNavigate } from "react-router-dom";
import { InjectionEventFacade } from "@/bus/facade/event/injection/injection-event-facade";
import { MenuToolsUI } from "../menu-tools/menu-tools";
import { ROUTES } from "@/core/routes/routes";

const _uIEventFacade = InjectionEventFacade.UiEventFacade();

export interface INavbarUI {
  id: string;
  navbarType: NAVBAR_TYPE;
  className?: string;
}

export const NavbarUI = (props: INavbarUI) => {
  const [openMenuHome, setOpenMenuHome] = useState(false);
  const [openTools, setOpenTools] = useState(false);
  const fullWidth = useFullWidth();
  const navigate = useNavigate();



  const showDrawer = () => {
    setOpenMenuHome(true);
  };
  const showDrawerTools = () => {
    setOpenTools(true);
  };

  const onCloseMenuHome = () => {
    setOpenMenuHome(false);
  };
  const onCloseTools = () => {
    setOpenTools(false);
  };
  const handleLogin = () => {
    navigate(ROUTES.ONBOARDING_LOGIN);
    _uIEventFacade.dispatchUpdateNavbarEvent({ typeNavbar: NAVBAR_TYPE.LOGIN });
  };
  const handleBack = () => {
    navigate(ROUTES.WELCOME_HOME);
    _uIEventFacade.dispatchUpdateNavbarEvent({ typeNavbar: NAVBAR_TYPE.HOME });
  };

  return (
    <div id="home-view__navbar" className={`${props.className} navbar-ui`}>
      <div className="navbar-ui__start">
        {[NAVBAR_TYPE.HOME].includes(props.navbarType) && fullWidth < 800 ? (
          <ButtonUI
            id="button-menu-core"
            type="text"
            size="large"
            onClick={showDrawer}
            className="navbar-ui__start__menu"
            icon={<MenuOutlined style={{ fontSize: "20px" }} />}
          />
        ) : null}

        {[NAVBAR_TYPE.LOGIN].includes(props.navbarType) ? (
          <ButtonUI
            id="hv-button-back"
            className="navbar-ui__start__back"
            color="default"
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => handleBack()}
          />
        ) : null}

        {[NAVBAR_TYPE.PLATFORM].includes(props.navbarType) ? (
          <ButtonUI
            id="button-menu-core"
            type="text"
            size="large"
            onClick={showDrawer}
            className="navbar-ui__start__menu"
            icon={<MenuOutlined style={{ fontSize: "20px" }} />}
          />
        ) : null}

        <div className="navbar-ui__start__title-company">
          <div className="navbar-ui__start__title-company__initial">Go</div>
          <div>luti</div>
        </div>
      </div>
      <div className="navbar-ui__center">
        {[NAVBAR_TYPE.HOME].includes(props.navbarType) ? (
          <div className="navbar-ui__center__menu">
            <div className="navbar-ui__center__menu__item--selected">
              Inicio
            </div>
            <div className="navbar-ui__center__menu__item">Nosotros</div>
            <div className="navbar-ui__center__menu__item">Contacto</div>
          </div>
        ) : null}
        {[NAVBAR_TYPE.PLATFORM].includes(props.navbarType) ? (
          <ButtonUI
            id="button-filter"
            type="text"
            size="large"
            text="Barbeer - Suba"
            onClick={showDrawerTools}
            className="navbar-ui__center__location"
            icon={<AimOutlined />}
          />
        ) : null}
      </div>
      <div className="navbar-ui__end">
        {[NAVBAR_TYPE.HOME, NAVBAR_TYPE.LOGIN].includes(props.navbarType) ? (
          <div>Idioma</div>
        ) : null}

        {/* {[NAVBAR_TYPE.PLATFORM].includes(props.navbarType) ? (
          <Badge className="navbar-ui__end__badge" count={99}>
            <BellOutlined style={{ fontSize: "21px" }} />
            hola
          </Badge>
        ) : null} */}

        {[NAVBAR_TYPE.PLATFORM].includes(props.navbarType) ? (
          <div className="navbar-ui__end__data">
            <div className="navbar-ui__end__data__title">Hola,</div>
            <div className="navbar-ui__end__data__text">Marlon</div>
          </div>
        ) : null}

        {[NAVBAR_TYPE.HOME].includes(props.navbarType) ? (
          <ButtonUI
            id="hv-button"
            className="navbar-ui__end__getinto"
            text="Ingresar"
            type="primary"
            width="5rem"
            onClick={() => handleLogin()}
          />
        ) : null}
        {[NAVBAR_TYPE.PLATFORM].includes(props.navbarType) ? (
          <ButtonUI
            id="button-filter"
            type="text"
            size="large"
            className="navbar-ui__end__button-config"
            onClick={showDrawerTools}
            icon={<AppstoreOutlined style={{ fontSize: "20px" }} />}
          />
        ) : null}
      </div>
      <DrawerUI
        id="menu-core"
        placement="left"
        open={openMenuHome}
        onClose={onCloseMenuHome}
        component={
          <MenuHomeUI
            id="menu-core"
            close={() => onCloseMenuHome()}
            options={[
              {
                id: "inicio",
                value: "Inicio",
                label: "Inicio",
                selected: true,
                icon: <HomeOutlined />,
              },
              {
                id: "nosotros",
                value: "Nosotros",
                label: "Nosotros",
                icon: <AuditOutlined />,
              },
              {
                id: "contacto",
                value: "Contacto",
                label: "Contacto",
                icon: <PhoneOutlined />,
              },
            ]}
          />
        }
      />
      <DrawerUI
        id="drawer-tools"
        placement="right"
        onClose={onCloseTools}
        open={openTools}
        component={<MenuToolsUI id="menu-tools" onClose={onCloseTools} />}
      />
    </div>
  );
};
