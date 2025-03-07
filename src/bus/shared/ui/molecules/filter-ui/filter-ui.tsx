import "./filter.scss";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IFilterDTO } from "@/bus/core/interfaces/i-filter-dto";
import {
  CaretDownOutlined,
  CloseOutlined,
  DeleteOutlined,
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

const conditionTypes: any[] = [
  { label: "Igual =", key: CONDITION_TYPE_ENUM.EQUALS },
  { label: "Difer ≠", key: CONDITION_TYPE_ENUM.DIFFERENT_THAN },
  { label: "Mayor >", key: CONDITION_TYPE_ENUM.GREATER_THAN },
  { label: "Menor <", key: CONDITION_TYPE_ENUM.LESS_THAN },
  { label: "Entre", key: CONDITION_TYPE_ENUM.BETWEEN },
  { label: "MyIgual ≥", key: CONDITION_TYPE_ENUM.GREATER_THAN_OR_EQUAL_TO },
  { label: "MnIgual ≤", key: CONDITION_TYPE_ENUM.LESS_THAN_OR_EQUAL_TO },
];

export const filterConditionTypesByKeys = (keys: CONDITION_TYPE_ENUM[]) => {
  return conditionTypes.filter((item) => keys.includes(item.key));
};

export const conditionTypeString = () => {
  return [
    { label: "Igual =", key: CONDITION_TYPE_ENUM.EQUALS },
    { label: "Difer ≠", key: CONDITION_TYPE_ENUM.DIFFERENT_THAN },
  ];
};

export const conditionTypeNumber = () => {
  return conditionTypes;
};
export const conditionTypeDate = () => {
  return conditionTypes;
};
export const conditionTypeTime = () => {
  return conditionTypes;
};

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
  label: string;
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
  key: string;
}

export interface IFilterUI {
  id: string;
  schema: yup.ObjectSchema<any>;
  defaultValues: DefaultValues;
  fields: FieldsFilter[];
  onSubmit: (filters: IFilterDTO[]) => void;
  onClose: () => void;
  onChangeSchema: (schema: any) => void;
  onChangeDefaultValues: (schema: any) => void;
}

