import React, {useContext, useEffect, useState} from 'react';
import PageHead from '@/shared/ui/page-head/PageHead';
import {BreakpointsContext} from "@/app/providers/BreakpointsProvider";
import ClipboardField from "@/shared/ui/clipboard-field/ClipboardField";
import TableReferrals from "@/widgets/partnership-program/TableReferrals";
import {actionResSuccess, uncoverResponse} from "@/shared/lib/helpers";
import {apiGetAgentCode} from "@/shared/api/referral/get-agent-code";
import History from "@/widgets/history/ui/History";
import { useTranslation } from 'react-i18next';

const PartnershipProgram = () => {

    const {t} = useTranslation();
    const {xl, md} = useContext(BreakpointsContext);

    return (<div className="wrapper h-inherit w-full">
        <PageHead
            subtitle={t("partnership_program.subtitle")}
            title={t("partnership_program.title")}/>
        <div className="wrapper grid grid-cols-5 xl:grid-cols-1 gap-2 xl:gap-0">
            <div
                className={`${!md ? "substrate" : "bg-white -ml-4 -mr-4 pl-4 pr-4"} col-span-3 z-10 -xl:rounded-r-none`}>
                {xl && <ContentDescription/>}
                <ContentMain/>
            </div>
            {!xl && <div
                className={`substrate text-sm h-full -ml-4 z-0 col-span-2 text-gray-600 ${!md ? "max-h-[1280px] -xxl:pl-16 -xxl:pr-20 -xxxl:pl-16 -xxxl:pr-24 overflow-auto" : ""}`}>
                <ContentDescription/>
            </div>}
        </div>
    </div>);
}


const ContentDescription = (props) => {
    const {t} = useTranslation();

    return <>
        <div className="row mb-8">
            <div className="col">
                <h5 className="font-medium">{t("partnership_program.reward_for_buying")}</h5>
            </div>
        </div>
        <div className="row mb-5 flex justify-center text-sm">
            <div className="col info-box-description relative">
                <img width={106} height={92} className="absolute top-[-40px] right-[-20px]"
                     src="/img/gramophone.png" alt="gramophone"/>
                <div className="row mb-3">
                    <span className="font-semibold leading-6">{t("partnership_program.agent_who_attracts")}</span>
                </div>
                <div className="row">
                    <ul className="leading-6">
                        <li className="mb-2 leading-6"><span
                            className="font-semibold leading-6">• 2% {t("partnership_program.per_annum")}</span><br/>
                            {t("partnership_program.monthly_balance_first_year")}
                        </li>
                        <li className="leading-6"><span
                            className="font-semibold leading-6">• 1% {t("partnership_program.per_annum")}</span><br/>
                            {t("partnership_program.monthly_balance_second_year")}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="row mb-14">
            <div className="col">
                <p className="text-gray-500 font-medium leading-6">{t("partnership_program.rewards_transferred")}</p>
            </div>
        </div>
        <div className="row mb-6">
            <div className="col">
                <h4 className="font-bold">{t("partnership_program.rewards_opening")}</h4>
            </div>
        </div>
        <div className="row mb-6">
            <div className="col info-box-warning font-medium leading-6">{t("partnership_program.bring_your_friends")}
            </div>
        </div>
        <div className="row">
            <div className="col">
                <p className="text-gray-500 font-medium leading-6">{t("partnership_program.reward_right_after")}</p>
            </div>
        </div>
    </>
}

const ContentMain = () => {

    const {t} = useTranslation();
    const [state, setState] = useState<string>("")

    useEffect(() => {
        (async () => {
            const response = await apiGetAgentCode()
            actionResSuccess(response).success(() => {
                setState(uncoverResponse(response))
            })
        })()
    }, [])

    return <>
        <div className="row mb-6">
            <div className="col">
                <h4 className="font-bold">{t("partnership_program.agent_code")}</h4>
            </div>
        </div>
        <div className="row mb-8">
            <div className="col">
                <ClipboardField value={state}/>
            </div>
        </div>
        <div className="row mb-6">
            <div className="col">
                <h4 className="font-bold">{t("partnership_program.referrals_info")}</h4>
            </div>
        </div>
        <div className="row mb-4">
            <div className="col">
                <TableReferrals/>
            </div>
        </div>
        {/*<div className="row mb-6">*/}
        {/*    <div className="col flex justify-center">*/}
        {/*   <span className="text-gray-400 cursor-pointer inline-flex items-center">See more <img*/}
        {/*       className="ml-2" width={10} height={8}*/}
        {/*       src="/img/icon/ArrowPlainDown.svg"*/}
        {/*       alt="ArrowPlainDown"/></span>*/}
        {/*    </div>*/}
        {/*</div>*/}
        <div className="row mb-6">
            <div className="col">
                <h4 className="font-bold">{t("partnership_program.rewards")}</h4>
            </div>
        </div>
        <div className="row">
            <div className="col">
                <History types={[17]}/>
            </div>
        </div>
    </>
}

export default PartnershipProgram
