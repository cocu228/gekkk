import Decimal from "decimal.js";
import $const from "@/shared/config/coins/constants";
import { getRoundingValue } from "@/shared/lib/helpers";
import CardsGrid from "@/shared/ui/cards-grid/CardsGrid";
import SectionTitle from "@/shared/ui/section-title/SectionTitle";
import CryptoAssetCard from "@/shared/ui/crypto-asset-card/CryptoAssetCard";
import { useContext, useEffect } from "react";
import { CtxCurrencyData } from "@/app/CurrenciesContext";

function CryptoAssets() {
    const {currenciesData} = useContext(CtxCurrencyData);
    let wallets = [];

    useEffect(() => {
        wallets = Array.from(currenciesData.values()).slice(0) ?? [];
    }, [currenciesData])

    if (!wallets.find(w => w.const === 'GKE')) {
        wallets.push({
            id: null,
            const: $const.GKE,
            name: 'GKE Token',
            balance: null,
            availableBalance: new Decimal(0),
            freezeBalance: null,
            roundingValue: 2,
            defaultInfoToken: null
        });
    }

    if (!wallets.find(w => w.const === 'EURG')) {
        wallets.push({
            id: null,
            const: $const.EURG,
            name: 'Gekkoin EUR',
            balance: null,
            availableBalance: new Decimal(0),
            freezeBalance: null,
            roundingValue: 2,
            defaultInfoToken: null
        });
    }

    return (
        <div className="wrapper">
            <SectionTitle>Crypto assets</SectionTitle>

            <CardsGrid>
                {wallets
                    .sort(it => [$const.EURG, $const.GKE].includes(it.const) ? -1 : 1)
                    .filter(it => [$const.EURG, $const.GKE].includes(it.const) || !it.availableBalance.isZero())
                    .map((item, i) => (
                        <CryptoAssetCard
                            title={item.name}
                            key={"CryptoAssetCard_" + i}
                            balance={getRoundingValue(item.availableBalance, item.roundingValue)}
                            currency={item.const}
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
