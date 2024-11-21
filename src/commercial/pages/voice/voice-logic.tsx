import React, { useState, useEffect, useRef } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

const VoiceChat = () => {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [isCallActive, setIsCallActive] = useState(false); // Controla el estado de la llamada
  const [recognitionInstance, setRecognitionInstance] = useState<SpeechRecognition | null>(null);
  const [audioSource, setAudioSource] = useState<string | null>(null);
  const [isAssistantSpeaking, setIsAssistantSpeaking] = useState(false); // Controla si el asistente está hablando
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Configuración del WebSocket
  const { sendMessage, lastMessage, readyState } = useWebSocket("ws://localhost:8002/tracking-manager/voice", {
    onOpen: () => console.log("Conexión WebSocket abierta"),
    onClose: () => console.log("Conexión WebSocket cerrada"),
    onError: (error) => console.error("Error en WebSocket:", error),
    shouldReconnect: () => false, // No reintentar si la conexión se cierra
    share: true,
  }, isCallActive);

  // Configuración de reconocimiento de voz
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Tu navegador no soporta SpeechRecognition. Usa Google Chrome o Edge.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "es-ES";
    recognition.interimResults = false; // Solo resultados finales
    recognition.continuous = true; // Mantiene el reconocimiento continuo

    recognition.onstart = () => console.log("Reconocimiento de voz iniciado.");
    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript;
      console.log("Texto reconocido:", spokenText);

      // Si el asistente está hablando, interrúmpelo
      if (isAssistantSpeaking && audioRef.current) {
        audioRef.current.pause(); // Detiene el audio en reproducción
        setIsAssistantSpeaking(false); // El asistente deja de hablar
      }

      // Envía el mensaje al WebSocket
      if (readyState === ReadyState.OPEN) {
        sendMessage(JSON.stringify({ type: "user_message", content: spokenText }));
        setMessages((prev) => [...prev, { sender: "Tú", text: spokenText }]);
      } else {
        console.error("WebSocket no está listo para enviar mensajes.");
      }
    };

    recognition.onerror = (event) => {
      console.error("Error en SpeechRecognition:", event.error);
      if (event.error === "not-allowed") {
        alert("Permiso denegado para usar el micrófono. Por favor, habilítalo en la configuración del navegador.");
        setIsCallActive(false);
      }
    };

    setRecognitionInstance(recognition);
  }, [readyState, isAssistantSpeaking]);

  // Manejo del estado de la llamada
  useEffect(() => {
    if (isCallActive && recognitionInstance && readyState === ReadyState.OPEN) {
      console.log("Iniciando reconocimiento de voz...");
      recognitionInstance.start(); // Inicia el reconocimiento de voz cuando la llamada está activa
    } else if (recognitionInstance && !isCallActive) {
      console.log("Deteniendo reconocimiento de voz...");
      recognitionInstance.stop(); // Detiene el reconocimiento de voz cuando la llamada se cuelga
    }
  }, [isCallActive, recognitionInstance, readyState]);

  // Manejo de mensajes desde el WebSocket
  useEffect(() => {
    if (lastMessage !== null) {
      try {
        const messageData = JSON.parse(lastMessage.data);

        switch (messageData.type) {
          case "assistant_response":
            setMessages((prev) => [...prev, { sender: "ChatGPT", text: messageData.text }]);
            setAudioSource(messageData.audio);
            setIsAssistantSpeaking(true); // Marca que el asistente está hablando
            recognitionInstance?.stop(); // Pausa el reconocimiento mientras el asistente habla
            break;
          case "info":
            console.log("Información:", messageData.content);
            break;
          case "error":
            console.error("Error recibido:", messageData.content);
            break;
          default:
            console.log("Mensaje desconocido:", messageData);
        }
      } catch (e) {
        console.error("Error procesando el mensaje del WebSocket:", e);
      }
    }
  }, [lastMessage]);

  // Manejo del fin del audio
  const handleAudioEnd = () => {
    setIsAssistantSpeaking(false); // Marca que el asistente terminó de hablar
    setAudioSource(null);
    recognitionInstance?.start(); // Reanuda el reconocimiento de voz
  };

  // Inicia o detiene la llamada
  const toggleCall = () => {
    if (isCallActive) {
      // Detener la llamada
      setIsCallActive(false);
      recognitionInstance?.stop();
    } else {
      // Iniciar la llamada
      setIsCallActive(true);
    }
  };

  // Estado de conexión del WebSocket
  const connectionStatus = {
    [ReadyState.CONNECTING]: "Conectando...",
    [ReadyState.OPEN]: "Conectado",
    [ReadyState.CLOSING]: "Cerrando...",
    [ReadyState.CLOSED]: "Cerrado",
    [ReadyState.UNINSTANTIATED]: "Sin conexión",
  }[readyState];

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Simulación de Llamada Telefónica</h1>
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
          <div key={index} style={{ textAlign: msg.sender === "Tú" ? "right" : "left", marginBottom: "5px" }}>
            <strong>{msg.sender}: </strong>
            {msg.text}
          </div>
        ))}
      </div>
      {audioSource && (
        <audio
          ref={audioRef}
          src={audioSource}
          controls
          autoPlay
          onEnded={handleAudioEnd} // Marca el fin del audio
        />
      )}
      <div style={{ marginTop: "10px" }}>
        <button onClick={toggleCall}>
          {isCallActive ? "Colgar" : "Llamar"}
        </button>
      </div>
    </div>
  );
};

export default VoiceChat;