import { useState } from "react";
import { PlatformView } from "./home-view";
import { IFilterDTO } from "@/bus/core/interfaces/i-filter-dto";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/core/routes/routes";

export interface IPlatformLogicProps {
  showDrawer: () => void;
  onClose: () => void;
  onSubmit: (data: IFilterDTO[]) => void;
  open: boolean;
  goToAppointment: () => void
}

export const PlatformLogic = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onSubmit = (data: IFilterDTO[]) => {
    console.log("datos", data);
  };

  const goToAppointment = () => {
    navigate(ROUTES.APPOINTMENT_HOME);
  };

  const props: IPlatformLogicProps = {
    showDrawer,
    onClose,
    onSubmit,
    open,
    goToAppointment
  };

  return <PlatformView {...props} />;
};

export default PlatformLogic;
