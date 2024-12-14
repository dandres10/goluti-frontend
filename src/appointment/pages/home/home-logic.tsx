import { useState } from "react";
import { AppointmentView } from "./home-view";
import { MenuProps } from "antd";
import { CONDITION_TYPE_ENUM } from "@/bus/core/enums/condition-type-enum";
import { CONDITION_VALUE } from "@/appointment/core/enums/condition-type-enum";
import { IConditionTypeDTO } from "@/appointment/core/interfaces/i-condition-type-dto";
import { IFilterDTO } from "@/bus/core/interfaces/i-filter-dto";

export interface IAppointmentLogicProps {
  showDrawer: () => void;
  onClose: () => void;
  onSubmit: (data: IFilterDTO[]) => void;
  open: boolean;
  conditions: any[];
  items: MenuProps;
}

const items: MenuProps = {
  items: [
    { label: "Correo colaborador", key: "email_collaboration" },
    { label: "Correo client", key: "email_client" }
  ],
};





const conditions = [
  {
    id: "email_collaboration",
    value: "Correo colaborador",
  },
  {
    id: "email_client",
    value: "Correo cliente",
  },
];

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
    open,
    conditions,
    items
  };

  return <AppointmentView {...props} />;
};

export default AppointmentLogic;
