import {useContext} from 'react';
import {CtxRootData} from "@/processes/RootContext";
import CopyIcon from "@/shared/ui/copy-icon/CopyIcon";
import { useTranslation } from 'react-i18next';
// import {storeOrganizations} from "@/shared/store/organizations";

const TopUpFormSepa = () => {

    // const organizations = storeOrganizations(state => state.organizations);
    const {account} = useContext(CtxRootData);
    const {t} = useTranslation()

    return (<div className="wrapper">
        <div className="row mb-8 w-full">
            <div className="col">
                <div className="row mb-2">
                    <div className="col">
                        <span className="text-gray-400">{t("account_for_top_up")}:</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col flex items-center select-text">
                        <span>{account.number}</span>
                        <CopyIcon value={account.number}/>
                    </div>
                </div>
            </div>
        </div>
        {/*<div className="row mb-8 w-full">*/}
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
        <div className="row mb-8 w-full">
            <div className="col">
                <div className="row mb-2">
                    <div className="col">
                        <span className="text-gray-400">{t("recipient")}:</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col flex items-center select-text">
                        <span>{account.name}</span>
                        <CopyIcon value={account.name}/>
                    </div>
                </div>
            </div>
        </div>
        <div className="row mb-8 w-full">
            <div className="col">
                <div className="row mb-2">
                    <div className="col">
                        <span className="text-gray-400">{t("the_beneficiary_bank")}:</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col flex items-center select-text">
                        <span>Papaya Ltd</span>
                        <CopyIcon value={'Papaya Ltd'}/>
                    </div>
                </div>
            </div>
        </div>
        <div className="row mb-8 w-full">
            <div className="col">
                <div className="row mb-2">
                    <div className="col">
                        <span className="text-gray-400">{t("bic_of_beneficiary_bank")}:</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col flex items-center select-text">
                        <span>PAPYMTMTXXX</span>
                        <CopyIcon value={'PAPYMTMTXXX'}/>
                    </div>
                </div>
            </div>
        </div>
    </div>)

};

export default TopUpFormSepa;
