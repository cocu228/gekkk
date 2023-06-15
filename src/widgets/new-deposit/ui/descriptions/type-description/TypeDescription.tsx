import { useContext } from 'react';
import { CtxNewDeposit } from '../../../model/context';
import TypeDescriptions from '@/shared/config/deposits/deposit-type';

const TypeDescription = () => {
    const { type } = useContext(CtxNewDeposit);

    return (
        <div className="col px-7 mt-[72px] xl:hidden xxl:p-5">
            {TypeDescriptions[type]}
        </div>
    )
}

export default TypeDescription;
