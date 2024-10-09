import { useState } from "react";
import "./navbar-ui.scss";
import { NavbarType } from "@/bus/shared/enums";
import { ButtonUI, SelectUI } from "@/bus/shared/ui/atoms/index";
import {
  AppstoreOutlined,
  AuditOutlined,
  BellOutlined,
  HomeOutlined,
  MenuOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Avatar, Badge } from "antd";
import { DrawerUI } from "@bus/shared/ui/molecules/index";
import { useFullWidth } from "@bus/shared/hooks";
import { MenuHomeUI } from "../menu-home-ui/menu-home-ui";
import { useNavigate } from "react-router-dom";

export interface INavbarUI {
  id: string;
  navbarType: NavbarType;
  className?: string;
  /*   navigate?: any; */
}

/**
 * Functional component that renders a select component.
 *
 * @param {ISelectUI} props - The props for the component.
 * @returns {JSX.Element} The rendered select component.
 */
export const NavbarUI = (props: INavbarUI) => {
  const [openMenuHome, setOpenMenuHome] = useState(false);
  const fullWidth = useFullWidth();
  const navigate = useNavigate();

  const showDrawer = () => {
    setOpenMenuHome(true);
  };

  const onCloseMenuHome = () => {
    setOpenMenuHome(false);
  };
  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div id="home-view__navbar" className={`${props.className} navbar-ui`}>
      <div className="navbar-ui__start">
        {[NavbarType.HOME].includes(props.navbarType) && fullWidth < 800 ? (
          <MenuOutlined
            className="navbar-ui__start__menu"
            onClick={showDrawer}
          />
        ) : null}

        {[NavbarType.DASHBOARD].includes(props.navbarType) ? (
          <MenuOutlined
            className="navbar-ui__start__menu"
            onClick={showDrawer}
          />
        ) : null}

        <div className="navbar-ui__start__title-company">
          <div className="navbar-ui__start__title-company__initial">Go</div>
          <div>luti</div>
        </div>
      </div>
      <div className="navbar-ui__center">
        {[NavbarType.HOME].includes(props.navbarType) ? (
          <div className="navbar-ui__center__menu">
            <div className="navbar-ui__center__menu__item--selected">
              Inicio
            </div>
            <div className="navbar-ui__center__menu__item">Nosotros</div>
            <div className="navbar-ui__center__menu__item">Contacto</div>
          </div>
        ) : null}
      </div>
      <div className="navbar-ui__end">
        {[NavbarType.HOME].includes(props.navbarType) ? (
          <SelectUI
            id="hv-select-language"
            width="6rem"
            variant="borderless"
            className="navbar-ui__end__language"
            defaultValue="es"
            options={[
              { value: "es", label: "Español" },
              { value: "en", label: "Ingles" },
            ]}
          />
        ) : null}

        {[NavbarType.DASHBOARD].includes(props.navbarType) ? (
          <Badge className="navbar-ui__end__badge" count={99}>
            <BellOutlined style={{ fontSize: "21px" }} />
          </Badge>
        ) : null}

        {[NavbarType.DASHBOARD].includes(props.navbarType) ? (
          <div className="navbar-ui__end__data">
            <div className="navbar-ui__end__data__text">Hola, Marlon León</div>
          </div>
        ) : null}

        {[NavbarType.HOME].includes(props.navbarType) ? (
          <ButtonUI
            id="hv-button"
            className="navbar-ui__end__getinto"
            text="Ingresar"
            type="primary"
            width="5rem"
            onClick={() => handleLogin()}
          />
        ) : null}
        {[NavbarType.DASHBOARD].includes(props.navbarType) ? (
          <Avatar
            style={{ backgroundColor: "var(--primary-main)" }}
            size={34}
            icon={<AppstoreOutlined />}
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
    </div>
  );
};
