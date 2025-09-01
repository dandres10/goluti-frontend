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
import { IDataSourceDTO, MenuHomeUI } from "../menu-home-ui/menu-home-ui";
import { useNavigate } from "react-router-dom";
import { InjectionEventFacade } from "@/bus/facade/event/injection/injection-event-facade";
import { MenuToolsUI } from "../menu-tools/menu-tools";
import { ROUTES } from "@/core/routes/routes";
import { IPlatformConfigurationDTO } from "@/bus/domain/models/redux/bus/platform/i-platform-configuration-dto";
import { capitalizeWords } from "@/bus/core/functions/capitalize-word";
import { KEYS_SESSION_ENUM } from "@/bus/core/enums/keys-session-enum";
import { IUiReduxDTO } from "@/bus/domain/models/redux/bus/ui/i-ui-redux-dto";
import { InjectionSessionFacade } from "@/bus/facade/session/injection/injection-session-facade";
import { ILocationDTO } from "@platform/domain/models/apis/platform/entities/location";
import { IPlatformUpdateDTO } from "@/platform/domain/models/apis/platform/entities/platform";
import { ICONS } from "../../icons/icons";
import { InjectionReduxFacade } from "@/bus/facade/redux";
import { useSelector } from "react-redux";
import { IMenuReduxDTO } from "@/bus/domain/models/redux/bus/platform";

const _uIEventFacade = InjectionEventFacade.UiEventFacade();

export interface INavbarUI {
  id: string;
  className?: string;
  platformConfiguration: IPlatformConfigurationDTO | undefined;
  onChangeCompany: (company: string) => Promise<ILocationDTO[] | null>;
  onUpdatePlatform: (platform: IPlatformUpdateDTO) => Promise<void>;
}

const _uISessionFacade = InjectionSessionFacade.UiSessionFacade();
const ui: IUiReduxDTO | null = _uISessionFacade.readNavbarType({
  key: KEYS_SESSION_ENUM.UI,
});

