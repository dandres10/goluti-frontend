import "./login.scss";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  ButtonUI,
  InputPasswordUI,
  InputUI,
  LinkUI,
} from "@/bus/shared/ui/atoms";

interface IFormInput {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup
    .string()
    .matches(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, "Invalid email")
    .email("Invalid email")
    .required("Email is mandatory"),
  password: yup
    .string()
    .min(8, "Minimum password of 8 characters")
    .max(64, "Password maximum of 64 characters")
    .transform((value, originalValue) => {
      return value ? value.replace(/[1]/g, "4") : value;
    })
    .required("Password is mandatory"),
});

export const LoginView = (props: any) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    trigger,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data)
  };

  return (
    <div className="login-view">
      <form
        className="wrapper-login__container__login__form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="wrapper-login__container__login__form__head">
          <InputUI
            id="email"
            name="email"
            control={control}
            status={errors.email?.message ? "error" : undefined}
            errors={errors}
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
            className="wrapper-login__container__login__form__head__link"
            text="Forgot password?"
          />
        </div>

        
          <ButtonUI
            id="button-form-session"
            htmlType="submit"
            type="primary"
            text="Continue"
            width="100%"
            shape="round"
            disabled={!isValid}
            className="wrapper-login__container__login__form__submit"
          />
     
      </form>
    </div>
  );
};
