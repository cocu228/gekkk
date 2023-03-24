import React from 'react';
import PercentBtn from '@/shared/ui/percent-btn/PercentBtn';
import ExchangeField, {
  ExchangeFieldType,
} from '@/widgets/exchange/ui/exchange-field/ExchangeField';
import DepthOfMarket from '@/shared/ui/depth-of-market/DepthOfMarket';
import styles from './style.module.scss';
import IconChevronDown from '@/shared/ui/icons/IconChevronDown';
import OperationResult from '@/widgets/exchange/ui/operation-result/OperationResult';
import Checkbox from '@/shared/ui/checkbox/Checkbox';
import Button from '@/shared/ui/button/Button';
import OpenOrders from '@/widgets/exchange/ui/open-orders/OpenOrders';

function Exchange() {
  return (
    <>
      <div className="flex gap-14">
        <div className="flex-grow pt-1">
          <div className="flex justify-between">
            <div className="font-medium text-md">Pay from</div>
            <div className="flex gap-1">
              <PercentBtn>25%</PercentBtn>
              <PercentBtn>50%</PercentBtn>
              <PercentBtn>75%</PercentBtn>
              <PercentBtn>100%</PercentBtn>
            </div>
          </div>
          <ExchangeField
            value="00.00"
            infoText="Balance: "
            labelType={ExchangeFieldType.TOKEN}
          />
          <ExchangeField
            value="00.00"
            infoText="Balance: 1000 EURG"
            labelType={ExchangeFieldType.TOKEN}
            tokenLabelIconUrl="/public/img/icon/EurgIcon.svg"
            tokenLabelTitle="EURG"
            tokenLabelMax
          />
          <div className={`flex justify-center ${styles.FieldsSpacer}`}>
            <IconChevronDown />
          </div>
          <div className="font-medium text-md">Receive to</div>
          <ExchangeField
            value="00.00"
            infoText="Balance: "
            labelType={ExchangeFieldType.TOKEN}
            tokenLabelIconUrl="/public/img/icon/XmrIcon.svg"
            tokenLabelTitle="XMR"
          />
          <div className="mt-3">
            <div className="font-medium text-md">Price</div>
            <ExchangeField
              value="125.00"
              labelType={ExchangeFieldType.PRICE}
              priceLabelTitle="EURG per 1 XMR"
            />
          </div>
          <div className="flex justify-between items-baseline gap-2.5 mt-1 text-secondary">
            <div className="flex justify-between flex-grow text-xs">
              <span>Market rate</span>
              <span>~125,04 </span>
            </div>
            <div className="text-[0.625em]">EURG per 1 XMR</div>
          </div>
          <div className="mt-6">
            <Checkbox disabled>
              <span>
                Sell a <strong className="font-semibold">token</strong> at the
                market rate
              </span>
            </Checkbox>
          </div>
          <div className="mt-10">
            <OperationResult get="62,5  EURG" pay="0,5  XMR" />
          </div>
          <div className="mt-8">
            <Button className="w-full" size="large">
              Buy XMR
            </Button>
          </div>
          <div className="mt-2.5 px-8 text-secondary text-sm text-center">
            order execution depends on the market situation
          </div>
        </div>
        <DepthOfMarket />
      </div>
      <div className="mt-12">
        <OpenOrders />
      </div>
    </>
  );
}

export default Exchange;
