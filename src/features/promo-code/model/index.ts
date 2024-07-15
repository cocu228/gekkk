export const validateStatus = (status: boolean | null) => {
  if (status === null) {
    return undefined;
  } else {
    return status ? "success" : "error";
  }
};
