import {useState} from "react";
import styles from "./style.module.scss";
import useSessionStorage from "@/shared/model/hooks/useSessionStorage";
import { IconApp } from "@/shared/ui/icons/icon-app";

const NavCollapse = ({children, id, header}) => {
    const [value, setValue] = useSessionStorage("collapse-nav", {
        [id]: null
    });
    const initActiveStorage = value[id] === null ? true : value[id];
    
    const [isActive, toggleActive] = useState(initActiveStorage);
    
    const handlerToggle = () => {
        setValue(prevState => ({[id]: !isActive}));
        
        toggleActive(prev => !prev);
    }
    
    return <div className="bg-[#fff]">
        <button  onClick={handlerToggle} className={styles.Header + (isActive ? " active" : "")}>
            <div className={`flex flex-nowrap items-center justify-end pr-4 pt-2 pb-2`}>
                <span className="text-gray-400 text-sm mr-4 font-medium">{header}</span>
                <IconApp code="t08" className="rotate-[90deg]" size={10} color='#285E69' />
            </div>
        </button>
        
        <div className={styles.List + " bg-gray-300"}>
            {children}
        </div>
    </div>
}
export default NavCollapse;
