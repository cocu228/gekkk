import React from 'react';
import CardsGrid from "@/shared/ui/cards-grid/CardsGrid";
import SectionTitle from "@/shared/ui/section-title/SectionTitle";
import CryptoAssetCard from "@/shared/ui/crypto-asset-card/CryptoAssetCard";
import {storeListAvailableBalance} from "@/shared/store/crypto-assets";
import {getCryptoIconName, getRoundingValue} from "@/shared/lib/helpers"

function CryptoAssets() {

    const sortedListBalance = storeListAvailableBalance(state => state.sortedListBalance)

    return (
        <div className="wrapper">
            <SectionTitle>Crypto assets</SectionTitle>
            <CardsGrid>
                {sortedListBalance.map((item, i) => <CryptoAssetCard
                    title="EURG Gekkoin"
                    key={"CryptoAssetCard-" + i}
                    iconName={item.const}
                    coinName={item.name}
                    balance={getRoundingValue(item.availableBalance, item.roundingValue)}
                    currency={item.const}
                    price=""
                    onTopUp={() => {
                        //
                    }}
                    onWithdraw={() => {
                        //
                    }}
                />)}
            </CardsGrid>
        </div>
    );
}

export default CryptoAssets;