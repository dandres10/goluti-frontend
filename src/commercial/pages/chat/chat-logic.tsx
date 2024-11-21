import React, { useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

const ChatLogic = () => {
    const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
    const [input, setInput] = useState("");

    // Configura la conexión WebSocket
    const { sendMessage, lastMessage, readyState } = useWebSocket("ws://localhost:8002/tracking-manager/chat", {
        onOpen: () => console.log("Conexión WebSocket abierta"),
        onClose: () => console.log("Conexión WebSocket cerrada"),
        onError: (error) => console.error("Error en WebSocket:", error),
        shouldReconnect: (closeEvent) => true, // Reintenta la conexión automáticamente
    });

    // Maneja los mensajes entrantes
    React.useEffect(() => {
        if (lastMessage !== null) {
            setMessages((prev) => [
                ...prev,
                { sender: "ChatGPT", text: lastMessage.data },
            ]);
        }
    }, [lastMessage]);

    // Maneja el envío de mensajes
    const handleSendMessage = () => {
        if (input.trim() && readyState === ReadyState.OPEN) {
            sendMessage(input);
            setMessages((prev) => [...prev, { sender: "Tú", text: input }]);
            setInput("");
        }
    };

    // Estado de conexión
    const connectionStatus = {
        [ReadyState.CONNECTING]: "Conectando...",
        [ReadyState.OPEN]: "Conectado",
        [ReadyState.CLOSING]: "Cerrando...",
        [ReadyState.CLOSED]: "Cerrado",
        [ReadyState.UNINSTANTIATED]: "Sin conexión",
    }[readyState];

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h1>Chat con ChatGPT</h1>
            <p>Estado de conexión: {connectionStatus}</p>
            <div
                style={{
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    padding: "10px",
                    height: "300px",
                    overflowY: "auto",
                    marginBottom: "10px",
                }}
            >
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        style={{
                            textAlign: msg.sender === "Tú" ? "right" : "left",
                            marginBottom: "5px",
                        }}
                    >
                        <strong>{msg.sender}: </strong>
                        {msg.text}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                style={{ width: "80%", marginRight: "10px", padding: "5px" }}
            />
            <button onClick={handleSendMessage} style={{ padding: "5px 10px" }}>
                Enviar
            </button>
        </div>
    );
};

export default ChatLogic;