import styles from "./mobile.module.scss"
import {useContext} from "react";
import SidebarContext from "../module/context"

const SidebarMobile = () => {


    const {active} = useContext(SidebarContext)
    //todo change in context
    return <div id="sidebar" className={`${styles.Sidebar} ${active ? "active" : ""}`}>
        <div className="wrapper ml-4 flex">
            <div className="col">
                <div className="row">
                    <span className="text-gray font-semibold">Total balance</span>
                </div>
                <div className="row"></div>
                <span className="text-lg font-bold">1000.00 EURG</span>
            </div>
            <div className="col ml-auto">
                <span className="arrow-down-xs"></span>
            </div>
        </div>
    </div>

}

export default SidebarMobile