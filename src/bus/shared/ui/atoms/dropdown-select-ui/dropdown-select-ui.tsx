import { Button, Dropdown, MenuProps, Space } from "antd";
import { ConfigProvider } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { Controller } from "react-hook-form";

import "./dropdown-select.scss";

import { configAnt } from "@/bus/shared/lib/ant";
import { PlusOutlined } from "@ant-design/icons";

export interface IDropdownSelectUI {
  id: string;
  size?: SizeType;
  className?: string;
  name?: any;
  errors?: any;
  control?: any;
  onChange: (value: any) => void;
  disabled?: boolean;
  dataSource: any[] | undefined;
  fixedText?: string;
  icon?: React.ReactNode;
}

export const DropdownSelectUI = (props: IDropdownSelectUI) => {
  const {
    id,
    size,
    className,
    name,
    errors,
    control,
    disabled,
    dataSource,
    fixedText,
    icon,
  } = props;

  const getKeyByValue = (value: any): string => {
    const item: any = dataSource?.find((item: any) => item?.key === value);
    return item?.label;
  };

  return (
    <ConfigProvider theme={configAnt}>
      {control ? (
        <Controller
          key={id}
          name={name}
          control={control}
          render={({ field: { value, onChange } }) => (
            <div className={`input-core`}>
              <Dropdown
                key={id}
                className={className}
                menu={{
                  items: dataSource,
                  onClick: (e) => {
                    onChange(e.key);
                    props.onChange(e.key);
                  },
                }}
                trigger={["click"]}
                disabled={disabled || !(dataSource?.length !== 0)}
              >
                <Button key={id} type="text" size="small" icon={icon}>
                  <Space>{fixedText ? fixedText : getKeyByValue(value)}</Space>
                </Button>
              </Dropdown>
            </div>
          )}
        />
      ) : (
        <div>crear compomente</div>
      )}
    </ConfigProvider>
  );
};