export const NavbarUI = (props: INavbarUI) => {



  const { id, className, platformConfiguration, onChangeCompany, onUpdatePlatform } = props;
  const [openMenuHome, setOpenMenuHome] = useState(false);
  const [openTools, setOpenTools] = useState(false);
  const [navbarType, setNavbarType] = useState(NAVBAR_TYPE.HOME);
  const [topIdMenu, setTopIdMenu] = useState<string | undefined>(undefined);
  const [menuPlatform, setMenuPlatform] = useState<IDataSourceDTO[]>([]);
  const fullWidth = useFullWidth();
  const navigate = useNavigate();

  const _injectionReduxFacade = InjectionReduxFacade.PlatformReduxFacade();
  const _platformSessionFacade = InjectionSessionFacade.UiSessionFacade();


  const menuPlatformByTopId: IMenuReduxDTO[] | undefined =
    _injectionReduxFacade.readMenuByTopId({
      selector: useSelector,
    }, { topId: topIdMenu ?? "" });


  useEffect(() => {
    readTopIdMenuSession();
    listenerUpdateNavbarEvent();
    listenerUpdateTopIdMenuEvent();
    const type = ui ? ui.typeNavbar : NAVBAR_TYPE.LOGIN;
    setNavbarType(type ?? NAVBAR_TYPE.LOGIN);
  }, []);

  useEffect(() => {
    setMenuPlatformByTopId();
  }, [topIdMenu]);

  const readTopIdMenuSession = () => {
    setTopIdMenu('');
    setTopIdMenu(_platformSessionFacade.readTopIdMenu({ key: KEYS_SESSION_ENUM.UI })?.topIdMenu);
  }

  const listenerUpdateNavbarEvent = () => {
    _uIEventFacade.listenerUpdateNavbarEvent((message: IUiReduxDTO) => {
      setNavbarType(message.typeNavbar ?? NAVBAR_TYPE.LOGIN);
      onCloseMenuHome();
    });
  };


  const goToMenuPlatform = (route: string) => {
    navigate(route);
    onCloseMenuHome();
  }


  const listenerUpdateTopIdMenuEvent = () => {
    _uIEventFacade.listenerUpdateTopIdMenuEvent((message: IUiReduxDTO) => {
      if (!message?.topIdMenu) return;
      console.log("message topIdMenu", message);
      setTopIdMenu(message?.topIdMenu);
    });
  };

  const setMenuPlatformByTopId = () => {
    if (!menuPlatformByTopId?.length) return;
    let buildMenuPlatform: IDataSourceDTO[] = [];
    buildMenuPlatform.push({
      id: "Dashboard",
      value: "Dashboard",
      label: "Dashboard",
      route: ROUTES.PLATFORM_HOME,
      icon: ICONS['home'],
      goTo: (route: string) => {
        goToMenuPlatform(route);
        setMenuPlatform([]);
        setTopIdMenu(undefined);
        _uIEventFacade.dispatchUpdateTopIdMenuEvent({ topIdMenu: '' });
      },
    });
    menuPlatformByTopId?.forEach((item) => {
      buildMenuPlatform.push({
        id: item.id,
        value: item.name,
        label: item.label,
        route: item.route,
        icon: ICONS[item.icon as keyof typeof ICONS],
        goTo: (route: string) => {
          goToMenuPlatform(route);
        },
      });
    });


    setMenuPlatform(buildMenuPlatform);
  };


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

  const getCurrentLocation = () => {
    const companyName = platformConfiguration?.companies?.find(
      (company) => company.id === platformConfiguration?.company_id
    )?.name;
    const locationName = platformConfiguration?.locations?.find(
      (location) => location.id === platformConfiguration?.location_id
    )?.name;
    return `${capitalizeWords(companyName ?? "")} - ${capitalizeWords(
      locationName ?? ""
    )}`;
  };

  return (
    <div id={id} className={`${className} navbar-ui`}>
      <div className="navbar-ui__start">
        {[NAVBAR_TYPE.HOME].includes(navbarType) && fullWidth < 800 ? (
          <ButtonUI
            id="button-menu-core"
            type="text"
            size="large"
            onClick={showDrawer}
            className="navbar-ui__start__menu"
            icon={<MenuOutlined style={{ fontSize: "20px" }} />}
          />
        ) : null}

        {[NAVBAR_TYPE.LOGIN].includes(navbarType) ? (
          <ButtonUI
            id="hv-button-back"
            className="navbar-ui__start__back"
            color="default"
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => handleBack()}
          />
        ) : null}

        {[NAVBAR_TYPE.PLATFORM].includes(navbarType) && menuPlatform.length > 0 ? (
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
        {[NAVBAR_TYPE.HOME].includes(navbarType) ? (
          <div className="navbar-ui__center__menu">
            <div className="navbar-ui__center__menu__item--selected">
              Inicio
            </div>
            <div className="navbar-ui__center__menu__item">Nosotros</div>
            <div className="navbar-ui__center__menu__item">Contacto</div>
          </div>
        ) : null}
        {[NAVBAR_TYPE.PLATFORM].includes(navbarType) ? (
          <ButtonUI
            id="button-filter"
            type="text"
            size="large"
            text={getCurrentLocation()}
            onClick={showDrawerTools}
            className="navbar-ui__center__location"
            icon={<AimOutlined />}
          />
        ) : null}
      </div>
      <div className="navbar-ui__end">
        {[NAVBAR_TYPE.HOME, NAVBAR_TYPE.LOGIN].includes(navbarType) ? (
          <div>Idioma</div>
        ) : null}

        {/* {[NAVBAR_TYPE.PLATFORM].includes(props.navbarType) ? (
          <Badge className="navbar-ui__end__badge" count={99}>
            <BellOutlined style={{ fontSize: "21px" }} />
            hola
          </Badge>
        ) : null} */}

        {[NAVBAR_TYPE.PLATFORM].includes(navbarType) ? (
          <div className="navbar-ui__end__data">
            <div className="navbar-ui__end__data__title">Hola,</div>
            <div className="navbar-ui__end__data__text">Marlon</div>
          </div>
        ) : null}

        {[NAVBAR_TYPE.HOME].includes(navbarType) ? (
          <ButtonUI
            id="hv-button"
            className="navbar-ui__end__getinto"
            text="Ingresar"
            type="primary"
            width="5rem"
            onClick={() => handleLogin()}
          />
        ) : null}
        {[NAVBAR_TYPE.PLATFORM].includes(navbarType) ? (
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

      {[NAVBAR_TYPE.HOME].includes(navbarType) ? (<DrawerUI
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
                route: "/",
                icon: <HomeOutlined />,
              },
              {
                id: "nosotros",
                value: "Nosotros",
                label: "Nosotros",
                route: "/nosotros",
                icon: <AuditOutlined />,
              },
              {
                id: "contacto",
                value: "Contacto",
                label: "Contacto",
                route: "/contacto",
                icon: <PhoneOutlined />,
              },
            ]}
          />
        }
      />) : null}


      {[NAVBAR_TYPE.PLATFORM].includes(navbarType) && menuPlatform.length > 0 ? (<DrawerUI
        id="menu-core"
        placement="left"
        open={openMenuHome}
        onClose={onCloseMenuHome}
        component={
          <MenuHomeUI
            id="menu-core"
            close={() => onCloseMenuHome()}
            options={menuPlatform}
          />
        }
      />) : null}


      <DrawerUI
        id="drawer-tools"
        placement="right"
        onClose={onCloseTools}
        open={openTools}
        component={
          <MenuToolsUI
            id="menu-tools"
            onClose={onCloseTools}
            onChangeCompany={onChangeCompany}
            onUpdatePlatform={onUpdatePlatform}
            platformConfiguration={platformConfiguration}
            isOpen={openTools}
          />
        }
      />
    </div>
  );
};
