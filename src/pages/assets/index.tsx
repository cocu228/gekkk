import React, {useContext, useEffect, useState} from 'react'
import {apiGetRates} from '@/shared/api/market';
import $const from "@/shared/config/coins/constants";
import PageHead from "@/shared/ui/page-head/PageHead";
import Button from "@/shared/ui/button/Button";
import {evenOrOdd} from "@/shared/lib/helpers";
import {storeListAllCryptoName} from "@/shared/store/crypto-assets";
import {IconCoin} from "@/shared/ui/icons/icon-coin";
import {BreakpointsContext} from "@/app/providers/BreakpointsProvider";
import useModal from "@/shared/model/hooks/useModal";
import Loader from "@/shared/ui/loader";


const items = [{
    name: "",
    price: "",
    balance: "",
    actions: ""
}]

function Assets() {

    const [rates, setRates] = useState<Record<$const, number>>();
    const listAllCryptoName = storeListAllCryptoName(state => state.listAllCryptoName);
    const {xl, md} = useContext(BreakpointsContext);

    useEffect(() => {
        (async () => {

            const rates = (await apiGetRates()).data;
            setRates(rates);

        })();
    }, []);

    return (
        <>
            <PageHead title={"Crypto assets"} subtitle={"Choose and buy the assets interested you"}/>
            <div className="wrapper grid grid-cols-5 xl:grid-cols-1 gap-2 xl:gap-0 h-full">
                {xl && <InfoBox/>}
                {!rates ? <Loader/> : <div
                    className={`${!md ? "substrate" : "bg-white -ml-4 -mr-4 pt-4"} col-span-3 z-10 -xl:rounded-r-none ${!md ? "max-h-[1280px] overflow-auto" : ""}`}>
                    <TableGroup>
                        <TableHead items={md ? ["Name", "Price", "Actions"] :
                            ["Name", "Price", "Balance", "Actions"]}/>
                        {listAllCryptoName.map((item, index) => <TableRow
                            price={"0.12312"}
                            index={index}
                            code={item.code}
                            name={item.name}
                            key={"TableRow" + index}/>)}
                    </TableGroup>
                </div>}
                {!xl && <div
                    className={`substrate h-full -ml-4 z-0 col-span-2 text-gray-600 ${!md ? "max-h-[1280px] -xxl:pl-16 -xxl:pr-20 -xxxl:pl-16 -xxxl:pr-24 overflow-auto" : ""}`}>
                    <div className="row mb-5 flex justify-center">
                        <div className="col">
                            <img width={46} height={46} src="/img/icon/InvestTokenRight.svg" alt="InvestTokenRight"/>
                        </div>
                    </div>
                    <div className="row mb-1 flex justify-center">
                        <div className="col">
                            <h5 className="font-medium max-w-[320px] text-center">Choose cryptocurrency for
                                investing</h5>
                        </div>
                    </div>
                    <div className="row mb-5 flex justify-center">
                        <div className="col flex justify-center">
                            <span
                                className="text-gray-450 text-center leading-8 max-w-[320px]">You may swap your EURG for Bitcoin or most popular altcoins</span>
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
    return <div className='bg-green h-[min-content] rounded-md mb-4 py-5 px-4 text-white border-[#c3e6cb] text-sm'>
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

    const firstCol = index => index === 0
    const lastCol = index => index === (items.length - 1)
    const setClassPosEdge = index => firstCol(index) ? "col-span-5" : lastCol(index) ? "col-span-3" : "col-span-2"


    return <div className="row grid grid-cols-12 mb-4 items-center justify-start">
        {items.map((item, index) => <div key={"TableHead" + index}
                                         className={`col flex justify-center ${setClassPosEdge(index)}`}>
            <span className="text-gray-400 font-medium">{item}</span>
        </div>)}
    </div>
}

const TableRow = ({
                      index,
                      code,
                      name,
                      price,
                      balance = 2.232,
                      actions = null
                  }) => {

    const {xl, md} = useContext(BreakpointsContext);

    return <div
        className={`row grid grid-cols-12 justify-between  ${evenOrOdd(index) ? "bg-gray-main" : ""} ${md ? "justify-between" : ""} pt-1.5 pb-4 pr-3 pl-3 font-medium`}>
        <div data-text={name} className="col col-span-5 flex items-center gap-3  ellipsis">
            <IconCoin width={29} height={29} code={code}/>
            <span>{name}</span>
        </div>
        <div data-text={price} className="col col-span-2 flex items-center justify-center ellipsis">
            <span>{price} €</span>
        </div>
        {!md &&
            <div data-text={`${balance} ${code}`} className="col col-span-2 flex items-center justify-center ellipsis">
                <span>{balance} {code}</span>
            </div>}
        <div className={`col col-span-3 ${md ? "col-end-12" : ""} grid grid-flow-col items-center justify-end gap-3`}>
            <a className="ellipsis" data-text={"Receive"} href="">
                <img className="max-w-max" width={14} height={14} src="/img/icon/Download.svg" alt="Download"/>
            </a>
            <a className="ellipsis" data-text={"Withdraw"} href="">
                <img className="rotate-180 max-w-max" width={14} height={14} src="/img/icon/Download.svg"
                     alt="Download"/>
            </a>
            <Button size={"sm"} gray>Buy</Button>
        </div>
    </div>
}

export default Assets;
