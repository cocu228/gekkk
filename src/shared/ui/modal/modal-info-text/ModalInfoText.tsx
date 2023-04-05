import React, {PropsWithChildren} from 'react';
import styles from './style.module.scss';

function ModalInfoText({children}: PropsWithChildren) {
    return (
        <div className={`bg-bgSecondary text-sm ${styles.Text}`}>
            {children}
        </div>
    );
}

export default ModalInfoText;