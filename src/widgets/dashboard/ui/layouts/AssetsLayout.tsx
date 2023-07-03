import $const from "@/shared/config/coins/constants";
import { getRoundingValue } from "@/shared/lib/helpers";
import CardsGrid from "@/shared/ui/cards-grid/CardsGrid";
import SectionTitle from "@/shared/ui/section-title/SectionTitle";
import CryptoAssetCard from "@/shared/ui/crypto-asset-card/CryptoAssetCard";
import { useContext } from "react";
import { CtxRootData, ICtxCurrencyData } from "@/app/RootContext";

const assetsFiler = (item: ICtxCurrencyData) =>
    [$const.EURG, $const.GKE].includes(item.currency) || item.availableBalance?.comparedTo(0);

const assetsSorter = (item: ICtxCurrencyData) =>
    [$const.EURG, $const.GKE].includes(item.currency) ? -1 : 1;

function CryptoAssets() {
    const { currencies } = useContext(CtxRootData);

    return (
        <div className="wrapper">
            <SectionTitle>Crypto assets</SectionTitle>

            <CardsGrid>
                {Array.from(currencies.values())
                    .filter(assetsFiler)
                    .sort(assetsSorter)
                    .map((item, i) => (
                        <CryptoAssetCard
                            title={item.name}
                            key={"CryptoAssetCard_" + i}
                            balance={item.availableBalance ? getRoundingValue(item.availableBalance, item.roundPrec) : 0}
                            currency={item.currency}
                            price=""
                            onTopUp={() => {
                                //
                            }}
                            onWithdraw={() => {
                                //
                            }}
                        />
                    ))}
            </CardsGrid>
        </div>
    );
}

export default CryptoAssets;
