import {useContext} from 'react';
import {CtxWalletData, CtxWalletNetworks} from "@/widgets/wallet/model/context";
import Select from "@/shared/ui/select/Select";
import {randomId} from "@/shared/lib/helpers";
import {CtxRootData} from "@/processes/RootContext";
import CopyIcon from "@/shared/ui/copy-icon/CopyIcon";
import {storeOrganizations} from "@/shared/store/organizations";
import Input from "@/shared/ui/input/Input";
import TextArea from "antd/es/input/TextArea";
import InputCurrency from "@/shared/ui/input-currency/ui/input-field/InputField";

const EURFormWithdraw = () => {

    const currency = useContext(CtxWalletData);
    const organizations = storeOrganizations(state => state.organizations);
    const {account} = useContext(CtxRootData);

    console.log(account)

    return (<div className="wrapper">
        <div className="row mb-8 w-full">
            Select a top up method
            <div className="col">
                <Select className="w-full mt-2"
                        value={"Bank transfer"}
                />
            </div>
        </div>
        <div className="row mb-8 w-full">
            <div className="col">
                <div className="row mb-2">
                    <div className="col">
                        <span>Beneficiary name</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Input/>
                    </div>
                </div>
            </div>
        </div>
        <div className="row mb-8 w-full">
            <div className="col">
                <div className="row mb-2">
                    <div className="col">
                        <span>Account number / IBAN</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Input/>
                    </div>
                </div>
            </div>
        </div>
        <div className="row mb-8 w-full">
            <div className="col">
                <div className="row mb-2">
                    <div className="col">
                        <span>Transfer description</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Select className="w-full"
                                value={"Transfer details"}
                        />
                    </div>
                </div>
            </div>
        </div>
        <div className="row mb-8 w-full">
            <div className="col">
                <div className="row mb-2">
                    <div className="col">
                        <span>Comment (optional)</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col flex items-center">
                        <TextArea/>
                    </div>
                </div>
            </div>
        </div>
        <div className="row mb-8 w-full">
            <div className="col">
                <div className="row mb-2">
                    <div className="col">
                        <span>Amount</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <InputCurrency currency={currency.$const}/>
                    </div>
                </div>
            </div>
        </div>
    </div>)

};

export default EURFormWithdraw;
