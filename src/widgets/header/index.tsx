import styles from "./style.module.scss"

const Header = () => {
    return <>
        <header className="flex justify-between">
            <div className="flex items-center">
                <button className={styles.NavBtn}/>
                <img style={{objectFit: "contain"}} src="/public/logo.png" width={72}
                     height={24} alt="logo"/>
            </div>
            <div className="wrapper">
                <button className={styles.ArrowBtn}/>
            </div>
        </header>
    </>

}

export default Header