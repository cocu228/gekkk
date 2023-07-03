import styles from "./style.module.scss";
import { useContext, useEffect, useState } from "react";
import { isActiveClass } from "@/shared/lib/helpers";
import { CtxRootData } from "@/app/RootContext";

const UpdateAmounts = () => {
    const [active, setActive] = useState(false);
    const {setRefresh} = useContext(CtxRootData);

    const onClick = async () => {
        setActive(true);
        setRefresh();
        setTimeout(() => setActive(false), 3000)
    }

    return <div data-text={"Update"} className="ellipsis">
        <span className={`cursor-pointer ${styles.UpdateBtn} ${isActiveClass(active)}`}
            onClick={onClick}>
            <img width={20} height={20} src="/img/icon/DepositCurrentRateIcon.svg" alt="DepositCurrentRateIcon" />
        </span>
    </div>
}

export default UpdateAmounts;
