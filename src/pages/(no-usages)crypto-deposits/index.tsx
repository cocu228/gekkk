import React, {useContext} from 'react';
import PageHead from '@/shared/ui/page-head/PageHead';
import Button from "@/shared/ui/button/Button";
import {BreakpointsContext} from "@/app/providers/BreakpointsProvider";
import scss from "./style.module.scss";
import {HelperClassName} from "@/shared/lib/helper-class-name";
import Rate from "@/widgets/crypto-deposits/Rate";
import TableRow from "@/widgets/crypto-deposits/TableRow";

const styles = new HelperClassName(scss)

const CryptoDeposits = () => {

    const {xl, md} = useContext(BreakpointsContext);

    return (
        <div className="wrapper">
            <PageHead
                subtitle={"A modern alternative to a bank deposit. Invest in the Gekkoin virtual products with full or partial protection of capital. \n" +
                    "Return is calculated at the end of the deposits term. The most profitable for you value will be chosen."}
                title={"A Structured Crypto Deposit"}/>

            <div className="substrate flex flex-col">
                <section className={!md ? "max-w-[400px]" : ""}>
                    {/*<div className="row flex flex-wrap gap-8">*/}
                    {/*    <div className="col w-25 flex flex-col">*/}
                    {/*        <h2 className="text-gray-600 text-fs32 font-bold">Fixed rate deposits</h2>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    <div className="row mt-6">
                        <div className="col">
                            <h4 className="font-bold">0,8% per month</h4>
                        </div>
                    </div>
                    <div className="row mt-6">
                        <div className="col">
                            <p className="text-gray-400 text-fs14 font-semibold leading-5">The fixed rate deposit allows
                                you to know exactly
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
                        <Button custom className={styles.scss("Button")}>Open deposit</Button>
                    </div>
                </section>
                <section>
                    {/*<div className="row flex flex-wrap gap-8 mb-8">*/}
                    {/*    <div className="col w-25 flex flex-col">*/}
                    {/*        <h2 className="text-gray-600 text-fs32 font-bold">Structured deposits</h2>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <div className="row grid gap-3 grid-cols-3 xxl:grid-cols-2 lg:grid-cols-1">
                        <div className="col h-full flex flex-col justify-between">
                            <div className="wrapper">
                                <div className="row mt-6">
                                    <div className="col">
                                        <h4 className="font-bold text-lg mb-2">
                                            Safe strategy
                                        </h4>
                                        <p className="text-gray-400 text-fs14 font-semibold leading-5">You profit even
                                            if the rate drops or
                                            grows
                                            slowly</p>
                                    </div>
                                </div>
                            </div>
                            <div className="wrapper">
                                <div className="row flex flex-wrap mt-6 px-10 mb-3 gap-7">
                                    <Rate val={[true, null, null]}/>
                                    <Rate val={[null, null, null]}/>
                                </div>
                                <div className={styles.scss("row BlockTable")}>
                                    <div className="col">
                                        <TableRow val={["16%", "4%"]}/>
                                        <TableRow val={["17%", "3%"]}/>
                                        <TableRow val={["18%", "2%"]}/>
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
                                        <p className="text-gray-400 text-fs14 font-semibold leading-5">Minimal risk</p>
                                    </div>
                                </div>
                            </div>
                            <div className="wrapper">
                                <div className="row flex flex-wrap mt-6 px-10 mb-3 gap-7">
                                    <Rate val={[true, true, null]}/>
                                    <Rate val={[false, null, null]}/>
                                </div>
                                <div className={styles.scss("row BlockTable")}>
                                    <div className="col">
                                        <TableRow val={["20%", "0"]}/>
                                        <TableRow val={["23%", "3%"]}/>
                                        <TableRow val={["25%", "5%"]}/>
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
                                        <p className="text-gray-400 text-fs14 font-semibold leading-5">Good percentage
                                            when the rate is
                                            rising, limited
                                            loss
                                            when the rate is falling</p>
                                    </div>
                                </div>
                            </div>
                            <div className="wrapper">
                                <div className="row flex flex-wrap mt-6 px-10 mb-3 gap-7">
                                    <Rate val={[true, true, true]}/>
                                    <Rate val={[false, false, null]}/>
                                </div>
                                <div className={styles.scss("row BlockTable")}>
                                    <div className="col ">
                                        <TableRow val={["30%", "-10%"]}/>
                                        <TableRow val={["40%", "-20%"]}/>
                                        <TableRow val={["50%", "-30%"]}/>
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


export default CryptoDeposits