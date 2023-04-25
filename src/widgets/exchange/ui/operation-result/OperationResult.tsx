import React from 'react';

interface Props {
    pay?: string,
    get?: string
}

function OperationResult({pay, get}: Props) {
    return (
        <div className="flex flex-col gap-2 md:gap-1 font-medium info-box-warning">
            <div className="flex flex-wrap justify-between gap-0.5">
                <span>You will pay</span>
                <strong>{pay || '-'}</strong>
            </div>
            <div className="flex flex-wrap justify-between gap-0.5">
                <span>You will get</span>
                <strong>{get || '-'}</strong>
            </div>
        </div>
    );
}

export default OperationResult;