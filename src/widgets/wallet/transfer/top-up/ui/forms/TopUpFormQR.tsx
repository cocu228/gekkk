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
import { useBreakpoints } from "@/app/providers/BreakpointsProvider";
import CopyIcon from "@/shared/ui/copy-icon/CopyIcon";

const TopUpFormQR = () => {
    const {$const, name} = useContext(CtxWalletData);
    const [localErrorHunter, , localErrorInfoBox] = useError();
    const {t} = useTranslation()
    const {md} = useBreakpoints()
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

        <div className="row text-right pb-10 md:p-0 flex md:text-[var(--gek-additional)] justify-center items-center flex-col">

            <h3 className="font-medium md:text-[12px] text-fs24 mb-7 text-center">{t("send_to_this")} <b>{$const} {name}</b> {t("address_small")}</h3>

            <div className="wrapper w-[max-content] border-1 border-[#A5B7C5] border-solid p-4 rounded-md">
                <div style={{height: "auto", margin: "0 auto", maxWidth: 120, width: "100%"}}>
                    <ReactQRCode
                        style={{height: "auto", maxWidth: "120px", minWidth: "100%", width: "100%"}}
                        value={addressesForQR}
                        viewBox={`0 0 148 148`}
                    />
                </div>
            </div>
            {!md ? <div className="row mt-8 w-full">
                <ClipboardField value={addressesForQR}/>
            </div>
            :
                <div className="row mt-[20px] h-[41px] md:mb-[10px] w-full">
                    <div className="col">
                        <div className="row md:text-[var(--gek-dark-blue)] md:border-solid md:border-[var(--gek-light-grey)] md:border-[1px] md:py-[10px] md:px-[15px] md:rounded-[5px]">
                            <div className="col md:text-[12px] text-[var(--gek-dark-blue)] font-bold flex select-text">
                                <span className=' md:w-[100%] overflow-hidden text-start text-ellipsis'>{addressesForQR}</span>
                                <CopyIcon value={addressesForQR}/>
                            </div>
                        </div>
                    </div>
                </div>
            }
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
    </> : !md ? <>
        <div className="row mt-8 px-4 mb-8 w-full">
            <Button 
                onClick={onCreateAddress} 
                htmlType="submit"
                className="w-full disabled:opacity-5 !text-white"
            >
                {t("generate_address")}
            </Button>
        </div>
        <div className="row mt-8 px-4 mb-8 w-full">
            {localErrorInfoBox}
        </div>
    </> : <>
        <div className="row mt-8 px-4 mb-8 w-full">
            <button 
                onClick={onCreateAddress}
                className="bg-[var(--gek-green)] cursor-pointer w-full h-[43px] rounded-[8px]"
            >
                <span 
                    className="font-bold text-[white] text-[14px] "
                >
                    {t("generate_address")}
                </span>
            </button>
        </div>
        <div className="row mt-8 px-4 mb-8 w-full">
            {localErrorInfoBox}
        </div>
    </>)
}

export default TopUpFormQR;
