import Button from '@/shared/ui/button/Button';
import React, {useContext} from "react";
import {CtxWalletCurrency} from "@/widgets/wallet/model/context";
import PercentBtn from "@/shared/ui/percent-btn/PercentBtn";
import DepositInput from "@/widgets/deposit/ui/deposit-input";
import {apiCreateTxCode} from "@/widgets/wallet/transfer/api/create-tx-code";


const CreateCode = () => {

    const currency = useContext(CtxWalletCurrency),
        {
            name,
            defaultInfoToken: {flags}
        } = currency

    const onCreateCode = async () => {
        const res = await apiCreateTxCode(12, "EURG")

        console.log(res)
    }

    // const {xl, md} = useContext(BreakpointsContext);
    // const navigate = useNavigate()

    return (
        <div>
            <div className="row bg-gray-300 -mx-14 px-14 py-4 mb-6">
                <p>Create a special code with which you can transfer EURG funds between Gekkoin users with or without
                    your confirmation.</p>
            </div>
            <div className="row">
                <div className="col">
                    <div className="wrapper w-full mb-10 xl:mb-8 md:mb-7">
                        <div className="row flex justify-between mb-2 md:mb-1 items-center">
                            <div className="wrapper flex text-xs gap-1">
                                <p className="text-gray-400 font-medium md:text-sm sm:text-xs">
                                    I will give
                                </p>
                            </div>

                            <div className="row flex gap-1 text-xs">
                                <PercentBtn>25%</PercentBtn>
                                <PercentBtn>50%</PercentBtn>
                                <PercentBtn>75%</PercentBtn>
                                <PercentBtn>100%</PercentBtn>
                            </div>
                        </div>

                        <DepositInput/>
                    </div>
                </div>
            </div>
            <div className="row">
                <Button className="w-full" size="xl" onClick={onCreateCode}>Confirm
                </Button>
            </div>
        </div>
    );
};

export default CreateCode;
