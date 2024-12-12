import "./select-ui.scss";
import { useEffect } from "react";
import { ConfigProvider } from "antd";
import { Controller } from "react-hook-form";
import { configAnt } from "@/bus/shared/lib/ant";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { InputErrorUI } from "../input-error-ui/input-error-ui";
import { Select } from "../../../lib/ant/config-components-ant";

export interface IDataSourceDTO {
  value: number | string;
  label: number | string | React.ReactNode;
}

export interface ISelectUI {
  id: string;
  dataSource: IDataSourceDTO[];
  variant?: any;
  disabled?: boolean;
  errors?: any;
  size?: SizeType;
  control?: any;
  name?: string;
  className?: string;
  label?: string;
  onChange: (e: any) => void;
  placeholder?: string;
  status?: any;
}

/**
 * Functional component that renders a select component.
 *
 * @param {ISelectUI} props - The props for the component.
 * @returns {JSX.Element} The rendered select component.
 */
export const SelectUI = (props: ISelectUI) => {
  const {
    dataSource,
    id,
    variant,
    disabled,
    errors,
    control,
    name,
    className,
    label,
    size,
    placeholder,
    status,
  } = props;

  useEffect(() => {}, []);
  return (
    <ConfigProvider theme={configAnt}>
      {control && name ? (
        <Controller
          key={id}
          name={name}
          control={control}
          render={({ field: { value, onChange, onBlur } }) => (
            <div className={`${className}`}>
              {label ? <div className="label-select-core">{label}</div> : null}
              <Select
                showSearch
                status={status}
                allowClear={true}
                virtual={true}
                optionFilterProp="label"
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toString()
                    .toLowerCase()
                    .localeCompare(
                      (optionB?.label ?? "").toString().toLowerCase()
                    )
                }
                popupMatchSelectWidth={false}
                className={`${className}`}
                key={`${id}`}
                size={size}
                variant={variant}
                onChange={(e) => {
                  onChange(e);
                  props.onChange(e);
                }}
                onBlur={onBlur}
                disabled={disabled}
                placeholder={placeholder}
                defaultValue={value}
                options={dataSource}
              ></Select>
              <InputErrorUI id={`${id}`} error={errors} />
            </div>
          )}
        />
      ) : (
        <div>
          {label ? <div className="label-select-core">{label}</div> : null}
          <Select
            status={status}
            popupMatchSelectWidth={false}
            className={`${className}`}
            key={`${id}`}
            placeholder={placeholder}
            size={size}
            variant={variant}
            onChange={(e) => {
              props.onChange(e);
            }}
            disabled={disabled}
            options={dataSource}
          ></Select>
        </div>
      )}
    </ConfigProvider>
  );
};
