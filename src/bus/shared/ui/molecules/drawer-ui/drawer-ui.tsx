import { ConfigProvider, Drawer } from "antd";
import "./drawer-ui.scss";
import { configAnt } from "@/bus/shared/lib/ant";

export interface IDrawerUI {
  title?: string;
  placement: any;
  onClose: any;
  open: boolean;
  id: string;
}

/**
 * Functional component that renders a select component.
 *
 * @param {ISelectUI} props - The props for the component.
 * @returns {JSX.Element} The rendered select component.
 */
export const DrawerUI = (props: IDrawerUI) => {
  const { title, placement, onClose, open, id } = props;

  

  return (
    <ConfigProvider theme={configAnt}>
      <Drawer
        title={title}
        placement={placement}
        closable={false}
        onClose={onClose}
        open={open}
        key={id}
      >
        
      </Drawer>
    </ConfigProvider>
  );
};
