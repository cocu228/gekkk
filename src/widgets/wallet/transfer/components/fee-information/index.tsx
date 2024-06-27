import { FC } from "react";
import { useTranslation } from "react-i18next";

interface IInitialFeeProps {
  fee?: string
}

interface IFeeInformationProps {
  withdraw?: number;
  percent?: number;
  coin?: string;
  children?: FC<IInitialFeeProps>;
}

const FeeInformation: FC<IFeeInformationProps> = ({ coin, percent, withdraw, children }) => {
  const {t} = useTranslation();
  const fee = percent > 0 ? `${percent}%` : withdraw > 0 ? `${withdraw} ${coin}` : null;

  if (!fee) {
    return null;
  }

  return (
    <div className="w-full md:flex flex-col hidden items-center text-[var(--gek-mid-grey)] md:text-fs12 text-fs14">
        <p>
          {children? children({ fee }) : (
            <>
              {t("fee_is_prec")}&nbsp;
              <span className={"font-semibold"}>{fee}</span>
              &nbsp;{t("per_transaction")}
            </>
          )}
        </p>
        <p>excluding discounts and bonuses</p>
    </div>
  )
}

export default FeeInformation;