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
import {$axios} from '@/shared/lib/(orval)axios';
import useModal from '@/shared/model/hooks/useModal';
import Modal from '@/shared/ui/modal/Modal';
import Button from '@/shared/ui/button/Button';
import Loader from '@/shared/ui/loader';
import {useTranslation} from 'react-i18next';

function Assets() {
    const {t} = useTranslation();
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
            {!md && <PageHead title={t("crypto_assets.title")} subtitle={t("crypto_assets.subtitle")}/>}
            <div className="wrapper grid grid-cols-1 gap-2 xxl:gap-0">
                {!md && <InfoBox/>}
                {<div
                    className={`${!md ? "substrate" : "bg-white -ml-4 -mr-4 pt-4"} col-span-3 z-10 -xl:rounded-r-none`}>
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
                            <h5 className="font-medium max-w-[320px] text-center">{t("crypto_assets.choose_cryptocurrency")}</h5>
                        </div>
                    </div>
                    <div className="row mb-5 flex justify-center">
                        <div className="col flex justify-center">
                            <span
                                className="text-gray-450 text-center leading-8 max-w-[320px]">{t("crypto_assets.swap_EURG")}</span>
                        </div>
                    </div>
                    <div className="row mb-5">
                        <div className="col">
                            <img width={210} height={64} src="/img/icon/InvestTokensLine.svg" alt="InvestTokensLine"/>
                        </div>
                    </div>
                    <div className="row mb-5">
                        <div className="col text-sm">
                            <p className="leading-6">{t("crypto_assets.bitcoin_first_popular")}</p>
                            <br/>
                            <p className="leading-6">{t("crypto_assets.alternative_cryptocurrencies")}</p>
                            <br/>
                            <p className="leading-6">{t("crypto_assets.different_altcoins")}</p>
                        </div>
                    </div>

                    {account?.rights && !account.rights[AccountRights.IsJuridical] && (
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
    const {t} = useTranslation();

    const onClick = async () => {
        setLoading(true);

        const {phone, token, tokenHeaderName} = getCookieData<{
            phone: string,
            token: string,
            tokenHeaderName: string
        }>();

        const response = await $axios.post('/gek/v1/auth', {
            authorization: phone,
            token: token,
            tokenHeaderName: tokenHeaderName
        });
        const gekkoinUrl = import.meta.env[`VITE_GEKKOIN_URL_${import.meta.env.MODE}`];
        actionResSuccess(response).success(() => {
            window.open(`${gekkoinUrl ?? 'https://dev.gekkoin.com'}?sessionId=${uncoverResponse(response)}`, "_blank")
        })
        setLoading(false);
    }

    return <div className='info-box-description'>
        <p className="leading-6">
            {t("crypto_assets.risks")} <a
            className="font-bold underline hover:cursor-pointer"
            onClick={showModal}>{t("crypto_assets.deposits")}</a>.</p>

        <Modal onCancel={handleCancel} open={isModalOpen}>
            <>
                <div className="row mb-10">
                    <div className="col">
                        <p className="font-bold text-sm leading-6 text-center">{t("crypto_assets.directed_to_gekkoin")}</p>
                    </div>
                </div>
                <div className="row relative">
                    <div className="col">
                        {loading ? <Loader className={"w-[24px] h-[24px]"}/> :
                            <Button onClick={onClick}
                                    data-testid="ConfirmToGekkard"
                                    className="w-full">{t("confirm")}</Button>}
                    </div>
                </div>
            </>
        </Modal>
    </div>
}

export default Assets;
