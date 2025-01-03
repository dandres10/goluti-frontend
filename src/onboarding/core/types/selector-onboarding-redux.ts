
import { TypedUseSelectorHook } from 'react-redux';
import { IInitialStateReduxDTO } from '../../infrastructure/repositories/redux/bus/onboarding.slice';



// Define el estado global con una propiedad `bus` de tipo `IInitialStateReduxDTO`
type RootState = {
  onboarding: IInitialStateReduxDTO;
};

// Define el tipo para el `useSelector` tipado
export type SelectorOnboardingRedux = TypedUseSelectorHook<RootState>;