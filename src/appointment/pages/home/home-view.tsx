import "./home.scss";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { IAppointmentLogicProps } from "./home-logic";
import { useForm, SubmitHandler } from "react-hook-form";
import { ButtonUI, InputUI, SelectUI } from "@/bus/shared/ui/atoms";
import { DrawerUI } from "@/bus/shared/ui/molecules";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import {
  CONDITION_TYPE,
  CONDITION_VALUE,
} from "@/appointment/core/enums/condition-type-enum";
import { Button, Dropdown } from "antd";

const schema = yup.object({
  email: yup
    .string()
    .matches(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, "Invalid email")
    .email("Invalid email")
    .required("Email is mandatory"),
  condition: yup.string().required("Condicion es requerida"),
});

export const AppointmentView = (props: IAppointmentLogicProps) => {
  const { showDrawer, onClose, open, conditionTypes, conditions, items } =
    props;
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
  } = useForm({
    defaultValues: {
      email: "",
      condition: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<any> = (data: any) => {
    console.log(data);
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
                {[1, 2, 3].map((item) => (
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
                        name="email"
                        control={control}
                        status={errors.email?.message ? "error" : undefined}
                        errors={errors}
                        onChange={() => trigger("email")}
                        placeholder="Email"
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
