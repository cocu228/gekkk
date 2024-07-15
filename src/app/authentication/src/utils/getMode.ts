export type AppType = "gekkard" | "gekwallet" | "gekkoin";

export const IS_GEKKARD_APP = (): boolean => import.meta.env.MODE.includes("gekkard");
export const IS_GEKKWALLET_APP = (): boolean => import.meta.env.MODE.includes("gekwallet");
export const IS_GEKKOIN_APP = (): boolean => import.meta.env.MODE.includes("gekkoin");
export const getInitialAppType = () => {
  const mode = import.meta.env.MODE;
  return mode.split(".")[1] as AppType;
};
