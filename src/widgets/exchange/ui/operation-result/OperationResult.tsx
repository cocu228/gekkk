import {useContext} from 'react';
import {CtxExchangeData} from '../../model/context';
import {CtxRootData} from '@/processes/RootContext';

function OperationResult() {
    const {
        to,
        from
    } = useContext(CtxExchangeData);

    const {currencies} = useContext(CtxRootData);

    return (
        <div className="flex flex-col gap-2 md:gap-1 font-medium info-box-warning">
            <div className="flex flex-wrap justify-between gap-0.5">
                <span>You will pay</span>

                <strong>{!(from.amount && from.currency) ? '-'
                    : `${+Number(from.amount).toFixed(currencies.get(from.currency).roundPrec)} ${from.currency}`
                }</strong>
            </div>
            
            <div className="flex flex-wrap justify-between gap-0.5">
                <span>You will get</span>

                <strong>{!(to.amount && to.currency) ? '-'
                    : `${+Number(to.amount).toFixed(currencies.get(to.currency).roundPrec)} ${to.currency}`
                }</strong>
            </div>
        </div>
    );
}

export default OperationResult;
