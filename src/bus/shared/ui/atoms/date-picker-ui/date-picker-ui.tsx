import "./date-picker.scss";
import esES from "antd/lib/locale/es_ES";
import dayjs from "dayjs";
import { Controller } from "react-hook-form";
import { configAnt } from "@/bus/shared/lib/ant";
import { DatePicker, ConfigProvider } from "antd";
import { InputErrorUI } from "../input-error-ui/input-error-ui";

export interface IDatePickerUI {
  id: string;
  placeholder?: string;
  className?: string;
  name?: any;
  errors?: any;
  control?: any;
  onChangeBasic?: (value: any, item: unknown) => void;
  onChange: (value: any) => {};
  size: any;
  status?: any;
  disabled?: boolean;
}

/**
 * Functional component that renders a date picker input with specified properties.
 *
 * @param {object} props - The props for the component.
 * @param {string} props.id - The identifier of the date picker input.
 * @param {string} props.placeholder - The placeholder text for the date picker input.
 * @param {string} props.className - The class name for styling purposes.
 * @param {Date} props.defaultValue - The default value for the date picker input.
 * @param {any} [props.name] - Optional name for the date picker input.
 * @param {unknown} [props.errors] - Optional errors associated with the date picker input.
 * @param {Control<FieldValues>} [props.control] - Optional control object for managing form inputs (from react-hook-form).
 * @param {any} [props.setValue] - Optional function to set value of the date picker input.
 * @param {string} [props.width] - Optional width of the date picker input.
 * @param {any} [props.trigger] - Optional trigger for the date picker input.
 * @param {(value: string) => {}} [props.onChange] - Optional callback function triggered when the value of the date picker input changes.
 * @returns {JSX.Element} The rendered date picker input.
 */
export const DatePickerUI = (props: IDatePickerUI): JSX.Element => {
  const {
    id,
    placeholder,
    className,
    control,
    name,
    errors,
    size,
    status,
    disabled,
  } = props;

  return (
    <ConfigProvider theme={configAnt} locale={esES}>
      {control ? (
        <Controller
          key={id}
          name={name}
          control={control}
          render={({ field: { value, onBlur, onChange } }) => (
            <div className={`input-core`}>
              <ConfigProvider theme={configAnt}>
                <DatePicker
                  key={id}
                  status={status}
                  className={`${className}`}
                  onChange={(e) => {
                    onChange(e);
                    props.onChange(e);
                  }}
                  placeholder={placeholder}
                  format={"YYYY-MM-DD"}
                  size={size}
                  onBlur={onBlur}
                  defaultValue={value ? dayjs(value) : undefined}
                  value={value ? dayjs(value) : undefined} 
                  disabled={disabled}
                />
              </ConfigProvider>
              <InputErrorUI id={id} error={errors} />
            </div>
          )}
        />
      ) : (
        <div>crear</div>
      )}
    </ConfigProvider>
  );
};
