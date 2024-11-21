import { useState, useEffect, useCallback } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

const useWebSocketPagination = (url: string, initialLimit = 10, initialOffset = 0) => {
  const [data, setData] = useState([]);
  const [paginationParams, setPaginationParams] = useState({
    limit: initialLimit,
    offset: initialOffset,
  });


  const { sendMessage, lastMessage, readyState } = useWebSocket(url, {
    onOpen: () => {
      console.log("Conectado al WebSocket");
      handleSendMessage();
    },
    onClose: () => console.log("Desconectado del WebSocket"),
    shouldReconnect: () => true, 
  });

  
  useEffect(() => {
    if (lastMessage !== null) {
      try {
        if ("data" === lastMessage.data) return;
        const receivedData = JSON.parse(lastMessage.data); 
        setData(receivedData); 
      } catch (error) {
        console.error("Error al parsear los datos:", error);
      }
    }
  }, [lastMessage]);

  
  const handleSendMessage = useCallback(() => {
    sendMessage(JSON.stringify(paginationParams)); 
  }, [paginationParams, sendMessage]);

  
  const updatePagination = (newLimit: number, newOffset: number) => {
    setPaginationParams({ limit: newLimit, offset: newOffset });
  };

  
  useEffect(() => {
    handleSendMessage();
  }, [paginationParams, handleSendMessage]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Conectando",
    [ReadyState.OPEN]: "Conectado",
    [ReadyState.CLOSING]: "Cerrando",
    [ReadyState.CLOSED]: "Cerrado",
    [ReadyState.UNINSTANTIATED]: "No iniciado",
  }[readyState];

  return { data, connectionStatus, updatePagination };
};

export default useWebSocketPagination;