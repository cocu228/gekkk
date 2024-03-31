import React from "react"
import styles from "./style.module.scss"
import {HelperClassName} from "@/shared/lib/helper-class-name";

const hClassName = new HelperClassName(styles)


type Props = {
    icon?: JSX.Element;
    className?: string;
    onClick?: () => void;
    children: React.ReactNode;
    message: string | JSX.Element;
}

const InfoBox = ({
    icon,
    onClick,
    children,
    message = "",
    className = ""
}: Partial<Props>) => {
    if (!message && !children) return null;

    return <div onClick={onClick} className={hClassName.while(className).do(className).scss("Wrapper")}>
        <div className="shrink-0 flex col-auto w-[30px] h-[30px]">
            {icon}
        </div>
        
        {!message ? children : <p className={hClassName.scss("Text")}>{message}</p>}
    </div>
}

export default InfoBox;
