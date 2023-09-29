import {useContext} from 'react';
import Button from '@/shared/ui/button/Button';
import {CtxExchangeData} from '../../model/context';
import InlineProperty from "@/shared/ui/inline-property";

interface Props {
    loading?: boolean;
    onConfirm: () => void
}

function Confirm({loading, onConfirm}: Props) {
    const {
        to,
        from,
        price
    } = useContext(CtxExchangeData);

    return (
        <div className="md:mt-6">
            <InlineProperty left={'Will pay'} right={`${from.amount} ${from.currency}`}/>
            <InlineProperty left={'Will get'} right={`${to.amount} ${to.currency}`}/>
            <InlineProperty left={'Price'} right={`1 ${from.currency} ~ ${price.amount} ${to.currency}`}/>
            
            <div className="mt-6 md:mt-12">
                <Button disabled={loading} className="w-full" onClick={onConfirm}>Confirm</Button>
            </div>
        </div>
    );
}

export default Confirm;
