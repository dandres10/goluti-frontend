import React, { useState, useEffect, useRef } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

interface Message {
  sender: "user" | "assistant";
  text: string;
  audio?: string;
}

const ChatComponent = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [interactionMode, setInteractionMode] = useState<"text" | "call">(
    "text"
  );
  const [isSessionActive, setIsSessionActive] = useState(true); // Control de sesión
  const [lastProcessedMessage, setLastProcessedMessage] = useState<
    string | null
  >(null); // Control del último mensaje procesado
  const recognitionRef = useRef<any | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isAssistantSpeaking = useRef(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const { sendMessage, lastMessage, readyState } = useWebSocket(
    "ws://localhost:8002/tracking-manager/voice",
    {
      onOpen: () => console.log("WebSocket conectado"),
      onClose: () => console.log("WebSocket desconectado"),
      onError: (event) => console.error("Error en WebSocket:", event),
      shouldReconnect: () => true,
    }
  );

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Conectando...",
    [ReadyState.OPEN]: "Conectado",
    [ReadyState.CLOSING]: "Cerrando...",
    [ReadyState.CLOSED]: "Desconectado",
    [ReadyState.UNINSTANTIATED]: "No conectado",
  }[readyState];

  // Mantener el scroll siempre al final del chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (lastMessage !== null) {
      const messageData = lastMessage.data;

      // Evitar procesar mensajes duplicados
      if (messageData === lastProcessedMessage) return;
      setLastProcessedMessage(messageData); // Actualizar último mensaje procesado

      const parsedMessage = JSON.parse(messageData);

      if (parsedMessage.type === "assistant_response") {
        const newMessage: Message = {
          sender: "assistant",
          text: parsedMessage.text,
          audio: parsedMessage.audio,
        };
        setMessages((prev) => [...prev, newMessage]);

        if (interactionMode === "call" && parsedMessage.audio) {
          playAssistantAudio(parsedMessage.audio);
        }
      } else if (parsedMessage.type === "status") {
        const statusMessage: Message = {
          sender: "assistant",
          text: parsedMessage.content,
        };
        setMessages((prev) => [...prev, statusMessage]);

        if (interactionMode === "call" && parsedMessage.audio) {
          playAssistantAudio(parsedMessage.audio);
        }
      } else if (parsedMessage.type === "close_connection") {
        // Detener el reconocimiento de voz y desactivar la sesión
        setIsSessionActive(false); // Indicar que la sesión terminó
        stopVoiceRecognition();
        console.log("Mensaje de cierre recibido:", parsedMessage.text);

        // Cambiar el estado para prevenir reactivación
        setInteractionMode("text");
        console.log("La conversación ha finalizado.");
      } else if (parsedMessage.type === "error") {
        console.error("Error recibido:", parsedMessage.content);
      }
    }
  }, [lastMessage, interactionMode, lastProcessedMessage]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = { sender: "user", text: inputValue };
    setMessages((prev) => [...prev, newMessage]);

    sendMessage(
      JSON.stringify({
        type: "user_message",
        content: inputValue,
      })
    );
    setInputValue("");
  };

  const startVoiceRecognition = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Tu navegador no soporta la API de reconocimiento de voz.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "es-ES";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      if (!isSessionActive) {
        console.log(
          "Reconocimiento de voz no permitido: la sesión no está activa."
        );
        recognition.stop();
        return;
      }
      setIsRecording(true);
      console.log("Reconocimiento de voz activado.");
    };

    recognition.onresult = (event: any) => {
      if (!isSessionActive) return; // Ignorar resultados si la sesión no está activa
      const transcript = event.results[0][0].transcript;
      console.log("Usuario dijo:", transcript);

      const newMessage: Message = { sender: "user", text: transcript };
      setMessages((prev) => [...prev, newMessage]);

      sendMessage(
        JSON.stringify({
          type: "user_message",
          content: transcript,
        })
      );
    };

    recognition.onerror = (event: any) => {
      console.error("Error en el reconocimiento de voz:", event.error);
      if (event.error === "no-speech" || event.error === "aborted") {
        console.log("No se detectó habla o se abortó el reconocimiento.");
      }
      if (isSessionActive) {
        recognition.start(); // Reactivar solo si la sesión sigue activa
      }
    };

    recognition.onend = () => {
      setIsRecording(false);
      if (isSessionActive) {
        console.log("Reactivando reconocimiento de voz...");
        recognition.start(); // Reactivar solo si la sesión sigue activa
      } else {
        console.log("Reconocimiento de voz finalizado y no se reactivará.");
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopVoiceRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.onend = null; // Limpiar eventos para evitar reactivación
      recognitionRef.current.onerror = null;
      recognitionRef.current.stop();
      setIsRecording(false);
      console.log("Reconocimiento de voz detenido.");
    }
  };

  const playAssistantAudio = (audioUrl: string) => {
    const audio = new Audio(audioUrl);
    audioRef.current = audio;

    isAssistantSpeaking.current = true;
    stopVoiceRecognition(); // Pausar reconocimiento durante la respuesta del asistente

    audio.onended = () => {
      console.log("Audio del asistente finalizado");
      isAssistantSpeaking.current = false;

      if (interactionMode === "call" && isSessionActive) {
        startVoiceRecognition(); // Reactivar reconocimiento
      }
    };

    audio.play();
  };

  const switchMode = (mode: "text" | "call") => {
    setInteractionMode(mode);
    if (mode === "call") {
      console.log("Iniciando una nueva llamada...");
      setIsSessionActive(true); // Reactivar la sesión
      setLastProcessedMessage(null); // Limpiar último mensaje procesado
      startVoiceRecognition();
    } else {
      console.log("Cambiando a modo texto...");
      stopVoiceRecognition();
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "600px",
        margin: "0 auto",
        height: "90vh",
        border: "1px solid #ccc",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          padding: "10px",
          backgroundColor: "#fafafa",
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              padding: "10px",
              margin: "5px",
              borderRadius: "8px",
              maxWidth: "70%",
              alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
              backgroundColor: msg.sender === "user" ? "#d1e7ff" : "#f1f1f1",
            }}
          >
            <strong>{msg.sender === "user" ? "Tú" : "Asistente"}:</strong>{" "}
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <p
        style={{
          padding: "10px",
          fontSize: "0.9rem",
          textAlign: "center",
        }}
      >
        Estado del WebSocket: {connectionStatus}
      </p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "10px",
          borderTop: "1px solid #ccc",
          backgroundColor: "#fff",
        }}
      >
        {interactionMode === "text" || interactionMode === "call" ? (
          <>
            <input
              type="text"
              placeholder="Escribe tu mensaje..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              style={{
                flex: 1,
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "8px",
              }}
            />
            <button
              onClick={handleSendMessage}
              style={{
                padding: "10px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              ➤
            </button>
          </>
        ) : null}
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => switchMode("text")}
            style={{
              padding: "5px 10px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Texto
          </button>
          <button
            onClick={() => switchMode("call")}
            style={{
              padding: "5px 10px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Llamada
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
