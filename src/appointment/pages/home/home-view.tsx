import "./home.scss";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { IAppointmentLogicProps } from "./home-logic";
import { useForm } from "react-hook-form";
import { ButtonUI, InputUI, SelectUI } from "@/bus/shared/ui/atoms";
import { DrawerUI } from "@/bus/shared/ui/molecules";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
dayjs.extend(isSameOrAfter);
import { Button, Dropdown } from "antd";
import { DatePickerUI } from "@/bus/shared/ui/atoms/date-picker-ui/date-picker-ui";
import { InputNumberUI } from "@/bus/shared/ui/atoms/input-number-ui/input-number-ui";
import { InputCurrencyUI } from "@/bus/shared/ui/atoms/input-currency-ui/input-currency-ui";
import { useEffect } from "react";

const emailSchema = yup.object({
  condition: yup.string(),
  email: yup
    .string()
    .required("El correo es requerido")
    .matches(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, "Correo invalido")
    .email("Correo invalido"),
  typeFC: yup.string(),
});

const countriesSchema = yup.object({
  condition: yup.string(),
  country: yup.string().required("El Pais es requerido"),
});

const dateSchema = yup.object({
  condition: yup.string(),
  date: yup
    .date()
    .required("La fecha es requerida")
    .typeError("Debe ser una fecha válida")
    .nonNullable("La fecha es requerida")
    .min("2024-12-11", "La fecha debe ser mayor o igual a hoy"),
});

const rangeDateSchema = yup.object({
  condition: yup.string(),
  dateInit: yup
    .date()
    .required("La fecha es requerida")
    .typeError("Debe ser una fecha válida")
    .nonNullable("La fecha es requerida")
    .min("2024-12-11", "La fecha debe ser mayor o igual a hoy"),
  dateFin: yup
    .date()
    .required("La fecha es requerida")
    .typeError("Debe ser una fecha válida")
    .nonNullable("La fecha es requerida")
    .min("2024-12-11", "La fecha debe ser mayor o igual a hoy")
    .test("validate-range-fin", "Rango no valido", function (value) {
      const { dateInit } = this.parent;
      if (!dateInit || !value) return true;
      return dayjs(value).isSameOrAfter(dayjs(dateInit));
    }),
});

const currencySchema = yup.object({
  condition: yup.string(),
  creditLimit: yup
    .number()
    .required("El valor es requerido")
    .nonNullable("El valor es requerido")
    .max(100000000000, "El valor esta fuera del rango"),
});

const rangeCurrencySchema = yup.object({
  condition: yup.string(),
  initialCurrency: yup
    .number()
    .required("El valor es requerido")
    .nonNullable("El valor es requerido")
    .max(100000000000, "El valor esta fuera del rango"),
  finalCurrency: yup
    .number()
    .required("El valor es requerido")
    .nonNullable("El valor es requerido")
    .max(100000000000, "El valor esta fuera del rango")
    .test("validate-range-currency", "Rango no valido", function (value) {
      const { initialCurrency } = this.parent;
      if (!initialCurrency || !value) return true;
      return !(initialCurrency > value);
    }),
});

const numberSchema = yup.object({
  condition: yup.string(),
  numbers: yup
    .number()
    .required("El numero es requerido")
    .max(100000000000, "El valor esta fuera del rango"),
});

const rangeNumberSchema = yup.object({
  condition: yup.string(),
  initialNumber: yup
    .number()
    .required("El numero es requerido")
    .max(100000000000, "El valor esta fuera del rango"),
  finalNumber: yup
    .number()
    .required("El numero es requerido")
    .max(100000000000, "El valor esta fuera del rango")
    .test("validate-range-number", "Rango no valido", function (value) {
      const { initialNumber } = this.parent;
      if (!initialNumber || !value) return true;
      return !(initialNumber > value);
    }),
});

const masterSchema = yup.object({
  emailSchema,
  countriesSchema,
  dateSchema,
  rangeDateSchema,
  currencySchema,
  rangeCurrencySchema,
  numberSchema,
  rangeNumberSchema,
});

