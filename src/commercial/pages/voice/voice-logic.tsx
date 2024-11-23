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
  const [interactionMode, setInteractionMode] = useState<"text" | "call">("text");
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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (lastMessage !== null) {
      const parsedMessage = JSON.parse(lastMessage.data);
      if (parsedMessage.type === "assistant_response") {
        const newMessage: Message = {
          sender: "assistant",
          text: parsedMessage.text,
          audio: parsedMessage.audio,
        };
        setMessages((prev) => [...prev, newMessage]);

        // Reproducir audio automáticamente si está en modo llamada
        if (interactionMode === "call" && parsedMessage.audio) {
          playAssistantAudio(parsedMessage.audio);
        }
      } else if (parsedMessage.type === "error") {
        console.error("Error recibido:", parsedMessage.content);
      }
    }
  }, [lastMessage, interactionMode]);

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
      setIsRecording(true);
      console.log("Reconocimiento de voz activado");
    };

    recognition.onresult = (event: any) => {
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
      if (event.error === "not-allowed") {
        alert("Permiso denegado para el reconocimiento de voz. Activa el micrófono.");
      }
      console.error("Error en el reconocimiento de voz:", event.error);
    };

    recognition.onend = () => {
      setIsRecording(false);
      if (interactionMode === "call" && !isAssistantSpeaking.current) {
        recognition.start(); // Reactivar si está en llamada y el asistente no está hablando
      }
      console.log("Reconocimiento de voz finalizado");
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopVoiceRecognition = () => {
    recognitionRef.current?.stop();
    setIsRecording(false);
  };

  const playAssistantAudio = (audioUrl: string) => {
    const audio = new Audio(audioUrl);
    audioRef.current = audio;

    isAssistantSpeaking.current = true;
    stopVoiceRecognition(); // Pausar reconocimiento durante la respuesta del asistente

    audio.onended = () => {
      console.log("Audio del asistente finalizado");
      isAssistantSpeaking.current = false;

      if (interactionMode === "call") {
        startVoiceRecognition(); // Reactivar reconocimiento
      }
    };

    audio.play();
  };

  const switchMode = (mode: "text" | "call") => {
    setInteractionMode(mode);
    if (mode === "call") {
      startVoiceRecognition();
    } else {
      stopVoiceRecognition();
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", maxWidth: "600px", margin: "0 auto", height: "90vh", border: "1px solid #ccc", borderRadius: "8px", overflow: "hidden" }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflowY: "auto", padding: "10px", backgroundColor: "#fafafa" }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ padding: "10px", margin: "5px", borderRadius: "8px", maxWidth: "70%", alignSelf: msg.sender === "user" ? "flex-end" : "flex-start", backgroundColor: msg.sender === "user" ? "#d1e7ff" : "#f1f1f1" }}>
            <strong>{msg.sender === "user" ? "Tú" : "Asistente"}:</strong> {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <p style={{ padding: "10px", fontSize: "0.9rem", textAlign: "center" }}>Estado del WebSocket: {connectionStatus}</p>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px", borderTop: "1px solid #ccc", backgroundColor: "#fff" }}>
        {(interactionMode === "text" || interactionMode === "call") && (
          <>
            <input type="text" placeholder="Escribe tu mensaje..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} style={{ flex: 1, padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }} />
            <button onClick={handleSendMessage} style={{ padding: "10px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>➤</button>
          </>
        )}
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => switchMode("text")} style={{ padding: "5px 10px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>Texto</button>
          <button onClick={() => switchMode("call")} style={{ padding: "5px 10px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>Llamada</button>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;