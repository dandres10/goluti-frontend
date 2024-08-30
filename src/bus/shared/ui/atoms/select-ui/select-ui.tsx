import { ConfigProvider, Select } from "antd";
import "./select-ui.scss";
import { configAnt } from "@/bus/shared/lib/ant";

export interface IDataSourceDTO {
  value: number | string;
  label: string;
  disabled?: boolean;
}

export interface ISelectUI {
  id: string;
  defaultValue?: string | number;
  options: IDataSourceDTO[];
  variant?: "outlined" | "borderless" | "filled" | undefined;
  width: string;
  disabled?: boolean;
  className?: string;
  placeholder?: string
}

/**
 * Functional component that renders a select component.
 *
 * @param {ISelectUI} props - The props for the component.
 * @returns {JSX.Element} The rendered select component.
 */
export const SelectUI = (props: ISelectUI) => {
  const { defaultValue, options, width,placeholder, id, variant, disabled, className } =
    props;

  return (
    <ConfigProvider theme={configAnt}>
      <Select
        className={className}
        key={id}
        placeholder={placeholder}
        defaultValue={defaultValue}
        variant={variant}
        options={options}
        style={{
          width,
        }}
        onChange={(item: any) => {}}
        disabled={disabled}
      ></Select>
    </ConfigProvider>
  );
};