export const AppointmentView = (props: IAppointmentLogicProps) => {
  const { showDrawer, onClose, open, conditionTypes, conditions, items } =
    props;

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
    getValues,
  } = useForm({
    defaultValues: {
      emailSchema: { condition: "==", email: undefined, typeFC: "InputUI" },
      dateSchema: { condition: "==", date: undefined },
      countriesSchema: { condition: "==", country: undefined },
      rangeDateSchema: {
        condition: "==",
        dateInit: undefined,
        dateFin: undefined,
      },
      currencySchema: { condition: "==", creditLimit: undefined },
      rangeCurrencySchema: {
        condition: "==",
        initialCurrency: undefined,
        finalCurrency: undefined,
      },
      numberSchema: { condition: "==", numbers: undefined },
      rangeNumberSchema: {
        condition: "==",
        initialNumber: undefined,
        finalNumber: undefined,
      },
    },
    resolver: yupResolver(masterSchema),
  });

  useEffect(() => {
    console.log(masterSchema);
    console.log(getValues("emailSchema"));
  }, []);

  const onSubmit = (data: any) => {
    console.log("es valido el formuario", isValid);
    console.log("datos", data);
  };

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
          <div className="filter-core">
            <div className="filter-core__head">
              <h3 className="filter-core__head__title">Filtros</h3>
              <CloseOutlined
                className="filter-core__head__close"
                onClick={onClose}
              />
            </div>
            <div className="filter-core__body__titles">
              <div className="filter-core__body__titles__condition">
                Condicion
              </div>
              <div>Valor</div>
            </div>

            <div className="filter-core__body">
              <form
                className="filter-core__body__form"
                onSubmit={handleSubmit(onSubmit)}
              >
                {[1].map((item) => (
                  <div
                    key={item}
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

                      <InputUI
                        id="email"
                        name="emailSchema.email"
                        control={control}
                        status={
                          errors?.emailSchema?.email?.message
                            ? "error"
                            : undefined
                        }
                        errors={errors?.emailSchema?.email?.message}
                        onChange={() => trigger("emailSchema.email")}
                        placeholder="email"
                        maxLength={60}
                        size="small"
                        className="filter-core__body__form__container__item__value"
                      />
                    </div>
                    <ButtonUI
                      id="btn-form-filters"
                      type="text"
                      size="small"
                      icon={<CloseOutlined />}
                      className="filter-core__body__form__container__delete"
                    />
                  </div>
                ))}

                {[1].map((item) => (
                  <div
                    key={item}
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

                      <SelectUI
                        id="country"
                        name="countriesSchema.country"
                        control={control}
                        status={
                          errors?.countriesSchema?.country?.message
                            ? "error"
                            : undefined
                        }
                        errors={errors?.countriesSchema?.country?.message}
                        onChange={() => trigger("countriesSchema.country")}
                        placeholder="pais"
                        dataSource={conditionTypes}
                        size="small"
                        className="filter-core__body__form__container__item__select"
                      />
                    </div>
                    <ButtonUI
                      id="btn-form-filters"
                      type="text"
                      size="small"
                      icon={<CloseOutlined />}
                      className="filter-core__body__form__container__delete"
                    />
                  </div>
                ))}

                {[1].map((item) => (
                  <div
                    key={item}
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

                      <DatePickerUI
                        id="date"
                        name="dateSchema.date"
                        control={control}
                        status={
                          errors.dateSchema?.date?.message ? "error" : undefined
                        }
                        errors={errors.dateSchema?.date?.message}
                        onChange={() => trigger("dateSchema.date")}
                        placeholder="fecha"
                        className="filter-core__body__form__container__item__date"
                        size="small"
                      />
                    </div>
                    <ButtonUI
                      id="btn-form-filters"
                      type="text"
                      size="small"
                      icon={<CloseOutlined />}
                      className="filter-core__body__form__container__delete"
                    />
                  </div>
                ))}

                {[1].map((item) => (
                  <div
                    key={item}
                    className="filter-core__body__form__container"
                  >
                    <div className="filter-core__body__form__container__item-range">
                      {conditionTypes?.length != 0 && (
                        <Dropdown
                          menu={items}
                          placement="bottomLeft"
                          trigger={["click"]}
                          className="filter-core__body__form__container__item-range__dropdown"
                        >
                          <Button
                            type="text"
                            size="small"
                            className="filter-core__body__form__container__item-range__dropdown__select"
                          >
                            Igual
                          </Button>
                        </Dropdown>
                      )}

                      <div className="filter-core__body__form__container__item-range__range-date">
                        <DatePickerUI
                          id="dateInit"
                          name="rangeDateSchema.dateInit"
                          control={control}
                          status={
                            errors.rangeDateSchema?.dateInit?.message
                              ? "error"
                              : undefined
                          }
                          errors={errors.rangeDateSchema?.dateInit?.message}
                          onChange={() => trigger("rangeDateSchema.dateInit")}
                          placeholder="fecha inicio"
                          className="filter-core__body__form__container__item-range__range-date__date"
                          size="small"
                        />
                        <DatePickerUI
                          id="dateFin"
                          name="rangeDateSchema.dateFin"
                          control={control}
                          status={
                            errors.rangeDateSchema?.dateFin?.message
                              ? "error"
                              : undefined
                          }
                          errors={errors.rangeDateSchema?.dateFin?.message}
                          onChange={() => trigger("rangeDateSchema.dateFin")}
                          placeholder="fecha fin"
                          className="filter-core__body__form__container__item-range__range-date__date"
                          size="small"
                        />
                      </div>
                    </div>
                    <ButtonUI
                      id="btn-form-filters"
                      type="text"
                      size="small"
                      icon={<CloseOutlined />}
                      className="filter-core__body__form__container__delete"
                    />
                  </div>
                ))}

                {[1].map((item) => (
                  <div
                    key={item}
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

                      <InputCurrencyUI
                        id="credit-limit"
                        className="filter-core__body__form__container__item__number"
                        name="currencySchema.creditLimit"
                        control={control}
                        size="small"
                        status={
                          errors.currencySchema?.creditLimit?.message
                            ? "error"
                            : undefined
                        }
                        errors={errors.currencySchema?.creditLimit?.message}
                        placeholder="valor"
                        onChange={() => trigger("currencySchema.creditLimit")}
                      />
                    </div>
                    <ButtonUI
                      id="btn-form-filters"
                      type="text"
                      size="small"
                      icon={<CloseOutlined />}
                      className="filter-core__body__form__container__delete"
                    />
                  </div>
                ))}

                {[1].map((item) => (
                  <div
                    key={item}
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

                      <div className="filter-core__body__form__container__item-range__range-currency">
                        <InputCurrencyUI
                          id="initialCurrency"
                          className="filter-core__body__form__container__item-range__range-currency__currency"
                          name="rangeCurrencySchema.initialCurrency"
                          control={control}
                          size="small"
                          status={
                            errors.rangeCurrencySchema?.initialCurrency?.message
                              ? "error"
                              : undefined
                          }
                          errors={
                            errors.rangeCurrencySchema?.initialCurrency?.message
                          }
                          placeholder="valor"
                          onChange={() =>
                            trigger("rangeCurrencySchema.initialCurrency")
                          }
                        />
                        <InputCurrencyUI
                          id="finalCurrency"
                          className="filter-core__body__form__container__item-range__range-currency__currency"
                          name="rangeCurrencySchema.finalCurrency"
                          control={control}
                          size="small"
                          status={
                            errors.rangeCurrencySchema?.finalCurrency?.message
                              ? "error"
                              : undefined
                          }
                          errors={
                            errors.rangeCurrencySchema?.finalCurrency?.message
                          }
                          placeholder="valor"
                          onChange={() =>
                            trigger("rangeCurrencySchema.finalCurrency")
                          }
                        />
                      </div>
                    </div>
                    <ButtonUI
                      id="btn-form-filters"
                      type="text"
                      size="small"
                      icon={<CloseOutlined />}
                      className="filter-core__body__form__container__delete"
                    />
                  </div>
                ))}

                {[1].map((item) => (
                  <div
                    key={item}
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

                      <InputNumberUI
                        id="numbers"
                        name="numberSchema.numbers"
                        control={control}
                        status={
                          errors.numberSchema?.numbers?.message
                            ? "error"
                            : undefined
                        }
                        errors={errors.numberSchema?.numbers?.message}
                        onChange={() => trigger("numberSchema.numbers")}
                        placeholder="numero"
                        size="small"
                        className="filter-core__body__form__container__item__value"
                      />
                    </div>
                    <ButtonUI
                      id="btn-form-filters"
                      type="text"
                      size="small"
                      icon={<CloseOutlined />}
                      className="filter-core__body__form__container__delete"
                    />
                  </div>
                ))}

                {[1].map((item) => (
                  <div
                    key={item}
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

                      <div className="filter-core__body__form__container__item-range__range-number">
                        <InputNumberUI
                          id="initialNumber"
                          name="rangeNumberSchema.initialNumber"
                          control={control}
                          errors={
                            errors.rangeNumberSchema?.initialNumber?.message
                          }
                          status={
                            errors.rangeNumberSchema?.initialNumber?.message
                              ? "error"
                              : undefined
                          }
                          onChange={() =>
                            trigger("rangeNumberSchema.initialNumber")
                          }
                          placeholder="numero"
                          size="small"
                          className="filter-core__body__form__container__item-range__range-number__number"
                        />
                        <InputNumberUI
                          id="finalNumber"
                          name="rangeNumberSchema.finalNumber"
                          control={control}
                          errors={
                            errors.rangeNumberSchema?.finalNumber?.message
                          }
                          status={
                            errors.rangeNumberSchema?.finalNumber?.message
                              ? "error"
                              : undefined
                          }
                          onChange={() =>
                            trigger("rangeNumberSchema.finalNumber")
                          }
                          placeholder="numero"
                          size="small"
                          className="filter-core__body__form__container__item-range__range-number__number"
                        />
                      </div>
                    </div>
                    <ButtonUI
                      id="btn-form-filters"
                      type="text"
                      size="small"
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
        }
      />
    </div>
  );
};
