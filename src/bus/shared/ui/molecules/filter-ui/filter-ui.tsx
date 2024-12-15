import "./filter.scss";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IFilterDTO } from "@/bus/core/interfaces/i-filter-dto";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps } from "antd";
import { IConditionTypeDTO } from "@/appointment/core/interfaces/i-condition-type-dto";
import { CONDITION_VALUE } from "@/appointment/core/enums/condition-type-enum";
import { ButtonUI, InputUI, SelectUI } from "../../atoms";
import { DatePickerUI } from "../../atoms/date-picker-ui/date-picker-ui";
import { InputCurrencyUI } from "../../atoms/input-currency-ui/input-currency-ui";
import { InputNumberUI } from "../../atoms/input-number-ui/input-number-ui";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { CONDITION_TYPE_ENUM } from "@/bus/core/enums/condition-type-enum";
import { useEffect, useState } from "react";
import { ATOM_TYPE_UI_ENUM } from "@/bus/core/enums/atom-type-ui-enum";
import { formatDate } from "@/bus/core/functions/format-date";
import { TimePickerUI } from "../../atoms/time-picker-ui/time-picker-ui";
dayjs.extend(isSameOrAfter);

export interface BaseDataSource {
  atomTypeUI: ATOM_TYPE_UI_ENUM;
  field: string;
  placeholder?: string;
  disabled?: boolean;
  dataSource?: any[];
}

export interface RangeDataSource extends BaseDataSource {
  placeholderInitialValue: string;
  placeholderFinalValue: string;
  disabledInitialValue: boolean;
  disabledFinalValue: boolean;
}

export interface SingleValueSchema {
  condition: CONDITION_TYPE_ENUM;
  value: string | number | undefined;
  dataSource: BaseDataSource;
}

export interface RangeValueSchema {
  condition: CONDITION_TYPE_ENUM.BETWEEN;
  initialValue: string | number | undefined;
  finalValue: string | number | undefined;
  dataSource: RangeDataSource;
}

export interface DefaultValues {
  [key: string]: SingleValueSchema | RangeValueSchema;
}

const conditionTypes: IConditionTypeDTO[] = [
  {
    value: CONDITION_TYPE_ENUM.EQUALS,
    label: CONDITION_VALUE[CONDITION_TYPE_ENUM.EQUALS],
  },
  {
    value: CONDITION_TYPE_ENUM.DIFFERENT_THAN,
    label: CONDITION_VALUE[CONDITION_TYPE_ENUM.DIFFERENT_THAN],
  },
  {
    value: CONDITION_TYPE_ENUM.GREATER_THAN,
    label: CONDITION_VALUE[CONDITION_TYPE_ENUM.GREATER_THAN],
  },
  {
    value: CONDITION_TYPE_ENUM.GREATER_THAN_OR_EQUAL_TO,
    label: CONDITION_VALUE[CONDITION_TYPE_ENUM.GREATER_THAN_OR_EQUAL_TO],
  },
];

const items: MenuProps = {
  items: [
    { label: "Correo colaborador", key: "email_collaboration" },
    { label: "Correo client", key: "email_client" },
  ],
};

export interface IFilterUI {
  id: string;
  schema: yup.ObjectSchema<any>;
  defaultValues: DefaultValues;
  onSubmit: (filters: IFilterDTO[]) => void;
  onClose: () => void;
}

