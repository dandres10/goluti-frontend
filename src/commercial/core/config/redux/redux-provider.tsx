import { Provider } from "react-redux";
import { storeCommercial } from "./store";

const ReduxProviderCommercial = ({ children }: any) => {
  return <Provider store={storeCommercial}>{children}</Provider>;
};

export default ReduxProviderCommercial;
