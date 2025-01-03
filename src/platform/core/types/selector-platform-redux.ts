
import { TypedUseSelectorHook } from 'react-redux';
import { IInitialStateReduxDTO } from '../../infrastructure/repositories/redux/bus/platform.slice';



// Define el estado global con una propiedad `bus` de tipo `IInitialStateReduxDTO`
type RootState = {
  platform: IInitialStateReduxDTO;
};

// Define el tipo para el `useSelector` tipado
export type SelectorPlatformRedux = TypedUseSelectorHook<RootState>;