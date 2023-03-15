import React from 'react';
import CardsGrid from "@/shared/ui/cards-grid/CardsGrid";
import SectionTitle from "@/shared/ui/section-title/SectionTitle";
import CryptoAssetCard from "@/shared/ui/crypto-asset-card/CryptoAssetCard";

function CryptoAssets() {
    return (
        <div className="wrapper">
            <SectionTitle>Crypto assets</SectionTitle>
            <CardsGrid>
                <CryptoAssetCard
                    title="EURG Gekkoin"
                    iconUrl="/public/img/icon/XmrIcon.svg"
                    balance="1000.00"
                    currency="EURG"
                    price="1000.00 €"
                    onTopUp={() => {console.log('top up')}}
                    onWithdraw={() => {console.log('withdraw')}}
                />
                <CryptoAssetCard
                    title="EURG Gekkoin"
                    iconUrl="/public/img/icon/XmrIcon.svg"
                    balance="1000.00"
                    currency="EURG"
                    price="1000.00 €"
                    onTopUp={() => {console.log('top up')}}
                    onWithdraw={() => {console.log('withdraw')}}
                />
            </CardsGrid>
        </div>
    );
}

export default CryptoAssets;