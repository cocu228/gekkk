import Select from "@/shared/ui/select/Select";
import React, {useContext} from "react";
import {CtxWalletCurrency, CtxWalletNetworks} from "@/widgets/wallet/model/context";
import {IconCoin} from "@/shared/ui/icons/icon-coin";
import {BreakpointsContext} from "@/app/providers/BreakpointsProvider";

const ChoseNetwork = ({withdraw = false}) => {
    const currency = useContext(CtxWalletCurrency)
    const {setNetworkId, networksForSelector, networkIdSelect} = useContext(CtxWalletNetworks)
    const {xl, md} = useContext(BreakpointsContext);
    console.log(withdraw)
    return <>
        {/*<div className="row mb-10">*/}
        {/*    <div className="col flex items-center gap-3 font-bold">*/}
        {/*        <IconCoin width={40} height={40} code={currency.const}/>*/}
        {/*        <span className="font-bold">{currency.name} <span>({currency.const})</span></span>*/}
        {/*    </div>*/}
        {/*</div>*/}
        <div className="row mb-8 w-full">
            <div className="col">
                <Select className="w-full mt-2"
                        placeholder={withdraw ? "Select withdraw network" : "Select network"}
                        value={networkIdSelect}
                        onSelect={setNetworkId}
                        options={networksForSelector}
                />
            </div>
        </div>

        {!withdraw && <div className="row mb-10">
            <div className="col">
                <div className="info-box-note mb-10">
                    <div className="row mb-3">
                        <div className="col">
                            <span className="text-red-800">Please note</span>
                        </div>
                    </div>
                    <div className="row mb-1">
                        <div className="col">
                            <span
                                className="text-gray-400 font-medium text-fs14 leading-6">You should send only <b>{currency.const}</b> to supported network address on Gekkoin platform. If you are top up via another network your assets may be lost.</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>}
    </>
}

export default ChoseNetwork