import { CloseOutlined, LogoutOutlined, SaveOutlined } from "@ant-design/icons";
import "./menu-tools.scss";
import { ButtonUI, SelectUI } from "../../atoms";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";

export interface IMenuToolsUI {
  id: string;
  onClose: () => void;
}

const rols: any[] = [
  { label: "Administrador", value: "ADMIN" },
  { label: "Colaborador", value: "COLLA" },
  { label: "Cliente", value: "CLIENT" },
];

const companies: any[] = [{ label: "Barbeer", value: "asdf-asdaf" }];
const locations: any[] = [
  { label: "Suba", value: "asdf-asderf" },
  { label: "Cajíca", value: "asdf-as34rf" },
];
const language: any[] = [
  { label: "Español", value: "asdf-asderf" },
  { label: "Ingles", value: "asdf-as34rf" },
];

const schema = yup.object({
  rol: yup.string().required("Rol es requerido"),
  company: yup.string().required("Compañia es requerida"),
  location: yup.string().required("Sede es requerida"),
  language: yup.string().required("Idioma es requerido"),
});

export const MenuToolsUI = (props: IMenuToolsUI) => {
  const { id, onClose } = props;
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
  } = useForm({
    defaultValues: {
      rol: undefined,
      company: undefined,
      location: undefined,
      language: undefined,
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<any> = (data: any) => {
    console.log(data);
  };

  return (
    <div key={id} className="menu-tools-ui">
      <div className="menu-tools-ui__head">
        <h3 className="menu-tools-ui__head__title">Configuración plataforma</h3>
        <ButtonUI
          id="btn-form-filters"
          type="text"
          onClick={onClose}
          icon={<CloseOutlined style={{ fontSize: "20px" }} />}
        />
      </div>

      <div className="menu-tools-ui__description">
        Ajusta las configuraciones generales de tu plataforma, como la empresa,
        sede, y preferencias de idioma.
      </div>

      <div className="menu-tools-ui__body">
        <form
          key="form-menu-tools"
          className="menu-tools-ui__form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="menu-tools-ui__form__wrapper-select">
            <SelectUI
              id="rol"
              name="rol"
              control={control}
              status={errors.rol?.message ? "error" : undefined}
              errors={errors.rol?.message}
              onChange={() => trigger("rol")}
              placeholder="Rol"
              dataSource={rols}
              className="menu-tools-ui__form__wrapper-select__select"
              disabled={false}
              label="Rol"
              size="small"
            />
          </div>
          <div className="menu-tools-ui__form__wrapper-select">
            <SelectUI
              id="company"
              name="company"
              control={control}
              status={errors.company?.message ? "error" : undefined}
              errors={errors.company?.message}
              onChange={() => trigger("company")}
              placeholder="Compañia"
              dataSource={companies}
              className="menu-tools-ui__form__wrapper-select__select"
              disabled={false}
              label="Compañia"
              size="small"
            />
          </div>
          <div className="menu-tools-ui__form__wrapper-select">
            <SelectUI
              id="location"
              name="location"
              control={control}
              status={errors.location?.message ? "error" : undefined}
              errors={errors.location?.message}
              onChange={() => trigger("location")}
              placeholder="Sede"
              dataSource={locations}
              className="menu-tools-ui__form__wrapper-select__select"
              disabled={false}
              label="Sede"
              size="small"
            />
          </div>
          <div className="menu-tools-ui__form__wrapper-select">
            <SelectUI
              id="language"
              name="language"
              control={control}
              status={errors.language?.message ? "error" : undefined}
              errors={errors.language?.message}
              onChange={() => trigger("language")}
              placeholder="Idioma"
              dataSource={language}
              className="menu-tools-ui__form__wrapper-select__select"
              disabled={false}
              label="Idioma"
              size="small"
            />
          </div>
          <ButtonUI
            id="button-form-save"
            text="Guardar cambios"
            type="primary"
            icon={<SaveOutlined />}
            onClick={handleSubmit(onSubmit)}
            disabled={!isValid}
          />
          <ButtonUI
            id="button-form-session"
            text="Cerrar sesión"
            className="menu-tools-ui__logout"
            icon={<LogoutOutlined />}
          />
        </form>
      </div>
    </div>
  );
};
