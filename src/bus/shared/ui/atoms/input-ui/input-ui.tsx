import "./input.scss";
import { configAnt } from "../../../lib/ant";
import { Controller } from "react-hook-form";
import { ConfigProvider, Input, InputProps } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { InputErrorUI } from "../input-error-ui/input-error-ui";
import { useEffect } from "react";

export interface IInputUI {
  id: string;
  status?: InputProps["status"];
  placeholder?: string;
  maxLength: number;
  value?: string | number;
  errors?: any;
  control?: any;
  name: string;
  width?: string;
  className?: string;
  onChange: (e: any) => void;
  onBlur?: (e: any) => void;
  size?: SizeType;
  onPressEnter?: (e: any) => void;
  label?: string;
  disabled?: boolean;
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
    value,
    onBlur,
    onPressEnter,
    label,
    disabled,
  } = props;

  return (
    <ConfigProvider theme={configAnt}>
      {control ? (
        <Controller
          key={id}
          name={name}
          control={control}
          render={({ field: { value, onChange, onBlur } }) => (
            <div className={`${className}`}>
              <ConfigProvider theme={configAnt}>
                {label ? <div className="label-input-core">{label}</div> : null}
                <Input
                  allowClear={true}
                  style={{ width }}
                  maxLength={maxLength}
                  status={status}
                  placeholder={placeholder}
                  onChange={(e) => {
                    onChange(e);
                    props.onChange(e);
                  }}
                  value={value}
                  onBlur={onBlur}
                  size={size}
                  disabled={disabled}
                />
              </ConfigProvider>
              {errors && <InputErrorUI id={id} error={errors} />}
            </div>
          )}
        />
      ) : (
        <Input
          value={value} // Muestra un campo vacío cuando page es 0
          onChange={props.onChange}
          onBlur={onBlur} // Actualiza la paginación al salir del input
          onPressEnter={onPressEnter} // Actualiza la paginación al presionar Enter
          size={size}
          className={`${className}`}
        />
      )}
    </ConfigProvider>
  );
};
