import { useState } from "react";
import { PlatformView } from "./home-view";
import { IFilterDTO } from "@/bus/core/interfaces/i-filter-dto";

export interface IPlatformLogicProps {
  showDrawer: () => void;
  onClose: () => void;
  onSubmit: (data: IFilterDTO[]) => void;
  open: boolean;
}



export const PlatformLogic = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onSubmit = (data: IFilterDTO[]) => {
    console.log("datos", data);
  };

  const props: IPlatformLogicProps = {
    showDrawer,
    onClose,
    onSubmit,
    open
  };

  return <PlatformView {...props} />;
};

export default PlatformLogic;
