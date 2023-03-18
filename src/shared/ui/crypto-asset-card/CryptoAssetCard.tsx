import React from 'react';
import Card from "@/shared/ui/card/Card";
import Button from "@/shared/ui/button/Button";

interface Props {
    title: string,
    iconUrl: string,
    balance: number,
    currency: string,
    price: string,
    onTopUp: () => void,
    onWithdraw: () => void,
}

function CryptoAssetCard({title, iconUrl, balance, currency, price, onTopUp, onWithdraw}: Props) {
    return (
        <Card>
            <div className="flex gap-[8px] items-start">
                <img width={32} height={32} src={iconUrl} alt="EURG Gekkoin"/>
                <p className="flex items-center text-[14px] font-semibold min-h-[32px]">{title}</p>
            </div>
            <div className="mt-auto pt-[20px]">
                <div className="flex justify-between items-baseline flex-wrap">
                    <p className="text-[14px] font-medium uppercase">
                        <strong className="text-[32px] font-bold">{balance}</strong> {currency}
                    </p>
                    <p className="text-[12px] text-gray font-medium">{price}</p>
                </div>
                <div className="flex gap-[16px] mt-[16px]">
                    <Button className="flex-1" gray size="small" onClick={onTopUp}>Top up</Button>
                    <Button className="flex-1" gray size="small" onClick={onWithdraw}>Withdraw</Button>
                </div>
            </div>
        </Card>
    );
}

export default CryptoAssetCard;