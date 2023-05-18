import Decimal from "decimal.js";
import $const from "@/shared/config/coins/constants";
import { getRoundingValue } from "@/shared/lib/helpers";
import CardsGrid from "@/shared/ui/cards-grid/CardsGrid";
import SectionTitle from "@/shared/ui/section-title/SectionTitle";
import { storeListAvailableBalance } from "@/shared/store/crypto-assets";
import CryptoAssetCard from "@/shared/ui/crypto-asset-card/CryptoAssetCard";
import { useEffect } from "react";

function CryptoAssets() {
    const balances = storeListAvailableBalance(state => state.sortedListBalance);
    let wallets = [];

    useEffect(() => {
        wallets = balances.slice(0) ?? [];
    }, [balances])

    if (!wallets.find(w => w.const === 'GKE')) {
        wallets.unshift({
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
        wallets.unshift({
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
                {wallets.filter(it => [$const.EURG, $const.GKE].includes(it.const) || !it.availableBalance.isZero()).map((item, i) =>
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
                )}
            </CardsGrid>
        </div>
    );
}

export default CryptoAssets;
