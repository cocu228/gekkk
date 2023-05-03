import React, {useContext} from 'react';
import TopUpQR from "@/widgets/wallet/top-up/ui/TopUpQR";
import {CtxWalletNetworks} from "@/widgets/wallet/model/context";
import Input from "@/shared/ui/input/Input";
import Button from "@/shared/ui/button/Button";

const TopUpCode = () => {

    const {setNetworkId, networksForSelector, networksDefault, networkIdSelect} = useContext(CtxWalletNetworks)

    return (<>
            <div className="row mb-8 flex items-center">
                <div className="col w-full">
                    <Input/>
                </div>
            </div>
            <div className="row flex items-center justify-between">
                <div className="col w-full">
                    <Button size={"xl"} className="w-full">Apply</Button>
                </div>
            </div>
        </>
    )

};

export default TopUpCode;
