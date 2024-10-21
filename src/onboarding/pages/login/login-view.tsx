import "./login.scss";

export const LoginView = (props: any) => {
  return <div className="login-view">{props?.user?.firstName}</div>;
};
