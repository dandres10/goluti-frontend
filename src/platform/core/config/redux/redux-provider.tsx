import { Provider } from "react-redux";
import { storePlatform } from "./store";

const ReduxProviderPlatform = ({ children }: any) => {
  return <Provider store={storePlatform}>{children}</Provider>;
};

export default ReduxProviderPlatform;
