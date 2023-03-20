import styles from "./mobile.module.scss"

const HeaderMobile = () => {


    return <>
        <header className="flex justify-between bg-white">
            <div className="flex items-center">
                <button onClick={({currentTarget}: { currentTarget: HTMLButtonElement }) => {
                    //todo change in context
                    currentTarget.classList.toggle("active")
                    document.getElementById("sidebar")?.classList.toggle("active")
                }}
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