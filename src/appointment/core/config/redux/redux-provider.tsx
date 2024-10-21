import { Provider } from "react-redux";
import { storeAppointment } from "./store";

const ReduxProviderAppointment = ({ children }: any) => {
  return <Provider store={storeAppointment}>{children}</Provider>;
};

export default ReduxProviderAppointment;
