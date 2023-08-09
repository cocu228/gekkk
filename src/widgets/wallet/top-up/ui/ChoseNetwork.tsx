import Select from "@/shared/ui/select/Select";
import React, {useContext} from "react";
import {CtxWalletNetworks, CtxWalletData} from "@/widgets/wallet/model/context";
import {IconCoin} from "@/shared/ui/icons/icon-coin";
import {BreakpointsContext} from "@/app/providers/BreakpointsProvider";
import InfoBox from "@/widgets/info-box";

const ChoseNetwork = ({withdraw = false}) => {
    const {$const} = useContext(CtxWalletData)
    const {setNetworkId, networksForSelector, networkIdSelect} = useContext(CtxWalletNetworks)
    // const {xl, md} = useContext(BreakpointsContext);

    const noteVisible = !withdraw && !(Array.isArray(networksForSelector) && networksForSelector.length === 0) && $const !== "EURG"

    return <>
        {/*<div className="row mb-10">*/}
        {/*    <div className="col flex items-center gap-3 font-bold">*/}
        {/*        <IconCoin width={40} height={40} code={currency.const}/>*/}
        {/*        <span className="font-bold">{currency.name} <span>({currency.const})</span></span>*/}
        {/*    </div>*/}
        {/*</div>*/}
        <div className="row mb-8 w-full">
            {withdraw ? "Select withdraw network" : "Select network"}

            <div className="col">
                <Select className="w-full mt-2"
                        placeholder={"Networks not found"}
                        value={networksForSelector?.length ? networkIdSelect : null}
                        onSelect={setNetworkId}
                        options={networksForSelector}
                />
            </div>
        </div>

        {noteVisible && <div className="row mb-10">
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
                                className="text-gray-400 font-medium text-fs14 leading-6">You should send only <b>{$const}</b> to supported network address on Gekkoin platform. If you are top up via another network your assets may be lost.</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>}
        {!networksForSelector || networksForSelector.length === 0 && <InfoBox
            message={"At the moment there is not a single option available for top up this asset. Please check it later."}/>}
    </>
}

export default ChoseNetwork;
