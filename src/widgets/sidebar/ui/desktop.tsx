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
    const [collapse, setCollapse] = useState(false)
    const [mainCoin, setMainCoin] = useState("EURG")


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

    const handleCollapse = () => {
        setCollapse(prevState => !prevState)
    }
    const handleMainCoin = (val: string) => {
        setMainCoin(val)
        setCollapse(false)
    }
    return <div className={`${styles.Sidebar} flex flex-col justify-between`}>
        <div className="wrapper">
            <div className={`wrapper flex-col ml-4 pt-12 pb-8 flex ${collapse ? "active" : ""} ${styles.Wrapper}`}>
                <div onClick={handleCollapse} className="row cursor-pointer flex justify-between w-full">
                    <div className="col">
                        <div className="row mb-2">
                            <span className="text-gray text-sm font-semibold">Total balance</span>
                        </div>
                        <div className="row"></div>
                        <span className="text-lg font-bold">1000.00 {mainCoin}</span>
                    </div>
                    <div className="col ml-auto">
                        <span className={`arrow-down-xs ${collapse ? "rotate-180" : ""}`}></span>
                    </div>
                </div>
                <div className="row">
                    <div className={`wrapper ${styles.Collapse} bg-gray -ml-4`}>
                        <div onClick={() => handleMainCoin("EUR")}
                             className="row p-3 cursor-pointer border-black border-b-1 border-solid">
                            <span>EUR</span>
                        </div>
                        <div onClick={() => handleMainCoin("EURG")} className="row p-3 cursor-pointer">
                            <span>EURG</span>
                        </div>
                    </div>
                </div>
            </div>
            {state.map((item, i) => <NavLink to={`wallet/${item.currency}`}>
                <div key={i + "-coin"} className={styles.Coin}>
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