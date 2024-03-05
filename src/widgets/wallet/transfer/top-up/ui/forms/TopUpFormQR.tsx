import {useContext} from "react";
import ReactQRCode from "react-qr-code";
import {apiCreateAddress} from "@/shared/(orval)api/gek";
import {actionResSuccess} from "@/shared/lib/helpers";
import Button from "@/shared/ui/button/Button";
import ClipboardField from "@/shared/ui/clipboard-field/ClipboardField";
import {CtxWalletNetworks, CtxWalletData} from "@/widgets/wallet/transfer/model/context";
import useError from "@/shared/model/hooks/useError";
import {getChosenNetwork} from "../../../model/helpers";
import { useTranslation } from "react-i18next";

const TopUpFormQR = () => {
    const {$const, name} = useContext(CtxWalletData);
    const [localErrorHunter, , localErrorInfoBox] = useError();
    const {t} = useTranslation()
    const {
        setRefresh,
        setLoading,
        tokenNetworks,
        addressesForQR,
        networkTypeSelect
    } = useContext(CtxWalletNetworks);
    
    const onCreateAddress = async () => {
        setLoading(true);
        
        const response = await apiCreateAddress({
            token_network: getChosenNetwork(tokenNetworks, networkTypeSelect).id
        });
        
        actionResSuccess(response).success(() => setRefresh()).reject(localErrorHunter);
    }
    
    return addressesForQR !== null && (addressesForQR !== undefined ? <>

        <div className="row text-right pb-10 flex justify-center items-center flex-col">

            <h3 className="font-medium text-fs24 mb-7 text-center">{t("send_to_this")} <b>{$const} {name}</b> {t("address_small")}</h3>

            <div className="wrapper w-[max-content] border-1 border-[#A5B7C5] border-solid p-4 rounded-md">
                <div style={{height: "auto", margin: "0 auto", maxWidth: 120, width: "100%"}}>
                    <ReactQRCode
                        style={{height: "auto", maxWidth: "120px", minWidth: "100%", width: "100%"}}
                        value={addressesForQR}
                        viewBox={`0 0 148 148`}
                    />
                </div>
            </div>
            <div className="row mt-8 w-full">
                <ClipboardField value={addressesForQR}/>
            </div>
        </div>
        {/* <div className="row flex flex-col mb-8">
            <div className="col mb-4">
                <span className="text-gray-400">Expected arrival</span>
            </div>
            <div className="col">
                <span><b>6</b> network confirmation</span>
            </div>
        </div>
        <div className="row flex flex-col">
            <div className="col mb-4">
                <span className="text-gray-400">Expected unlock</span>
            </div>
            <div className="col">
                <span><b className="text-red-800">2</b> network confirmation</span>
            </div>
        </div> */}
    </> : <>
        <div className="row mt-8 px-4 mb-8 w-full">
            <Button tabIndex={0} onClick={onCreateAddress} htmlType="submit"
                    className="w-full disabled:opacity-5 !text-white">
                Generate address
            </Button>
        </div>
        <div className="row mt-8 px-4 mb-8 w-full">
            {localErrorInfoBox}
        </div>
    </>)
}

export default TopUpFormQR;
