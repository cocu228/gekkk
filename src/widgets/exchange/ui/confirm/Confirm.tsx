import React from 'react';
import Button from '@/shared/ui/button/Button';

interface Props {
    payValue: string,
    payToken: string,
    getValue: string,
    getToken: string,
    price: string,
    info?: string,
    onConfirm: () => void,
}

function Confirm({payValue, payToken, getValue, getToken, price, info, onConfirm}: Props) {
    return (
        <div className="md:mt-6">
            <div className="inline-block px-1 text-orange bg-orange bg-opacity-10 rounded-md text-xl">
                <strong>{payValue}</strong> {payToken} &rarr; <strong>{getValue}</strong> {getToken}
            </div>
            <div className="mt-4 flex gap-2.5 font-medium">
                <div className="text-secondary">Price:</div>
                <div>
                    <div>{price}</div>
                    {info && (
                        <div className="mt-0.5 font-sm">{info}</div>
                    )}
                </div>
            </div>
            <div className="mt-6 md:mt-12">
              <Button size="xl" className="w-full" onClick={onConfirm}>Confirm</Button>
            </div>
        </div>
    );
}

export default Confirm;