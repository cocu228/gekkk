import { FC } from "react";
import { IconCoin } from "@/shared/ui/icons/icon-coin";
import { getRoundingValue } from "@/shared/lib";
import { useTranslation } from "react-i18next";
import { CurrenciesOptionType } from "@/widgets/custom-history/model/types";

interface ICurrencyOptionProps {
  option: CurrenciesOptionType;
  onClick: (option: CurrenciesOptionType) => void;
}

const CurrencyRenderOption: FC<ICurrencyOptionProps> = ({ option, onClick }) => {
  const { t } = useTranslation();
  const { $const, currency } = option;

  return (
    <div
      className="w-full flex justify-between min-h-[60px] mt-2 bg-[white] rounded-lg cursor-pointer"
      onClick={() => onClick(option)}
    >
      <div className="ml-2 flex flex-row p-2 gap-5 justify-center items-center ">
        <IconCoin height={40} code={$const} />
        <span className="text-[12px] h-full flex items-center text-[#1F3446] font-bold">
          {$const === "EUR" ? (
            $const
          ) : (
            <div className="flex h-full flex-col justify-around">
              <span>{$const}</span>
              <span className="font-[400] whitespace-nowrap text-[#676767]">
                {currency.name}
              </span>
            </div>
          )}
        </span>
      </div>
      <div className="mr-2 flex flex-col justify-evenly p-2 min-w-[150px]">
        <span className="self-start ml-[15%] text-[12px] text-[var(--gek-dark-grey)] font-regular">
          {t("free_balance")}:
        </span>
        <span className="self-end text-[12px] text-[#1F3446] font-regular">
          {getRoundingValue(currency.balance?.free_balance, currency.roundPrec)}{" "}
          {currency.$const}
        </span>
      </div>
    </div>
  );
}

export default CurrencyRenderOption;