import React, {useEffect, useState} from 'react'
import {NavLink} from "react-router-dom";
import {apiGetMarketAssets, apiGetRates} from '@/shared/api/market';
import $const from "@/shared/config/coins/constants";
import {storeListAllCryptoName} from "@/shared/store/crypto-assets";
import Deposit from "@/widgets/deposit/ui/Deposit";
import styles from "@/widgets/deposit/ui/deposit-choose/styles.module.scss";
import Radio from "@/shared/ui/radio";
import InfoBlock from "@/widgets/deposit/ui/deposit-fixed/info-block";
import PercentBtn from "@/shared/ui/percent-btn/PercentBtn";
import DepositInput from "@/widgets/deposit/ui/deposit-input";
import StructuredVariant from "@/widgets/deposit/ui/deposit-structured/structured-variant/StructuredVariant";
import FixedVariant from "@/widgets/deposit/ui/deposit-fixed/fixed-variant/FixedVariant";
import AboutStructured from "@/widgets/deposit/ui/deposit-structured/about-structured/AboutStructured";
import AboutFixed from "@/widgets/deposit/ui/deposit-fixed/about-fixed/AboutFixed";
import PageHead from "@/shared/ui/page-head/PageHead";

function Assets() {

    const [rates, setRates] = useState<Record<$const, number>>();
    // const listAllCryptoName = storeListAllCryptoName(state => state.listAllCryptoName);

    useEffect(() => {
        (async () => {

            const rates = (await apiGetRates()).data;
            setRates(rates);

        })();
    }, []);


    if (!rates) return <div>Loading...</div>;


    return (
        <>
            <PageHead title={"Crypto assets"} subtitle={"Choose and buy the assets interested you"}/>
            <div className="wrapper grid grid-cols-2 md:grid-cols-1 gap-2 h-full">
                <div className="substrate h-full">
                    <div className="row grid grid-cols-4 mb-4 items-center">
                        <div className="col">
                            <span>Name</span>
                        </div>
                        <div className="col">
                            <span>Price</span>
                        </div>
                        <div className="col">
                            <span>Balance</span>
                        </div>
                        <div className="col">
                            <span>Actions</span>
                        </div>
                    </div>
                    <div className="row grid grid-cols-4">
                        <div className="col flex items-center gap-3 ellipsis">
                            <img width={29} height={29} src="/img/tokens/BtcIcon.svg" alt="BtcIcon"/>
                            <span>Bitcoin</span>
                        </div>
                        <div className="col flex items-center">
                            <span>30,123.12 €</span>
                        </div>
                        <div className="col flex items-center">
                            <span>0.0012 BTC</span>
                        </div>
                        <div className="col flex items-center">
                            <span>Actions</span>
                        </div>
                    </div>
                </div>
                <div className="substrate h-full">
                    <div className='bg-green rounded-[4px] mb-4 py-5 px-4 text-white border-[#c3e6cb]'>
                        <p className='font-bold mb-4'>3% AER interest on account balance</p>
                        <p>You get 3% per annum of EURG on your balance once a month under the following conditions:</p>
                        <p>(i) your weighted average balance for the reporting period is equal to or higher than 300
                            EURG;</p>
                        <p>(ii) our upper limit for the balance to pay the interest rate is 100,000 EURG.</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Assets;
