import {useContext, useState} from 'react'
import {useNavigate} from 'react-router-dom';
import {actionResSuccess, getCookieData, scrollToTop, uncoverResponse} from '@/shared/lib/helpers';
import {CtxRootData} from '@/processes/RootContext';
import PageHead from "@/shared/ui/page-head/PageHead";
import {AccountRights} from '@/shared/config/account-rights';
import AssetsTable from '@/features/assets-table/ui/AssetsTable';
import {CurrencyFlags} from '@/shared/config/mask-currency-flags';
import {AssetTableKeys} from '@/features/assets-table/model/types';
import {BreakpointsContext} from "@/app/providers/BreakpointsProvider";
import $axios from '@/shared/lib/(cs)axios';
import useModal from '@/shared/model/hooks/useModal';
import Modal from '@/shared/ui/modal/Modal';
import Button from '@/shared/ui/button/Button';
import Loader from '@/shared/ui/loader';

function Assets() {
    const {account} = useContext(CtxRootData);
    const {xl, md, lg} = useContext(BreakpointsContext);
    const navigate = useNavigate();

    let columns = [
        AssetTableKeys.NAME,
        ...(!lg ? [AssetTableKeys.CURRENCY] : []),
        AssetTableKeys.PRICE,
        AssetTableKeys.ACTIONS
    ];

    return (
        <>
            <PageHead title={"Crypto assets"} subtitle={"Choose and buy the assets interested you"}/>
            <div className="wrapper grid grid-cols-5 xl:grid-cols-1 gap-2 xl:gap-0">
                {xl && <InfoBox/>}
                {<div className={`${!md ? "substrate" : "bg-white -ml-4 -mr-4 pt-4"} col-span-3 z-10 -xl:rounded-r-none`}>
                    <AssetsTable
                        columnKeys={columns}
                        onSelect={(currency: string) => {
                            scrollToTop();
                            navigate(`/wallet/${currency}`)
                        }}
                        allowedFlags={[
                            CurrencyFlags.AccountAvailable,
                            CurrencyFlags.ExchangeAvailable,
                            CurrencyFlags.StructInvestAvailable,
                        ]}
                    />
                </div>}
                {!xl && <div
                    className={`substrate h-full -ml-4 z-0 col-span-2 text-gray-600 ${!md ? "max-h-[1280px] -xxl:pl-16 -xxl:pr-20 -xxxl:pl-16 -xxxl:pr-24 overflow-auto" : ""}`}>
                    <div className="row mb-5 flex justify-center">
                        <div className="col">
                            <img width={46} height={46} src="/img/icon/InvestTokenRight.svg" alt="InvestTokenRight"/>
                        </div>
                    </div>
                        <div className="row mb-1 flex justify-center">
                            <div className="col">
                                <h5 className="font-medium max-w-[320px] text-center">Choose cryptocurrency for
                                investing</h5>
                        </div>
                    </div>
                    <div className="row mb-5 flex justify-center">
                        <div className="col flex justify-center">
                            <span
                                className="text-gray-450 text-center leading-8 max-w-[320px]">You may swap your EURG for Bitcoin or most popular altcoins</span>
                        </div>
                    </div>
                    <div className="row mb-5">
                        <div className="col">
                            <img width={210} height={64} src="/img/icon/InvestTokensLine.svg" alt="InvestTokensLine"/>
                        </div>
                    </div>
                    <div className="row mb-5">
                        <div className="col text-sm">
                            <p className="leading-6">Bitcoin is the first and most popular cryptocurrency in the
                                world.</p>
                            <br/>
                            <p className="leading-6">In the wake of the success of BTC, other alternative
                                cryptocurrencies began to appear,
                                which are called "altcoins". Keeping the essence of the Bitcoin idea, most altcoins are
                                trying to find competitive advantages in their versions.</p>
                            <br/>
                            <p className="leading-6">At the moment, there are more than 17 thousand different altcoins.
                                Here you can purchase the most interesting and popular ones.</p>
                        </div>
                    </div>

                    {account.rights && !account.rights[AccountRights.IsJuridical] && (
                        <div className="row">
                            <div className="col">
                                <InfoBox/>
                            </div>
                        </div>
                    )}
                </div>}
            </div>
        </>
    )
}

const InfoBox = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const {showModal, handleCancel, isModalOpen} = useModal();

    const onClick = async () => {
        setLoading(true);

        const {phone, token, tokenHeaderName} = getCookieData<{
            phone: string,
            token: string,
            tokenHeaderName: string
        }>();

        const response = await $axios.post('/pub/v1/auth', {
            authorization: phone,
            token: token,
            tokenHeaderName: tokenHeaderName
        });
        actionResSuccess(response).success(() => {
            window.open(`https://dev.gekkoin.com?sessionId=${uncoverResponse(response)}`, "_blank");
        });
        setLoading(false);
    }

    return <div className='info-box-description'>
        <p className="leading-6">
            By purchasing tokens, you take on all the risks associated with the volatility of cryptocurrencies.
            If you are interested in safer investment instruments, we recommend that you use <a
            className="font-bold underline hover:cursor-pointer"
            onClick={showModal}>structured or fixed deposits</a>.</p>

        <Modal onCancel={handleCancel} open={isModalOpen}>
            <>
                <div className="row mb-10">
                    <div className="col">
                        <p className="font-bold text-sm leading-6 text-center">You will be directed to your personal
                            Gekkoin
                            account, where you can open fixed-income deposits or deposits linked to changes in the
                            exchange
                            rate of your chosen cryptocurrency.</p>
                    </div>
                </div>
                <div className="row relative">
                    <div className="col">
                        {loading ? <Loader className={"w-[24px] h-[24px]"}/> :
                            <Button onClick={onClick}
                                    className="w-full">Confirm</Button>}
                    </div>
                </div>
            </>
        </Modal>
    </div>
}

export default Assets;
