import { useAppSelector } from "@/bus/core/config";
import { IUserReduxDTO } from "@/bus/domain/models/redux/platform";




const userSelector = (): IUserReduxDTO | undefined => {
  const user = useAppSelector((state: any) => state?.bus?.platform?.configuration?.user);
  return user;
};

export const SELECTORS_PLATFORM = {
  userSelector,
};
