import React from 'react';
import Card from "@/shared/ui/card/Card";
import Button from "@/shared/ui/button/Button";
import {ParentClassForCoin, IconCoin} from "../icons/icon-coin";

interface Props {
    title: string,
    iconName: string,
    coinName: string,
    balance: number,
    currency: string,
    price: string,
    onTopUp: () => void,
    onWithdraw: () => void,
}

function CryptoAssetCard({title, iconName, balance, currency, price, onTopUp, onWithdraw}: Props) {
    return (
        <Card>
            <div className={`wrapper ${ParentClassForCoin}`}>
                <div className="flex gap-[8px] items-start">
                    <IconCoin iconName={iconName} coinName={""}/>
                    <p className="flex items-center text-fs14 font-semibold min-h-[32px]">{title}</p>
                </div>
                <div className="mt-auto pt-[20px]">
                    <div className="flex justify-between items-baseline flex-wrap">
                        <p className="text-fs14 font-medium uppercase">
                            <strong className="text-fs32 font-bold">{balance}</strong> {currency}
                        </p>
                        <p className="text-fs12 text-gray-500 font-medium">{price}</p>
                    </div>
                    <div className="flex gap-[16px] mt-[16px]">
                        <Button className="flex-1" gray size="sm" onClick={onTopUp}>Top up</Button>
                        <Button className="flex-1" gray size="sm" onClick={onWithdraw}>Withdraw</Button>
                    </div>
                </div>
            </div>
        </Card>
    );
}

export default CryptoAssetCard;