import Card from "@/shared/ui/card/Card";
import { useNavigate } from "react-router-dom";
import Button from "@/shared/ui/button/Button";
import { scrollToTop } from "@/shared/lib/helpers";
import { ParentClassForCoin, IconCoin } from "../icons/icon-coin";

import { useTranslation } from "react-i18next";

interface Props {
  title: string;
  currency: string;
  price: number | null;
  balance: number | string;
}

function CryptoAssetCard({ title, balance, currency, price }: Props) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Card>
      <div className={`wrapper ${ParentClassForCoin}`}>
        <div className='flex gap-[8px] items-start'>
          <IconCoin code={currency} />
          <p className='flex items-center text-fs14 font-semibold min-h-[32px]'>{title}</p>
        </div>

        <div className='mt-auto pt-[20px]'>
          <div className='flex justify-between items-baseline flex-wrap'>
            <p className='text-fs14 font-medium uppercase'>
              <strong className='text-[28px] font-bold'>{balance}</strong> {currency}
            </p>

            {!price ? null : <p className='text-fs12 text-gray-500 font-medium'>~ {price} EURG</p>}
          </div>

          <div className='flex gap-[16px] mt-[16px]'>
            <Button
              variant='gray'
              size='sm'
              className='flex-1'
              onClick={() => {
                scrollToTop();
                navigate(`/wallet?currency=${currency}&tab=top_up`);
              }}
            >
              {t("top_up")}
            </Button>

            <Button
              variant='gray'
              size='sm'
              className='flex-1'
              onClick={() => {
                scrollToTop();
                navigate(`/wallet?currency=${currency}&tab=Withdraw`);
              }}
            >
              {t("withdraw")}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default CryptoAssetCard;
