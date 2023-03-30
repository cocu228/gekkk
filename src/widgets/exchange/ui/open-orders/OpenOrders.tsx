import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { IResOrder, apiGetOrders } from '@/shared/api';
import { storeListAllCryptoName } from '@/shared/store/crypto-assets';
import styles from './style.module.scss';

const getOrderPrice = (order: IResOrder) => {
    const ratio = order.volume_dest / order.volume_source

    return ratio
}

function OpenOrders() {
    const assets = storeListAllCryptoName(state => state.listAllCryptoName);
    const [orders, setOrders] = useState([]);

    useEffect(() => {

        (async () => {

            const response = await apiGetOrders();
            setOrders(response.data);

        })()

    }, []);

    // TODO: округление чисел
    const currencyPrecision = (value: number, currency: string) =>
        value.toFixed(assets.find(a => a.code === currency)?.round_prec);

    return (
        <>
            <div className="flex justify-between">
                <span className="font-medium">Open orders</span>
                <a className="text-xs text-secondary font-medium" href="">All</a>
            </div>
            <div className="mt-1.5">
                {orders.map((order: IResOrder) => (
                    <div className={`py-2 text-xs rounded-md ${styles.Item}`} key={order.id}>
                        <div className="flex justify-between">
                            <div className="text-orange bg-orange bg-opacity-10 rounded-md">
                                <strong>
                                    {/*currencyPrecision(*/order.volume_source/*, order.from)*/}
                                </strong> {order.from} &rarr; <strong>
                                    {order.type_order === 'Limit' ? '' : '~'}
                                    {/*currencyPrecision(*/order.volume_dest/*, order.to)*/}
                                </strong> {order.to}
                            </div>
                            <div className="text-secondary">{
                                format(new Date(order.time_created), 'dd/MM/yyyy HH:mm')
                            }</div>
                        </div>
                        <div className="flex justify-between mt-1">
                            <div className="flex gap-2.5">
                                <div className="text-secondary">Price: </div>
                                <div>
                                    <span>1 {order.from} ~ {getOrderPrice(order)} {order.to}</span>&nbsp;
                                    {/*orderItem.info && (
                                        <span>{orderItem.info}</span>
                                    )*/}
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