import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { IResOrder, apiGetOrders } from '@/shared/api';
import { storeListAllCryptoName } from '@/shared/store/crypto-assets';
import styles from './style.module.scss';

function OpenOrders() {
    const assets = storeListAllCryptoName(state => state.listAllCryptoName);
    const [orders, setOrders] = useState([]);

    useEffect(() => {

        (async () => {

            const response = await apiGetOrders();
            setOrders(response.data);

        })()

    }, []);

    const currencyPrecision = (value: number, currency: string) =>
        Number(value.toFixed(assets.find(a => a.code === currency)?.orders_prec));

    return (
        <>
            <div className="flex justify-between">
                <span className="font-medium lg:text-sm md:text-md">Open orders</span>
                <a className="text-xs text-secondary font-medium" href="">All</a>
            </div>
            <div className="mt-1.5">
                {orders.map(({
                    id,
                    from: sourceCurrency,
                    to: targetCurrency,
                    volume_dest,
                    volume_source,
                    type_order: type,
                    time_created: createDate
                }: IResOrder) => (
                    <div className={`py-2 rounded-md md:rounded-none ${styles.Item}`} key={id}>
                        <div className="flex justify-between">
                            <div className="text-orange bg-orange bg-opacity-10 rounded-md">
                                <strong>
                                    {currencyPrecision(volume_source, sourceCurrency)}
                                </strong> {sourceCurrency} &rarr; <strong>
                                    {type === 'Market' && '~'}
                                    {currencyPrecision(volume_dest, targetCurrency)}
                                </strong> {targetCurrency}
                            </div>
                            <div className="text-secondary">{
                                format(new Date(createDate), 'dd/MM/yyyy HH:mm')
                            }</div>
                        </div>
                        <div className="flex justify-between gap-0.5 mt-1">
                            <div className="flex gap-2.5">
                                <div className="text-secondary">Price: </div>
                                <div>
                                    <span>1 {sourceCurrency} ~ {
                                        currencyPrecision(volume_dest / volume_source, targetCurrency)
                                    } {targetCurrency}</span>&nbsp;
                                    {type === 'Market' && (
                                        <span>(sale at current market rate)</span>
                                    )}
                                </div>
                            </div>
                            <button className="text-secondary">Cancel</button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default OpenOrders;