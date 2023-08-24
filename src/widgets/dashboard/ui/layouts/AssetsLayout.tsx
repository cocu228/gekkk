import {apiGetRates} from "@/shared/api";
import {useContext, useEffect, useState} from "react";
import {getRoundingValue} from "@/shared/lib/helpers";
import constants from "@/shared/config/coins/constants";
import CardsGrid from "@/shared/ui/cards-grid/CardsGrid";
import ETokensConst from "@/shared/config/coins/constants";
import SectionTitle from "@/shared/ui/section-title/SectionTitle";
import {ICtxCurrency} from "@/processes/CurrenciesContext";
import CryptoAssetCard from "@/shared/ui/crypto-asset-card/CryptoAssetCard";
import {CtxCurrencies} from "@/processes/CurrenciesContext";

const assetsFiler = (item: ICtxCurrency) =>
    item.$const !== ETokensConst.EUR
    && ([ETokensConst.EURG, ETokensConst.GKE].includes(item.$const)
    || item.availableBalance?.comparedTo(0));

const assetsSorter = (item: ICtxCurrency) =>
    [ETokensConst.EURG, ETokensConst.GKE].includes(item.$const) ? -1 : 1;

function CryptoAssets() {
    const {currencies} = useContext(CtxCurrencies);
    const [rates, setRates] = useState<Record<constants, number>>(null);

    useEffect(() => {
        (async () => {
            const {data} = await apiGetRates();
            setRates(data.result);
        })();
    }, [currencies]);

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
                            currency={item.$const}
                            key={"CryptoAssetCard_" + i}
                            price={!rates ? null : +rates[item.$const].toFixed(currencies.get("EURG").roundPrec)}
                            balance={item.availableBalance ? getRoundingValue(item.availableBalance, item.roundPrec) : 0}
                        />
                    ))}
            </CardsGrid>
        </div>
    );
}

export default CryptoAssets;
