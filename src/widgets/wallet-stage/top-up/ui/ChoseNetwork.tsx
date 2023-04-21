import Select from "@/shared/ui/select/Select";
import React, {useContext} from "react";
import Button from "@/shared/ui/button/Button";
import {apiCreateNetwork} from "@/shared/api/client/create-address";
import ReactQRCode from "react-qr-code";
import InputCopy from "@/shared/ui/input-copy/InputCopy";
import {CtxTopUp} from "@/widgets/wallet-stage/top-up/model/context";
import {randomId} from "@/shared/lib/helpers";

const ChoseNetwork = ({currency}) => {
    const {list, setState, hash} = useContext(CtxTopUp)
    const onCreateNetwork = async () => {

        setState(prev => ({
            ...prev,
            loading: true
        }))

        const {data} = await apiCreateNetwork(currency.defaultInfoToken.default_token_network)

        setState(prev => ({
            ...prev,
            isUpdateNow: randomId()
        }))

    }

    return <>
        {list.length !== 0 ? <div className="row mb-8 w-full">
            <div className="col">
                Select network
                <Select className="w-full mt-2"
                        placeholder={"Chose Network"}
                        value={hash}
                        onSelect={(hash) => setState(prev => ({...prev, hash}))}
                        options={list}
                />
            </div>
        </div> : <div className="row mt-8 px-4 mb-8 w-full">
            <Button tabIndex={0} onClick={onCreateNetwork} htmlType="submit"
                    className="w-full disabled:opacity-5 !text-white">
                Generate address
            </Button>
        </div>}

        <div className="row mb-10">
            <div className="col">
                <div className="p-4 bg-gray-300">
                    <div className="wrapper flex flex-col">
                        <div className="row mb-1">
                            <div className="col">
                                <span className="text-red-800">Please note</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                        <span className="text-gray-400">
                            You should send only BTC to supported network address on Gekkoin platform. If you are top up via another network your assets may be lost.
                        </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {hash !== null && <>
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
        </>}
    </>
}

export default ChoseNetwork