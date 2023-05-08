export const formatAsNumber = (str: string) => str.replace(/\D/g, "")

const pattern = /^[^.\d]+|[^\d.]+$/g;
export const formatAsNumberAndDot = (str: string) => str.replace(pattern, "")