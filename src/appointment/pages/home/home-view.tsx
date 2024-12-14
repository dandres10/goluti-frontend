import "./home.scss";
import * as yup from "yup";
import { IAppointmentLogicProps } from "./home-logic";
import { ButtonUI } from "@/bus/shared/ui/atoms";
import { DrawerUI } from "@/bus/shared/ui/molecules";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { FilterUI } from "@/bus/shared/ui/molecules/filter-ui/filter-ui";
import { CONDITION_TYPE_ENUM } from "@/bus/core/enums/condition-type-enum";
import { ATOM_TYPE_UI_ENUM } from "@/bus/core/enums/atom-type-ui-enum";
import { IConditionTypeDTO } from "@/appointment/core/interfaces/i-condition-type-dto";
import { CONDITION_VALUE } from "@/appointment/core/enums/condition-type-enum";
import { IFilterDTO } from "@/bus/core/interfaces/i-filter-dto";
dayjs.extend(isSameOrAfter);

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

const rangeDateSchema = yup.object({
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

const rangeCurrencySchema = yup.object({
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

const rangeNumberSchema = yup.object({
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

const schema = yup.object({
  emailSchema,
  countriesSchema,
  dateSchema,
  rangeDateSchema,
  currencySchema,
  rangeCurrencySchema,
  numberSchema,
  rangeNumberSchema,
});

const defaultValues = {
  emailSchema: {
    condition: CONDITION_TYPE_ENUM.EQUALS,
    value: undefined,
    dataSource: {
      atomTypeUI: ATOM_TYPE_UI_ENUM.INPUT_UI,
      field: "email",
      placeholder: "email",
    },
  },
  countriesSchema: {
    condition: CONDITION_TYPE_ENUM.EQUALS,
    value: undefined,
    dataSource: {
      atomTypeUI: ATOM_TYPE_UI_ENUM.SELECT_UI,
      field: "country",
      placeholder: "pais",
      dataSource: conditionTypes,
    },
  },
  dateSchema: {
    condition: CONDITION_TYPE_ENUM.EQUALS,
    value: undefined,
    dataSource: {
      atomTypeUI: ATOM_TYPE_UI_ENUM.DATE_PICKER_UI,
      field: "date",
      placeholder: "fecha",
    },
  },
  rangeDateSchema: {
    condition: CONDITION_TYPE_ENUM.BETWEEN,
    initialValue: undefined,
    finalValue: undefined,
    dataSource: {
      atomTypeUI: ATOM_TYPE_UI_ENUM.DATE_PICKER_UI,
      field: "dateRange",
      placeholderInitialValue: "fecha inicio",
      placeholderFinalValue: "fecha final",
    },
  },
  currencySchema: {
    condition: CONDITION_TYPE_ENUM.EQUALS,
    value: undefined,
    dataSource: {
      atomTypeUI: ATOM_TYPE_UI_ENUM.INPUT_CURRENCY_UI,
      field: "amount",
      placeholder: "monto",
    },
  },
  rangeCurrencySchema: {
    condition: CONDITION_TYPE_ENUM.BETWEEN,
    initialValue: undefined,
    finalValue: undefined,
    dataSource: {
      atomTypeUI: ATOM_TYPE_UI_ENUM.INPUT_CURRENCY_UI,
      field: "amount-card-range",
      placeholderInitialValue: "monto inicial",
      placeholderFinalValue: "monto final",
    },
  },
  numberSchema: {
    condition: CONDITION_TYPE_ENUM.EQUALS,
    value: undefined,
    dataSource: {
      atomTypeUI: ATOM_TYPE_UI_ENUM.INPUT_NUMBER_UI,
      field: "amount-card",
      placeholder: "numero",
    },
  },
  rangeNumberSchema: {
    condition: CONDITION_TYPE_ENUM.BETWEEN,
    initialValue: undefined,
    finalValue: undefined,
    dataSource: {
      atomTypeUI: ATOM_TYPE_UI_ENUM.INPUT_NUMBER_UI,
      field: "amount-card-we",
      placeholderInitialValue: "numero inicial",
      placeholderFinalValue: "numero final",
    },
  },
};

export const AppointmentView = (props: IAppointmentLogicProps) => {
  const { showDrawer, onClose, open, conditions, items, onSubmit } = props;

  const onChangeTraceability = () => {
    console.log("asdfasdf");
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
            defaultValues={defaultValues}
            schema={schema}
            onSubmit={onSubmit}
            onClose={onClose}
          />
        }
      />
    </div>
  );
};
