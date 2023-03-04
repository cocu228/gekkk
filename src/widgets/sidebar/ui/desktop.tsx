import styles from "./desktop.module.scss"
import Footer from "@/widgets/footer";

const SidebarDesktop = () => {

    return <div className={`${styles.Sidebar} flex flex-col justify-between`}>
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
        <Footer/>
    </div>

}

export default SidebarDesktop