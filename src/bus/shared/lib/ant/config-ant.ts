import type { ThemeConfig } from "antd";

export const configAnt: ThemeConfig = {
  token: {
    colorPrimary: "#6C63FF",  // El color primario que has elegido
    colorPrimaryHover: "#5751D9", // Color al hacer hover, un tono más oscuro
    colorPrimaryActive: "#4A45B3", // Color cuando el botón está activo, otro tono más oscuro
    colorPrimaryText: "#FFFFFF", // Texto sobre fondos con colorPrimary
    colorPrimaryBorder: "#514FCF", // Borde con un tono cercano al primario
    colorLink: "#6C63FF", // Usar el color primario para los enlaces
    colorLinkHover: "#5751D9", // Hover sobre enlaces
    colorSuccess: "#52C41A", // Color para éxito (puedes personalizar esto también)
    colorWarning: "#FAAD14", // Color para advertencias
    colorError: "#FF4D4F", // Color para errores
    colorInfo: "#1890FF", // Color para información
    colorTextBase: "#000000", // Color de texto base
  },
  components: {
    Button: { primaryShadow: "none" },
    Select: {
      
    },
  },
};
