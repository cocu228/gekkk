import React, {useState} from "react";
import styles from "./style.module.scss";
import {isActiveClass} from "@/shared/lib/helpers";

const RefreshButton = ({calloutFunc}: {calloutFunc: (e?: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void}) => {
    const [active, setActive] = useState<boolean>(false);

    const onClick = async (e?: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        setActive(true);
        calloutFunc(e);
        setTimeout(() => setActive(false), 3000)
    }
    
    return (
        <span className={`cursor-pointer ${styles.UpdateBtn} ${isActiveClass(active)}`}
              onClick={(e) => onClick(e)}>
            <img width={20} height={20} src="/img/icon/DepositCurrentRateIcon.svg" alt="DepositCurrentRateIcon" />
        </span>
    );
}

export default RefreshButton;
