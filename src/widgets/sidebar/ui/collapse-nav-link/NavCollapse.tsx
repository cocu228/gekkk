import styles from "./style.module.scss"
import {useState} from "react";
import useSessionStorage from "@/shared/model/hooks/useSessionStorage";

const NavCollapse = ({children, id, header}) => {

    const [value, setValue] = useSessionStorage("collapse-nav", [])
    const initActiveStorage = value.indexOf(id) !== -1
    const [isActive, toggleActive] = useState(initActiveStorage)

    const handlerToggle = () => {

        setValue(prevState => isActive ?
            prevState.filter(it => it !== id) :
            [...prevState, id])

        toggleActive(prev => !prev)

    }

    return <>
        <button onClick={handlerToggle} className={styles.Header + (isActive ? " active" : "")}>
            <div className={`flex flex-nowrap justify-end pr-4 pt-2 pb-2`}>
                <span className="text-gray-400 text-sm mr-4 font-medium">{header}</span>
                <img className={styles.Arrow} width={8} src="/img/icon/PrevDepositsIcon.svg" alt="green-array"/>
            </div>
        </button>
        <div className={styles.List + " bg-gray-300"}>
            {children}
        </div>
    </>
}
export default NavCollapse