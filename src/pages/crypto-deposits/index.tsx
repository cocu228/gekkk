import React, {useContext} from 'react';
import PageHead from '@/shared/ui/page-head/PageHead';
import Button from "@/shared/ui/button/Button";
import {BreakpointsContext} from "@/app/providers/BreakpointsProvider";

const CryptoDeposits = () => {
    const {xl, md} = useContext(BreakpointsContext);
    return (
        <div className="wrapper">
            <PageHead
                subtitle={"A modern alternative to a bank deposit. Invest in the Gekkoin virtual products with full or partial protection of capital. \n" +
                    "Return is calculated at the end of the deposits term. The most profitable for you value will be chosen."}
                title={"Crypto deposits"}/>

            <div className="substrate flex flex-col">
                <section className={!md ? "max-w-[400px]" : ""}>
                    <div className="row flex flex-wrap gap-8">
                        <div className="col w-25 flex flex-col">
                            <h2 className="text-gray-600 text-fs32 font-bold">Fixed rate deposits</h2>
                        </div>
                    </div>

                    <div className="row mt-6">
                        <div className="col">
                            <h4 className="font-bold">0,8% per month</h4>
                        </div>
                    </div>
                    <div className="row mt-6">
                        <div className="col">
                            <p className="text-gray-400 font-semibold">The fixed rate deposit allows you to know exactly
                                how much
                                interest you'll earn on your
                                savings over a specific period</p>
                        </div>
                    </div>
                    <div className="row flex flex-wrap mt-6 px-10 mb-3 gap-7">
                        <div className="col">
                            <div className="flex items-center gap-2 md:flex-col">
                                <p className="text-gray-400 text-sm">Return</p>
                                <div className="flex gap-1">
                                    <div className="w-[0.5rem] h-[0.5rem] bg-green rounded-full"/>
                                    <div className="w-[0.5rem] h-[0.5rem] bg-gray-200 rounded-full"/>
                                    <div className="w-[0.5rem] h-[0.5rem] bg-gray-200 rounded-full"/>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="flex items-center gap-2 md:flex-col">
                                <p className="text-gray-400 text-sm">Risk</p>
                                <div className="flex gap-1">
                                    <div className="w-[0.5rem] h-[0.5rem] bg-gray-200 rounded-full"/>
                                    <div className="w-[0.5rem] h-[0.5rem] bg-gray-200 rounded-full"/>
                                    <div className="w-[0.5rem] h-[0.5rem] bg-gray-200 rounded-full"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={md ? {border: "1px solid #B4C0CD", borderRadius: "4px 4px 0px 0px"} : {}}
                         className="wrapper bg-[var(--color-main-bg)] py-6 px-10 flex items-center">
                        <p className="font-bold mr-4">0,8% per month (9,6% annual)</p>
                        <Button gray size="sm"
                                className="!text-black !bg-[#DEE2E73D] !py-2 !text-sm !font-normal whitespace-nowrap !h-[auto]">Open
                            deposit</Button>
                    </div>
                </section>
                <section>
                    <div className="row flex flex-wrap gap-8 mt-12 mb-8">
                        <div className="col w-25 flex flex-col">
                            <h2 className="text-gray-600 text-fs32 font-bold">Structured deposits</h2>
                        </div>
                    </div>
                    <div className="row grid gap-3 grid-cols-3 xxl:grid-cols-2 lg:grid-cols-1">
                        <div className="col h-full flex flex-col justify-between">
                            <div className="wrapper">
                                <div className="row mt-6">
                                    <div className="col">
                                        <h4 className="font-bold text-lg mb-2">
                                            Safe strategy
                                        </h4>
                                        <p className="text-gray-400 font-semibold">You profit even if the rate drops or
                                            grows
                                            slowly</p>
                                    </div>
                                </div>
                            </div>
                            <div className="wrapper">
                                <div className="row flex flex-wrap mt-6 px-10 mb-3 gap-7">
                                    <R val={[true, null, null]}/>
                                    <R val={[null, null, null]}/>
                                </div>
                                <div style={md ? {border: "1px solid #B4C0CD", borderRadius: "4px 4px 0px 0px"} : {}}
                                     className="row">
                                    <div className="col">
                                        <Row md={md} val={["16%", "4% annual"]} bgGray/>
                                        <Row md={md} val={["17%", "3% annual"]}/>
                                        <Row md={md} val={["18%", "2% annual"]} bgGray/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col h-full flex flex-col justify-between">
                            <div className="wrapper">
                                <div className="row mt-6">
                                    <div className="col">
                                        <h4 className="font-bold text-lg mb-2">
                                            Balanced strategy
                                        </h4>
                                        <p className="text-gray-400 font-semibold">Minimal risk</p>
                                    </div>
                                </div>
                            </div>
                            <div className="wrapper">
                                <div className="row flex flex-wrap mt-6 px-10 mb-3 gap-7">
                                    <R val={[true, true, null]}/>
                                    <R val={[false, null, null]}/>
                                </div>
                                <div style={md ? {border: "1px solid #B4C0CD", borderRadius: "4px 4px 0px 0px"} : {}}
                                     className="row">
                                    <div className="col">
                                        <Row md={md} val={["20%", "0"]} bgGray/>
                                        <Row md={md} val={["23%", "up to 3%"]}/>
                                        <Row md={md} val={["25%", "up to 5%"]} bgGray/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col h-full flex flex-col justify-between">
                            <div className="wrapper">
                                <div className="row mt-6">
                                    <div className="col">
                                        <h4 className="font-bold text-lg mb-2">
                                            Dynamic strategy
                                        </h4>
                                        <p className="text-gray-400 font-semibold">Good percentage when the rate is
                                            rising, limited
                                            loss
                                            when the rate is falling</p>
                                    </div>
                                </div>
                            </div>
                            <div className="wrapper">
                                <div className="row flex flex-wrap mt-6 px-10 mb-3 gap-7">
                                    <R val={[true, true, true]}/>
                                    <R val={[false, false, null]}/>
                                </div>
                                <div style={md ? {border: "1px solid #B4C0CD", borderRadius: "4px 4px 0px 0px"} : {}}
                                     className="row">
                                    <div className="col ">
                                        <Row md={md} val={["30%", "up to -10%"]} bgGray/>
                                        <Row md={md} val={["40%", "up to -20%"]}/>
                                        <Row md={md} val={["50%", "up to -30%"]} bgGray/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>
            </div>

        </div>
    );
}

