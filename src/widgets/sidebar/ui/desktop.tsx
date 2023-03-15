import styles from "./desktop.module.scss"
import Footer from "@/widgets/footer";
import {useEffect, useState} from "react";
import {apiGetBalance} from "@/shared/api";
import useSessionStorage from "@/shared/model/hooks/useSessionStorage";
import {useNavigate} from 'react-router-dom';
import {generation, IResult} from "@/widgets/sidebar/module/helper";

const SidebarDesktop = () => {

    const [{phone}] = useSessionStorage("session-auth", {phone: "", sessionId: "", code: ""})
    const [{token}] = useSessionStorage("session-global", {token: ""})


    const navigate = useNavigate()

    const [state, setState] = useState<IResult | null>(null)



    useEffect(() => {

        (async () => {

            const {data} = await apiGetBalance(phone, token);
            const result = generation(data)
            setState(result)

        })()

    }, [])

    return <div className={`${styles.Sidebar} flex flex-col justify-between`}>
        <div className="wrapper">
            <div className={`wrapper flex-col ml-4 pt-12 pb-8 flex ${styles.Wrapper}`}>
                <div className="row flex justify-between w-full">
                    <div className="col">
                        <div className="row mb-2">
                            <span className="text-gray text-sm font-semibold">Asset valuation</span>
                        </div>
                        <div className="row"></div>
                        <span className="text-lg font-bold">0 €  (0.00000 ₿)</span>
                    </div>

                </div>
            </div>
            <div className={styles.Item}>
                <div className="col flex items-center pl-4">
                    <img width={50} height={50} className={styles.Coin} src={`/public/img/coins/EurgIcon.svg`}
                         alt="EURG"/>
                </div>
                <div className="col flex items-center justify-center flex-col pl-6">
                    <div className="row w-full mb-1"><span>EURG Gekkoin</span></div>
                    <div className="row w-full"><span
                        className="text-gray text-sm">{state?.eurg.balance ?? 0} EURG</span>
                    </div>
                </div>
            </div>
            <div className={styles.Item}>
                <div className="col flex items-center pl-4">
                    <img width={50} height={50} className={styles.Icon} src={`/public/img/icon/ExchangeIcon.svg`}
                         alt="ExchangeIcon"/>
                </div>
                <div className="col flex items-center justify-center flex-col pl-6">
                    <div className="row w-full mb-1"><span>Exchange</span></div>

                </div>
            </div>
            <div className={styles.Item}>
                <div className="col flex items-center pl-4">
                    <img width={50} height={50} className={styles.Icon} src={`/public/img/icon/NewDepositIcon.svg`}
                         alt="NewDepositIcon"/>
                </div>
                <div className="col flex items-center justify-center flex-col pl-6">
                    <div className="row w-full mb-1"><span>New deposit</span></div>

                </div>
            </div>
            <div className={`flex flex-nowrap justify-end pr-4 pt-3`}>
                <span className="text-gray text-sm mr-2">Currents deposit</span>
                <img width={8} src="/public/img/icon/PrevDepositsIcon.svg" alt="green-array"/>
            </div>
            <div className={styles.Item}>
                <div className="col flex items-center pl-4">
                    <img width={50} height={50} className={styles.Icon} src={`/public/img/icon/Invest.svg`}
                         alt="Invest"/>
                </div>
                <div className="col flex items-center justify-center flex-col pl-6">
                    <div className="row w-full mb-1"><span>Crypto assets</span></div>
                </div>
            </div>
            <div className={`flex flex-nowrap justify-end pr-4 pt-3`}>
                <span className="text-gray text-sm mr-2">Assets</span>
                <img width={8} src="/public/img/icon/PrevDepositsIcon.svg" alt="green-array"/>
            </div>

            {state?.coins.map((item, i) =>
                <div onClick={() => navigate(`wallet/${item.name}`)} key={item.id.toString()}
                     className={styles.Item}>
                    <div className="col flex items-center pl-4">
                        <img className={`${styles.Coin} mr-3`} width={14} height={14}
                             src={`/public/img/icon/DepositAngleArrowIcon.svg`}
                             alt={"DepositAngleArrowIcon"}/>
                        <img className={styles.Coin} width={50}
                             src={`/public/img/coins/${item.icon}`}
                             alt={item.name}/>
                    </div>
                    <div className="col flex items-center justify-center flex-col pl-6">
                        <div className="row w-full mb-1"><span
                            className="text-gray text-xs">{item.name}</span></div>
                        <div className="row w-full"><span
                            className="text-lg">{`${item.balance} ${item.abbreviation}`}</span>
                        </div>
                        <div className="row w-full"><span
                            className="text-gray text-sm">{`${item.holdBalance} EURG`}</span>
                        </div>
                    </div>
                </div>)}
        </div>

        <Footer/>

    </div>;
}

export default SidebarDesktop