
import { TypedUseSelectorHook } from 'react-redux';
import { IInitialStateReduxDTO } from '../../infrastructure/repositories/redux/bus/appointment.slice';



// Define el estado global con una propiedad `bus` de tipo `IInitialStateReduxDTO`
type RootState = {
  appointment: IInitialStateReduxDTO;
};

// Define el tipo para el `useSelector` tipado
export type SelectorAppointmentRedux = TypedUseSelectorHook<RootState>;