import {format} from 'date-fns';
import Loader from '@/shared/ui/loader';
import styles from './style.module.scss';
import Modal from '@/shared/ui/modal/Modal';
import Button from '@/shared/ui/button/Button';
import {CtxRootData} from '@/processes/RootContext';
import {CtxExchangeData} from '../../model/context';
import useModal from '@/shared/model/hooks/useModal';
import {actionResSuccess} from '@/shared/lib/helpers';
import {useContext, useEffect, useState} from 'react';
import OrderProperties from './order-properties/OrderProperties';
import {IResOrder, apiCancelOrder, apiGetOrders} from '@/shared/api';

function OpenOrders() {
    const cancelOrderModal = useModal();
    const {currencies} = useContext(CtxRootData);
    const {roomInfo} = useContext(CtxExchangeData);
    const [lazyLoading, setLazyLoading] = useState(false);
    const [allOrdVisibly, setAllOrdVisibly] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [ordersList, setOrdersList] = useState<IResOrder[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<IResOrder>(null);

    const requestOrders = async () => {
        setIsLoading(true);
        setAllOrdVisibly(false);

        const response = await apiGetOrders(null, roomInfo?.timetick ?? null);

        actionResSuccess(response).success(() => {
            const {result} = response.data;
            setOrdersList(result);
        })

        setIsLoading(false);
    }

    const requestMoreOrders = async () => {
        setLazyLoading(true)
        const lastValue = ordersList[ordersList.length - 1];

        const {data} = await apiGetOrders(lastValue.id.toString(), roomInfo?.timetick ?? null);

        if (data.result.length < 10) setAllOrdVisibly(true);

        setOrdersList(state => ([...state, ...data.result]));
        setLazyLoading(false);
    }

    useEffect(() => {
        setIsLoading(true);

        (async () => {
            await requestOrders();
        })();
    }, [roomInfo?.timetick]);

    const currencyPrecision = (value: number, currency: string) =>
        Number(value.toFixed(currencies.get(currency)?.ordersPrec));

    return (
        <>
            <div className="flex justify-between">
                <span className="font-medium lg:text-sm md:text-md">Open orders</span>
                {/* <a className="text-xs text-secondary font-medium" href="">All</a> */}
            </div>
            <div className="mt-1.5">
                {!isLoading ? null : (
                    <Loader className='relative mt-10 mb-10'/>
                )}

                {!(isLoading || ordersList.length) &&
                <div className='text-center mb-2 mt-2 text-gray-400'>
                    You don't have any opened orders
                </div>}

                {isLoading ? null : ordersList.map((ord: IResOrder) => (
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

                {!isLoading && ordersList.length >= 4 && !allOrdVisibly && <div className="row mt-3">
                    <div className="col flex justify-center relative">
                        {lazyLoading ? <Loader className={"w-[24px] h-[24px] top-[4px]"}/> :
                            <span onClick={requestMoreOrders}
                                  className="text-gray-400 cursor-pointer inline-flex items-center">See more <img
                                className="ml-2" width={10} height={8}
                                src="/img/icon/ArrowPlainDown.svg"
                                alt="ArrowPlainDown"/></span>}
                    </div>
                </div>}
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
                                
                                setOrdersList(ordersList.filter(o => o.id !== selectedOrder.id));
                            });
                        }}
                    >Cancel order</Button>
                </div>
            </Modal>
        </>
    );
}

export default OpenOrders;
