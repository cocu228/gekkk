import React, {useContext, useState} from 'react';
import PageHead from '@/shared/ui/page-head/PageHead';
import {BreakpointsContext} from "@/app/providers/BreakpointsProvider";
import Button from "@/shared/ui/button/Button";
import ClipboardField from "@/shared/ui/clipboard-field/ClipboardField";
import GTable from "@/shared/ui/grid-table";
import SecondaryTabGroup from "@/shared/ui/tabs-group/secondary";

const PartnershipProgram = () => {

    const {xl, md} = useContext(BreakpointsContext);

    const [state, setState] = useState(false)

    return (<div className="wrapper h-inherit w-full">
        <PageHead
            subtitle={"Earn rewards by inviting friends to Gekkard platform"}
            title={"Partnership program"}/>
        <div className="wrapper grid grid-cols-5 xl:grid-cols-1 gap-2 xl:gap-0">
            <div
                className={`${!md ? "substrate" : "bg-white -ml-4 -mr-4 pl-4 pr-4"} col-span-3 z-10 -xl:rounded-r-none`}>
                {xl && <DescriptionCol/>}
                {!md && state ? <TablePP/> :
                    <Button onClick={() => setState(true)} size={"md"} className="w-full">Get referral link</Button>}
            </div>
            {!xl && <div
                className={`substrate text-sm h-full -ml-4 z-0 col-span-2 text-gray-600 ${!md ? "max-h-[1280px] -xxl:pl-16 -xxl:pr-20 -xxxl:pl-16 -xxxl:pr-24 overflow-auto" : ""}`}>
                <DescriptionCol/>
            </div>}
        </div>
        {md && !state && <div className="row fixed bottom-0 w-full left-0 z-10 p-4 bg-white">
            <Button onClick={() => setState(true)} size={"md"} className="w-full">Get referral link</Button>
        </div>}
    </div>);
}


const DescriptionCol = () => {
    return <>
        <div className="row mb-8">
            <div className="col">
                <h5 className="font-medium">Reward for buying GKE tokens</h5>
            </div>
        </div>
        <div className="row mb-5 flex justify-center text-sm">
            <div className="col info-box-description relative">
                <img width={106} height={92} className="absolute top-[-40px] right-[-20px]"
                     src="/img/gramophone.png" alt="gramophone"/>
                <div className="row mb-3">
                    <span className="font-semibold leading-6">The agent who attracts the referral will receive:</span>
                </div>
                <div className="row">
                    <ul className="leading-6">
                        <li className="mb-2 leading-6"><span
                            className="font-semibold leading-6">• 2% per annum</span><br/>
                            on the average monthly balance in the GKE of each
                            attracted referral during the first year
                        </li>
                        <li className="leading-6"><span
                            className="font-semibold leading-6">• 1% per annum</span><br/>
                            on the average monthly balance in the GKE of each
                            attracted referral during the second year
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="row mb-14">
            <div className="col">
                <p className="text-gray-500 font-medium leading-6">Rewards are transferred to your GKE
                    balance at the end of the
                    billing month.</p>
            </div>
        </div>
        <div className="row mb-6">
            <div className="col">
                <h4 className="font-bold">Rewards for opening Gekkoin deposits</h4>
            </div>
        </div>
        <div className="row mb-6">
            <div className="col info-box-warning font-medium leading-6">
                Bring your friends or followers to open a structured deposit via Gekkoin - and get rewarded
                with 2% from each deposit’s amount opened by your referrals within a year since their
                registration.
            </div>
        </div>
        <div className="row">
            <div className="col">
                <p className="text-gray-500 font-medium leading-6">You get the reward right after the
                    closure of your referral’s deposit (if it was not closed prematurely).</p>
            </div>
        </div>
    </>
}

const TablePP = () => {

    const setActiveTab = () => null
    return <>
        <div className="row mb-8">
            <div className="col">
                <ClipboardField value={"test"}/>
            </div>
        </div>
        <div className="row mb-6">
            <div className="col">
                <h4 className="font-bold">Referrals info</h4>
            </div>
        </div>
        <div className="row mb-4">
            <div className="col">
                <GTable>
                    <GTable.Head className={"bg-gray-200 p-4"}>
                        <GTable.Row>
                            <GTable.Col className={`flex my-2`}>
                                <span className="text-gray-600 font-medium">ID</span>
                            </GTable.Col>
                            <GTable.Col className={`flex my-2`}>
                                <span className="text-gray-600 font-medium">Registration date</span>
                            </GTable.Col>
                        </GTable.Row>
                    </GTable.Head>
                    <GTable.Body className={"bg-[#F9F9FA] p-4"}>
                        <GTable.Row>
                            <GTable.Col className={`flex my-2`}>
                                <span className="text-gray-600 font-medium">123456789123</span>
                            </GTable.Col>
                            <GTable.Col className={`flex my-2`}>
                                <span className="text-gray-600 font-medium">01.04.19 at 22:37</span>
                            </GTable.Col>
                        </GTable.Row>
                        <GTable.Row>
                            <GTable.Col className={`flex my-2`}>
                            </GTable.Col>
                        </GTable.Row>
                    </GTable.Body>
                </GTable>
            </div>
        </div>
        <div className="row mb-6">
            <div className="col flex justify-center">
           <span className="text-gray-400 cursor-pointer inline-flex items-center">See more <img
               className="ml-2" width={10} height={8}
               src="/img/icon/ArrowPlainDown.svg"
               alt="ArrowPlainDown"/></span>
            </div>
        </div>
        <div className="row mb-6">
            <div className="col">
                <h4 className="font-bold">Rewards</h4>
            </div>
        </div>
        <div className="row">
            <div className="col">
                <SecondaryTabGroup tabs={{lastTransactions: "last transactions", customPeriod: "custom period"}}
                                   activeTab={"lastTransactions"}
                                   setActiveTab={setActiveTab}/>
            </div>
        </div>
        <div className="row">
            <div className="col">
                <GTable>
                    <GTable.Head className={"bg-[#EEEFF2] p-4"}>
                        <GTable.Row>
                            <GTable.Col className={`flex my-2`}>
                                <span className="text-gray-600 font-medium">Data</span>
                            </GTable.Col>
                            <GTable.Col className={`flex my-2`}>
                                <span className="text-gray-600 font-medium">Flow of funds</span>
                            </GTable.Col>
                            <GTable.Col className={`flex my-2`}>
                                <span className="text-gray-600 font-medium">Type</span>
                            </GTable.Col>
                        </GTable.Row>
                    </GTable.Head>
                    <GTable.Body className={"bg-[#F9F9FA] p-4"}>
                        <GTable.Row>
                            <span>You don’t have any transactions.</span>
                        </GTable.Row>
                    </GTable.Body>
                </GTable>
            </div>
        </div>
    </>
}

export default PartnershipProgram