export const getWithdrawDesc = (miWithdraw: null | number, $const: string, title: string) =>
  !miWithdraw ? "" : `${title} ${miWithdraw.toString()} ${$const}`;
