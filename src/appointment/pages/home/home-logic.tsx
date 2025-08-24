import { useEffect, useState } from "react";
import { AppointmentView } from "./home-view";
import { IFilterDTO } from "@/bus/core/interfaces/i-filter-dto";
import { InjectionAppointmentBusinessFacade } from "@/appointment/facade/apis/appointment/injection/business/injection-appointment-business-facade";
import { IAvailabilityAppointmentTableResponseDTO } from "@/appointment/domain/models/apis/appointment/business/availability";


export interface IAppointmentLogicProps {
  showDrawer: () => void;
  onClose: () => void;
  onSubmit: (data: IFilterDTO[]) => void;
  open: boolean;
}

const availabilityFacade = InjectionAppointmentBusinessFacade.AvailabilityFacade();

export const AppointmentLogic = () => {
  const [open, setOpen] = useState(false);


  useEffect(() => {
    getAppointmentTable();
  }, []);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onSubmit = (data: IFilterDTO[]) => {
    console.log("datos", data);
  };

  const getAppointmentTable = async () => {
    await availabilityFacade.appointmentTable({
      allData: true
    }).then((response: IAvailabilityAppointmentTableResponseDTO[] | null) => {
      console.log("response", response);
    });
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
