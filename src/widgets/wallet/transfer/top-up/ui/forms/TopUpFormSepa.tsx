import {useContext} from 'react';
import {CtxRootData} from "@/processes/RootContext";
import CopyIcon from "@/shared/ui/copy-icon/CopyIcon";
import { useTranslation } from 'react-i18next';
import { useBreakpoints } from '@/app/providers/BreakpointsProvider';
// import {storeOrganizations} from "@/shared/store/organizations";

const TopUpFormSepa = () => {

    // const organizations = storeOrganizations(state => state.organizations);
    const {account} = useContext(CtxRootData);
    const {t} = useTranslation()
    const {md} = useBreakpoints()

    return (<div className="wrapper">
        <div className="row mb-8 md:mb-[10px] w-full">
            <div className="col">
                <div className="row mb-2 md:mb-[3px] md:ml-[10px] md:text-[10px]">
                    <div className="col">
                        <span className="text-gray-400 md:text-[var(--gek-additional)] md:font-semibold">{t("account_for_top_up")}:</span>
                    </div>
                </div>
                <div className="row md:text-[var(--gek-dark-blue)] md:border-solid md:border-[var(--gek-light-grey)] md:border-[1px] md:py-[10px] md:px-[15px] md:rounded-[5px]">
                    <div className="col md:text-[12px] flex items-center select-text">
                        <span className='md:w-[100%] overflow-hidden text-ellipsis'>{account.number}</span>
                        <div>
                            <CopyIcon value={account.number}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/*<div className="row mb-8 md:mb-[10px] w-full">*/}
        {/*    <div className="col">*/}
        {/*        <div className="row mb-2">*/}
        {/*            <div className="col">*/}
        {/*                <span className="text-gray-400">Recipient:</span>*/}
        {/*            </div>*/}
        {/*        </div>*/}
        {/*        <div className="row">*/}
        {/*            <div className="col flex items-center">*/}
        {/*                <span>{organizations?.trustedClients*/}
        {/*                    //.find(item => item.clientId === account.client).title*/}
        {/*                    .find(item => item.clientId === account.number)?.title*/}
        {/*                }</span>*/}
        {/*                <CopyIcon value={account.number}/>*/}
        {/*            </div>*/}
        {/*        </div>*/}
        {/*    </div>*/}
        {/*</div>*/}
        <div className="row mb-8 md:mb-[10px] w-full">
            <div className="col">
                <div className="row mb-2 md:mb-[3px] md:ml-[10px] md:text-[10px]">
                    <div className="col">
                        <span className="text-gray-400 md:text-[var(--gek-additional)] md:font-semibold">{t("recipient")}:</span>
                    </div>
                </div>
                <div className="row md:text-[var(--gek-dark-blue)] md:border-solid md:border-[var(--gek-light-grey)] md:border-[1px] md:py-[10px] md:px-[15px] md:rounded-[5px]">
                    <div className="col md:text-[12px] flex items-center select-text">
                        <span className=' md:w-[100%] overflow-hidden text-ellipsis'>{account.name}</span>
                        <CopyIcon value={account.name}/>
                    </div>
                </div>
            </div>
        </div>
        <div className="row mb-8 md:mb-[10px] w-full">
            <div className="col">
                <div className="row mb-2 md:mb-[3px] md:ml-[10px] md:text-[10px]">
                    <div className="col">
                        <span className="text-gray-400 md:text-[var(--gek-additional)] md:font-semibold">{t("the_beneficiary_bank")}:</span>
                    </div>
                </div>
                <div className="row md:text-[var(--gek-dark-blue)] md:border-solid md:border-[var(--gek-light-grey)] md:border-[1px] md:py-[10px] md:px-[15px] md:rounded-[5px]">
                    <div className="col md:text-[12px] flex items-center select-text">
                        <span className=' md:w-[100%] overflow-hidden text-ellipsis'>Papaya Ltd</span>
                        <CopyIcon value={'Papaya Ltd'}/>
                    </div>
                </div>
            </div>
        </div>
        <div className="row mb-8 md:mb-[10px] w-full">
            <div className="col">
                <div className="row mb-2 md:mb-[3px] md:ml-[10px] md:text-[10px]">
                    <div className="col">
                        <span className="text-gray-400 md:text-[var(--gek-additional)] md:font-semibold">{t("bic_of_beneficiary_bank")}:</span>
                    </div>
                </div>
                <div className="row md:text-[var(--gek-dark-blue)] md:border-solid md:border-[var(--gek-light-grey)] md:border-[1px] md:py-[10px] md:px-[15px] md:rounded-[5px]">
                    <div className="col md:text-[12px] flex items-center select-text">
                        <span className=' md:w-[100%] overflow-hidden text-ellipsis'>PAPYMTMTXXX</span>
                        <CopyIcon value={'PAPYMTMTXXX'}/>
                    </div>
                </div>
            </div>
        </div>
    </div>)

};

export default TopUpFormSepa;
