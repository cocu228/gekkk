import React, {PropsWithChildren} from 'react';
import styles from './style.module.scss';

interface Props {
    onClick?: () => void
}

function PercentBtn({children, onClick}: PropsWithChildren<Props>) {
    return (
        <button onClick={onClick} className={styles.Btn}>
            {children}
        </button>
    );
}

export default PercentBtn;