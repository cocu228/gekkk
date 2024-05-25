import React, { useState } from "react";
import styles from "./style.module.scss";
import { isActiveClass } from "@/shared/lib/helpers";
import { IconApp } from "../icons/icon-app";

const RefreshButton = ({ calloutFunc }: { calloutFunc: (e?: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void }) => {
    const [active, setActive] = useState<boolean>(false);

    const onClick = async (e?: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        setActive(true);
        calloutFunc(e);
        setTimeout(() => setActive(false), 3000)
    }

    return (
        <span className={`cursor-pointer ${styles.UpdateBtn} ${isActiveClass(active)}`}
            onClick={(e) => onClick(e)}>
            <IconApp size={18} code="t01" color="var(--gek-additional)" />
        </span>
    );
}

export default RefreshButton;
