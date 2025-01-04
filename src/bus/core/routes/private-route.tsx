import { KEYS_SESSION_ENUM } from "@bus/core/enums/keys-session-enum";
import { IPlatformReduxDTO } from "@/bus/domain/models/redux/bus/platform";
import { getFromSessionStorage } from "@bus/core/functions/session-storange";

export const PrivateRoute = ({ children }: any) => {
  const platform: IPlatformReduxDTO | null = getFromSessionStorage(
    KEYS_SESSION_ENUM.PLATFORM
  );
  const hasPermission = platform?.token;
  return hasPermission ? children : (window.location.href = "/welcome/home");
};
