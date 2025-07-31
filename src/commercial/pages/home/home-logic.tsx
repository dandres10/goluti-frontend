import { CommercialView } from "./home-view";
import { useEffect, useState } from "react";
import { RightOutlined } from "@ant-design/icons";
import { FC_UI } from "@/bus/shared/ui/core/enums";
import { ColumnUI } from "@/bus/shared/ui/core/interfaces";
import useWebSocketPagination from "@/bus/shared/hooks/use-websocket-pagination";

// Representa un objeto de respuesta con datos específicos de trazabilidad
export interface TraceabilityDataResponse {
  name: string;
  value: string;
}

// Representa un evento de trazabilidad, incluyendo si ha sido ejecutado y datos específicos por evento
export interface TraceabilityEventsResponse {
  id: string; // UUID en formato string
  name: string;
  code: string;
  order: number;
  event_executed: boolean;
  data_by_event: TraceabilityDataResponse[]; // Array de objetos TraceabilityDataResponse
}

// Representa la respuesta completa de trazabilidad por código, con código de rastreo, última actualización, datos y eventos
export interface DataType {
  key: string;
  tracking_code: string; // UUID en formato string
  update?: string; // Opcional, representa la última actualización
  data: TraceabilityDataResponse[]; // Array de objetos TraceabilityDataResponse
  events: TraceabilityEventsResponse[]; // Array de objetos TraceabilityEventsResponse
}

export interface ICommercialLogicProps {
  columns: ColumnUI[];
  hasData: boolean;
  data: DataType[];
  onChangeTable: (dataSourceTable: any) => void;
  connectionStatus: any;
  handlePageChange: (pagination: any) => void;
}

/* const url =
  "wss://api-platform-qa.goluti.com/user/traceability_by_code_websocket?language=es&company_id=1f9a2dd5-2cf6-4350-b3d1-10dc4e8ba730&traceability_code=ONBOARDING&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xfaWQiOiJiMmYyMTJlYi0xOGMyLTQyNjAtOTIyMy04OTc2ODUwODY5MDQiLCJyb2xfY29kZSI6IkFETUlOIiwicGVybWlzc2lvbnMiOlsiVVBEQVRFIiwiUkVBRCIsIkRFTEVURSIsIlNBVkUiLCJMSVNUIiwiSE9NRSJdLCJkYXRlIjoiMjAyNC0xMS0wOCAwMDozNjo1NS43MDk3NTErMDA6MDAifQ.AP_iVX5f_4Ul-w-oV8woM_imn2m83dx-QFjE7VP0EDY"; */
const url =
  "ws://localhost:8002/tracking-manager/traceability_by_code_websocket?language=es&company_id=1f9a2dd5-2cf6-4350-b3d1-10dc4e8ba730&traceability_code=ONBOARDING&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xfaWQiOiJiMmYyMTJlYi0xOGMyLTQyNjAtOTIyMy04OTc2ODUwODY5MDQiLCJyb2xfY29kZSI6IkFETUlOIiwicGVybWlzc2lvbnMiOlsiVVBEQVRFIiwiUkVBRCIsIkRFTEVURSIsIlNBVkUiLCJMSVNUIiwiSE9NRSJdLCJkYXRlIjoiMjAyNC0xMS0wOCAwMDozNjo1NS43MDk3NTErMDA6MDAifQ.AP_iVX5f_4Ul-w-oV8woM_imn2m83dx-QFjE7VP0EDY";

