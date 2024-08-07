import { useContext } from "react";

import { IconCoin } from "@/shared/ui/icons/icon-coin";
import { CtxCurrencies } from "@/processes/CurrenciesContext";

import styles from "./styles.module.scss";

interface IParams {
  onClick: () => void;
  tokenCurrency: string;
}

const TokenButton = ({ onClick, tokenCurrency }: IParams) => {
  const { currencies } = useContext(CtxCurrencies);
  if (!currencies) return null;

  const tokenData = currencies.get(tokenCurrency);

  return (
    <button
      onClick={onClick}
      className={`${styles.TokenButton} h-[60px] rounded-sm w-full px-5 py-3 flex items-center justify-between`}
    >
      {!tokenData ? (
        <div className='text-gray-400 text-base md:text-sm'>Choose token...</div>
      ) : (
        <div className='flex gap-4 items-center'>
          <IconCoin width={34} height={34} code={tokenData.$const} />
          <p className='font-medium text-sm'>
            {tokenData.name} ({tokenData.$const})
          </p>
        </div>
      )}
    </button>
  );
};

export default TokenButton;
