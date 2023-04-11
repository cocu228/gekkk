import React from 'react';
import DepthItem from '@/shared/ui/depth-of-market/depth-item/DepthItem';
import IconArrowUp from '../icons/IconArrowUp';
import styles from './style.module.scss';

function DepthOfMarket() {
  return (
    <div className={styles.Wrapper}>
      <div className={styles.Head}>
        <div className="flex justify-between font-medium text-md lg:text-sm md:text-xs">
          <span>Price</span>
          <span>Amount</span>
        </div>
        {/*<div className={`flex justify-between items-center ${styles.Pair}`}>*/}
        {/*    <span className="inline-flex items-center gap-1">*/}
        {/*        (XMR/EURG)*/}
        {/*        <img*/}
        {/*            width={22}*/}
        {/*            height={24}*/}
        {/*            className={styles.Icon}*/}
        {/*            src={`/public/img/icon/ExchangeOrange.svg`}*/}
        {/*            alt="ExchangeIcon"*/}
        {/*        />*/}
        {/*    </span>*/}
        {/*    <span>(EURG)</span>*/}
        {/*</div>*/}
      </div>
      <div className={styles.RedWrapper}>
        <DepthItem percent={10} price={"100"} amount={10} color={"red"} />
        <DepthItem color={"red"} />
        <DepthItem color={"red"} />
        <DepthItem color={"red"} />
        <DepthItem color={"red"} />
        <DepthItem percent={50} price={"125"} amount={5} color={"red"} />
      </div>
      <div className="my-auto">
        {/*<div className={`flex items-center gap-1 my-4 md:my-3.5 font-semibold text-md lg:text-sm md:text-md ${styles.Rate}`}>*/}
        {/*    -*/}
        {/*</div>*/}
        {/*<div className={`flex items-center gap-1 my-4 md:my-3.5 font-semibold text-md lg:text-sm md:text-md ${styles.Rate} ${styles.RateUp}`}>*/}
        {/*    125*/}
        {/*    <IconArrowUp />*/}
        {/*</div>*/}
        <div className={`flex items-center gap-1 my-4 md:my-3.5 font-semibold text-md lg:text-sm md:text-md ${styles.Rate} ${styles.RateDown}`}>
          130
          <IconArrowUp />
        </div>
      </div>
      <div className={styles.GreenWrapper}>
        <DepthItem percent={10} price={"100"} amount={10} color={"green"} />
        <DepthItem color={"green"} />
        <DepthItem color={"green"} />
        <DepthItem color={"green"} />
        <DepthItem color={"green"} />
        <DepthItem percent={50} price={"125"} amount={5} color={"green"} />
      </div>
    </div>
  );
}

export default DepthOfMarket;