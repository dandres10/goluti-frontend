import React, { useState, useEffect, useRef } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

interface Message {
  sender: "user" | "assistant";
  text: string;
  audio?: string;
}

const MESSAGE_TYPES = {
  ASSISTANT_RESPONSE: "assistant_response",
  STATUS: "status",
  CLOSE_CONNECTION: "close_connection",
  ERROR: "error",
};

const ChatComponent = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [interactionMode, setInteractionMode] = useState<"text" | "call">(
    "text"
  );
  const [isSessionActive, setIsSessionActive] = useState(true);
  const [lastProcessedMessage, setLastProcessedMessage] = useState<
    string | null
  >(null);
  const recognitionRef = useRef<any | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isAssistantSpeaking = useRef(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const { sendMessage, lastMessage, readyState } = useWebSocket(
    "ws://localhost:8002/tracking-manager/voice",
    {
      onOpen: () => {
        console.log("WebSocket conectado");
        setIsSessionActive(true);
      },
      onClose: () => {
        console.log("WebSocket desconectado");
        setIsSessionActive(false);
      },
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

  const shouldReactivateRecognition = (type: string) => {
    return (
      isSessionActive &&
      interactionMode === "call" &&
      type !== MESSAGE_TYPES.CLOSE_CONNECTION
    );
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (lastMessage !== null) {
      const messageData = lastMessage.data;

      if (messageData === lastProcessedMessage) return;
      setLastProcessedMessage(messageData);

      const parsedMessage = JSON.parse(messageData);
      console.log("tipo de mensaje", parsedMessage.type);

      if (parsedMessage.type === MESSAGE_TYPES.ASSISTANT_RESPONSE) {
        const newMessage: Message = {
          sender: "assistant",
          text: parsedMessage.text,
          audio: parsedMessage.audio,
        };
        setMessages((prev) => [...prev, newMessage]);

        if (parsedMessage.audio) {
          playAssistantAudio(parsedMessage.audio, parsedMessage.type);
        }
      } else if (parsedMessage.type === MESSAGE_TYPES.STATUS) {
        const statusMessage: Message = {
          sender: "assistant",
          text: parsedMessage.content,
        };
        setMessages((prev) => [...prev, statusMessage]);
      } else if (parsedMessage.type === MESSAGE_TYPES.CLOSE_CONNECTION) {
        const closeMessage: Message = {
          sender: "assistant",
          text: parsedMessage.text,
          audio: parsedMessage.audio,
        };
        setMessages((prev) => [...prev, closeMessage]);

        if (parsedMessage.audio) {
          playAssistantAudio(parsedMessage.audio, parsedMessage.type);
        }

        stopVoiceRecognition();
        setIsSessionActive(false);
        setInteractionMode("text");
        console.log("Mensaje de cierre recibido:", parsedMessage.text);
      } else if (parsedMessage.type === MESSAGE_TYPES.ERROR) {
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
        recognition.stop();
        return;
      }
      console.log("Reconocimiento de voz activado.");
    };

    recognition.onresult = (event: any) => {
      if (!isSessionActive) return;

      const transcript = event.results[0][0].transcript;
      const newMessage: Message = { sender: "user", text: transcript };
      setMessages((prev) => [...prev, newMessage]);

      sendMessage(
        JSON.stringify({
          type: "user_message",
          content: transcript,
        })
      );
    };

    /* recognition.onerror = (event: any) => {
      console.error("Error en el reconocimiento de voz:", event.error);

      if (event.error === "no-speech" || event.error === "aborted") {
        console.log("No se detectó habla o se abortó el reconocimiento.");
      }

      if (shouldReactivateRecognition(MESSAGE_TYPES.ASSISTANT_RESPONSE)) {
        if (!recognition) {
          recognition.start();
        }
      }
    }; */

    recognition.onend = () => {
      if (shouldReactivateRecognition(MESSAGE_TYPES.ASSISTANT_RESPONSE)) {
        recognition.start();
      }
    };

    recognitionRef.current = recognition;
    if (!recognition?.current) {
      recognition.start();
    }
  };

  const stopVoiceRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.onend = null;
      recognitionRef.current.onerror = null;
      recognitionRef.current.stop();
      recognitionRef.current = null;
      console.log("Reconocimiento de voz detenido.");
    }
  };

  const playAssistantAudio = (audioUrl: string, type: string) => {
    if (!audioUrl || interactionMode != "call") return;

    const audio = new Audio(audioUrl);
    audioRef.current = audio;

    isAssistantSpeaking.current = true;
    stopVoiceRecognition();

    audio.onended = () => {
      isAssistantSpeaking.current = false;

      if (shouldReactivateRecognition(type)) {
        startVoiceRecognition();
      }
    };

    audio.play();
  };

  const switchMode = (mode: "text" | "call") => {
    if (mode === "call") {
      setInteractionMode("call");
      setIsSessionActive(true);
      startVoiceRecognition();
    } else {
      setInteractionMode("text");
      setIsSessionActive(false);
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
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage(); 
                }
              }}
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
