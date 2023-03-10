import styles from "./desktop.module.scss"
import Footer from "@/widgets/footer";
import {useEffect, useState} from "react";
import {apiSignIn, apiGetBalance} from "@/shared/api";
import useSessionStorage from "@/shared/model/hooks/useSessionStorage";
import CoinsNameList from "@/shared/config/coins-name-list";
import {NavLink} from "react-router-dom";

const SidebarDesktop = () => {

    const [sessionAuth] = useSessionStorage("session-auth", {phone: "", sessionId: ""})

    const [sessionGlobal, setSessionGlobal] = useSessionStorage("session-global", {token: ""})
    const {phone, sessionId} = sessionAuth

    const [state, setState] = useState([])


    useEffect(() => {


        (async () => {

            let {token} = sessionGlobal

            if (!token) {
                await apiSignIn("000000", sessionId, phone).then(res => {
                    setSessionGlobal(prev => ({
                        ...prev,
                        token: res.data.token
                    }))
                    res.data.token ? token = res.data.token : null

                }).catch(e => console.warn(e))
            }
            //todo getClientId
            const {data} = await apiGetBalance("gek235263273468", phone, token);

            setState(prev => {
                return data
            })

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
                    <img width={50} height={50} className={styles.Icon} src={`/public/img/coins/EurgIcon.svg`}
                         alt="EURG"/>
                </div>
                <div className="col flex items-center justify-center flex-col pl-6">
                    <div className="row w-full mb-1"><span>EURG Gekkoin</span></div>
                    <div className="row w-full"><span
                        className="text-gray text-sm">1000.00 EURG</span>
                    </div>
                </div>
            </div>
            <div className={styles.Item}>
                <div className="col flex items-center pl-4">
                    <img width={50} height={50} className={styles.Icon} src={`/public/img/icon/ExchangeIcon.svg`}
                         alt="EURG"/>
                </div>
                <div className="col flex items-center justify-center flex-col pl-6">
                    <div className="row w-full mb-1"><span>Exchange</span></div>

                </div>
            </div>
            <div className={styles.Item}>
                <div className="col flex items-center pl-4">
                    <img width={50} height={50} className={styles.Icon} src={`/public/img/icon/NewDepositIcon.svg`}
                         alt="EURG"/>
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
                         alt="EURG"/>
                </div>
                <div className="col flex items-center justify-center flex-col pl-6">
                    <div className="row w-full mb-1"><span>Crypto assets</span></div>
                </div>
            </div>
            <div className={`flex flex-nowrap justify-end pr-4 pt-3`}>
                <span className="text-gray text-sm mr-2">Assets</span>
                <img width={8} src="/public/img/icon/PrevDepositsIcon.svg" alt="green-array"/>
            </div>
            {state.map((item, i) => <NavLink to={`wallet/${item.currency}`}>
                <div key={i + "-coin"} className={styles.Item}>
                    <div className="col flex items-center pl-4">
                        <img className={styles.Icon} src={`/public/img/coins/${CoinsNameList[item.currency].icon}`}
                             alt={item.currency}/>
                    </div>
                    <div className="col flex items-center justify-center flex-col pl-6">
                        <div className="row w-full mb-1"><span>{CoinsNameList[item.currency].name}</span></div>
                        <div className="row w-full"><span
                            className="text-gray text-sm">{`${(item.free_balance).toFixed(4)} ${item.currency}`}</span>
                        </div>
                        <div className="row w-full"><span
                            className="text-gray text-sm">{`(${(item.lock_orders + item.lock_out_balance).toFixed(4)} on hold)`}</span>
                        </div>
                    </div>
                </div>
            </NavLink>)}
        </div>
        <Footer/>
    </div>;

}

export default SidebarDesktop