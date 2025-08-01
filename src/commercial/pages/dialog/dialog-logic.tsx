import { DialogView } from "./dialog-view";
import { useEffect, useState } from "react";
import { RightOutlined } from "@ant-design/icons";
import { FC_UI } from "@/bus/shared/ui/core/enums";
import { ColumnUI } from "@/bus/shared/ui/core/interfaces";
import useWebSocketPagination from "@/bus/shared/hooks/use-websocket-pagination";


export interface DialogEventsResponse {
  id: string; // UUID del mensaje
  chat_id: string; // UUID del chat
  order: number; // Orden del mensaje en la conversación
  rol: string; // Rol del emisor (assistant, user, etc.)
  content: string; // Contenido del mensaje
  created_date: string; // Fecha de creación en formato ISO
  updated_date: string; // Fecha de última actualización en formato ISO
}


// Representa la respuesta completa de trazabilidad por código, con código de rastreo, última actualización, datos y eventos
export interface DataType {
  id: string; // UUID del mensaje
  chat_id: string; // UUID del chat
  order: number; // Orden del mensaje en la conversación
  rol: string; // Rol del emisor (assistant, user, etc.)
  content: string; // Contenido del mensaje
  created_date: string; // Fecha de creación en formato ISO
  updated_date: string; // Fecha de última actualización en formato ISO
}

export interface ICommercialLogicProps {
  columns: ColumnUI[];
  hasData: boolean;
  data: DataType[];
  onChangeTable: (dataSourceTable: any) => void;
  connectionStatus: any;
  handlePageChange: (pagination: any) => void;
}

//TODO: Cambiar a la url de producción el "ws" se usa cuando es http y "wss" cuando es https
const url =
  "ws://backend-chat-prod-env.eba-u59rr9y2.us-east-1.elasticbeanstalk.com/dialog/dialog-by-chat-id-websocket?language=es&chat_id=9b8812ba-5342-4a75-887d-3c3f1873b183&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xfaWQiOiJiMmYyMTJlYi0xOGMyLTQyNjAtOTIyMy04OTc2ODUwODY5MDQiLCJyb2xfY29kZSI6IkFETUlOIiwicGVybWlzc2lvbnMiOlsiVVBEQVRFIiwiUkVBRCIsIkRFTEVURSIsIlNBVkUiLCJMSVNUIiwiSE9NRSJdLCJkYXRlIjoiMjAyNC0xMS0wOCAwMDozNjo1NS43MDk3NTErMDA6MDAifQ.AP_iVX5f_4Ul-w-oV8woM_imn2m83dx-QFjE7VP0EDY";
/* const url =
  "ws://localhost:8003/dialog/dialog-by-chat-id-websocket?language=es&chat_id=9b8812ba-5342-4a75-887d-3c3f1873b183&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xfaWQiOiJiMmYyMTJlYi0xOGMyLTQyNjAtOTIyMy04OTc2ODUwODY5MDQiLCJyb2xfY29kZSI6IkFETUlOIiwicGVybWlzc2lvbnMiOlsiVVBEQVRFIiwiUkVBRCIsIkRFTEVURSIsIlNBVkUiLCJMSVNUIiwiSE9NRSJdLCJkYXRlIjoiMjAyNC0xMS0wOCAwMDozNjo1NS43MDk3NTErMDA6MDAifQ.AP_iVX5f_4Ul-w-oV8woM_imn2m83dx-QFjE7VP0EDY"; */

export const DialogLogic = () => {
  const { data, connectionStatus, updatePagination } = useWebSocketPagination(
    url,
    10,
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
        key={79}
        style={styles}
      />
    );
  };

  const columns: ColumnUI[] = [
    {
      key: "action_f",
      align: "center",
      width: 3,
      fixed: "left",
      FC: FC_UI.FREE,
    },
    {
      key: "id",
      title: "ID",
      align: "left",
      width: 20,
      FC: FC_UI.TEXT_UI,
      dataSource: {
        id: (item: DataType) => item.id,
        text: (item: DataType) => item.id,
      },
    },
    {
      key: "chat_id",
      title: "Chat ID",
      align: "left",
      width: 20,
      FC: FC_UI.TEXT_UI,
      dataSource: {
        id: (item: DataType) => item.chat_id,
        text: (item: DataType) => item.chat_id,
      },
    },
    {
      key: "order",
      title: "Orden",
      align: "center",
      width: 10,
      FC: FC_UI.TEXT_UI,
      dataSource: {
        id: (item: DataType) => item.order.toString(),
        text: (item: DataType) => item.order.toString(),
      },
    },
    {
      key: "rol",
      title: "Rol",
      align: "center",
      width: 15,
      FC: FC_UI.BADGE_UI,
      dataSource: {
        id: (item: DataType) => item.rol,
        text: (item: DataType) => item.rol,
        status: (item: DataType) => {
          return item.rol === "assistant" ? "success" : "default";
        },
      },
    },
    {
      key: "content",
      title: "Contenido",
      align: "left",
      width: 40,
      FC: FC_UI.TEXT_UI,
      dataSource: {
        id: (item: DataType) => item.content,
        text: (item: DataType) => item.content,
      },
    },
    {
      key: "created_date",
      title: "Fecha Creación",
      align: "center",
      width: 20,
      FC: FC_UI.TEXT_UI,
      dataSource: {
        id: (item: DataType) => item.created_date,
        text: (item: DataType) => new Date(item.created_date).toLocaleString(),
      },
    },
    {
      key: "updated_date",
      title: "Última Actualización",
      align: "center",
      width: 20,
      FC: FC_UI.TEXT_UI,
      dataSource: {
        id: (item: DataType) => item.updated_date,
        text: (item: DataType) => new Date(item.updated_date).toLocaleString(),
      },
    },
    {
      key: "action_button",
      align: "center",
      width: 15,
      fixed: "right",
      FC: FC_UI.ACTION,
      dataSource: {
        id: (item: DataType) => item.id,
        build: (item: DataType) => buildAction(item),
      },
    },
  ];

  useEffect(() => {
    setHasData(!!data?.length);
  }, [data]);

  // Agregar key única a cada elemento de datos para Ant Design Table
  const dataWithKeys = data?.map((item: DataType) => ({
    ...item,
    key: item.id // Usar el id del mensaje como key única
  })) || [];

  const onChangeTable = (dataSourceTable: any) => {
    console.log(dataSourceTable);
  };

  const props: ICommercialLogicProps = {
    columns,
    data: dataWithKeys, // Usar los datos con keys únicas
    hasData,
    onChangeTable,
    connectionStatus,
    handlePageChange,
  };

  return <DialogView {...props} />;
};

export default DialogLogic;
