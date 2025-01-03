import { ConfigProvider, Drawer } from "antd";
import "./drawer-ui.scss";
import { configAnt } from "@/bus/shared/lib/ant";

export interface IDrawerUI {
  title?: string;
  placement: any;
  onClose: any;
  open: boolean;
  id: string;
  size?: "default" | "large" | undefined;
  component?: React.ReactNode;
}

export const DrawerUI = (props: IDrawerUI) => {
  const { title, placement, onClose, open, id, size, component } = props;

  return (
    <ConfigProvider theme={configAnt}>
      <Drawer
        title={title}
        placement={placement}
        closable={false}
        onClose={onClose}
        open={open}
        key={id}
        size={size}
      >
        {component}
      </Drawer>
    </ConfigProvider>
  );
};
