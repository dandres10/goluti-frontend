import { storeBus } from "@/bus/store/store";
import { Provider } from "react-redux";

const ReduxProviderBus = ({ children }: any) => {
  return <Provider store={storeBus}>{children}</Provider>;
};

export default ReduxProviderBus;