export const FilterUI = (props: IFilterUI) => {
  const { id, onSubmit, schema, defaultValues, onClose } = props;
  const [fields, setFields] = useState<string[]>();
  const [dynamicSchema, setSchema] = useState(schema);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
    reset,
    getValues,
  } = useForm({ defaultValues, resolver: yupResolver(dynamicSchema) });

  useEffect(() => {
    getFields();
  }, [schema, defaultValues]);

  const getFields = () => {
    if (!schema?.fields) return;
    const schemaFields = Object.keys(schema.fields);
    setFields(schemaFields);
  };

  const getAtomTypeUI = (field: string): string => {
    return getValues(field)?.dataSource?.atomTypeUI ?? "";
  };

  const isDisabled = (field: string, fieldNumber?: number): boolean => {
    const disabled = getValues(field)?.dataSource?.disabled;
    const disabledInitialValue =
      getValues(field)?.dataSource?.disabledInitialValue;
    const disabledFinalValue = getValues(field)?.dataSource?.disabledFinalValue;

    if (disabled) return disabled;
    if (disabledInitialValue && fieldNumber == 1) return disabledInitialValue;
    if (disabledFinalValue && fieldNumber == 2) return disabledFinalValue;
    return false;
  };

  const getPlaceholder = (
    field: string,
    fieldNumber?: number
  ): string | undefined => {
    const placeholder = getValues(field)?.dataSource?.placeholder;
    const placeholderInitialValue =
      getValues(field)?.dataSource?.placeholderInitialValue;
    const placeholderFinalValue =
      getValues(field)?.dataSource?.placeholderFinalValue;

    if (placeholder) return placeholder;
    if (placeholderInitialValue && fieldNumber == 1)
      return placeholderInitialValue;
    if (placeholderFinalValue && fieldNumber == 2) return placeholderFinalValue;
    return undefined;
  };

  const isRange = (field: string): boolean => {
    const object = getValues(field);
    if ("initialValue" in object && "finalValue" in object) return true;
    return false;
  };

  const hasSelectDataSource = (field: string): boolean => {
    const object = getValues(field);
    if ("dataSource" in object?.dataSource) return true;
    return false;
  };

  const fieldRules = (
    field: string,
    type: ATOM_TYPE_UI_ENUM,
    isRangeCheck: boolean = false,
    hasDataSourceCheck: boolean = false
  ) => {
    const atomType = getAtomTypeUI(field);
    const isRangeField = isRange(field);
    const hasDataSource = hasSelectDataSource(field);

    return (
      atomType === type &&
      (isRangeCheck ? isRangeField : !isRangeField) &&
      (!hasDataSourceCheck || hasDataSource)
    );
  };

  const getDataSource = (field: string) => {
    const object = getValues(field);
    return object?.dataSource?.dataSource;
  };

  const status = (errorSchema: any, fieldNumber?: number) => {
    if (errorSchema?.value)
      return errorSchema?.value?.message ? "error" : undefined;
    if (errorSchema?.initialValue && fieldNumber == 1)
      return errorSchema?.initialValue?.message ? "error" : undefined;
    if (errorSchema?.finalValue && fieldNumber == 2)
      return errorSchema?.finalValue?.message ? "error" : undefined;
    return undefined;
  };

  const setErrors = (errorSchema: any, fieldNumber?: number) => {
    if (errorSchema?.value) return errorSchema?.value?.message;
    if (errorSchema?.initialValue && fieldNumber == 1)
      return errorSchema?.initialValue?.message;
    if (errorSchema?.finalValue && fieldNumber == 2)
      return errorSchema?.finalValue?.message;
    return undefined;
  };

  const handleReset = (fieldsToReset?: string[]) => {
    const fields = fieldsToReset?.length
      ? fieldsToReset
      : Object.keys(defaultValues);
    const clearedValues = fields.reduce((acc: any, key) => {
      const field = defaultValues[key];
      if (field) {
        acc[key] = { ...field };
        if ("value" in field) acc[key].value = undefined;
        if ("initialValue" in field) acc[key].initialValue = undefined;
        if ("finalValue" in field) acc[key].finalValue = undefined;
      }
      return acc;
    }, {} as DefaultValues);

    reset(clearedValues);
  };

  const onSubmitFilter = (data: any) => {
    let filters: IFilterDTO[] = [];
    const schemaFields = Object.keys(data);
    const addFilter = (filter: IFilterDTO) => {
      filters.push(filter);
    };

    schemaFields.forEach((field: string) => {
      const getData = data[field];
      const { value, initialValue, finalValue, condition, dataSource } =
        getData || {};
      const atomTypeUI = getAtomTypeUI(field);
      const isDatePicker = atomTypeUI === ATOM_TYPE_UI_ENUM.DATE_PICKER_UI;

      if (isDatePicker && value) {
        addFilter({
          field: dataSource?.field,
          condition,
          value: formatDate(value),
        });
      }

      if (isDatePicker && initialValue && finalValue) {
        addFilter({
          field: dataSource?.field,
          condition,
          initialValue: formatDate(initialValue),
          finalValue: formatDate(finalValue),
        });
      }

      if (!isDatePicker && initialValue && finalValue) {
        addFilter({
          field: dataSource?.field,
          condition,
          initialValue,
          finalValue,
        });
      }

      if (!isDatePicker && value) {
        addFilter({
          field: dataSource?.field,
          condition,
          value,
        });
      }
    });

    onSubmit(filters);
  };

  const deleteFilter = (field: string) => {
    const currentValues = getValues();
    const updatedValues = Object.keys(currentValues).reduce(
      (acc: DefaultValues, key) => {
        if (key !== field) {
          acc[key] = currentValues[key];
        }
        return acc;
      },
      {}
    );
    const updatedSchema = updateSchema(dynamicSchema, field);
    setSchema(updatedSchema);
    setFields(fields?.filter((item) => item !== field));
    reset(updatedValues);
  };

  const updateSchema = (
    currentSchema: yup.ObjectSchema<any>,
    fieldToRemove: string
  ): yup.ObjectSchema<any> => {
    // Obtener todas las claves del esquema actual
    const remainingFields = Object.keys(currentSchema.fields).filter(
      (key) => key !== fieldToRemove
    );

    // Crear un nuevo esquema con los campos restantes
    const newShape = remainingFields.reduce((acc: any, key) => {
      acc[key] = currentSchema.fields[key];
      return acc;
    }, {});

    return yup.object().shape(newShape);
  };

  return (
    <div key={id} className="filter-core">
      <div className="filter-core__head">
        <h3 className="filter-core__head__title">Filtros</h3>
        <CloseOutlined className="filter-core__head__close" onClick={onClose} />
      </div>
      <div className="filter-core__body__titles">
        <div className="filter-core__body__titles__condition">Condicion</div>
        <div>Valor</div>
        <ButtonUI
          id="btn-form-filters-clear"
          type="text"
          size="small"
          text="Limpiar todo"
          onClick={() => handleReset()}
          className="filter-core__body__titles__clear"
        />
      </div>

      <div className="filter-core__body">
        <form
          className="filter-core__body__form"
          onSubmit={handleSubmit(onSubmitFilter)}
        >
          {fields &&
            fields.map((field, index) => (
              <div
                key={`${field}${index}`}
                className="filter-core__body__form__container"
              >
                <div className="filter-core__body__form__container__item">
                  {conditionTypes?.length != 0 && (
                    <Dropdown
                      menu={items}
                      placement="bottomLeft"
                      trigger={["click"]}
                      className="filter-core__body__form__container__item__dropdown"
                    >
                      <Button
                        type="text"
                        size="small"
                        className="filter-core__body__form__container__item__dropdown__select"
                      >
                        Igual
                      </Button>
                    </Dropdown>
                  )}
                  {(fieldRules(field, ATOM_TYPE_UI_ENUM.INPUT_UI) && (
                    <InputUI
                      id={`${field}`}
                      name={`${field}.value`}
                      control={control}
                      status={status(errors?.[field])}
                      errors={setErrors(errors?.[field])}
                      onChange={() => trigger(`${field}.value`)}
                      placeholder={getPlaceholder(field)}
                      maxLength={60}
                      size="small"
                      className="filter-core__body__form__container__item__text"
                      disabled={isDisabled(field)}
                    />
                  )) ||
                    (fieldRules(
                      field,
                      ATOM_TYPE_UI_ENUM.SELECT_UI,
                      false,
                      true
                    ) && (
                      <SelectUI
                        id={`${field}`}
                        name={`${field}.value`}
                        control={control}
                        status={status(errors?.[field])}
                        errors={setErrors(errors?.[field])}
                        onChange={() => trigger(`${field}.value`)}
                        placeholder={getPlaceholder(field)}
                        dataSource={getDataSource(field)}
                        size="small"
                        className="filter-core__body__form__container__item__select"
                        disabled={isDisabled(field)}
                      />
                    )) ||
                    (fieldRules(field, ATOM_TYPE_UI_ENUM.DATE_PICKER_UI) && (
                      <DatePickerUI
                        id={`${field}`}
                        name={`${field}.value`}
                        control={control}
                        status={status(errors?.[field])}
                        errors={setErrors(errors?.[field])}
                        onChange={() => trigger(`${field}.value`)}
                        placeholder={getPlaceholder(field)}
                        className="filter-core__body__form__container__item__date"
                        size="small"
                        disabled={isDisabled(field)}
                      />
                    )) ||
                    (fieldRules(
                      field,
                      ATOM_TYPE_UI_ENUM.DATE_PICKER_UI,
                      true
                    ) && (
                      <div className="filter-core__body__form__container__item-range__range-date">
                        <DatePickerUI
                          id={`${field}`}
                          name={`${field}.initialValue`}
                          control={control}
                          status={status(errors?.[field], 1)}
                          errors={setErrors(errors?.[field], 1)}
                          onChange={() => trigger(`${field}.initialValue`)}
                          placeholder={getPlaceholder(field, 1)}
                          className="filter-core__body__form__container__item-range__range-date__date"
                          size="small"
                          disabled={isDisabled(field, 1)}
                        />
                        <DatePickerUI
                          id={`${field}`}
                          name={`${field}.finalValue`}
                          control={control}
                          status={status(errors?.[field], 2)}
                          errors={setErrors(errors?.[field], 2)}
                          onChange={() => trigger(`${field}.finalValue`)}
                          placeholder={getPlaceholder(field, 2)}
                          className="filter-core__body__form__container__item-range__range-date__date"
                          size="small"
                          disabled={isDisabled(field, 2)}
                        />
                      </div>
                    )) ||
                    (fieldRules(field, ATOM_TYPE_UI_ENUM.INPUT_CURRENCY_UI) && (
                      <InputCurrencyUI
                        id={`${field}`}
                        name={`${field}.value`}
                        control={control}
                        status={status(errors?.[field])}
                        errors={setErrors(errors?.[field])}
                        onChange={() => trigger(`${field}.value`)}
                        size="small"
                        placeholder={getPlaceholder(field)}
                        className="filter-core__body__form__container__item__number"
                        disabled={isDisabled(field)}
                      />
                    )) ||
                    (fieldRules(
                      field,
                      ATOM_TYPE_UI_ENUM.INPUT_CURRENCY_UI,
                      true
                    ) && (
                      <div className="filter-core__body__form__container__item-range__range-currency">
                        <InputCurrencyUI
                          id={`${field}`}
                          name={`${field}.initialValue`}
                          control={control}
                          status={status(errors?.[field], 1)}
                          errors={setErrors(errors?.[field], 1)}
                          onChange={() => trigger(`${field}.initialValue`)}
                          size="small"
                          className="filter-core__body__form__container__item-range__range-currency__currency"
                          placeholder={getPlaceholder(field, 1)}
                          disabled={isDisabled(field, 1)}
                        />
                        <InputCurrencyUI
                          id={`${field}`}
                          name={`${field}.finalValue`}
                          control={control}
                          status={status(errors?.[field], 2)}
                          errors={setErrors(errors?.[field], 2)}
                          onChange={() => trigger(`${field}.finalValue`)}
                          size="small"
                          className="filter-core__body__form__container__item-range__range-currency__currency"
                          placeholder={getPlaceholder(field, 2)}
                          disabled={isDisabled(field, 2)}
                        />
                      </div>
                    )) ||
                    (fieldRules(field, ATOM_TYPE_UI_ENUM.INPUT_NUMBER_UI) && (
                      <InputNumberUI
                        id={`${field}`}
                        name={`${field}.value`}
                        control={control}
                        status={status(errors?.[field])}
                        errors={setErrors(errors?.[field])}
                        onChange={() => trigger(`${field}.value`)}
                        placeholder={getPlaceholder(field)}
                        size="small"
                        className="filter-core__body__form__container__item__value"
                        disabled={isDisabled(field)}
                      />
                    )) ||
                    (fieldRules(
                      field,
                      ATOM_TYPE_UI_ENUM.INPUT_NUMBER_UI,
                      true
                    ) && (
                      <div className="filter-core__body__form__container__item-range__range-number">
                        <InputNumberUI
                          id={`${field}`}
                          name={`${field}.initialValue`}
                          control={control}
                          status={status(errors?.[field], 1)}
                          errors={setErrors(errors?.[field], 1)}
                          onChange={() => trigger(`${field}.initialValue`)}
                          placeholder={getPlaceholder(field, 1)}
                          size="small"
                          className="filter-core__body__form__container__item-range__range-number__number"
                          disabled={isDisabled(field, 1)}
                        />
                        <InputNumberUI
                          id={`${field}`}
                          name={`${field}.finalValue`}
                          control={control}
                          status={status(errors?.[field], 2)}
                          errors={setErrors(errors?.[field], 2)}
                          onChange={() => trigger(`${field}.finalValue`)}
                          placeholder={getPlaceholder(field, 2)}
                          size="small"
                          className="filter-core__body__form__container__item-range__range-number__number"
                          disabled={isDisabled(field, 2)}
                        />
                      </div>
                    )) ||
                    (fieldRules(field, ATOM_TYPE_UI_ENUM.TIME_PICKER_UI) && (
                      <TimePickerUI
                        id={`${field}`}
                        name={`${field}.value`}
                        control={control}
                        status={status(errors?.[field])}
                        errors={setErrors(errors?.[field])}
                        onChange={() => trigger(`${field}.value`)}
                        placeholder={getPlaceholder(field)}
                        size="small"
                        className="filter-core__body__form__container__item__value"
                        disabled={isDisabled(field)}
                      />
                    )) ||
                    (fieldRules(
                      field,
                      ATOM_TYPE_UI_ENUM.TIME_PICKER_UI,
                      true
                    ) && (
                      <div className="filter-core__body__form__container__item-range__range-time">
                        <TimePickerUI
                          id={`${field}`}
                          name={`${field}.initialValue`}
                          control={control}
                          status={status(errors?.[field], 1)}
                          errors={setErrors(errors?.[field], 1)}
                          onChange={() => trigger(`${field}.initialValue`)}
                          placeholder={getPlaceholder(field, 1)}
                          size="small"
                          className="filter-core__body__form__container__item-range__range-time__time"
                          disabled={isDisabled(field, 1)}
                        />
                        <TimePickerUI
                          id={`${field}`}
                          name={`${field}.finalValue`}
                          control={control}
                          status={status(errors?.[field], 2)}
                          errors={setErrors(errors?.[field], 2)}
                          onChange={() => trigger(`${field}.finalValue`)}
                          placeholder={getPlaceholder(field, 2)}
                          size="small"
                          className="filter-core__body__form__container__item-range__range-time__time"
                          disabled={isDisabled(field, 2)}
                        />
                      </div>
                    ))}
                </div>
                <ButtonUI
                  id="btn-form-filters"
                  type="text"
                  size="small"
                  onClick={() => {
                    deleteFilter(field);
                  }}
                  icon={<CloseOutlined />}
                  className="filter-core__body__form__container__delete"
                />
              </div>
            ))}

          <div className="filter-core__body__form__actions">
            <Dropdown
              menu={items}
              placement="bottomLeft"
              trigger={["click"]}
              className="filter-core__body__form__actions__add"
            >
              <Button type="text" icon={<PlusOutlined />}>
                Añadir filtro
              </Button>
            </Dropdown>
            <ButtonUI
              id="btn-form-filters"
              htmlType="submit"
              type="primary"
              text="Aplicar"
              disabled={!isValid}
              className="filter-core__body__form__actions__apply"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
