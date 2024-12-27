import { CloseOutlined } from "@ant-design/icons";
import "@bus/shared/ui/molecules/menu-home-ui/menu-home-ui.scss";
import { ButtonUI } from "../../atoms";

export interface IDataSourceDTO {
  id: string;
  value: string;
  label: string;
  icon: React.ReactNode;
  selected?: boolean;
}

export interface IMenuHomeUI {
  id: string;
  options: IDataSourceDTO[];
  close: () => void;
}

export const MenuHomeUI = (props: IMenuHomeUI) => {
  const { options, id, close } = props;

  return (
    <div className="menu-home" key={id}>
      <div className="menu-home__head">
        <ButtonUI
          id="button-menu-core"
          type="text"
          size="large"
          onClick={() => close()}
          className="menu-home__head__close"
          icon={<CloseOutlined />}
        />
        <div className="menu-home__head__title-company">
          <div className="menu-home__head__title-company__initial">Go</div>
          <div>luti</div>
        </div>
      </div>
      {options.map((item: IDataSourceDTO) => (
        <div
          key={item.id}
          className={
            item.selected ? "menu-home__items--selected" : "menu-home__items"
          }
        >
          <div style={{ fontSize: "18px" }}>{item.icon}</div>
          <div className="menu-home__items__value">{item.value}</div>
        </div>
      ))}
    </div>
  );
};
