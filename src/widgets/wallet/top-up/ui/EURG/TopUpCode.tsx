import React, {useContext} from 'react';
import TopUpQR from "@/widgets/wallet/top-up/ui/TopUpQR";
import {CtxWalletNetworks} from "@/widgets/wallet/model/context";
import Input from "@/shared/ui/input/Input";

const TopUpCode = () => {

    const {setNetworkId, networksForSelector, networksDefault, networkIdSelect} = useContext(CtxWalletNetworks)

    if (networksDefault.length > 0 && networkIdSelect === null) {
        setNetworkId(networksDefault[0]?.id)
    } else {

    }

    return (<>
            <div className="row">
                <div className="col">
                    <Input/>
                </div>
            </div>
        </>
    )

};

export default TopUpCode;
