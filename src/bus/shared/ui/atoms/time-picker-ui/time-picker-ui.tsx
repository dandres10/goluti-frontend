import "./time-picker.scss";
import esES from "antd/lib/locale/es_ES";
import { Controller } from "react-hook-form";
import { configAnt } from "@/bus/shared/lib/ant";
import { ConfigProvider, TimePicker } from "antd";
import { InputErrorUI } from "../input-error-ui/input-error-ui";
import dayjs from "dayjs";

export interface IDatePickerUI {
  id: string;
  placeholder?: string;
  className?: string;
  name?: any;
  errors?: any;
  control?: any;
  onChange: (value: any) => void;
  size: any;
  status?: any;
  disabled?: boolean;
}

const format = "HH:mm";

export const TimePickerUI = (props: IDatePickerUI): JSX.Element => {
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
              <TimePicker
                key={id}
                className={className}
                status={status}
                size={size}
                placeholder={placeholder}
                format={format}
                onBlur={onBlur}
                onChange={(e) => {
                  const hour = e?.format(format);
                  onChange(hour);
                  props.onChange(hour);
                }}
                defaultValue={value ? dayjs(value, format) : undefined}
                value={value ? dayjs(value, format) : undefined}
                disabled={disabled}
              />
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
