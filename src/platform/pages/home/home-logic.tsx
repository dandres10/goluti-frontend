import { useState } from "react";
import { PlatformView } from "./home-view";
import { IFilterDTO } from "@/bus/core/interfaces/i-filter-dto";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/core/routes/routes";
import { InjectionReduxFacade } from "@/bus/facade/redux";
import { useSelector } from "react-redux";
import { IMenuReduxDTO } from "@/bus/domain/models/redux/bus/platform";
import { InjectionEventFacade } from "@/bus/facade/event/injection/injection-event-facade";

export interface IPlatformLogicProps {
  showDrawer: () => void;
  onClose: () => void;
  onSubmit: (data: IFilterDTO[]) => void;
  open: boolean;
  goToAppointment: (topIdMenu: string, route: string) => void
  firstLevelMenu?: IMenuReduxDTO[]
}


const _uIEventFacade = InjectionEventFacade.UiEventFacade();


export const PlatformLogic = () => {
  const _injectionReduxFacade = InjectionReduxFacade.PlatformReduxFacade();
  const firstLevelMenu: IMenuReduxDTO[] | undefined = _injectionReduxFacade
    .readFirstLevelMenu({ selector: useSelector })?.filter((item: IMenuReduxDTO) => item.route !== ROUTES.PLATFORM_HOME);

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

  const goToAppointment = (topIdMenu: string, route: string) => {
    navigate(route);
    _uIEventFacade.dispatchUpdateTopIdMenuEvent({ topIdMenu: topIdMenu });
  };

  const props: IPlatformLogicProps = {
    showDrawer,
    onClose,
    onSubmit,
    open,
    goToAppointment,
    firstLevelMenu
  };

  return <PlatformView {...props} />;
};

export default PlatformLogic;
