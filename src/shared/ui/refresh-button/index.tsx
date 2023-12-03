import React, { useState } from "react";
import styles from "./style.module.scss";
import { isActiveClass } from "@/shared/lib/helpers";

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
            <svg width="20" height="20" viewBox="0 0 21 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.90658 9.06139L3.90679 9.06104C4.05377 8.80647 4.09359 8.50394 4.01751 8.22001C3.94143 7.93608 3.75568 7.694 3.50111 7.54702C3.24655 7.40005 2.94402 7.36022 2.66009 7.4363C2.37616 7.51238 2.13407 7.69813 1.9871 7.9527C0.900678 9.83439 0.475107 12.0255 0.778163 14.177C1.08122 16.3286 2.09548 18.3169 3.6594 19.8253C5.22333 21.3337 7.24699 22.2754 9.4081 22.5004C11.5692 22.7255 13.7435 22.221 15.5847 21.0673C17.4259 19.9135 18.8281 18.1769 19.568 16.134C20.3079 14.091 20.3429 11.8593 19.6676 9.79408C18.9922 7.7289 17.6452 5.94909 15.8412 4.73808C14.0715 3.55009 11.9617 2.97652 9.83622 3.10344L9.25612 0.9608L9.17487 0.660708L8.99054 0.911065L5.56593 5.56233L5.45477 5.71331L5.62647 5.78863L10.941 8.11999L11.2279 8.24585L11.1461 7.94343L10.4334 5.31053C12.0341 5.31249 13.5945 5.82413 14.8871 6.77387C16.2313 7.76151 17.21 9.16711 17.6698 10.7705C18.1296 12.3739 18.0445 14.0845 17.428 15.6344C16.8114 17.1843 15.6982 18.4859 14.2627 19.3354C12.8272 20.1848 11.1504 20.5341 9.49513 20.3286C7.83983 20.123 6.29946 19.3742 5.11531 18.1994C3.93115 17.0247 3.17011 15.4903 2.95138 13.8367C2.73265 12.1831 3.06859 10.5036 3.90658 9.06139Z" fill="#3A5E66" stroke="#F7F7F0" stroke-width="0.3" />
            </svg>
        </span>
    );
}

export default RefreshButton;
