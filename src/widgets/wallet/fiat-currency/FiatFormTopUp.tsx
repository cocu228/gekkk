import {useContext} from 'react';
import {CtxRootData} from "@/processes/RootContext";
import CopyIcon from "@/shared/ui/copy-icon/CopyIcon";
import {storeOrganizations} from "@/shared/store/organizations";

const FiatFormTopUp = () => {

    const organizations = storeOrganizations(state => state.organizations);
    const {account} = useContext(CtxRootData);


    return (<div className="wrapper">
        <div className="row mb-8 w-full">
            <div className="col">
                <div className="row mb-2">
                    <div className="col">
                        <span className="text-gray-400">Account for top up:</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col flex items-center">
                        <span>{account.number}</span>
                        <CopyIcon value={account.number}/>
                    </div>
                </div>
            </div>
        </div>
        <div className="row mb-8 w-full">
            <div className="col">
                <div className="row mb-2">
                    <div className="col">
                        <span className="text-gray-400">Recipient:</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col flex items-center">
                        <span>{organizations.trustedClients
                            //.find(item => item.clientId === account.client).title
                            .find(item => item.clientId === account.number).title
                        }</span>
                        <CopyIcon value={account.number}/>
                    </div>
                </div>
            </div>
        </div>
        <div className="row mb-8 w-full">
            <div className="col">
                <div className="row mb-2">
                    <div className="col">
                        <span className="text-gray-400">The beneficiary’s bank:</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col flex items-center">
                        <span>{account.number}</span>
                        <CopyIcon value={account.number}/>
                    </div>
                </div>
            </div>
        </div>
        <div className="row mb-8 w-full">
            <div className="col">
                <div className="row mb-2">
                    <div className="col">
                        <span className="text-gray-400">BIC of beneficiary’s bank:</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col flex items-center">
                        <span>{account.number}</span>
                        <CopyIcon value={account.number}/>
                    </div>
                </div>
            </div>
        </div>
    </div>)

};

export default FiatFormTopUp;
