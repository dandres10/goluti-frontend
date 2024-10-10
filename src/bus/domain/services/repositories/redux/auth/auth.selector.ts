import { useAppSelector } from "@/bus/core/config";


export interface IPlatformSelector {
  platformSelector: Function;
}

const platformSelector = () => {
  const { platform } = useAppSelector((state:any) => state.auth);
  return platform;
};

export const SELECTORS_AUTH: IPlatformSelector = {
  platformSelector,
};
