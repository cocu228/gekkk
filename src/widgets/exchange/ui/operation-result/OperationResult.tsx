import { useContext } from 'react';
import { CtxExchangeData } from '../../model/context';

function OperationResult() {
    const {
        to,
        from
    } = useContext(CtxExchangeData);

    return (
        <div className="flex flex-col gap-2 md:gap-1 font-medium info-box-warning">
            <div className="flex flex-wrap justify-between gap-0.5">
                <span>You will pay</span>

                <strong>{from.amount && from.currency ? `${from.amount} ${from.currency}` : '-'}</strong>
            </div>
            
            <div className="flex flex-wrap justify-between gap-0.5">
                <span>You will get</span>

                <strong>{to.amount && to.currency ? `${to.amount} ${to.currency}` : '-'}</strong>
            </div>
        </div>
    );
}

export default OperationResult;
