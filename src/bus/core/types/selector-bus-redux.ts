
import { TypedUseSelectorHook } from 'react-redux';
import { IInitialStateReduxDTO } from '../config/redux/slices/bus';

// Define el estado global con una propiedad `bus` de tipo `IInitialStateReduxDTO`
type RootState = {
  bus: IInitialStateReduxDTO;
};

// Define el tipo para el `useSelector` tipado
export type SelectorBusRedux = TypedUseSelectorHook<RootState>;