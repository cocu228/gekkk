import Select from "@/shared/ui/select/Select";
import React, {useContext} from "react";
import Button from "@/shared/ui/button/Button";
import {apiCreateNetwork} from "@/shared/api/client/create-address";
import {CtxWalletCurrency, CtxWalletNetworks} from "@/widgets/wallet-stage/top-up/model/context";
import {randomId} from "@/shared/lib/helpers";

const ChoseNetwork = ({hash, setHash}) => {

    const {setState, addressesForSelector} = useContext(CtxWalletNetworks)
    const currency = useContext(CtxWalletCurrency)
    const onCreateNetwork = async () => {

        setState(prev => ({
            ...prev,
            loading: true
        }))

        const {data} = await apiCreateNetwork(currency.defaultInfoToken.default_token_network)

        setState(prev => ({
            ...prev,
            refreshKey: randomId()
        }))

    }

    return <>
        {addressesForSelector.length !== 0 ? <div className="row mb-8 w-full">
            <div className="col">
                Select network
                <Select className="w-full mt-2"
                        placeholder={"Chose Network"}
                        value={hash}
                        onSelect={setHash}
                        options={addressesForSelector}
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
    </>
}

export default ChoseNetwork