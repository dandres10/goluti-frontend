import "./home.scss";
import * as yup from "yup";
import { IAppointmentLogicProps } from "./home-logic";
import { ButtonUI } from "@/bus/shared/ui/atoms";
import { DrawerUI } from "@/bus/shared/ui/molecules";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import {
  conditionTypeDate,
  conditionTypeNumber,
  conditionTypeString,
  conditionTypeTime,
  DefaultValues,
  filterConditionTypesByKeys,
  FilterUI,
} from "@/bus/shared/ui/molecules/filter-ui/filter-ui";
import { CONDITION_TYPE_ENUM } from "@/bus/core/enums/condition-type-enum";
import { ATOM_TYPE_UI_ENUM } from "@/bus/core/enums/atom-type-ui-enum";
import { IConditionTypeDTO } from "@/appointment/core/interfaces/i-condition-type-dto";
import { CONDITION_VALUE } from "@/appointment/core/enums/condition-type-enum";
import { useEffect, useState } from "react";
dayjs.extend(isSameOrAfter);

const countries: IConditionTypeDTO[] = [
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

const emailSchema = yup.object({
  condition: yup.string(),
  value: yup
    .string()
    .required("El correo es requerido")
    .matches(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, "Correo invalido")
    .email("Correo invalido"),
  dataSource: yup.object(),
});

const countriesSchema = yup.object({
  condition: yup.string(),
  value: yup.string().required("El Pais es requerido"),
  dataSource: yup.object(),
});

const dateSchema = yup.object({
  condition: yup.string(),
  value: yup
    .date()
    .required("La fecha es requerida")
    .typeError("Debe ser una fecha válida")
    .nonNullable("La fecha es requerida")
    .min("2024-12-11", "La fecha debe ser mayor o igual a hoy"),
  dataSource: yup.object(),
});

const dateSchemaRange = yup.object({
  condition: yup.string(),
  initialValue: yup
    .date()
    .required("La fecha es requerida")
    .typeError("Debe ser una fecha válida")
    .nonNullable("La fecha es requerida")
    .min("2024-12-11", "La fecha debe ser mayor o igual a hoy"),
  finalValue: yup
    .date()
    .required("La fecha es requerida")
    .typeError("Debe ser una fecha válida")
    .nonNullable("La fecha es requerida")
    .min("2024-12-11", "La fecha debe ser mayor o igual a hoy")
    .test("validate-range-fin", "Rango no valido", function (value) {
      const { initialValue } = this.parent;
      if (!initialValue || !value) return true;
      return dayjs(value).isSameOrAfter(dayjs(initialValue));
    }),
  dataSource: yup.object(),
});

const currencySchema = yup.object({
  condition: yup.string(),
  value: yup
    .number()
    .required("El valor es requerido")
    .nonNullable("El valor es requerido")
    .max(100000000000, "El valor esta fuera del rango"),
  dataSource: yup.object(),
});

const currencySchemaRange = yup.object({
  condition: yup.string(),
  initialValue: yup
    .number()
    .required("El valor es requerido")
    .nonNullable("El valor es requerido")
    .max(100000000000, "El valor esta fuera del rango"),
  finalValue: yup
    .number()
    .required("El valor es requerido")
    .nonNullable("El valor es requerido")
    .max(100000000000, "El valor esta fuera del rango")
    .test("validate-range-currency", "Rango no valido", function (value) {
      const { initialValue } = this.parent;
      if (!initialValue || !value) return true;
      return !(initialValue > value);
    }),
  dataSource: yup.object(),
});

const numberSchema = yup.object({
  condition: yup.string(),
  value: yup
    .number()
    .required("El numero es requerido")
    .max(100000000000, "El valor esta fuera del rango"),
  dataSource: yup.object(),
});

const numberSchemaRange = yup.object({
  condition: yup.string(),
  initialValue: yup
    .number()
    .required("El numero es requerido")
    .max(100000000000, "El valor esta fuera del rango"),
  finalValue: yup
    .number()
    .required("El numero es requerido")
    .max(100000000000, "El valor esta fuera del rango")
    .test("validate-range-number", "Rango no valido", function (value) {
      const { initialValue } = this.parent;
      if (!initialValue || !value) return true;
      return !(initialValue > value);
    }),
  dataSource: yup.object(),
});

const timeAppointmentSchema = yup.object({
  condition: yup.string(),
  value: yup.string().required("La hora es requerida"),
  dataSource: yup.object(),
});

const timeAppointmentSchemaRange = yup.object({
  condition: yup.string(),
  initialValue: yup
    .string()
    .required("La hora es requerida")
    .matches(/^([01]\d|2[0-3]):[0-5]\d$/, "Debe estar en formato HH:mm"),
  finalValue: yup
    .string()
    .required("La hora es requerida")
    .matches(/^([01]\d|2[0-3]):[0-5]\d$/, "Debe estar en formato HH:mm")
    .test("is-greater", "Rango no valido", function (finalValue) {
      const { initialValue } = this.parent;
      if (!initialValue || !finalValue) return true;
      return finalValue > initialValue;
    }),
  dataSource: yup.object(),
});

const schemaCore = yup.object({
  emailSchema,
  countriesSchema,
  dateSchema,
  dateSchemaRange,
  currencySchema,
  currencySchemaRange,
  numberSchema,
  numberSchemaRange,
  timeAppointmentSchema,
  timeAppointmentSchemaRange,
});

const defaultValuesCore: DefaultValues = {
  emailSchema: {
    condition: CONDITION_TYPE_ENUM.EQUALS,
    value: undefined,
    dataSource: {
      atomTypeUI: ATOM_TYPE_UI_ENUM.INPUT_UI,
      field: "email",
      placeholder: "email",
      disabled: false,
      conditionDataSource: conditionTypeString(),
      label: "Correo",
    },
  },
  countriesSchema: {
    condition: CONDITION_TYPE_ENUM.EQUALS,
    value: undefined,
    dataSource: {
      atomTypeUI: ATOM_TYPE_UI_ENUM.SELECT_UI,
      field: "country",
      placeholder: "pais",
      dataSource: countries,
      disabled: false,
      conditionDataSource: filterConditionTypesByKeys([
        CONDITION_TYPE_ENUM.EQUALS,
        CONDITION_TYPE_ENUM.DIFFERENT_THAN,
      ]),
      label: "Pais",
    },
  },
  dateSchema: {
    condition: CONDITION_TYPE_ENUM.EQUALS,
    value: undefined,
    dataSource: {
      atomTypeUI: ATOM_TYPE_UI_ENUM.DATE_PICKER_UI,
      field: "date",
      placeholder: "fecha",
      disabled: false,
      conditionDataSource: conditionTypeDate(),
      label: "Fecha",
    },
  },
  dateSchemaRange: {
    condition: CONDITION_TYPE_ENUM.BETWEEN,
    initialValue: undefined,
    finalValue: undefined,
    dataSource: {
      atomTypeUI: ATOM_TYPE_UI_ENUM.DATE_PICKER_UI,
      field: "date",
      placeholderInitialValue: "fecha inicio",
      placeholderFinalValue: "fecha final",
      disabledInitialValue: false,
      disabledFinalValue: false,
      conditionDataSource: conditionTypeDate(),
      label: "Fecha",
    },
  },
  currencySchema: {
    condition: CONDITION_TYPE_ENUM.EQUALS,
    value: undefined,
    dataSource: {
      atomTypeUI: ATOM_TYPE_UI_ENUM.INPUT_CURRENCY_UI,
      field: "amount",
      placeholder: "monto",
      disabled: false,
      conditionDataSource: conditionTypeNumber(),
      label: "Monto",
    },
  },
  currencySchemaRange: {
    condition: CONDITION_TYPE_ENUM.BETWEEN,
    initialValue: undefined,
    finalValue: undefined,
    dataSource: {
      atomTypeUI: ATOM_TYPE_UI_ENUM.INPUT_CURRENCY_UI,
      field: "amount",
      placeholderInitialValue: "monto inicial",
      placeholderFinalValue: "monto final",
      disabledInitialValue: false,
      disabledFinalValue: false,
      conditionDataSource: conditionTypeNumber(),
      label: "Monto",
    },
  },
  numberSchema: {
    condition: CONDITION_TYPE_ENUM.EQUALS,
    value: undefined,
    dataSource: {
      atomTypeUI: ATOM_TYPE_UI_ENUM.INPUT_NUMBER_UI,
      field: "amount-card",
      placeholder: "numero",
      disabled: false,
      conditionDataSource: conditionTypeNumber(),
      label: "Numero",
    },
  },
  numberSchemaRange: {
    condition: CONDITION_TYPE_ENUM.BETWEEN,
    initialValue: undefined,
    finalValue: undefined,
    dataSource: {
      atomTypeUI: ATOM_TYPE_UI_ENUM.INPUT_NUMBER_UI,
      field: "amount-card",
      placeholderInitialValue: "numero inicial",
      placeholderFinalValue: "numero final",
      disabledInitialValue: false,
      disabledFinalValue: false,
      conditionDataSource: conditionTypeNumber(),
      label: "Numero",
    },
  },
  timeAppointmentSchema: {
    condition: CONDITION_TYPE_ENUM.EQUALS,
    value: undefined,
    dataSource: {
      atomTypeUI: ATOM_TYPE_UI_ENUM.TIME_PICKER_UI,
      field: "time_appointment",
      placeholder: "hora",
      disabled: false,
      conditionDataSource: conditionTypeTime(),
      label: "Hora",
    },
  },
  timeAppointmentSchemaRange: {
    condition: CONDITION_TYPE_ENUM.BETWEEN,
    initialValue: undefined,
    finalValue: undefined,
    dataSource: {
      atomTypeUI: ATOM_TYPE_UI_ENUM.TIME_PICKER_UI,
      field: "time_appointment",
      placeholderInitialValue: "hora inicial",
      placeholderFinalValue: "hora final",
      disabledInitialValue: false,
      disabledFinalValue: false,
      conditionDataSource: conditionTypeTime(),
      label: "Tiempo",
    },
  },
};

export const fields: any[] = [
  { key: "email", label: "Correo" },
  { key: "country", label: "Pais" },
  { key: "date", label: "Fecha" },
  { key: "amount", label: "Monto" },
  { key: "time_appointment", label: "Hora cita" },
];

export const AppointmentView = (props: IAppointmentLogicProps) => {
  const { showDrawer, onClose, open, onSubmit } = props;
  const [schema, setSchema] = useState(schemaCore);
  const [defaultValues, setDefaultValues] = useState(defaultValuesCore);

  const handleSchema = (schema: any) => {
    setSchema(schema);
  };

  const handleDefaultValues = (defaultValues: any) => {
    setDefaultValues(defaultValues);
  };

  return (
    <div className="appointment-home">
      <ButtonUI
        id="button-filter"
        type="primary"
        text="Filtro"
        className="appointment-home__filter"
        onClick={showDrawer}
      />
      <DrawerUI
        id="drawer-filter"
        placement={"right"}
        onClose={onClose}
        open={open}
        component={
          <FilterUI
            id="filter-one"
            defaultValues={defaultValuesCore}
            fields={fields}
            schema={schemaCore}
            onSubmit={onSubmit}
            onClose={onClose}
            onChangeSchema={handleSchema}
            onChangeDefaultValues={handleDefaultValues}
          />
        }
      />
    </div>
  );
};
