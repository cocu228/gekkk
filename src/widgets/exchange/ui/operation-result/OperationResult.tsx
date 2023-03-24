import React from 'react';
import styles from './style.module.scss';

interface Props {
    pay?: string,
    get?: string
}

function OperationResult({pay, get}: Props) {
    return (
        <div className={`flex flex-col gap-2 font-medium ${styles.Result}`}>
            <div className="flex justify-between">
                <span>You will pay</span>
                <strong>{pay || '-'}</strong>
            </div>
            <div className="flex justify-between">
                <span>You will get</span>
                <strong>{get || '-'}</strong>
            </div>
        </div>
    );
}

export default OperationResult;