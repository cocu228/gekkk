import { useContext } from 'react';
import Button from '@/shared/ui/button/Button';
import { CtxExchangeData } from '../../model/context';

interface Props {
    onConfirm: () => void
}

function Confirm({onConfirm}: Props) {
    const {
        to,
        from,
        price
    } = useContext(CtxExchangeData);

    return (
        <div className="md:mt-6">
            <div className="inline-block px-1 text-orange bg-orange bg-opacity-10 rounded-md text-xl">
                <strong>{from.amount}</strong> {from.currency} &rarr; <strong>{to.amount}</strong> {to.currency}
            </div>

            <div className="mt-4 flex gap-2.5 font-medium">
                <div className="text-secondary">Price:</div>
                <div>
                    <div>1 {from.currency} ~ {price} {to.currency}</div>
                </div>
            </div>

            <div className="mt-6 md:mt-12">
              <Button size="xl" className="w-full" onClick={onConfirm}>Confirm</Button>
            </div>
        </div>
    );
}

export default Confirm;
