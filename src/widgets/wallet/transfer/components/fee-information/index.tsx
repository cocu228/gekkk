import { FC, memo, useContext } from "react";
import { useTranslation } from "react-i18next";

import { CtxFeeNetworks } from "@/widgets/wallet/transfer/model/context";
import { getChosenNetwork, isCryptoNetwork } from "@/widgets/wallet/transfer/model/helpers";

const FeeInformation: FC = () => {
  const { t } = useTranslation();
  const { tokenNetworks, networkTypeSelect } = useContext(CtxFeeNetworks);

  const { percent_fee = 0, withdraw_fee = 0, token_symbol } = getChosenNetwork(tokenNetworks, networkTypeSelect) ?? {};

  const fee = percent_fee > 0 ? `${percent_fee}%` : withdraw_fee > 0 ? `${withdraw_fee} ${token_symbol}` : "0%";

  const initialChild = (
    <>
      {t("fee_is_prec")}&nbsp;
      <span className={"font-semibold"}>{fee}</span>
      &nbsp;{t("per_transaction")}
    </>
  );

  /*  const otherChild = (
    <>
      {t("fee_is_prec")}&nbsp;
      <span className={"font-semibold"}>{fee}</span>&nbsp;
      {t("after_n_transactions_per_m", { times: 5, period: t("month") })}
    </>
  )*/

  const render = (networkTypeSelect: number) => {
    const initialCheck = [150, 151, 154, 153, 155].includes(networkTypeSelect) || isCryptoNetwork(networkTypeSelect);

    if (initialCheck) {
      return initialChild;
    }

    return null;
  };

  if (!fee) {
    return null;
  }

  return (
    <div className='w-full md:flex flex-col hidden items-center text-[var(--gek-mid-grey)] md:text-fs12 text-fs14'>
      <p>{render(networkTypeSelect)}</p>
      <p>excluding discounts and bonuses</p>
    </div>
  );
};

export default memo(FeeInformation);
