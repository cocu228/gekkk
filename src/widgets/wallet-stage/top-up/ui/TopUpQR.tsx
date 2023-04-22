import ReactQRCode from "react-qr-code";
import InputCopy from "@/shared/ui/input-copy/InputCopy";
import React, {useContext} from "react";
import {CtxTopUp} from "@/widgets/wallet-stage/top-up/model/context";


const TopUpQR = ({hash}) => {

    return hash !== null && <>
        <div className="row text-right pb-10 flex justify-center items-center flex-col">

            <h3 className="font-medium text-xxl mb-7">Send a transaction to this <b>BTC Bitcoin</b> address</h3>

            <div className="wrapper w-[max-content] border-1 border-blue-400 border-solid p-4 rounded-md">
                <div style={{height: "auto", margin: "0 auto", maxWidth: 148, width: "100%"}}>
                    <ReactQRCode
                        size={148}
                        style={{height: "auto", maxWidth: "100%", width: "100%"}}
                        value={hash}
                        viewBox={`0 0 148 148`}
                    />
                </div>
            </div>
            <div className="row mt-4">
                <InputCopy value={hash}/>
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
    </>
}

export default TopUpQR