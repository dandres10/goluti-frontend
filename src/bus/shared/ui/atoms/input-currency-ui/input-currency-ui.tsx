import { InputNumber } from "antd";
import { useState } from "react";
import { ConfigProvider } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { Controller } from "react-hook-form";

import "./input-currency.scss";
import { InputErrorUI } from "../input-error-ui/input-error-ui";
import { formatCurrency } from "@/bus/core/functions/format-currency";
import { configAnt } from "@/bus/shared/lib/ant";

export interface IInputCurrencyUI {
  id: string;
  size?: SizeType;
  className?: string;
  calculateWidthByDigit?: number;
  fixedWidth?: string;
  name?: any;
  errors?: any;
  control?: any;
  addonBefore?: React.ReactNode;
  onChange: (value: any) => void;
  disabled?: boolean;
  fontSize?: string;
  placeholder?: string;
  status?: any;
}

/**
 * Functional component that renders an input number field with specified properties.
 *
 * @param {object} props - The props for the component.
 * @param {string} props.id - The identifier of the input number field.
 * @param {number} props.defaultValue - The default value for the input number field.
 * @param {SizeType} [props.size] - Optional size of the input number field (e.g., "large", "middle", "small").
 * @param {string} [props.className] - Optional class name for styling purposes.
 * @param {number} [props.calculateWidthByDigit] - Optional number used to calculate the width of the input number field based on digits.
 * @param {any} [props.value] - Optional value of the input number field.
 * @param {string} [props.fixedWidth] - Optional fixed width of the input number field.
 * @param {any} [props.name] - Optional name of the input number field.
 * @param {any} [props.errors] - Optional errors associated with the input number field.
 * @param {Control<FieldValues>} [props.control] - Optional control object for managing form inputs (from react-hook-form).
 * @param {(value: any) => {}} [props.onChange] - Optional callback function triggered when the value of the input number field changes.
 * @returns {JSX.Element} The rendered input number field.
 */

export const InputCurrencyUI = (props: IInputCurrencyUI) => {
  const {
    id,
    size,
    className,
    calculateWidthByDigit,
    fixedWidth,
    name,
    errors,
    control,
    onChange,
    addonBefore,
    disabled,
    placeholder,
    fontSize,
    status,
  } = props;
  const [width, setWidth] = useState<number>(100);

  const handleWidth = (value: string) => {
    const lengthValue = value.toString().length;
    setWidth(calculateWidth(lengthValue));
  };

  const calculateWidth = (lengthValue: number) => {
    let assignWith = 0;
    const base = 11;
    const pixels = calculateWidthByDigit ? calculateWidthByDigit : 6;
    const signs = Math.round(lengthValue / 3);
    if (signs > 0) {
      assignWith = (lengthValue + base + signs) * pixels;
    } else {
      assignWith = (lengthValue + base + signs) * pixels;
    }

    return assignWith;
  };

  const parseNumber = (numberString: string) => {
    const regex = /\d/;
    if (!regex.test(numberString)) {
      return "";
    }
    numberString = numberString.replace(/[a-zA-Z]/g, "");
    const cleanedNumberString = numberString
      .replace(/\$|\./g, "")
      .replace(",", ".");
    const parsedFloat = parseFloat(cleanedNumberString);
    return parsedFloat.toString();
  };

  const onKeyDown = (e: any) => {
    const charCode = e.key;
    const regex = /^(?:Backspace|Tab|ArrowLeft|ArrowRight|[0-9\b\t.,]+)$/;
    if (!regex.test(charCode)) {
      e.preventDefault();
    }
  };

  return (
    <ConfigProvider theme={configAnt}>
      {control ? (
        <Controller
          key={id}
          name={name}
          control={control}
          render={({ field: { value, onChange, onBlur } }) => (
            <div className={`input-core`}>
              <InputNumber
                key={id}
                controls={false}
                status={status}
                className={`${className}`}
                size={size}
                maxLength={22}
                formatter={(value) => formatCurrency(value)}
                parser={(value) => parseNumber(value ?? "")}
                onChange={(value) => {
                  onChange(value);
                  props.onChange(value);
                }}
                onBlur={onBlur}
                onKeyDown={onKeyDown}
                disabled={disabled}
                placeholder={placeholder}
                defaultValue={value ? value : undefined}
              />
              <InputErrorUI id={id} error={errors} />
            </div>
          )}
        />
      ) : (
        <InputNumber
          key={id}
          className={`${className}`}
          size={size}
          style={{
            width: fixedWidth !== undefined ? fixedWidth : width,
            fontSize,
          }}
          maxLength={22}
          formatter={(value) => formatCurrency(value)}
          parser={(value) => parseNumber(value ?? "0")}
          onChange={(value) => {
            onChange(value);
          }}
          onKeyDown={onKeyDown}
          disabled={disabled}
        />
      )}
    </ConfigProvider>
  );
};
