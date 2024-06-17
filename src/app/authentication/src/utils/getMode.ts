export type AppType = "GEKKARD" | "GEKWALLET" | "GEKKOIN";

export const IS_GEKKARD_APP = (): boolean => global.VITE_APP_TYPE.toLowerCase().includes("gekkard");
export const IS_GEKKWALLET_APP = (): boolean => global.VITE_APP_TYPE.toLowerCase().includes("gekwallet");
export const IS_GEKKOIN_APP = (): boolean => global.VITE_APP_TYPE.toLowerCase().includes("gekkoin");
export const getInitialAppType = (): AppType => global.VITE_APP_TYPE;