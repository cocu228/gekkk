import React, {useEffect, useState} from 'react';
import CardsGrid from "@/shared/ui/cards-grid/CardsGrid";
import SectionTitle from "@/shared/ui/section-title/SectionTitle";
import CryptoAssetCard from "@/shared/ui/crypto-asset-card/CryptoAssetCard";
import {assetsCoinsName} from "@/shared/store";
import {generation, IResult} from "@/widgets/sidebar/module/helper";
import {apiGetBalance} from "@/shared/api";

function CryptoAssets() {
    const assets = assetsCoinsName(state => state.assets)

    const [state, setState] = useState<IResult | { coins: [], eurg: object }>({coins: [], eurg: {}})


    useEffect(() => {

        (async () => {
            const {data} = await apiGetBalance();
            const result = generation(data, assets)

            setState(result)

        })()

    }, [])


    return (
        <div className="wrapper">
            <SectionTitle>Crypto assets</SectionTitle>
            <CardsGrid>
                {state.coins.map((item, i) => <CryptoAssetCard
                    title="EURG Gekkoin"
                    key={"CryptoAssetCard-" + i}
                    iconUrl={"/img/icon/" + item.icon}
                    balance={item.balance.toNumber()}
                    currency={item.abbreviation}
                    price=""
                    onTopUp={() => {
                        console.log('top up')
                    }}
                    onWithdraw={() => {
                        console.log('withdraw')
                    }}
                />)}
            </CardsGrid>
        </div>
    );
}

export default CryptoAssets;