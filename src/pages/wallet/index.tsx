import {useParams} from "react-router-dom";
import {useEffect} from "react";

import Tooltip from '@/shared/ui/tooltip/Tooltip';

function Wallet() {

    const params = useParams();

    return (
        <div className="flex flex-col">
            <div className="w-full">
                <div className="flex justify-center">
                    <div className="flex justify-start my-auto">
                        <div className="mr-6 w-[50px] h-[50px]">
                            <img src="/public/img/icon/EurgIcon.svg" alt="logo"/>
                        </div>

                        <div className="content-around">
                            <div className="text-sm font-medium text-gekLightGray">
                                Wallet balance
                            </div>

                            <div className="text-2xl font-bold text-gekDarkGray cursor-help">
                                317.95 EURG
                            </div>
                        </div>

                        <div className='flex flex-col content-around ml-[50px]'>
                            <div className="text-sm font-medium text-gekLightGray">
                                Rate

                                <Tooltip text={"We pay you 3% per annum of EURG on your balance under following conditions:\n(i) your weighted average balance for the reporting period is equal to or higher than 300 EURG\n(ii) our upper limit for the balance to pay the interest rate is 100,000 EURG."}>
                                    <div className="inline-block relative align-middle w-[14px] ml-1 cursor-help">
                                        <img src="/public/img/icon/HelpIcon.svg" alt="logo"/>
                                    </div>
                                </Tooltip>
                            </div>

                            <div className='text-gekDarkGray text-2xl'>
                                3% per annum
                            </div>
                        </div>
                    </div>

                    <div className="ml-auto text-right">
                        <div className="font-bold text-[32px] leading-[48px] text-gekDarkGray mb-4">
                            {params.coin}
                        </div>
                        <div className="font-bold text-[32px] leading-[48px] text-gekDarkGray mb-4">
                            Gekkoin Europe wallet
                        </div>
                        <div className="max-w-[450px] font-medium text-sm text-gray whitespace-pre-line">
                            Utility token with a fixed rate
                            <br/>
                            1 EURG = 1 euro
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Wallet;