export const CommercialLogic = () => {
  const { data, connectionStatus, updatePagination } = useWebSocketPagination(
    url,
    2,
    0
  );

  const [hasData, setHasData] = useState<boolean>(false);

  const goToRouter = (value: DataType) => {
    console.log(value);
  };

  const handlePageChange = (pagination: any) => {
    updatePagination(pagination.limit, pagination.offset);
  };

  const buildAction = (value: DataType) => {
    const styles = {
      color: "var(--Secondary-6)",
      fontSize: "16px",
      cursor: "pointer",
    };
    return (
      <RightOutlined
        onClick={() => goToRouter(value)}
        key={78}
        style={styles}
      />
    );
  };

  const columns: ColumnUI[] = [
    {
      key: "action",
      align: "center",
      width: 3,
      fixed: "left",
      FC: FC_UI.FREE,
    },
    {
      key: "clientes",
      title: "Clientes",
      align: "left",
      width: 60,
      FC: FC_UI.TEXT_UI,
      dataSource: {
        id: (item: DataType) => item.tracking_code,
        text: (item: DataType) => item.tracking_code,
      },
    },
    {
      key: "mail_registration",
      title: "Mail Registration",
      align: "start",
      dataIndex: "events",
      width: 30,
      FC: FC_UI.BADGE_UI,
      dataSource: {
        id: (item: DataType) => item.tracking_code,
        text: (item: DataType) => {
          return item.events[0].event_executed ? "completed" : "-";
        },
        status: (item: DataType) => {
          return item.events[0].event_executed ? "success" : "default";
        },
      },
    },
    {
      key: "opening_link",
      title: "Opening Link",
      align: "start",
      dataIndex: "events",
      width: 30,
      FC: FC_UI.BADGE_UI,
      dataSource: {
        id: (item: DataType) => item.tracking_code,
        text: (item: DataType) => {
          return item.events[1].event_executed ? "completed" : "-";
        },
        status: (item: DataType) => {
          return item.events[1].event_executed ? "success" : "default";
        },
      },
    },
    {
      key: "company_contact_information",
      title: "Company information",
      align: "start",
      dataIndex: "events",
      width: 30,
      FC: FC_UI.BADGE_UI,
      dataSource: {
        id: (item: DataType) => item.tracking_code,
        text: (item: DataType) => {
          return item.events[2].event_executed ? "completed" : "-";
        },
        status: (item: DataType) => {
          return item.events[2].event_executed ? "success" : "default";
        },
      },
    },
    {
      key: "nit_validation",
      title: "Nit validation",
      align: "start",
      dataIndex: "events",
      width: 30,
      FC: FC_UI.BADGE_UI,
      dataSource: {
        id: (item: DataType) => item.tracking_code,
        text: (item: DataType) => {
          return item.events[3].event_executed ? "completed" : "-";
        },
        status: (item: DataType) => {
          return item.events[3].event_executed ? "success" : "default";
        },
      },
    },
    {
      key: "data_processing",
      title: "Data processing",
      align: "start",
      dataIndex: "events",
      width: 30,
      FC: FC_UI.BADGE_UI,
      dataSource: {
        id: (item: DataType) => item.tracking_code,
        text: (item: DataType) => {
          return item.events[4].event_executed ? "completed" : "-";
        },
        status: (item: DataType) => {
          return item.events[4].event_executed ? "success" : "default";
        },
      },
    },
    {
      key: "metamap_flow",
      title: "Metamap",
      align: "start",
      dataIndex: "events",
      width: 30,
      FC: FC_UI.BADGE_UI,
      dataSource: {
        id: (item: DataType) => item.tracking_code,
        text: (item: DataType) => {
          return item.events[5].event_executed ? "completed" : "-";
        },
        status: (item: DataType) => {
          return item.events[5].event_executed ? "success" : "default";
        },
      },
    },
    {
      key: "create_password",
      title: "Password",
      align: "start",
      dataIndex: "events",
      width: 30,
      FC: FC_UI.BADGE_UI,
      dataSource: {
        id: (item: DataType) => item.tracking_code,
        text: (item: DataType) => {
          return item.events[6].event_executed ? "completed" : "-";
        },
        status: (item: DataType) => {
          return item.events[6].event_executed ? "success" : "default";
        },
      },
    },
    {
      key: "action_button",
      align: "center",
      width: 15,
      fixed: "right",
      FC: FC_UI.ACTION,
      dataSource: {
        id: (item: DataType) => item.tracking_code,
        build: (item: DataType) => buildAction(item),
      },
    },
  ];

  useEffect(() => {
    setHasData(!!data?.length);
  }, [data]);

  const onChangeTable = (dataSourceTable: any) => {
    console.log(dataSourceTable);
  };

  const props: ICommercialLogicProps = {
    columns,
    data,
    hasData,
    onChangeTable,
    connectionStatus,
    handlePageChange,
  };

  return <CommercialView {...props} />;
};

export default CommercialLogic;
