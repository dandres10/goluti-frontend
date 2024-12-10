import { ConfigProvider } from "antd";

import { Select } from "../../../lib/ant/config-components-ant";
import { useEffect, useState } from "react";
import "./select-ui.scss";
import { Controller } from "react-hook-form";
import { InputErrorUI } from "../input-error-ui/input-error-ui";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { configAnt } from "@/bus/shared/lib/ant";

export interface IDataSourceDTO {
  value: number | string;
  label: number | string | React.ReactNode;
}

export interface ISelectUI {
  id: string;
  defaultValue?: string | number;
  dataSource: IDataSourceDTO[];
  width?: number;
  variant?: any;
  disabled?: boolean;
  fontSize?: string;
  errors?: any;
  size?: SizeType;
  control?: any;
  name?: string;
  className?: string;
  label?: string;
  onChange: (e: any) => void;
  onBlur?: (e: any) => void;
  placeholder?: string;
}

/**
 * Functional component that renders a select component.
 *
 * @param {ISelectUI} props - The props for the component.
 * @returns {JSX.Element} The rendered select component.
 */
export const SelectUI = (props: ISelectUI) => {
  const {
    defaultValue,
    dataSource,
    width,
    id,
    variant,
    disabled,
    fontSize,
    errors,
    control,
    name,
    className,
    label,
    onBlur,
    size,
    placeholder,
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
             
                {label ? (
                  <div className="label-select-core">{label}</div>
                ) : null}
                <Select
                  popupMatchSelectWidth={false}
                  className={`${className}`}
                  key={`${id}`}
                  defaultValue={defaultValue}
                  size={size}
                  variant={variant}
                  onChange={(e) => {
                    onChange(e);
                    props.onChange(e);
                  }}
                  onBlur={onBlur}
                  disabled={disabled}
                  placeholder={placeholder}
                  options={dataSource}
                >
                  {/* {dataSource.map((item) => (
                    <Select.Option
                      key={`${id}${item.id}`}
                      value={item.id}
                     
                    >
                      <div style={{ fontSize }}>{item.value}</div>
                    </Select.Option>
                  ))} */}
                </Select>
                <InputErrorUI id={`${id}`} error={errors?.[name]?.message} />
            
            </div>
          )}
        />
      ) : (
        <div>
          {label ? <div className="label-select-core">{label}</div> : null}
          <Select
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
          >
            {/* {dataSource?.map((item) => (
              <Select.Option
                key={`${id}${item.id}`}
                value={item.id}
              >
                <div style={{ fontSize }}>{item.value}</div>
              </Select.Option>
            ))} */}
          </Select>
        </div>
      )}
    </ConfigProvider>
  );
};