const R = ({val}) => {
    return <div className="col">
        <div className="flex items-center gap-2  md:flex-col">
            <p className="text-gray-400 text-sm">Return</p>
            <div className="flex gap-1">
                {val.map(it => <div
                    className={`w-[0.5rem] h-[0.5rem]  ${it === null ? "bg-gray-200" : it ? "bg-green" : "bg-red-main"}   rounded-full`}/>)}
            </div>
        </div>
    </div>
}

const Row = ({bgGray = false, val, md = false}) => {

    return <div
        style={md ? {borderBottom: "1px solid #B4C0CD"} : {}}
        className={`row ${(!md && bgGray) ? "bg-gray-main" : ""} py-4 px-6 grid grid-flow-col justify-start items-center gap-3`}>
        <div className="col row-auto justify-start flex h-full">
            <div className="row">
                <div className="col">
                    <img width={17} height={10} src="/img/icon/RateGrowthIcon.svg" alt="UserIcon"/>
                </div>
            </div>
        </div>
        <div className="col h-full">
            <div className="row mb-2 flex items-start">
                <div data-text={"Rate grows"} className="col ellipsis inline-grid">
                    <p className="text-gray-400 whitespace-nowrap">Rate grows</p>
                </div>
            </div>
            <div className="row">
                <div data-text={val[0]} className="col ellipsis">
                    <p className="font-bold text-normal">{val[0]}</p>
                </div>
            </div>
        </div>
        <div className="col justify-start flex h-full">
            <div className="row">
                <div className="col">
                    <img width={17} height={10} src="/img/icon/RateDropIcon.svg" alt="UserIcon"/>
                </div>
            </div>
        </div>
        <div className="col h-full">
            <div className="col">
                <div className="row mb-2">
                    <div data-text={"Rate drops"} className="col ellipsis inline-grid">
                        <p className="text-gray-400 whitespace-nowrap">Rate drops</p>
                    </div>
                </div>
                <div className="row">
                    <div data-text={val[1]} className="col ellipsis inline-grid">
                        <p className="font-bold text-normal">{val[1]}</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="col">
            <Button gray size="sm"
                    className="!text-black !py-2 !text-sm !font-normal whitespace-nowrap !bg-[#DEE2E73D] !rounded-[20px] text-[14px] !h-[auto]">Open
                deposit</Button>
        </div>
    </div>
}

export default CryptoDeposits