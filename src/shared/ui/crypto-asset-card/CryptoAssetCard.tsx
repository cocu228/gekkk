import React from 'react';
import Card from "@/shared/ui/card/Card";
import Button from "@/shared/ui/button/Button";
import { ParentClassForCoin, IconCoin } from "../icons/icon-coin";
import { useNavigate } from "react-router-dom";

interface Props {
    title: string,
    balance: number | string,
    currency: string,
    price: string,
    onTopUp: () => void,
    onWithdraw: () => void,
}

function CryptoAssetCard({ title, balance, currency, price, onTopUp, onWithdraw }: Props) {

    const navigate = useNavigate()

    return (
        <Card>
            <div className={`wrapper ${ParentClassForCoin}`}>
                <div className="flex gap-[8px] items-start">
                    <IconCoin code={currency} />
                    <p className="flex items-center text-fs14 font-semibold min-h-[32px]">{title}</p>
                </div>

                <div className="mt-auto pt-[20px]">
                    <div className="flex justify-between items-baseline flex-wrap">
                        <p className="text-fs14 font-medium uppercase">
                            <strong className="text-fs32 font-bold">{balance}</strong> {currency}
                        </p>
                        {!price ? null : (
                            <p className="text-fs12 text-gray-500 font-medium">{price} €</p>
                        )}
                    </div>

                    <div className="flex gap-[16px] mt-[16px]">
                        <Button className="flex-1" gray size="sm" onClick={() => navigate("/wallet/" + currency, {
                            state: "Top Up"
                        })}>Top
                            up</Button>
                        <Button className="flex-1" gray size="sm" onClick={() => navigate("/wallet/" + currency, {
                            state: "Withdraw"
                        })}>Withdraw</Button>
                    </div>
                </div>
            </div>
        </Card>
    );
}

export default CryptoAssetCard;