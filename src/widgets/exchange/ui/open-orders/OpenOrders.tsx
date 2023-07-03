import {format} from 'date-fns';
import styles from './style.module.scss';
import Modal from '@/shared/ui/modal/Modal';
import Button from '@/shared/ui/button/Button';
import {CtxRootData} from '@/app/RootContext';
import useModal from '@/shared/model/hooks/useModal';
import {useContext, useEffect, useState} from 'react';
import OrderProperties from './order-properties/OrderProperties';
import {IResOrder, apiCancelOrder, apiGetOrders} from '@/shared/api';

function OpenOrders() {
    const cancelOrderModal = useModal();
    const {currencies} = useContext(CtxRootData);
    const [orders, setOrders] = useState<IResOrder[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<IResOrder>(null);

    useEffect(() => {

        (async () => {

            const response = await apiGetOrders();
            setOrders(response.data.result);

        })()

    }, []);

    const currencyPrecision = (value: number, currency: string) =>
        Number(value.toFixed(currencies.get(currency)?.ordersPrec));

    return (
        <>
            <div className="flex justify-between">
                <span className="font-medium lg:text-sm md:text-md">Open orders</span>
                {/* <a className="text-xs text-secondary font-medium" href="">All</a> */}
            </div>
            <div className="mt-1.5">
                {!orders.length &&
                <div className='text-center mb-2 mt-2 text-gray-400'>
                    You don't have any opened orders
                </div>}

                {orders.map((ord: IResOrder) => (
                    <div className={`py-2.5 rounded-md md:rounded-none ${styles.Item}`} key={ord.id}>
                        <div className="flex justify-between">
                            <div className="text-orange bg-orange bg-opacity-10 rounded-md">
                                <strong>
                                    {currencyPrecision(ord.volume_source, ord.from)}
                                </strong> {ord.from} &rarr; <strong>
                                    {ord.type_order === 'Market' && '~'}
                                    {currencyPrecision(ord.volume_dest, ord.to)}
                                </strong> {ord.to}
                            </div>
                            <div className="text-secondary">{
                                format(new Date(ord.time_created), 'dd/MM/yyyy HH:mm')
                            }</div>
                        </div>
                        <div className="flex justify-between gap-0.5 mt-1.5">
                            <div className="flex gap-2.5">
                                <div className="text-secondary">Price: </div>
                                <div>
                                    <span>1 {ord.from} ~ {
                                        currencyPrecision(ord.volume_dest / ord.volume_source, ord.to)
                                    } {ord.to}</span>&nbsp;
                                    {ord.type_order === 'Market' && (
                                        <span>(sale at current market rate)</span>
                                    )}
                                </div>
                            </div>
                            <button
                                className="text-secondary"
                                onClick={() => {
                                    setSelectedOrder(ord);
                                    cancelOrderModal.showModal();
                                }}
                            >Cancel</button>
                        </div>
                    </div>
                ))}
            </div>

            <Modal
                width={450}
                title='Cancel order'
                open={cancelOrderModal.isModalOpen}
                onCancel={cancelOrderModal.handleCancel}
            >
                <div className="text-sm mb-4">
                    Are you sure you want to cancel this order?
                    This action cannot be canceled.
                </div>
                <div className='font-medium mb-2'>Order description:</div>
                
                <OrderProperties order={selectedOrder}/>
                
                <div className="mt-14 sm:mt-12">
                    <Button
                        size="xl"
                        className="w-full"
                        onClick={() => {
                            cancelOrderModal.handleCancel();

                            apiCancelOrder(selectedOrder.id)
                            .then(result => {
                                if (result.data.error) return;
                                
                                setOrders(orders.filter(o => o.id !== selectedOrder.id));
                            });
                        }}
                    >Cancel order</Button>
                </div>
            </Modal>
        </>
    );
}

export default OpenOrders;
