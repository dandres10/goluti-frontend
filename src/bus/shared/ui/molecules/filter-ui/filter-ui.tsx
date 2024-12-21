import "./filter.scss";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IFilterDTO } from "@/bus/core/interfaces/i-filter-dto";
import {
  CaretDownOutlined,
  CloseOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
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
import { DropdownSelectUI } from "../../atoms/dropdown-select-ui/dropdown-select-ui";

dayjs.extend(isSameOrAfter);

const actionsFilter: any[] = [
  { key: "cleanAll", label: "Limpiar todo" },
  { key: "deleteEverything", label: "Borrar todo" },
];

const fieldsFilterSchema = yup.object({
  value: yup.string(),
  dataSource: yup.object(),
});

const actionsFilterSchema = yup.object({
  value: yup.string(),
  dataSource: yup.object(),
});

export interface BaseDataSource {
  atomTypeUI: ATOM_TYPE_UI_ENUM;
  field: string;
  placeholder?: string;
  disabled?: boolean;
  dataSource?: any[];
  conditionDataSource?: any[];
  placeholderInitialValue?: string;
  placeholderFinalValue?: string;
  disabledInitialValue?: boolean;
  disabledFinalValue?: boolean;
}

export interface SingleValueSchema {
  condition?: CONDITION_TYPE_ENUM;
  value: string | number | undefined;
  dataSource?: BaseDataSource;
}

export interface RangeValueSchema {
  condition: CONDITION_TYPE_ENUM.BETWEEN;
  initialValue: string | number | undefined;
  finalValue: string | number | undefined;
  dataSource?: BaseDataSource;
}

export interface DefaultValues {
  [key: string]: SingleValueSchema | RangeValueSchema;
}

export interface FieldsFilter {
  label: string;
  field: string;
}

export interface IFilterUI {
  id: string;
  schema: yup.ObjectSchema<any>;
  defaultValues: DefaultValues;
  fields: FieldsFilter[];
  onSubmit: (filters: IFilterDTO[]) => void;
  onClose: () => void;
}

export const FilterUI = (props: IFilterUI) => {
  const { id, onSubmit, schema, defaultValues, fields, onClose } = props;
  const [schemaFieldsCore, setSchemaFieldsCore] = useState<string[]>();
  const [dynamicSchema, setSchema] = useState(() => yup.object().shape({}));
  const [dynamicDefaultValues, setDynamicDefaultValues] = useState({});
  const defaultValuesFilter: any = {
    fieldsFilterSchema: {
      value: undefined,
      dataSource: {
        atomTypeUI: ATOM_TYPE_UI_ENUM.DROPDOWN_SELECT_UI,
        field: "fields",
        dataSource: fields,
        disabled: false,
      },
    },
    actionsFilterSchema: {
      value: undefined,
      dataSource: {
        atomTypeUI: ATOM_TYPE_UI_ENUM.DROPDOWN_SELECT_UI,
        field: "actionsFilter",
        dataSource: actionsFilter,
        disabled: false,
      },
    },
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
    reset,
    getValues,
  } = useForm<DefaultValues>({
    defaultValues: dynamicDefaultValues,
    resolver: yupResolver(dynamicSchema),
  });

  useEffect(() => {
    const newDefaults = {
      ...defaultValuesFilter,
      fieldsFilterSchema: defaultValuesFilter["fieldsFilterSchema"],
      actionsFilterSchema: defaultValuesFilter["actionsFilterSchema"],
    };

    const newSchemaFields = {
      ...dynamicSchema.fields,
      fieldsFilterSchema: fieldsFilterSchema,
      actionsFilterSchema: actionsFilterSchema,
    };

    setDynamicDefaultValues(newDefaults);
    setSchema(yup.object().shape(newSchemaFields));
  }, []);

  useEffect(() => {
    reset(dynamicDefaultValues);
  }, [dynamicDefaultValues]);

  useEffect(() => {
    getSchemaFields();
  }, [dynamicDefaultValues]);

  const getSchemaFields = () => {
    if (!getValues()) return;
    const schemaFields = Object.keys(getValues());
    setSchemaFieldsCore(schemaFields);
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
    if (!field || !object) return false;

    if ("initialValue" in object && "finalValue" in object) return true;
    return false;
  };

  const hasSelectDataSource = (field: string): boolean => {
    const object = getValues(field);
    if (!field || !object || !object?.dataSource) return false;
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

  const getConditionDataSource = (field: string) => {
    const object = getValues(field);
    return object?.dataSource?.conditionDataSource;
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
      : schemaFieldsCore ?? [];
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

    const newDefaultValues = {
      ...clearedValues,
      fieldsFilterSchema: defaultValuesFilter["fieldsFilterSchema"],
      actionsFilterSchema: defaultValuesFilter["actionsFilterSchema"],
    };

    setDynamicDefaultValues(newDefaultValues);
    reset(newDefaultValues);
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

    filters = filters?.filter(
      (filter) => !["fields", "actionsFilter"].includes(filter.field)
    );

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
    setDynamicDefaultValues(updatedValues);
    const updatedSchema = deleteSchema(dynamicSchema, field);
    setSchema(updatedSchema);
    setSchemaFieldsCore(
      schemaFieldsCore?.filter((item: any) => item !== field)
    );
  };

  const deleteSchema = (
    currentSchema: yup.ObjectSchema<any>,
    fieldToRemove: string
  ): yup.ObjectSchema<any> => {
    const remainingFields = Object.keys(currentSchema.fields).filter(
      (key) => key !== fieldToRemove
    );

    const newShape = remainingFields.reduce((acc: any, key) => {
      acc[key] = currentSchema.fields[key];
      return acc;
    }, {});

    return yup.object().shape(newShape);
  };

  const onclickCondition = (field: any) => {
    const schemaFields = Object.keys(schema.fields);
    let schemaSearch: any;
    let getElement!: string;

    for (const element of schemaFields) {
      const hasSchema =
        defaultValues[element]?.condition !== CONDITION_TYPE_ENUM.BETWEEN &&
        defaultValues[element]?.dataSource?.field === field;
      if (hasSchema) {
        schemaSearch = schema.fields[element];
        getElement = element;
        break;
      }
    }

    addFieldToSchema(getElement, schemaSearch, defaultValues[getElement]);
  };

  const addFieldToSchema = (
    fieldKey: string,
    fieldSchema: yup.Schema<any>,
    fieldDefaultValue: any
  ) => {
    setSchema((prevSchema) => {
      const updatedFields = { ...prevSchema.fields, [fieldKey]: fieldSchema };
      return yup.object().shape(updatedFields);
    });
    setDynamicDefaultValues({
      ...getValues(),
      [fieldKey]: fieldDefaultValue,
    });
  };

  const handleChangeCondition = (
    field: string,
    condition: CONDITION_TYPE_ENUM
  ) => {
    console.log(field);
    console.log(condition);
  };

  const handleActions = (e: any) => {
    if (e === "cleanAll") {
      handleReset();
    }
    if (e === "deleteEverything") {
    }
  };

  const isEmpity = () => {
    return schemaFieldsCore?.length === 2;
  };

  return (
    <div key={id} className="filter-core">
      <div className="filter-core__head">
        <h3 className="filter-core__head__title">Filtros</h3>
        <CloseOutlined className="filter-core__head__close" onClick={onClose} />
      </div>
      {isEmpity() ? (
        <div className="filter-core__body__titles-empity"></div>
      ) : (
        <div className="filter-core__body__titles">
          <div className="filter-core__body__titles__head">
            <div className="filter-core__body__titles__head__key">
              Condicion
            </div>
            <div className="filter-core__body__titles__head_value">Valor</div>
          </div>
          <DropdownSelectUI
            id="btn-form-filters-actions"
            name="actionsFilterSchema.value"
            control={control}
            onChange={(e) => {
              trigger("actionsFilterSchema.value");
              handleActions(e);
            }}
            dataSource={getDataSource("actionsFilterSchema")}
            className="filter-core__body__titles__clear"
            fixedText="Acciones"
            icon={<CaretDownOutlined />}
          />
        </div>
      )}

      <div className="filter-core__body">
        <form className="filter-core__body__form">
          {isEmpity() && (
            <div className="filter-core__body__form__empty">
              <div>
                No tienes filtros seleccionados. ¿Por qué no pruebas agregar
                uno?
              </div>
              <DropdownSelectUI
                id="fields-filter"
                name="fieldsFilterSchema.value"
                control={control}
                onChange={(e) => {
                  trigger("fieldsFilterSchema.value");
                  onclickCondition(e);
                }}
                dataSource={getDataSource("fieldsFilterSchema")}
                className="filter-core__body__form__actions__add"
                fixedText="Agregar filtro"
                icon={<PlusOutlined />}
              />
            </div>
          )}

          {schemaFieldsCore &&
            schemaFieldsCore
              .filter(
                (x) =>
                  !["fieldsFilterSchema", "actionsFilterSchema"].includes(x)
              )
              .map((field, index) => (
                <div
                  key={`${field}${index}`}
                  className="filter-core__body__form__container"
                >
                  <div className="filter-core__body__form__container__item">
                    <DropdownSelectUI
                      id={`${field}`}
                      name={`${field}.condition`}
                      control={control}
                      errors={setErrors(errors?.[field])}
                      onChange={(e) => {
                        trigger(`${field}.condition`);
                        handleChangeCondition(field, e);
                      }}
                      dataSource={getConditionDataSource(field)}
                      className="filter-core__body__form__container__item__condition"
                    />
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
                      (fieldRules(
                        field,
                        ATOM_TYPE_UI_ENUM.INPUT_CURRENCY_UI
                      ) && (
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
        </form>
        {!isEmpity() && (
          <div className="filter-core__body__form__actions">
            <DropdownSelectUI
              id="fields-filter"
              name="fieldsFilterSchema.value"
              control={control}
              onChange={(e) => {
                trigger("fieldsFilterSchema.value");
                onclickCondition(e);
              }}
              dataSource={getDataSource("fieldsFilterSchema")}
              className="filter-core__body__form__actions__add"
              fixedText="Agregar filtro"
              icon={<PlusOutlined />}
            />
            <ButtonUI
              id="btn-form-filters"
              type="primary"
              text="Aplicar"
              onClick={handleSubmit(onSubmitFilter)}
              disabled={
                !isValid ||
                !(schemaFieldsCore?.length !== 0) ||
                !(schemaFieldsCore && schemaFieldsCore?.length > 2)
              }
              className="filter-core__body__form__actions__apply"
            />
          </div>
        )}
      </div>
    </div>
  );
};
