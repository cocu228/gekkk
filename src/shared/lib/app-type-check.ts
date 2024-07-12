// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export const IS_GEKKARD_APP = () => global.VITE_APP_TYPE.toLowerCase().includes("gekkard");
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export const IS_GEKKWALLET_APP = () => global.VITE_APP_TYPE.toLowerCase().includes("gekwallet");
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export const IS_GEKKOIN_APP = () => global.VITE_APP_TYPE.toLowerCase().includes("gekkoin");
