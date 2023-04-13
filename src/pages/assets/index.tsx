import React, {useContext, useEffect, useState} from 'react'
import {apiGetRates} from '@/shared/api/market';
import $const from "@/shared/config/coins/constants";
import PageHead from "@/shared/ui/page-head/PageHead";
import Button from "@/shared/ui/button/Button";
import {evenOrOdd} from "@/shared/lib/helpers";
import {storeListAllCryptoName} from "@/shared/store/crypto-assets";
import {IconCoin} from "@/shared/ui/icons/icon-coin";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
import {BreakpointsContext} from "@/app/providers/BreakpointsProvider";


const items = [{
    name: "",
    price: "",
    balance: "",
    actions: ""
}]

function Assets() {

    const [rates, setRates] = useState<Record<$const, number>>();
    const listAllCryptoName = storeListAllCryptoName(state => state.listAllCryptoName);
    const {xl} = useContext(BreakpointsContext);

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
            <div className="wrapper grid grid-cols-2 xl:grid-cols-1 gap-2 h-full">

                {xl && <InfoBox/>}

                <div className="substrate h-full">
                    <TableGroup>
                        <TableHead items={["Name", "Price", "Balance", "Actions"]}/>
                        {listAllCryptoName.map((item, index) => <TableRow price={"0.12312"} index={index}
                                                                          code={item.code}
                                                                          name={item.name}
                                                                          key={"TableRow" + index}/>)}
                    </TableGroup>
                </div>

                {!xl && <div className="substrate h-full text-gray-600">
                    <div className="row mb-5 flex justify-center">
                        <div className="col">
                            <img width={46} height={46} src="/img/icon/InvestTokenRight.svg" alt="InvestTokenRight"/>
                        </div>
                    </div>
                    <div className="row mb-1 flex justify-center">
                        <div className="col">
                            <h5 className="font-medium">Choose cryptocurrency for investing</h5>
                        </div>
                    </div>
                    <div className="row mb-5 flex justify-center">
                        <div className="col flex justify-center">
                            <span
                                className="text-gray-450 text-center leading-8">You may swap your EURG for Bitcoin or most popular altcoins</span>
                        </div>
                    </div>
                    <div className="row mb-5">
                        <div className="col">
                            <img width={210} height={64} src="/img/icon/InvestTokensLine.svg" alt="InvestTokensLine"/>
                        </div>
                    </div>
                    <div className="row mb-5">
                        <div className="col text-sm">
                            <p className="leading-6">Bitcoin is the first and most popular cryptocurrency in the
                                world.</p>
                            <br/>
                            <p className="leading-6">In the wake of the success of BTC, other alternative
                                cryptocurrencies began to appear,
                                which are called "altcoins". Keeping the essence of the Bitcoin idea, most altcoins are
                                trying to find competitive advantages in their versions.</p>
                            <br/>
                            <p className="leading-6">At the moment, there are more than 17 thousand different altcoins.
                                Here you can purchase the most interesting and popular ones.</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <InfoBox/>
                        </div>
                    </div>
                </div>}
            </div>
        </>
    )
}

const InfoBox = () => {
    return <div className='bg-green rounded-md mb-4 py-5 px-4 text-white border-[#c3e6cb] text-sm'>
        <p className="leading-6">
            By purchasing tokens, you take on all the risks associated with the volatility of cryptocurrencies.
            If you are interested in safer investment instruments, we recommend that you use <a
            className="font-bold underline" href="/">structured or
            fixed
            deposits.</a></p>
    </div>
}

const TableGroup = ({children}) => {
    return <div>
        {children}
    </div>
}

const TableHead = ({items}) => {
    return <div className="row grid grid-cols-4 mb-4 items-center">
        {items.map((item, i) => <div key={"TableHead" + i} className="col">
            <span className="text-gray-400 font-medium">{item}</span>
        </div>)}
    </div>
}

const TableRow = ({
                      index,
                      code,
                      name,
                      price,
                      balance = 0,
                      actions = null
                  }) => {


    return <div
        className={`row grid grid-cols-4 ${evenOrOdd(index) ? "bg-gray-main" : ""} pt-1.5 pb-4 pr-3 pl-3 font-medium`}>
        <div data-text={name} className="col flex items-center gap-3 ellipsis">
            <IconCoin width={29} height={29} iconName={code.toLowerCase().capitalize() + "Icon.svg"} coinName={code}/>
            <span>{name}</span>
        </div>
        <div className="col flex items-center">
            <span>{price}</span>
        </div>
        <div className="col flex items-center">
            <span>{balance}</span>
        </div>
        <div className="col flex items-center gap-3">
            <a href="">
                <img width={32} height={14} src="/img/icon/Download.svg" alt="Download"/>
            </a>
            <Button size={"sm"} gray>Buy</Button>
        </div>
    </div>
}

export default Assets;
