import {useContext} from "react";
import {IResOrder} from "@/shared/api";
import {CtxRootData} from "@/app/CurrenciesContext";
import InlineProperty from "@/shared/ui/inline-property";
import {formatForCustomer} from "@/shared/lib/date-helper";

interface IParams {
    order: IResOrder;
}

function OrderProperties({order}: IParams) {
    const {currencies} = useContext(CtxRootData);

    const currencyPrecision = (value: number, currency: string) =>
        Number(value.toFixed(currencies.get(currency)?.ordersPrec));

    return (
        <>
            <div className="row mb-2">
                <div className="col">
                    <InlineProperty
                        left={"Start date"}
                        right={formatForCustomer(new Date(order.time_created))}
                    />
                </div>
            </div>

            <div className="row mb-2">
                <div className="col">
                    <InlineProperty
                        left={"Locked funds"}
                        right={`${order.volume_source.toString()} ${order.from}`}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <InlineProperty
                        left={"Price"}
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
