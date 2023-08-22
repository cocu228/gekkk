import Card from "@/shared/ui/card/Card";
import {useNavigate} from "react-router-dom";
import Button from "@/shared/ui/button/Button";
import {scrollToTop} from '@/shared/lib/helpers';
import {ParentClassForCoin, IconCoin} from "../icons/icon-coin";

interface Props {
    title: string;
    currency: string;
    price: number | null;
    balance: number | string;
}

function CryptoAssetCard({title, balance, currency, price}: Props) {
    const navigate = useNavigate();

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

                        {!price ? null
                            : <p className="text-fs12 text-gray-500 font-medium">~ {price} EURG</p>}
                    </div>

                    <div className="flex gap-[16px] mt-[16px]">
                        <Button
                            gray
                            size="sm"
                            className="flex-1"
                            onClick={() => {
                                scrollToTop();
                                navigate(`/wallet/${currency}/Top Up`);
                            }}
                        >Top up</Button>

                        <Button
                            gray
                            size="sm"
                            className="flex-1"
                            onClick={() => {
                                scrollToTop();
                                navigate(`/wallet/${currency}/Withdraw`);
                            }}
                        >Withdraw</Button>
                    </div>
                </div>
            </div>
        </Card>
    );
}

export default CryptoAssetCard;