import React, {useState} from 'react';
import PercentBtn from '@/widgets/exchange/ui/percent-btn/PercentBtn';
import ExchangeField, {ExchangeFieldType} from '@/widgets/exchange/ui/exchange-field/ExchangeField';
import DepthOfMarket from '@/widgets/exchange/ui/depth-of-market/DepthOfMarket';
import styles from './style.module.scss';
import IconChevronDown from '@/shared/ui/icons/IconChevronDown';
import OperationResult from '@/widgets/exchange/ui/operation-result/OperationResult';
import Checkbox from '@/shared/ui/checkbox/Checkbox';
import Button from '@/shared/ui/button/Button';
import OpenOrders from '@/widgets/exchange/ui/open-orders/OpenOrders';
import Modal from '@/shared/ui/modal/Modal';
import Confirm from '@/widgets/exchange/ui/confirm/Confirm';

function Exchange() {
    const [confirmOpen, setConfirmOpen] = useState<boolean>(false);

    const handleOpenConfirm = () => {
        setConfirmOpen(true);
    };

    const handleCloseConfirm = () => {
        setConfirmOpen(false);
    };

    const confirmButton = <>
        <div className="mt-7 lg:mt-8">
            <Button className="w-full" size="lg" onClick={handleOpenConfirm}>Buy XMR</Button>
        </div>
        <div className="mt-5 lg:mt-2.5 px-8 text-secondary text-xs lg:text-sm text-center">
            order execution depends on the market situation
        </div>
    </>;

    return (
      <>
          <div className={`gap-x-14 xl:gap-x-5 ${styles.Grid}`}>
              <div className="h-full flex flex-col">
                  <div className={styles.Head}>
                      <div className="flex justify-between flex-wrap items-center gap-0.5">
                          <div className="font-medium text-md lg:text-sm md:text-xs">Pay from</div>
                          <div className="flex gap-1 md:gap-0.5">
                              <PercentBtn>25%</PercentBtn>
                              <PercentBtn>50%</PercentBtn>
                              <PercentBtn>75%</PercentBtn>
                              <PercentBtn>100%</PercentBtn>
                          </div>
                      </div>
                  </div>
                  <ExchangeField
                    value="00.00"
                    infoText="Balance: "
                    labelType={ExchangeFieldType.TOKEN}
                  />
                  <div className={`flex justify-center ${styles.FieldsSpacer}`}>
                      <IconChevronDown/>
                  </div>
                  <div className="font-medium text-md lg:text-sm md:text-xs">Receive to</div>
                  <ExchangeField
                    value="00.00"
                    infoText="Balance: "
                    labelType={ExchangeFieldType.TOKEN}
                  />
                  <div className="mt-3 md:mt-2">
                      <div className="font-medium text-md lg:text-sm md:text-xs">Price</div>
                      <ExchangeField
                        disabled
                        value=""
                      />
                  </div>
                  <div className="flex justify-between items-baseline gap-x-2.5 md:gap-x-1 mt-1 text-secondary flex-wrap">
                      <div className="flex justify-between flex-grow text-xs md:text-[0.625rem] sm:text-[0.5rem]">
                          <span>Market rate</span>
                          <span>~125,04 </span>
                      </div>
                      <div className="text-[0.625em] sm:text-[0.5rem] ml-auto">EURG per 1 XMR</div>
                  </div>
                  <div className="mt-6 md:mt-3.5">
                      <Checkbox disabled>
                          <span className="lg:text-sm md:text-xs sm:text-[0.625rem]">Sell a <strong className="font-semibold">token</strong> at the market rate</span>
                      </Checkbox>
                  </div>
                  <div className="mt-auto">
                      <div className="mt-10 md:mt-6">
                          <OperationResult get="62,5  EURG" pay="0,5  XMR"/>
                      </div>
                  </div>
              </div>
              <div className="wrapper">
                  <DepthOfMarket/>
              </div>
              <div className={`mt-7 ${styles.GridFooter}`}>
                  <Button className="w-full" size="xl" onClick={handleOpenConfirm}>Buy XMR</Button>
                  <div className="mt-5 lg:mt-2.5 px-8 text-secondary text-xs text-center">
                      order execution depends on the market situation
                  </div>
              </div>
          </div>
          <div className="mt-12">
              <OpenOrders/>
          </div>
          <Modal width={400} title="Confirm the order" open={confirmOpen} onCancel={handleCloseConfirm}>
              <Confirm
                payValue="62,5"
                payToken="EURG"
                getValue="~0,5"
                getToken="XMR"
                price="1 XMR ~ 125,04 EURG"
                info="(sale at the current market rate) "
                onConfirm={() => {
                    handleCloseConfirm();
                }}
              />
          </Modal>
      </>
    );
}

export default Exchange;