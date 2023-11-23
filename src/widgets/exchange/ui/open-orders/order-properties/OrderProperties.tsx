import {useContext} from "react";
import InlineProperty from "@/shared/ui/inline-property";
import {formatForCustomer} from "@/shared/lib/date-helper";
import {CtxCurrencies} from "@/processes/CurrenciesContext";
import { useTranslation } from 'react-i18next';
import {GetOrderListOut} from "@/shared/api/(gen)new/model";

interface IParams {
    order: GetOrderListOut;
}

function OrderProperties({order}: IParams) {
    const {currencies} = useContext(CtxCurrencies);
    const {t} = useTranslation();

    const currencyPrecision = (value: number, currency: string) =>
        Number(value.toFixed(currencies.get(currency)?.ordersPrec));

    return (
        <>
            <div className="row mb-2">
                <div className="col">
                    <InlineProperty
                        left={t("exchange.start_date")}
                        right={formatForCustomer(new Date(order.time_created))}
                    />
                </div>
            </div>

            <div className="row mb-2">
                <div className="col">
                    <InlineProperty
                        left={t("exchange.locked_funds")}
                        right={`${order.volume_source.toString()} ${order.from}`}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <InlineProperty
                        left={t("price")}
                        right={`1 ${order.from} ~ ${
                            currencyPrecision(order.volume_dest / order.volume_source, order.to)
                        } ${order.to}`}
                    />
                </div>
            </div>
        </>
    )
}

export default OrderProperties;
