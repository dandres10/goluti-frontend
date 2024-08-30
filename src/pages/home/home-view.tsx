import { PropsHomeLogic } from "@pages/home/home-logic";
import { ButtonUI, SelectUI } from "@bus/shared/ui/atoms/index";
import "@pages/home/home.scss";
import { DrawerUI } from "@/bus/shared/ui/molecules";
import { useState } from "react";
import { BellOutlined, MenuOutlined } from "@ant-design/icons";
import { Badge } from "antd";

export const HomeView = (props: PropsHomeLogic) => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div id="home-view" className="home-view">
      <div id="home-view__navbar" className="home-view__navbar">
        <div className="home-view__navbar__start">
          <MenuOutlined
            className="home-view__navbar__start__menu"
            onClick={showDrawer}
          />
          <div className="home-view__navbar__start__title-company">
            <div className="home-view__navbar__start__title-company__initial">
              Go
            </div>
            <div>luti</div>
          </div>
        </div>
        <div className="home-view__navbar__center">
          <div className="home-view__navbar__center__item--selected">
            Inicio
          </div>
          <div className="home-view__navbar__center__item">Nosotros</div>
          <div className="home-view__navbar__center__item">Contacto</div>
        </div>
        <div className="home-view__navbar__end">
          <SelectUI
            id="hv-select-language"
            width="6rem"
            variant="borderless"
            defaultValue="es"
            options={[
              { value: "es", label: "Español" },
              { value: "en", label: "Ingles" },
            ]}
          />

          <Badge className="home-view__navbar__end__badge" count={99}>
            <BellOutlined style={{ fontSize: "23px" }} />
          </Badge>

          <ButtonUI
            id="hv-button"
            text="Ingresar"
            type="primary"
            width="5rem"
          />
        </div>
      </div>

      {/* <SelectUI
        id="hv-select"
        width="4rem"
        defaultValue="jack"
        options={[
          { value: "jack", label: "Jack" },
          { value: "lucy", label: "Lucy" },
          { value: "Yiminghe", label: "yiminghe" },
          { value: "disabled", label: "Disabled", disabled: true },
        ]}
      /> */}
      <DrawerUI id="hv-drawer" placement="left" open={open} onClose={onClose} />
    </div>
  );
};
