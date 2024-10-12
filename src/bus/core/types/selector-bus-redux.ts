import { IInitialStateRedux } from '@/bus/domain/services/repositories/redux/auth';
import { TypedUseSelectorHook } from 'react-redux';

// Define el estado global con una propiedad `bus` de tipo `IInitialStateRedux`
type RootState = {
  bus: IInitialStateRedux;
};

// Define el tipo para el `useSelector` tipado
export type SelectorBusRedux = TypedUseSelectorHook<RootState>;