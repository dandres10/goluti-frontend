import { configAnt } from "../../../lib/ant";
import { ConfigProvider, Input, InputProps } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { InputErrorUI } from "../input-error-ui/input-error-ui";
import { Control, Controller, FieldValues } from "react-hook-form";


export interface IInputUI {
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
 * Functional component that renders an input field with specified properties.
 *
 * @param {object} props - The props for the component.
 * @param {string} props.id - The identifier of the input field.
 * @param {InputProps["status"]} props.status - The status of the input field (e.g., "success", "error").
 * @param {string} props.placeholder - The placeholder text for the input field.
 * @param {number} props.maxLength - The maximum length of the input field.
 * @param {string | number} props.value - The value of the input field.
 * @param {any} props.errors - Errors associated with the input field.
 * @param {Control<FieldValues>} props.control - The control object for managing form inputs (from react-hook-form).
 * @param {string} props.name - The name of the input field.
 * @param {string} props.width - The width of the input field.
 * @param {string} props.className - The class name for styling purposes.
 * @param {() => {}} props.onChange - The function to be called when the input value changes.
 * @param {() => {}} props.onBlur - The function to be called when the input field loses focus.
 * @returns {JSX.Element} The rendered input field.
 */
export const InputUI = (props: IInputUI) => {
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
          <ConfigProvider theme={configAnt}>
            <Input
              style={{ width }}
              maxLength={maxLength}
              status={status}
              placeholder={placeholder}
              onChange={(e) => {
                onChange(e);
                props.onChange();
              }}
              value={value}
              onBlur={onBlur}
              size={size}
            />
          </ConfigProvider>
          <InputErrorUI id={id} error={errors?.[name]?.message} />
        </div>
      )}
    />
  );
};
