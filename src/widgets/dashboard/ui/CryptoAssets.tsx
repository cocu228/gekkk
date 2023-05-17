import { getRoundingValue } from "@/shared/lib/helpers";
import CardsGrid from "@/shared/ui/cards-grid/CardsGrid";
import SectionTitle from "@/shared/ui/section-title/SectionTitle";
import { storeListAvailableBalance } from "@/shared/store/crypto-assets";
import CryptoAssetCard from "@/shared/ui/crypto-asset-card/CryptoAssetCard";

function CryptoAssets() {
    const sortedListBalance = storeListAvailableBalance(state => state.sortedListBalance);
    
    return (
        <div className="wrapper">
            <SectionTitle>Crypto assets</SectionTitle>

            <CardsGrid>
                {!sortedListBalance.find(b => b.const === 'EURG') && <CryptoAssetCard
                    key='EURGStaticCard'
                    title='Gekkoin EUR'
                    balance='0.00'
                    currency='EURG'
                    price="0.00"
                    onTopUp={() => {
                        //
                    }}
                    onWithdraw={() => {
                        //
                    }}
                />}

                {!sortedListBalance.find(b => b.const === 'GKE') && <CryptoAssetCard
                    key='GKEStaticCard'
                    title='Gekkoin EUR'
                    balance='0.00'
                    currency='GKE'
                    price="0.00"
                    onTopUp={() => {
                        //
                    }}
                    onWithdraw={() => {
                        //
                    }}
                />}

                {sortedListBalance.filter(it => !it.availableBalance.isZero()).map((item, i) =>
                    <CryptoAssetCard
                        title={item.name}
                        key={"CryptoAssetCard-" + i}
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
