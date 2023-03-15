import React from 'react';
import Card from "@/shared/ui/card/Card";
import Button from "@/shared/ui/button/Button";
import {Link} from 'react-router-dom';

interface Props {
    title: string,
    subtitle: string,
    price: string,
    currency: string,
    onOpenDeposit: () => void,
    linkUrl: string,
    isDeposit?: boolean,
}

function DepositCard({title, subtitle, price, currency, onOpenDeposit, isDeposit, linkUrl}: Props) {
    return (
        <Card>
            <p className="text-[14px] font-semibold">{title}</p>
            <p className="text-[12px] mt-[4px] font-medium text-gray">{subtitle}</p>
            <div className="mt-auto pt-[20px]">
                <p className="text-[14px] font-medium uppercase">
                    <strong className="text-[32px] font-bold">{price}</strong> {currency}
                </p>
                <div className="flex gap-[16px] mt-[16px]">
                    <Button className="flex-1" gray size="small" onClick={onOpenDeposit}>Open deposit</Button>
                    <div className="flex items-center flex-1 justify-center">
                        <Link to={linkUrl} className="text-[14px] font-medium underline text-gray hover:text-blue">
                            {isDeposit ? 'Read more →' : 'Interest rates →'}
                        </Link>
                    </div>
                </div>
            </div>
        </Card>
    );
}

export default DepositCard;