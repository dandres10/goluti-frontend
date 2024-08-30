import "./button.scss";
import { Button, ButtonProps, ConfigProvider } from "antd";
import { BaseButtonProps } from "antd/es/button/button";
import { configAnt } from "@/bus/shared/lib/ant/index";

export interface IButtonUI {
  id?: string;
  width?: string;
  type?: BaseButtonProps["type"];
  icon?: React.ReactNode;
  shape?: BaseButtonProps["shape"];
  size?: BaseButtonProps["size"];
  text?: string;
  className?: string;
  htmlType?: ButtonProps["htmlType"];
  disabled?: boolean;
  onClick?: () => void;
}

/**
 * Functional component that renders a button with specified properties.
 *
 * @param {object} props - The props for the component.
 * @param {number | string} [props.id] - The identifier of the button.
 * @param {number} [props.width] - The width of the button.
 * @param {BaseButtonProps["type"]} [props.type] - The type of the button (can be "primary", "ghost", "dashed", "link", or "text").
 * @param {React.ReactNode} [props.icon] - The icon to be displayed in the button.
 * @param {BaseButtonProps["shape"]} [props.shape] - The shape of the button (can be "circle" or "round").
 * @param {BaseButtonProps["size"]} [props.size] - The size of the button (can be "large", "middle", or "small").
 * @param {string} [props.text] - The text displayed in the button.
 * @param {string} [props.className] - Optional class name for styling purposes.
 * @param {ButtonProps["htmlType"]} [props.htmlType] - The type of HTML button (e.g., "submit", "reset", or "button").
 * @param {boolean} [props.disabled] - Whether the button is disabled.
 * @param {() => {}} [props.onClick] - The function to be called when the button is clicked.
 * @returns {JSX.Element} The rendered button.
 */
export const ButtonUI = (props: IButtonUI): JSX.Element => {
  const {
    id,
    width,
    type,
    icon,
    shape,
    size,
    text,
    className,
    onClick,
    htmlType,
    disabled,
  } = props;

  return (
    <ConfigProvider theme={configAnt}>
      <Button
        key={id}
        className={className}
        style={{ width: width }}
        type={type}
        htmlType={htmlType}
        icon={icon}
        shape={shape}
        size={size}
        onClick={onClick}
        disabled={disabled}
      >
        {text}
      </Button>
    </ConfigProvider>
  );
};
