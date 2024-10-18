import { Provider } from "react-redux";
import { storeBus } from "../../../core/config/redux/store";

const ReduxProviderBus = ({ children }: any) => {
  return <Provider store={storeBus}>{children}</Provider>;
};

export default ReduxProviderBus;
