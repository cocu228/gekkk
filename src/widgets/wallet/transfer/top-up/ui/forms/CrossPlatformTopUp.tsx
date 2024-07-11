import { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { CtxWalletNetworks } from '../../../model/context';
import style from './style.module.scss'

function CrossPlatformTopUp() {
    const [params] = useSearchParams();
    const currency = params.get("currency");
    const { t } = useTranslation()
    const [enviroment, setEnviroment] = useState<string>(null)
    const {networkTypeSelect} = useContext(CtxWalletNetworks);


    useEffect(()=>{
        setEnviroment(import.meta.env.MODE.split('.')[0])
    }, [import.meta.env.MODE])

    return (
        <div>
            <span className={style.TopUpText}>
                {t("top_up_curr", {curr: currency}) + " "} 
                <a
                    href={
                        networkTypeSelect === 232
                            ? `http://${enviroment}.gekkoin.com/wallet?currency=${currency}&tab=withdraw`
                            : networkTypeSelect === 233
                                ? `http://${enviroment}.gekkard.com/wallet?currency=${currency}&tab=withdraw`
                                : `http://${enviroment}.gekwallet.com/wallet?currency=${currency}&tab=withdraw`
                    }
                    className='text-[#2BAB72] font-semibold'
                >
                    {t(
                        "form_in_wallet", 
                        {project: networkTypeSelect === 232
                            ? "Gekkoin"
                            : networkTypeSelect === 233
                                ? "Gekkard"
                                : "Gekwallet"
                        }
                    )}
                </a>
            </span>
        </div>
    )
}

export default CrossPlatformTopUp