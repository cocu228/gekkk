import styles from "./mobile.module.scss"
import {storyToggleSidebar} from "@/widgets/sidebar/model/story";
import {useRef} from "react";

const HeaderMobile = () => {

    const toggleSidebar = useRef(storyToggleSidebar(state => state.toggle))
    const isOpen = storyToggleSidebar(state => state.isOpen)

    return <>
        <header className="flex justify-between bg-white">
            <div className="flex items-center">
                <button onClick={() => toggleSidebar.current(!isOpen)}
                        className={styles.NavBtn}/>
                <img style={{objectFit: "contain"}} src="/img/logo.svg" width={72}
                     height={24} alt="logo"/>
            </div>
            <div className="wrapper">
                <button className={styles.ArrowBtn}/>
            </div>
        </header>
    </>

}

export default HeaderMobile