import ReactQRCode from "react-qr-code";
import InputCopy from "@/shared/ui/input-copy/InputCopy";
import React, {useContext} from "react";
import {CtxWalletCurrency, CtxWalletNetworks} from "@/widgets/wallet/model/context";
import Button from "@/shared/ui/button/Button";
import {apiCreateNetwork} from "@/shared/api/client/create-address";
import {randomId} from "@/shared/lib/helpers";


const TopUpQR = () => {
    const {setRefresh, setLoading, addressesForQR, networkIdSelect, networksDefault} = useContext(CtxWalletNetworks)
    const currency = useContext(CtxWalletCurrency)
    const onCreateAddress = async () => {

        setLoading(true)
        const response = await apiCreateNetwork(networkIdSelect)

        setRefresh(randomId())

    }

    return addressesForQR !== null && (addressesForQR !== undefined ? <>

        <div className="row text-right pb-10 flex justify-center items-center flex-col">

            <h3 className="font-medium text-xxl mb-7">Send a transaction to
                this <b>{currency.const} {currency.name}</b> address</h3>

            <div className="wrapper w-[max-content] border-1 border-[#A5B7C5] border-solid p-4 rounded-md">
                <div style={{height: "auto", margin: "0 auto", maxWidth: 148, width: "100%"}}>
                    <ReactQRCode
                        size={148}
                        style={{height: "auto", maxWidth: "100%", width: "100%"}}
                        value={addressesForQR}
                        viewBox={`0 0 148 148`}
                    />
                </div>
            </div>
            <div className="row mt-4 w-full">
                <InputCopy value={addressesForQR}/>
            </div>
        </div>
        <div className="row flex flex-col mb-8">
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
                <span><span className="text-red-800">2</span> network confirmation</span>
            </div>
        </div>
    </> : <div className="row mt-8 px-4 mb-8 w-full">
        <Button tabIndex={0} onClick={onCreateAddress} htmlType="submit"
                className="w-full disabled:opacity-5 !text-white">
            Generate address
        </Button>
    </div>)
}

export default TopUpQR