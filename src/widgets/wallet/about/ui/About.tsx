import { FC, ReactNode, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Button from "@/shared/ui/button/Button";
import { CtxWalletData } from "@/widgets/wallet/transfer/model/context";
import constants from "@/shared/config/coins/constants";

interface IAboutProps {
  description: ReactNode;
}

const About: FC<IAboutProps> = ({ description }) => {
  const navigate = useNavigate();
  const { $const } = useContext(CtxWalletData);
  const isEUR: boolean = $const === constants.EUR;
  const { t } = useTranslation();

  const handleToNavigate = (type: "from" | "to") => () => {
    navigate(`/exchange?${type}=${$const}`);
  };

  return (
    <div className='text-[var(--gek-dark-grey)] flex flex-col gap-[15px] mt-[7px] mb-[20px]'>
      <div className='bg-white rounded-md p-[15px_10px_10px] md:text-fs12 text-fs14'>{description}</div>

      {isEUR ? null : (
        <div className='w-full flex justify-center gap-[15px]'>
          <Button color='blue' className='w-[105px]' onClick={handleToNavigate("to")}>
            {t("buy")}
          </Button>

          <Button color='gray' className='w-[105px]' onClick={handleToNavigate("from")}>
            {t("sell")}
          </Button>
        </div>
      )}
    </div>
  );
};

export default About;
