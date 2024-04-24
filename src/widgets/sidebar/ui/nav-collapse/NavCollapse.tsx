import styles from "./style.module.scss"
import {useState} from "react";
import useSessionStorage from "@/shared/model/hooks/useSessionStorage";

const NavCollapse = ({children, id, header}) => {

    const [value, setValue] = useSessionStorage("collapse-nav", {
        [id]: null
    })
    const initActiveStorage = value[id] === null ? true : value[id]

    const [isActive, toggleActive] = useState(initActiveStorage)

    const handlerToggle = () => {

        setValue(prevState => ({[id]: !isActive}));

        toggleActive(prev => !prev);

    }

    return <>
        <button onClick={handlerToggle} className={styles.Header + (isActive ? " active" : "")}>
            <div className={`flex flex-nowrap items-center justify-end pr-4 pt-2 pb-2`}>
                <span className="text-gray-400 text-sm mr-4 font-medium">{header}</span>
                <svg className={styles.Arrow} width="8" height="8" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M.608 0h9.772c.454 0 .792.389.526.773-.213.308-4.509 6.464-4.876 6.99-.241.345-.817.34-1.059 0C4.702 7.385.384 1.205.084.757-.136.43.107 0 .608 0z" fill="#285E69"/></svg>
            </div>
        </button>
        <div className={styles.List + ""}>
            {children}
        </div>
    </>
}
export default NavCollapse