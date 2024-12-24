import { useState } from "react";
import { AppointmentView } from "./home-view";
import { IFilterDTO } from "@/bus/core/interfaces/i-filter-dto";

export interface IAppointmentLogicProps {
  showDrawer: () => void;
  onClose: () => void;
  onSubmit: (data: IFilterDTO[]) => void;
  open: boolean;
}



export const AppointmentLogic = () => {
  const [open, setOpen] = useState(true);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onSubmit = (data: IFilterDTO[]) => {
    console.log("datos", data);
  };

  const props: IAppointmentLogicProps = {
    showDrawer,
    onClose,
    onSubmit,
    open
  };

  return <AppointmentView {...props} />;
};

export default AppointmentLogic;
