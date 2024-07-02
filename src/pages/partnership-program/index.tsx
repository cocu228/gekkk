import React, {useContext, useEffect, useState} from 'react';
import {BreakpointsContext} from "@/app/providers/BreakpointsProvider";
import ClipboardField from "@/shared/ui/clipboard-field/ClipboardField";
import TableReferrals from "@/widgets/partnership-program/TableReferrals";
import {actionResSuccess, uncoverResponse} from "@/shared/lib/helpers";
import History from "@/widgets/history/ui/History";
import { useTranslation } from 'react-i18next';
import {apiGetAgentCode} from "@/shared/(orval)api/gek";
import styles from "./style.module.scss"
// import Footer from "@/widgets/footer";


const PartnershipProgram = () => {

    const {t} = useTranslation();
    const {xl, md} = useContext(BreakpointsContext);

    return (<div className="wrapper h-inherit w-full">
        <div className=" flex justify-between ml-[18px] pb-[10px] text-[12px] font-semibold">{t("partnership_program.agent_info")}
            <a className="text-[10px] text-[--gek-additional] underline" href="">{t("how_it_works")}</a>
        </div>
        <div className="wrapper grid grid-cols-5 xl:grid-cols-1 gap-2 xl:gap-0">
            <div className={`${!md ? "substrate" : "-ml-4 -mr-4 pl-4 pr-4"} col-span-3 z-10 -xl:rounded-r-none`}>
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


const ContentDescription = () => {
    const {t} = useTranslation();

    const [state, setState] = useState<string>("")
    const {md} = useContext(BreakpointsContext);

    useEffect(() => {
        (async () => {
            const response = await apiGetAgentCode()
            actionResSuccess(response).success(() => {
                setState(uncoverResponse(response))
            })
        })()
    }, []);

    return <>
         {md &&
             <div className={md ? styles.AgentCodeMobile : ""}>
                 <div className={`row ${md ? "mb-2 mt-[10px] ml-2" : "mb-6"}`}>
                     <div className="col">
                         <h4 className="font-semibold text-[12px] ml-[10px] text-[--gek-additional] ">{t("partnership_program.agent_code")}:</h4>
                     </div>
                 </div>
                 <div className={`row ${md && "flex justify-center"}`}>
                     <div className={`col ${md && "w-[95%]"}`}>
                         <ClipboardField value={state}/>
                     </div>
                 </div>
                 <div className={`row ${md ? "mb-2 mt-6 ml-2" : "mb-6"}`}>
                     <div className="col">
                         <h4 className="font-semibold text-[12px] ml-[10px] text-[--gek-additional] ">{t("partnership_program.agent_link")}:</h4>
                     </div>
                 </div>
                 <div className={`row mb-3 ${md && "flex justify-center"}`}>
                     <div className={`col ${md && "w-[95%]"}`}>
                         <ClipboardField value={`https://web.gekkard.com/agent?code=${state}`}/>
                     </div>
                 </div>
             </div>
         }
    </>
}

const ContentMain = () => {

    const {t} = useTranslation();
    const [state, setState] = useState<string>("")
    const {md} = useContext(BreakpointsContext);

    useEffect(() => {
        (async () => {
            const response = await apiGetAgentCode()
            actionResSuccess(response).success(() => {
                setState(uncoverResponse(response))
            })
        })()
    }, [])

    return <>
        {!md &&
            <div className={md ? styles.AgentCodeMobile : ""}>
                <div className={`row ${md ? "mb-2 mt-6 ml-2" : "mb-6"}`}>
                    <div className="col">
                        <h4 className="font-bold ">{t("partnership_program.agent_code")}</h4>
                    </div>
                </div>
                <div className={`row mb-8 ${md && "flex justify-center"}`}>
                    <div className={`col ${md && "w-[95%]"}`}>
                        <ClipboardField value={state}/>
                    </div>
                </div>
                <div className={`row ${md ? "mb-2 mt-6 ml-2" : "mb-6"}`}>
                    <div className="col">
                        <h4 className="font-bold ">{t("partnership_program.agent_code")}</h4>
                    </div>
                </div>
                <div className={`row mb-8 ${md && "flex justify-center"}`}>
                    <div className={`col ${md && "w-[95%]"}`}>
                        <ClipboardField value={`https://web.gekkard.com/agent?code=${state}`}/>
                    </div>
                </div>
            </div>
        }
        <div className="row mb-[10px] mt-[10px] ml-[18px]">
            <div className="col">
                <h4 className="font-semibold text-[12px]">{t("partnership_program.referrals_info")}</h4>
            </div>
        </div>
        <div className="row mb-[10px] ">
            <div className="col">
                <TableReferrals/>
            </div>
        </div>
        <div className="row ml-[18px]">
            <div className="col">
                <h4 className="font-semibold text-[12px]">{t("partnership_program.rewards")}</h4>
            </div>
        </div>
        <div className={`row ${md&&"mb-[200px]"}`}>
            <div className="col">
                <History types={[17]}/>
            </div>
        </div>
        {/* {md&&
            <div className={`z-[-100] row ${md&&"bg-[#F9F9FA] absolute bottom-[38px] w-full left-[0]"}`}>
                <Footer textAlight='text-center'/>
            </div>
        } */}
    </>
}

export default PartnershipProgram
