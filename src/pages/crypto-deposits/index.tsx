import React from 'react';
import PageHead from '@/shared/ui/page-head/PageHead';
import Button from "@/shared/ui/button/Button";

const CryptoDeposits = () => {

    return (
        <div className="wrapper">
            <PageHead
                subtitle={"A modern alternative to a bank deposit. Invest in the Gekkoin virtual products with full or partial protection of capital. \n" +
                    "Return is calculated at the end of the deposits term. The most profitable for you value will be chosen."}
                title={"Crypto deposits"}/>

            <div className="substrate flex flex-col">
                <section>
                    <div className="row flex flex-wrap gap-8">
                        <div className="col w-25 flex flex-col">
                            <h2 className="text-gray-600 text-fs32 font-bold">Fixed rate deposits</h2>
                        </div>
                    </div>
                    <div className="row mt-6">
                        <div className="col">
                            <h4>0,8% per month</h4>
                        </div>
                    </div>
                    <div className="row mt-6">
                        <div className="col">
                            <p className="text-gray-400">The fixed rate deposit allows you to know exactly how much
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
                    <div className="wrapper bg-[var(--color-main-bg)] py-6 px-10 flex items-center">
                        <p className="font-bold mr-4">0,8% per month (9,6% annual)</p>
                        <Button gray size="sm" className="!text-black !font-normal">Open deposit</Button>
                    </div>
                </section>
                <section>
                    <div className="row flex flex-wrap gap-8 mt-12 mb-8">
                        <div className="col w-25 flex flex-col">
                            <h2 className="text-gray-600 text-fs32 font-bold">Structured deposits</h2>
                        </div>
                    </div>
                    <div className="row grid gap-3 xxxl:grid-cols-3 xxl:grid-cols-2 xl:grid-cols-1">
                        <div className="col h-full flex flex-col justify-between">
                            <div className="wrapper">
                                <div className="row mt-6">
                                    <div className="col">
                                        <h4 className="font-bold text-lg mb-2">
                                            Safe strategy
                                        </h4>
                                        <p className="text-gray-400">You profit even if the rate drops or grows
                                            slowly</p>
                                    </div>
                                </div>
                            </div>
                            <div className="wrapper">
                                <div className="row flex flex-wrap mt-6 px-10 mb-3 gap-7">
                                    <R/>
                                    <R/>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <Row bgGray/>
                                        <Row/>
                                        <Row bgGray/>
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
                                        <p className="text-gray-400">Minimal risk</p>
                                    </div>
                                </div>
                            </div>
                            <div className="wrapper">
                                <div className="row flex flex-wrap mt-6 px-10 mb-3 gap-7">
                                    <R/>
                                    <R/>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <Row bgGray/>
                                        <Row/>
                                        <Row bgGray/>
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
                                        <p className="text-gray-400">Good percentage when the rate is rising, limited
                                            loss
                                            when the rate is falling</p>
                                    </div>
                                </div>
                            </div>
                            <div className="wrapper">
                                <div className="row flex flex-wrap mt-6 px-10 mb-3 gap-7">
                                    <R/>
                                    <R/>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <Row bgGray/>
                                        <Row/>
                                        <Row bgGray/>
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

const R = () => {
    return <div className="col">
        <div className="flex items-center gap-2 md:flex-col">
            <p className="text-gray-400 text-sm">Return</p>
            <div className="flex gap-1">
                <div className="w-[0.5rem] h-[0.5rem] bg-green rounded-full"/>
                <div className="w-[0.5rem] h-[0.5rem] bg-gray-200 rounded-full"/>
                <div className="w-[0.5rem] h-[0.5rem] bg-gray-200 rounded-full"/>
            </div>
        </div>
    </div>
}

const Row = ({bgGray = false}) => {

    return <div
        className={`row ${bgGray ? "bg-gray-main" : ""} py-6 px-6 grid grid-flow-col justify-start items-center gap-3`}>
        <div className="col row-auto justify-start flex h-full">
            <div className="row">
                <div className="col">
                    <img width={17} height={10} src="/img/icon/RateGrowthIcon.svg" alt="UserIcon"/>
                </div>
            </div>
        </div>
        <div className="col h-full">
            <div className="row mb-3 flex items-start">
                <div className="col">
                    <p className="text-gray-400">Rate grows</p>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <p className="font-bold text-normal">16%</p>
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
                <div className="row mb-3">
                    <div className="col">
                        <p className="text-gray-400">Rate grows</p>
                    </div>
                </div>
                <div className="row">
                    <div data-text={"4% annual"} className="col ellipsis inline-grid">
                        <p className="font-bold text-normal">4% annual</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="col">
            <Button gray size="sm" className="!text-black !font-normal">Open deposit</Button>
        </div>
    </div>
}

export default CryptoDeposits