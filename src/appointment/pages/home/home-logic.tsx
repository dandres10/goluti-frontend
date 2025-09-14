import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AppointmentView } from "./home-view";
import { IFilterDTO } from "@/bus/core/interfaces/i-filter-dto";
import { InjectionAppointmentBusinessFacade } from "@/appointment/facade/apis/appointment/injection/business/injection-appointment-business-facade";
import { IAvailabilityAppointmentTableFilterManagerRequestDTO, IAvailabilityAppointmentTableResponseDTO } from "@/appointment/domain/models/apis/appointment/business/availability";
import { ColumnUI } from "@/bus/shared/ui/core/interfaces";
import { FC_UI } from "@/bus/shared/ui/core/enums";
import { IPaginationValuesUI } from "@/bus/shared/ui/molecules";
import { ButtonUI } from "@/bus/shared/ui/atoms";
import { RightOutlined } from "@ant-design/icons";


export interface IAppointmentLogicProps {
  showDrawer: () => void;
  showDrawerAction: () => void;
  onCloseAction: () => void;
  onClose: () => void;
  onSubmit: (data: IFilterDTO[]) => void;
  onChangeTable: (dataSourceTable: IAvailabilityAppointmentTableResponseDTO) => void;
  columns: ColumnUI[];
  hasData: boolean;
  open: boolean;
  data: IAvailabilityAppointmentTableResponseDTO[];
  onButtonNextDisabled: boolean;
  componentKey: number;
  openAction: boolean;
  handlePageChange: (pagination: any) => void;
}

const availabilityFacade = InjectionAppointmentBusinessFacade.AvailabilityFacade();

