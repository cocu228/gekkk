import styles from "./desktop.module.scss"
// import Button from "@/shared/ui/button/Button";

const HeaderDesktop = () => {


    const onBtnProfile = () => {

    }

    const onBtnLogout = () => {

    }

    return <>
        <header className={`flex ${styles.Header}`}>
            <div className={`flex items-center ${styles.ContainerLogo}`}>
                <a href="/">
                    <img style={{objectFit: "contain"}} src="/public/logo.png" width={165}
                         height={55} alt="logo"/>
                </a>
            </div>
            <button className="ml-auto" onClick={onBtnProfile}>
                <div className="flex items-center justify-end">
                    <div className="wrapper mr-2">
                        <img width={26} height={26} src="/public/img/icon/UserIcon.svg" alt="UserIcon"/>
                    </div>
                    <div className="wrapper">
                        <div className="row">
                            <span className="text-sm">ID: 208294110048</span>
                            <span>$</span>
                        </div>
                        <div className="row">
                            <span className="text-xs text-gray font-semibold">Your current status: Start</span>
                        </div>
                    </div>
                </div>
            </button>
            <button onClick={onBtnLogout}>
                <div className="flex items-center justify-end ml-10">
                    <img width={26} height={26} src="/public/img/icon/LogoutIcon.svg" alt="UserIcon"/>
                </div>
            </button>
        </header>
    </>

}

export default HeaderDesktop