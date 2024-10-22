import "./input-password.scss";
import { Input, InputProps } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { InputErrorUI } from "../input-error-ui/input-error-ui";
import { Control, Controller, FieldValues } from "react-hook-form";

export interface IInputPasswordUI {
  id: string;
  status: InputProps["status"];
  placeholder: string;
  maxLength: number;
  value?: string | number;
  errors: any;
  control: any;
  name: string;
  width: string;
  className?: string;
  onChange: () => {};
  onBlur?: () => {};
  size?: SizeType;
}

/**
 * Functional component that renders a password input field with specified properties.
 *
 * @param {object} props - The props for the component.
 * @param {string} props.id - The identifier of the password input field.
 * @param {InputProps["status"]} props.status - The status of the password input field "warning" | "error".
 * @param {string} props.placeholder - The placeholder text for the password input field.
 * @param {number} props.maxLength - The maximum length of the password input field.
 * @param {string | number} props.value - The value of the password input field.
 * @param {any} props.errors - Errors associated with the password input field.
 * @param {Control<FieldValues>} props.control - The control object for managing form inputs.
 * @param {string} props.name - The name of the password input field.
 * @param {string} props.width - The width of the password input field.
 * @param {string} props.className - The class name for styling purposes.
 * @param {() => {}} props.onChange - The function to be called when the input value changes.
 * @param {() => {}} props.onBlur - The function to be called when the input field loses focus.
 * @returns {JSX.Element} The rendered password input field.
 */

export const InputPasswordUI = (props: IInputPasswordUI): JSX.Element => {
  const {
    id,
    status,
    placeholder,
    maxLength,
    errors,
    name,
    control,
    width,
    className,
    size,
  } = props;

  const typeSize = () => {
    return size === "large" ? "input-core-large" : "input-core";
  };

  return (
    <Controller
      key={id}
      name={name}
      control={control}
      render={({ field: { value, onChange, onBlur } }) => (
        <div className={`${className} ${typeSize()}`}>
          <Input.Password
            style={{ width }}
            status={status}
            placeholder={placeholder}
            maxLength={maxLength}
            value={value}
            size={size}
            onChange={(e) => {
              onChange(e);
              props.onChange();
            }}
            onBlur={onBlur}
          />
          <InputErrorUI id={id} error={errors?.[name]?.message} />
        </div>
      )}
    />
  );
};
