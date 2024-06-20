import { Decimal } from "decimal.js";
import { useTranslation } from "react-i18next";

export const getWithdrawDesc = (miWithdraw: null | number, $const: string) => {
  const { t } = useTranslation();
  return !miWithdraw ? "" : `${t("minimum_amount")} ${new Decimal(miWithdraw).toString()} ${$const}`;
};
