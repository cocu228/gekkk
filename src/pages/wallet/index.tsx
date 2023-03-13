import {useState} from 'react';
import Tab from './ui/tab/Tab';
import Tooltip from '@/shared/ui/tooltip/Tooltip';
import {useNavigate, useParams} from "react-router-dom";

const allTabs = {
    topup: 'Top up',
    withdraw: 'Withdraw',
    transfer: 'Transfer to contact',
    history: 'History',
    about: 'About'
};

function Wallet() {

    const params = useParams()

    console.log(params)

    let [activeTab, setActiveTab] = useState('topup');

    return (
        <div className="flex flex-col grow shrink-0 basis-auto w-full">
            <div className="container flex mx-auto px-4">
                <div className='flex w-inherit py-6 items-center'>
                    <div className="flex justify-start">
                        <div className="mr-6">
                            <img className='icon' src="/public/img/coins/EurgIcon.svg" alt="logo"/>
                        </div>

                        <div className="flex flex-col content-around">
                            <div className="text-sm font-medium text-gray">
                                Wallet balance
                            </div>

                            <div className="text-2xl font-bold text-gekDarkGray cursor-help">
                                317.95 EURG
                            </div>
                        </div>

                        <div className='flex flex-col content-around ml-[50px]'>
                            <div className="text-sm font-medium text-gray">
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

            <div className='flex relative pt-4 mb-8 after:bg-gekGrayLine after:mt-9 after:block after:w-full after:h-[2px] after:absolute'>
                <div className='container mx-auto px-4'>
                    <div className='flex pb-[10px]'>
                        {Object.keys(allTabs).map(tab => (
                            <Tab onClick={() => setActiveTab(tab)}
                                 isActive={activeTab === tab}>
                                {
                                    // @ts-ignore
                                    allTabs[tab]
                                }
                            </Tab>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Wallet;
