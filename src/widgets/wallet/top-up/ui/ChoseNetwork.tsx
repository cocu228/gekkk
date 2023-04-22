import Select from "@/shared/ui/select/Select";
import React, {useContext} from "react";
import {CtxWalletNetworks} from "@/widgets/wallet/model/context";

const ChoseNetwork = () => {

    const {setNetworkId, networksForSelector, networkIdSelect} = useContext(CtxWalletNetworks)

    return <>
        <div className="row mb-8 w-full">
            <div className="col">
                Select network
                <Select className="w-full mt-2"
                        placeholder={"Chose Network"}
                        value={networkIdSelect}
                        onSelect={setNetworkId}
                        options={networksForSelector}
                />
            </div>
        </div>

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
    </>
}

export default ChoseNetwork