export const AppointmentLogic = () => {
  const [open, setOpen] = useState(false);
  const [openAction, setOpenAction] = useState(false);
  const [availabilityAppointment, setAvailabilityAppointment] = useState<IAvailabilityAppointmentTableResponseDTO[]>([]);
  const [hasData, setHasData] = useState<boolean>(false);
  const [onButtonNextDisabled, setOnButtonNextDisabled] = useState<boolean>(false);
  const [componentKey, setComponentKey] = useState<number>(0);


  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const showDrawerAction = () => {
    setOpenAction(true);
  };

  const onCloseAction = () => {
    setOpenAction(false);
  };

  const onSubmit = (data: IFilterDTO[]) => {
    console.log("datos", data);
  };

  const getAppointmentTable = async (skip: number = 0, limit: number = 10, filters?: IAvailabilityAppointmentTableFilterManagerRequestDTO[]) => {

    await availabilityFacade.appointmentTable({
      skip,
      limit,
      allData: false,
      filters
    }).then((response: IAvailabilityAppointmentTableResponseDTO[] | null) => {
      if (!response?.length) return;
      setOnButtonNextDisabled(response.length < 10 ? true : false);
      setAvailabilityAppointment(response || []);
      setHasData(!!response?.length);
    }).catch(() => {
      setComponentKey(prev => prev + 1);
    });
  };

  const buildAction = (value: IAvailabilityAppointmentTableResponseDTO) => {

    return (
      <ButtonUI
        id="button-action"
        type="text"
        icon={<RightOutlined />}
        onClick={() => showDrawerAction()}
      />
    );
  };

  const columns: ColumnUI[] = [
    {
      key: "free",
      align: "center",
      width: 0.2,
      fixed: "left",
      FC: FC_UI.FREE,
    },
    {
      key: "index",
      title: "ID",
      align: "left",
      fixed: true,
      width: 2,
      FC: FC_UI.TEXT_UI,
      dataSource: {
        id: (item: IAvailabilityAppointmentTableResponseDTO) => item.appointmentId,
        text: (item: IAvailabilityAppointmentTableResponseDTO) => `${item.appointmentId.slice(0, 4)}${item.appointmentId.slice(-3)}`,
      },
    },
    {
      key: "userLocationRolId",
      title: "Nombre profesional",
      align: "left",
      fixed: true,
      width: 3,
      FC: FC_UI.TEXT_UI,
      dataSource: {
        id: (item: IAvailabilityAppointmentTableResponseDTO) => item.userLocationRolId,
        text: (item: IAvailabilityAppointmentTableResponseDTO) => `${item.collaboratorFirstName} ${item.collaboratorLastName}`,
      },
    },
    {
      key: "clientId",
      title: "Nombre cliente",
      align: "left",
      width: 3,
      FC: FC_UI.TEXT_UI,
      dataSource: {
        id: (item: IAvailabilityAppointmentTableResponseDTO) => item.clientId,
        text: (item: IAvailabilityAppointmentTableResponseDTO) => `${item.clientFirstName} ${item.clientLastName}`,
      },
    },
    {
      key: "appointmentStatusId",
      title: "Estado",
      align: "left",
      width: 3,
      FC: FC_UI.BADGE_UI,
      dataSource: {
        id: (item: IAvailabilityAppointmentTableResponseDTO) => item.appointmentStatusId,
        text: (item: IAvailabilityAppointmentTableResponseDTO) => item.appointmentStatusCode === "PENDING" ? "Pendiente" : "Confirmado",
        status: (item: IAvailabilityAppointmentTableResponseDTO) => {
          return item.appointmentStatusCode === "PENDING" ? "default" : "success";
        },
      },
    },
    {
      key: "appointmentStartTotal",
      title: "Fecha cita",
      align: "left",
      width: 3,
      FC: FC_UI.TEXT_UI,
      dataSource: {
        id: (item: IAvailabilityAppointmentTableResponseDTO) => item.appointmentStart,
        text: (item: IAvailabilityAppointmentTableResponseDTO) => `${new Date(item.appointmentStart).toLocaleDateString()}`,
      },
    },
    {
      key: "appointmentStart",
      title: "Hora inicio",
      align: "left",
      width: 3,
      FC: FC_UI.TEXT_UI,
      dataSource: {
        id: (item: IAvailabilityAppointmentTableResponseDTO) => item.appointmentStart,
        text: (item: IAvailabilityAppointmentTableResponseDTO) => `${new Date(item.appointmentStart).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      },
    },
    {
      key: "appointmentEnd",
      title: "Hora fin",
      align: "left",
      width: 3,
      FC: FC_UI.TEXT_UI,
      dataSource: {
        id: (item: IAvailabilityAppointmentTableResponseDTO) => item.appointmentEnd,
        text: (item: IAvailabilityAppointmentTableResponseDTO) => `${new Date(item.appointmentEnd).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      },
    },
    {
      key: "action_button",
      align: "center",
      width: 1,
      fixed: "right",
      FC: FC_UI.ACTION,
      dataSource: {
        id: (item: IAvailabilityAppointmentTableResponseDTO) => item.appointmentId,
        build: (item: IAvailabilityAppointmentTableResponseDTO) => buildAction(item),
      },
    },
  ];


  const dataWithKeys = availabilityAppointment?.map((item: IAvailabilityAppointmentTableResponseDTO) => ({
    ...item,
    key: item.appointmentId,
  })) || [];


  const onChangeTable = (dataSourceTable: IAvailabilityAppointmentTableResponseDTO) => {
    console.log(dataSourceTable);
  };


  const handlePageChange = (pagination: IPaginationValuesUI) => {
    getAppointmentTable(pagination.offset, pagination.limit);
  };


  const props: IAppointmentLogicProps = {
    columns,
    open,
    hasData,
    openAction,
    data: dataWithKeys,
    onButtonNextDisabled,
    componentKey,
    showDrawer,
    onChangeTable,
    onClose,
    onSubmit,
    handlePageChange,
    showDrawerAction,
    onCloseAction
  };

  return <AppointmentView {...props} />;
};

export default AppointmentLogic;
