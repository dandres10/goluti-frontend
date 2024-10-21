import { Provider } from "react-redux";
import { storeOnboarding } from "./store";

const ReduxProviderOnboarding = ({ children }: any) => {
  return <Provider store={storeOnboarding}>{children}</Provider>;
};

export default ReduxProviderOnboarding;
