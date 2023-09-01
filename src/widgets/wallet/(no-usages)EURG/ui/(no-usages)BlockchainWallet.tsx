import React, {memo, useContext} from 'react';
import TopUpQR from "../../top-up-withdraw-forms/ui/top-up-qr-form/TopUpQR";
import {CtxWalletNetworks} from "../../model/context";
import Loader from "../../../../shared/ui/loader";

const BlockchainWallet = memo(() => {

    const {setNetworkId, loading, networksDefault, networkIdSelect} = useContext(CtxWalletNetworks)

    if (!loading && Array.isArray(networksDefault) && networksDefault.length > 0 && networkIdSelect === null) {
        setNetworkId(networksDefault[0]?.id)
    }

    return (<>
            <div className="info-box-note mb-10">
                <div className="row mb-3">
                    <div className="col">
                        <span className="text-red-800">Please note</span>
                    </div>
                </div>
                <div className="row mb-1">
                    <div className="col">
                        <span className="text-gray-400">You should send only <b>EURG</b> to this <b>ERC-20</b> deposit address. If you are top up via another network or other tokens your assets may be lost. </span>
                    </div>
                </div>
            </div>
            {loading ? <div className="relative w-full h-[300px]"><Loader/></div> : <TopUpQR/>}
        </>
    )

})

export default BlockchainWallet;
