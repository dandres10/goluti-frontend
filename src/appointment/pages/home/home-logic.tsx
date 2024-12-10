import { useState } from "react";
import { AppointmentView } from "./home-view";
import { IConditionTypeDTO } from "@/appointment/core/interfaces/i-condition-type-dto";
import {
  CONDITION_TYPE,
  CONDITION_VALUE,
} from "@/appointment/core/enums/condition-type-enum";
import { MenuProps } from "antd";

export interface IAppointmentLogicProps {
  showDrawer: () => void;
  onClose: () => void;
  open: boolean;
  conditionTypes: IConditionTypeDTO[];
  conditions: any[];
  items: MenuProps;
}

const items: MenuProps = {
  items: [
    { label: "Correo colaborador", key: "email_collaboration" },
    { label: "Correo client", key: "email_client" }
  ],
};

const conditionTypes: IConditionTypeDTO[] = [
  {
    value: CONDITION_TYPE.EQUALS,
    label: CONDITION_VALUE[CONDITION_TYPE.EQUALS],
  },
  {
    value: CONDITION_TYPE.DIFFERENT_THAN,
    label: CONDITION_VALUE[CONDITION_TYPE.DIFFERENT_THAN],
  },
  {
    value: CONDITION_TYPE.GREATER_THAN,
    label: CONDITION_VALUE[CONDITION_TYPE.GREATER_THAN],
  },
  {
    value: CONDITION_TYPE.GREATER_THAN_OR_EQUAL_TO,
    label: CONDITION_VALUE[CONDITION_TYPE.GREATER_THAN_OR_EQUAL_TO],
  },
];

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

  const props: IAppointmentLogicProps = {
    showDrawer,
    onClose,
    open,
    conditionTypes,
    conditions,
    items,
  };

  return <AppointmentView {...props} />;
};

export default AppointmentLogic;