export const FilterUI = (props: IFilterUI) => {
  const {
    id,
    onSubmit,
    schema,
    defaultValues,
    fields,
    onClose,
    onChangeSchema,
    onChangeDefaultValues,
  } = props;
  const [schemaFieldsCore, setSchemaFieldsCore] = useState<string[]>();
  const [dynamicSchema, setSchema] = useState(() => yup.object().shape({}));
  const [dynamicDefaultValues, setDynamicDefaultValues] = useState<any>({});
  const [formKey, setFormKey] = useState(Date.now());
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
    init();
  }, []);

  const init = () => {
    setSchemaFieldsCore([]); // Limpiar los campos
    const newDefaults = {
      ...defaultValuesFilter,
      fieldsFilterSchema: defaultValuesFilter["fieldsFilterSchema"],
      actionsFilterSchema: defaultValuesFilter["actionsFilterSchema"],
    };
    const newSchemaFields = {
      fieldsFilterSchema: fieldsFilterSchema,
      actionsFilterSchema: actionsFilterSchema,
    };
    setSchema(yup.object().shape(newSchemaFields));
    setDynamicDefaultValues(newDefaults);
    setTimeout(() => {
      reset(newDefaults, { keepValues: false });
    }, 0);
  };

  useEffect(() => {
    reset(dynamicDefaultValues, {
      keepErrors: false,
      keepDirty: false,
    });
    onChangeSchema(dynamicSchema);
    onChangeDefaultValues(dynamicDefaultValues);
  }, [dynamicDefaultValues, dynamicSchema]);

  /*   useEffect(() => {
    console.log("Dynamic Default Values:", dynamicDefaultValues);
    console.log("Dynamic Schema:", dynamicSchema.fields);
    console.log("Current Values:", getValues());
  }, [dynamicDefaultValues, dynamicSchema]); */

  useEffect(() => {
    getSchemaFields();
  }, [dynamicSchema, dynamicDefaultValues]);

  const getSchemaFields = () => {
    if (!dynamicSchema?.fields) return;
    const schemaFields = Object.keys(dynamicSchema?.fields);
    setSchemaFieldsCore(schemaFields);
  };

  const getAtomTypeUI = (field: string): string => {
    return getValues(field)?.dataSource?.atomTypeUI ?? "";
  };

  const getLabel = (field: string): string => {
    return getValues(field)?.dataSource?.label ?? "";
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

  const handleReset = () => {
    const currentValues = getValues();

    const clearedValues = Object.keys(currentValues).reduce((acc: any, key) => {
      if (key in dynamicSchema.fields) {
        const field = currentValues[key];

        const clearedField = {
          ...field,
          ...(field && "value" in field && { value: undefined }),
          ...(field && "initialValue" in field && { initialValue: undefined }),
          ...(field && "finalValue" in field && { finalValue: undefined }),
        };

        acc[key] = clearedField;
      }
      return acc;
    }, {});

    let newDefaultValues = {
      ...clearedValues,
      fieldsFilterSchema: defaultValuesFilter.fieldsFilterSchema,
      actionsFilterSchema: defaultValuesFilter.actionsFilterSchema,
    };

    newDefaultValues = updateAddFilter(newDefaultValues);

    reset(newDefaultValues, {
      keepErrors: false,
      keepDirty: false,
      keepTouched: false,
      keepValues: false,
    });

    setDynamicDefaultValues(newDefaultValues);

    setFormKey(Date.now());
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
      {} as DefaultValues
    );

    const updatedSchemaFields = Object.keys(dynamicSchema.fields)
      .filter((key) => key !== field)
      .reduce((acc: any, key) => {
        acc[key] =
          dynamicSchema.fields[key as keyof typeof dynamicSchema.fields];
        return acc;
      }, {});

    updatedSchemaFields["fieldsFilterSchema"] = fieldsFilterSchema;
    updatedSchemaFields["actionsFilterSchema"] = actionsFilterSchema;

    const newSchema = yup.object().shape(updatedSchemaFields);

    let newDefaultValues = {
      ...updatedValues,
      fieldsFilterSchema: defaultValuesFilter["fieldsFilterSchema"],
      actionsFilterSchema: defaultValuesFilter["actionsFilterSchema"],
    };

    newDefaultValues = updateAddFilter(newDefaultValues);

    setDynamicDefaultValues(newDefaultValues);
    setSchema(newSchema);
    reset(newDefaultValues, { keepErrors: false, keepDirty: false });
    setSchemaFieldsCore(Object.keys(newDefaultValues));
  };

  const updateAddFilter = (newDefaultValues: any) => {
    const keys = Object.keys(newDefaultValues);
    const fieldsNewDefaultValues: any[] = keys.map(
      (key: string) => newDefaultValues[key]?.dataSource?.field
    );
    const fieldsFilterSchemaDataSourceCore: any[] =
      defaultValuesFilter["fieldsFilterSchema"]?.dataSource?.dataSource;

    const dataSource = fieldsFilterSchemaDataSourceCore.filter(
      (fieldsCore) => !fieldsNewDefaultValues.includes(fieldsCore.key)
    );

    const getNewDefaultValues = {
      ...newDefaultValues,
      fieldsFilterSchema: {
        ...defaultValuesFilter["fieldsFilterSchema"],
        dataSource: {
          ...defaultValuesFilter["fieldsFilterSchema"].dataSource,
          value: undefined,
          dataSource: dataSource,
        },
      },
    };

    return getNewDefaultValues;
  };

  const onclickCondition = (
    field: string,
    isRange: boolean = false,
    condition?: CONDITION_TYPE_ENUM
  ) => {
    const schemaFields = Object.keys(schema.fields);
    const fieldKey = (() => {
      if (isRange) {
        return field.includes("Range") ? field : `${field}Range`;
      }
      if (field.includes("Range") || field.includes("Schema")) {
        return field.replace("Range", "");
      }
      return schemaFields.find(
        (element) =>
          defaultValues[element]?.condition !== CONDITION_TYPE_ENUM.BETWEEN &&
          defaultValues[element]?.dataSource?.field === field
      );
    })();

    if (!fieldKey) return;

    const schemaSearch: any = schema.fields[fieldKey];
    const defaultFieldValues = defaultValues[fieldKey];
    const dynamicFieldValues = dynamicDefaultValues[fieldKey];

    // Combinar valores dinámicos y por defecto
    const dynamicDefaultResult = {
      ...(dynamicFieldValues ?? defaultFieldValues),
      ...(condition && { condition }),
    };

    // Agregar al esquema
    addFieldToSchema(fieldKey, schemaSearch, dynamicDefaultResult);
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

    let newSchema = {
      ...getValues(),
      [fieldKey]: fieldDefaultValue,
    };

    newSchema = updateAddFilter(newSchema);
    setDynamicDefaultValues(newSchema);
  };

  const handleChangeCondition = (
    field: string,
    condition: CONDITION_TYPE_ENUM
  ) => {
    if (condition === CONDITION_TYPE_ENUM.BETWEEN) {
      deleteFilter(field);
      setTimeout(() => {
        onclickCondition(field, true, condition);
      }, 200);
    }
    if (condition !== CONDITION_TYPE_ENUM.BETWEEN) {
      deleteFilter(field);
      setTimeout(() => {
        onclickCondition(field, false, condition);
      }, 200);
    }
  };

  const handleActions = (e: any) => {
    if (e === "cleanAll") {
      handleReset();
    }
    if (e === "deleteEverything") {
      init();
    }
  };

  const isEmpity = () => {
    return schemaFieldsCore?.length === 2;
  };

  const close = () => {
    /* init(); */
    onClose();
  };

  const changeValue = () => {
    setDynamicDefaultValues(getValues());
  };

  return (
    <div key={id} className="filter-core">
      <div className="filter-core__head">
        <h3 className="filter-core__head__title">Filtros</h3>
        <CloseOutlined className="filter-core__head__close" onClick={close} />
      </div>
      {isEmpity() ? (
        <div className="filter-core__body__titles-empity"></div>
      ) : (
        <div className="filter-core__body__titles">
          <div className="filter-core__body__titles__head">
            <div className="filter-core__body__titles__head__key">Campo</div>
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
        <form key={formKey} className="filter-core__body__form">
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
                <div key={`${index}c`}>
                  <div key={index} className="container-item">
                    <div className="container-item__label">
                      {getLabel(field)}
                    </div>
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
                            changeValue();
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
                            onChange={() => {
                              trigger(`${field}.value`);
                              changeValue();
                            }}
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
                              onChange={() => {
                                trigger(`${field}.value`);
                                changeValue();
                              }}
                              placeholder={getPlaceholder(field)}
                              dataSource={getDataSource(field)}
                              size="small"
                              className="filter-core__body__form__container__item__select"
                              disabled={isDisabled(field)}
                            />
                          )) ||
                          (fieldRules(
                            field,
                            ATOM_TYPE_UI_ENUM.DATE_PICKER_UI
                          ) && (
                            <DatePickerUI
                              id={`${field}`}
                              name={`${field}.value`}
                              control={control}
                              status={status(errors?.[field])}
                              errors={setErrors(errors?.[field])}
                              onChange={() => {
                                trigger(`${field}.value`);
                                changeValue();
                              }}
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
                                id={`${field}initial`}
                                name={`${field}.initialValue`}
                                control={control}
                                status={status(errors?.[field], 1)}
                                errors={setErrors(errors?.[field], 1)}
                                onChange={() => {
                                  trigger(`${field}.initialValue`);
                                  changeValue();
                                }}
                                placeholder={getPlaceholder(field, 1)}
                                className="filter-core__body__form__container__item-range__range-date__date"
                                size="small"
                                disabled={isDisabled(field, 1)}
                              />
                              <DatePickerUI
                                id={`${field}final`}
                                name={`${field}.finalValue`}
                                control={control}
                                status={status(errors?.[field], 2)}
                                errors={setErrors(errors?.[field], 2)}
                                onChange={() => {
                                  trigger(`${field}.finalValue`);
                                  changeValue();
                                }}
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
                              onChange={() => {
                                trigger(`${field}.value`);
                                changeValue();
                              }}
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
                                id={`${field}initial`}
                                name={`${field}.initialValue`}
                                control={control}
                                status={status(errors?.[field], 1)}
                                errors={setErrors(errors?.[field], 1)}
                                onChange={() => {
                                  trigger(`${field}.initialValue`);
                                  changeValue();
                                }}
                                size="small"
                                className="filter-core__body__form__container__item-range__range-currency__currency"
                                placeholder={getPlaceholder(field, 1)}
                                disabled={isDisabled(field, 1)}
                              />
                              <InputCurrencyUI
                                id={`${field}final`}
                                name={`${field}.finalValue`}
                                control={control}
                                status={status(errors?.[field], 2)}
                                errors={setErrors(errors?.[field], 2)}
                                onChange={() => {
                                  trigger(`${field}.finalValue`);
                                  changeValue();
                                }}
                                size="small"
                                className="filter-core__body__form__container__item-range__range-currency__currency"
                                placeholder={getPlaceholder(field, 2)}
                                disabled={isDisabled(field, 2)}
                              />
                            </div>
                          )) ||
                          (fieldRules(
                            field,
                            ATOM_TYPE_UI_ENUM.INPUT_NUMBER_UI
                          ) && (
                            <InputNumberUI
                              id={`${field}`}
                              name={`${field}.value`}
                              control={control}
                              status={status(errors?.[field])}
                              errors={setErrors(errors?.[field])}
                              onChange={() => {
                                trigger(`${field}.value`);
                                changeValue();
                              }}
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
                                id={`${field}initial`}
                                name={`${field}.initialValue`}
                                control={control}
                                status={status(errors?.[field], 1)}
                                errors={setErrors(errors?.[field], 1)}
                                onChange={() => {
                                  trigger(`${field}.initialValue`);
                                  changeValue();
                                }}
                                placeholder={getPlaceholder(field, 1)}
                                size="small"
                                className="filter-core__body__form__container__item-range__range-number__number"
                                disabled={isDisabled(field, 1)}
                              />
                              <InputNumberUI
                                id={`${field}final`}
                                name={`${field}.finalValue`}
                                control={control}
                                status={status(errors?.[field], 2)}
                                errors={setErrors(errors?.[field], 2)}
                                onChange={() => {
                                  trigger(`${field}.finalValue`);
                                  changeValue();
                                }}
                                placeholder={getPlaceholder(field, 2)}
                                size="small"
                                className="filter-core__body__form__container__item-range__range-number__number"
                                disabled={isDisabled(field, 2)}
                              />
                            </div>
                          )) ||
                          (fieldRules(
                            field,
                            ATOM_TYPE_UI_ENUM.TIME_PICKER_UI
                          ) && (
                            <TimePickerUI
                              id={`${field}`}
                              name={`${field}.value`}
                              control={control}
                              status={status(errors?.[field])}
                              errors={setErrors(errors?.[field])}
                              onChange={() => {
                                trigger(`${field}.value`);
                                changeValue();
                              }}
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
                                id={`${field}initial`}
                                name={`${field}.initialValue`}
                                control={control}
                                status={status(errors?.[field], 1)}
                                errors={setErrors(errors?.[field], 1)}
                                onChange={() => {
                                  trigger(`${field}.initialValue`);
                                  changeValue();
                                }}
                                placeholder={getPlaceholder(field, 1)}
                                size="small"
                                className="filter-core__body__form__container__item-range__range-time__time"
                                disabled={isDisabled(field, 1)}
                              />
                              <TimePickerUI
                                id={`${field}final`}
                                name={`${field}.finalValue`}
                                control={control}
                                status={status(errors?.[field], 2)}
                                errors={setErrors(errors?.[field], 2)}
                                onChange={() => {
                                  trigger(`${field}.finalValue`);
                                  changeValue();
                                }}
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
                        icon={<DeleteOutlined />}
                        className="filter-core__body__form__container__delete"
                      />
                    </div>
                  </div>
                  <div className="filter-core__body__form__divider"></div>
                </div>
              ))}
          {!isEmpity() && schemaFieldsCore && (
            <div className="filter-core__body__form__add-container">
              <DropdownSelectUI
                id="fields-filter"
                name="fieldsFilterSchema.value"
                control={control}
                onChange={(e) => {
                  trigger("fieldsFilterSchema.value");
                  onclickCondition(e);
                }}
                dataSource={getDataSource("fieldsFilterSchema")}
                className="filter-core__body__form__add-container__add"
                fixedText="Agregar filtro"
                icon={<PlusOutlined />}
              />
            </div>
          )}
        </form>
        {!isEmpity() && (
          <div className="filter-core__body__form__actions">
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
