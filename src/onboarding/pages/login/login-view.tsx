import "./login.scss";
import * as yup from "yup";
import { ILoginLogicProps } from "./login-logic";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  ButtonUI,
  InputPasswordUI,
  InputUI,
  LinkUI,
} from "@/bus/shared/ui/atoms";
import { IAuthLoginRequestDTO } from "@/appointment/domain/models/apis/platform/business/auth/login";

const schema = yup.object({
  email: yup
    .string()
    .matches(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, "Invalid email")
    .email("Invalid email")
    .required("Email is mandatory"),
  password: yup
    .string()
    .min(3, "Minimum password of 8 characters")
    .max(64, "Password maximum of 64 characters")
    .transform((value, _) => {
      return value ? value.replace(/[1]/g, "4") : value;
    })
    .required("Password is mandatory"),
});

export const LoginView = (props: ILoginLogicProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
  } = useForm({
    defaultValues: {
      email: "marlon@goluti.com",
      password: "admin",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IAuthLoginRequestDTO> = (
    data: IAuthLoginRequestDTO
  ) => {
    props.login(data);
  };

  return (
    <>
      <div className="login-view">
        <div className="login-view__head">
          <h1 className="login-view__head__title">Ingresar</h1>
        </div>

        <form className="login-view__form" onSubmit={handleSubmit(onSubmit)}>
          <div className="login-view__form__inputs">
            <InputUI
              id="email"
              name="email"
              control={control}
              status={errors.email?.message ? "error" : undefined}
              errors={errors.email?.message}
              onChange={() => trigger("email")}
              placeholder="Email"
              maxLength={60}
              width="100%"
              size="large"
            />

            <InputPasswordUI
              id="password"
              name="password"
              control={control}
              status={errors.password?.message ? "error" : undefined}
              errors={errors}
              placeholder="Password"
              onChange={() => trigger("password")}
              maxLength={64}
              width="100%"
              size="large"
            />

            <LinkUI
              id="link-password"
              className="login-view__form__link"
              text="Forgot password?"
            />
          </div>

          <ButtonUI
            id="button-form-session"
            htmlType="submit"
            type="primary"
            text="Continue"
            width="100%"
            disabled={!isValid}
            className="login-view__form__inputs"
          />
        </form>
      </div>
    </>
  );
};
