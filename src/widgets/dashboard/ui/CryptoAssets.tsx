import React, {useEffect, useState} from 'react';
import CardsGrid from "@/shared/ui/cards-grid/CardsGrid";
import SectionTitle from "@/shared/ui/section-title/SectionTitle";
import CryptoAssetCard from "@/shared/ui/crypto-asset-card/CryptoAssetCard";
import {storeListAvailableBalance} from "@/shared/store/crypto-assets";

function CryptoAssets() {

    const sortedListBalance = storeListAvailableBalance(state => state.sortedListBalance)

    return (
        <div className="wrapper">
            <SectionTitle>Crypto assets</SectionTitle>
            <CardsGrid>
                {sortedListBalance.map((item, i) => <CryptoAssetCard
                    title="EURG Gekkoin"
                    key={"CryptoAssetCard-" + i}
                    iconName={`${item.const.toLowerCase().capitalize()}Icon.svg`}
                    coinName={item.name}
                    balance={item.availableBalance.toNumber()}
                    currency={item.const}
                    price=""
                    onTopUp={() => {
                        // console.log('top up')
                    }}
                    onWithdraw={() => {
                        // console.log('withdraw')
                    }}
                />)}
            </CardsGrid>
        </div>
    );
}

export default CryptoAssets;