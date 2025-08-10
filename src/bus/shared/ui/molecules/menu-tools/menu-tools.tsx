import { CloseOutlined, LogoutOutlined, SaveOutlined } from "@ant-design/icons";
import "./menu-tools.scss";
import { ButtonUI, IDataSourceDTO, SelectUI } from "@bus/shared/ui/atoms";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { IPlatformConfigurationDTO } from "@/bus/domain/models/redux/bus/platform/i-platform-configuration-dto";
import { useEffect, useState } from "react";
import {
  ICompanyReduxDTO,
  ILanguageReduxDTO,
  ILocationReduxDTO,
  IRolReduxDTO,
} from "@/bus/domain/models/redux/bus/platform";
import { InjectionEventFacade } from "@/bus/facade/event/injection/injection-event-facade";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/core/routes/routes";
import { InjectionSessionFacade } from "@/bus/facade/session/injection/injection-session-facade";
import { ILocationDTO } from "@platform/domain/models/apis/platform/entities/location";

const _platformEventFacade = InjectionEventFacade.PlatformEventFacade();
const _platformSessionFacade = InjectionSessionFacade.PlatformSessionFacade();

export interface IMenuToolsUI {
  id: string;
  onClose: () => void;
  onChangeCompany: (company: string) => Promise<ILocationDTO[] | null>;
  platformConfiguration: IPlatformConfigurationDTO | undefined;
}

const schema = yup.object({
  rol: yup.string().required("Rol es requerido"),
  company: yup.string().required("Compañia es requerida"),
  location: yup.string().required("Sede es requerida"),
  language: yup.string().required("Idioma es requerido"),
});

export const MenuToolsUI = (props: IMenuToolsUI) => {
  const { id, onClose, onChangeCompany, platformConfiguration } = props;
  const [companies, setCompanies] = useState<IDataSourceDTO[] | undefined>([]);
  const [locations, setLocations] = useState<IDataSourceDTO[] | undefined>([]);
  const [languages, setLanguages] = useState<IDataSourceDTO[] | undefined>([]);
  const [rols, setRols] = useState<any[] | undefined>([]);
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
    setValue,
  } = useForm({
    defaultValues: {
      rol: platformConfiguration?.rol_id ?? "",
      company: platformConfiguration?.company_id ?? "",
      location: platformConfiguration?.location_id ?? "",
      language: platformConfiguration?.language_id ?? "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<any> = (data: any) => {
    console.log(data);
  };

  useEffect(() => {
    getCompanies();
    getLocations();
    getLanguages();
    getRols();
  }, [platformConfiguration]);

  const getCompanies = () => {
    const companies = platformConfiguration?.companies?.map(
      (company: ICompanyReduxDTO) => {
        return {
          label: company.name,
          value: company.id,
        };
      }
    );

    setCompanies(companies);
  };

  const getLocations = () => {
    const locations = platformConfiguration?.locations?.map(
      (location: ILocationReduxDTO) => {
        return {
          label: location.name,
          value: location.id,
        };
      }
    );

    setLocations(locations);
  };

  const getLanguages = () => {
    const languages = platformConfiguration?.languages?.map(
      (language: ILanguageReduxDTO) => {
        return {
          label: language.nativeName,
          value: language.id,
        };
      }
    );

    setLanguages(languages);
  };

  const getRols = () => {
    const rols = platformConfiguration?.rols?.map((rol: IRolReduxDTO) => {
      return {
        label: rol.name,
        value: rol.id,
      };
    });

    setRols(rols);
  };

  const logout = () => {
    _platformEventFacade.dispatchLogoutEvent();
    _platformSessionFacade.deleteSession();
    navigate(ROUTES.WELCOME_HOME);
    onClose();
  };

  const handleChangeCompany = async (company: string) => {
    let locations = await onChangeCompany(company).then((locations: ILocationDTO[] | null) => locations ?? []);
    if (!locations) {
      return;
    }
    setValue('location', '');
    await trigger('location');
    const locationsDataSource = locations.map((location: ILocationDTO) => {
      return {
        label: location.name,
        value: location.id ?? "",
      };
    });
    setLocations(locationsDataSource);
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
              disabled={true}
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
              onChange={(e) => {
                trigger("company");
                handleChangeCompany(e);
              }}
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
              dataSource={languages}
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
            onClick={logout}
            icon={<LogoutOutlined />}
          />
        </form>
      </div>
    </div>
  );
};
