import {format, addDays} from 'date-fns';
import Loader from '@/shared/ui/loader';
import styles from './style.module.scss';
import Modal from '@/shared/ui/modal/Modal';
import Button from '@/shared/ui/button/Button';
import {CtxRootData} from '@/processes/RootContext';
import {CtxExchangeData} from '../../model/context';
import useModal from '@/shared/model/hooks/useModal';
import {actionResSuccess, getSecondaryTabsAsRecord} from '@/shared/lib/helpers';
import {useContext, useEffect, useState} from 'react';
import OrderProperties from './order-properties/OrderProperties';
import {IResOrder, apiCancelOrder, apiGetOrders} from '@/shared/api';
import SecondaryTabGroup from '@/shared/ui/tabs-group/secondary';
import {ordersTabs} from '../../model/heplers';
import {OrderState, TabKey} from '../../model/types';
import {DatePicker} from 'antd';
import dayjs from 'dayjs';
import Tooltip from '@/shared/ui/tooltip/Tooltip';
import CopyIcon from '@/shared/ui/copy-icon/CopyIcon';
import {CtxCurrencies} from "@/processes/CurrenciesContext";
import { useTranslation } from 'react-i18next';

const {RangePicker} = DatePicker;

interface IParams {
    refreshKey?: string;
}

function OpenOrders({
    refreshKey
}: IParams) {
    const cancelOrderModal = useModal();
    const {roomInfo} = useContext(CtxExchangeData);
    const [lazyLoading, setLazyLoading] = useState(false);
    const { account} = useContext(CtxRootData);
    const {currencies} = useContext(CtxCurrencies);
    const [allOrdVisibly, setAllOrdVisibly] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [ordersList, setOrdersList] = useState<IResOrder[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<IResOrder>(null);
    const [activeTab, setActiveTab] = useState<string>(ordersTabs[0].Key);
    const [customDate, setCustomDate] = useState<[dayjs.Dayjs, dayjs.Dayjs]>(
        [dayjs(addDays(new Date(), -90)), dayjs()]
    )
    
    const {t} = useTranslation();
    const requestOrders = async () => {
        setIsLoading(true);
        setAllOrdVisibly(false);

        const response = activeTab === TabKey.OPENED
            ? await apiGetOrders(
                null,
                roomInfo?.timetick ?? null,
                [1], null, null
            )
            : await apiGetOrders(
                null,
                roomInfo?.timetick ?? null,
                [127, 199, 200, 201, 210, 215, 250, 251, 252, 253, 254, 255],
                customDate[0].toDate(),
                customDate[1].toDate()
            );

        actionResSuccess(response).success(() => {
            const {result} = response.data;
            setOrdersList(result);
        })

        setIsLoading(false);
    }

    const requestMoreOrders = async () => {
        setLazyLoading(true)
        const lastValue = ordersList[ordersList.length - 1];

        const {data} = activeTab === TabKey.OPENED
        ? await apiGetOrders(
            lastValue.id.toString(),
            roomInfo?.timetick ?? null,
            [1], null, null
        )
        : await apiGetOrders(
            lastValue.id.toString(),
            roomInfo?.timetick ?? null,
            [127, 199, 200, 201, 210, 215, 250, 251, 252, 253, 254, 255],
            customDate[0].toDate(),
            customDate[1].toDate()
        );

        if (data.result.length < 10) setAllOrdVisibly(true);

        setOrdersList(state => ([...state, ...data.result]));
        setLazyLoading(false);
    }

    useEffect(() => {
        setIsLoading(true);

        (async () => {
            await requestOrders()
        })()
    }, [activeTab, account, roomInfo?.timetick, refreshKey])

    const currencyPrecision = (value: number, currency: string) =>
        Number(value.toFixed(currencies.get(currency)?.ordersPrec));

    return (
        <>
            <div className="flex justify-between mb-2">
                <span className="font-medium lg:text-sm md:text-md">Orders</span>
                {/* <a className="text-xs text-secondary font-medium" href="">All</a> */}
            </div>

            <SecondaryTabGroup tabs={getSecondaryTabsAsRecord(ordersTabs)} activeTab={activeTab} setActiveTab={setActiveTab}/>

            {activeTab === TabKey.CLOSED && (
                <div className='mb-2'>
                    Enter period or choose from calendar

                    <div className='flex grow-0 max-w-[400px]'>
                        <RangePicker
                            className='mt-2 w-full'
                            value={customDate}
                            onChange={setCustomDate}
                        />

                        <Button
                            className='ml-5'
                            disabled={isLoading || !customDate}
                            onClick={requestOrders}
                        >Apply</Button>
                    </div>
                </div>
            )}

            <div className="mt-1.5">
                {!isLoading ? null : (
                    <Loader className='relative mt-10 mb-10'/>
                )}

                {!(isLoading || ordersList.length) &&
                <div className='text-center mb-10 mt-3 text-gray-400'>
                    You don't have any opened orders
                </div>}

                {isLoading ? null : ordersList.map((ord: IResOrder) => (
                    <div className={`py-2.5 rounded-md md:rounded-none ${styles.Item}`} key={ord.id}>
                        <div className="flex justify-between">
                            <div className='flex gap-2'>
                                <div className="text-orange bg-orange bg-opacity-10 rounded-md">
                                    <strong>
                                        {currencyPrecision(ord.volume_source, ord.from)}
                                    </strong> {ord.from} &rarr; <strong>
                                        {ord.type_order === 'Market' && '~'}
                                        {currencyPrecision(ord.volume_dest, ord.to)}
                                    </strong> {ord.to}
                                </div>

                                <span className='text-gray-400'>
                                    {ord.state} {ord.state !== OrderState.FAILED ? null : (
                                        <Tooltip
                                            text={<div>
                                                An error occurred while executing the order.
                                                Please, contact with technical support.
                                                
                                                <span className='flex items-center'>
                                                    Order ID: {ord.id}
                                                    <CopyIcon value={ord.id}/>
                                                </span>
                                            </div>}
                                        >
                                            <div className="inline-block relative align-middle w-[14px] pb-1 ml-1 cursor-help">
                                                <img src="/img/icon/HelpIcon.svg" alt="tooltip"/>
                                            </div>
                                        </Tooltip>
                                    )}
                                </span>
                            </div>
                            <div className="text-secondary">{
                                format(new Date(ord.time_created), 'dd/MM/yyyy HH:mm')
                            }</div>
                        </div>
                        <div className="flex justify-between gap-0.5 mt-1.5">
                            <div className="flex gap-2.5">
                                <div className="text-secondary">{t("exchange.price")}: </div>
                                <div>
                                    <span>1 {ord.from} ~ {
                                        currencyPrecision(ord.volume_dest / ord.volume_source, ord.to)
                                    } {ord.to}</span>&nbsp;
                                    {ord.type_order === 'Market' && (
                                        <span>(sale at current market rate)</span>
                                    )}
                                </div>
                            </div>

                            {ord.state !== OrderState.OPENED ? null : (
                                <button
                                    className="text-secondary"
                                    onClick={() => {
                                        setSelectedOrder(ord);
                                        cancelOrderModal.showModal();
                                    }}
                                >{t("exchange.cancel")}</button>
                            )}
                        </div>
                    </div>
                ))}

                {!isLoading && ordersList.length >= 10 && !allOrdVisibly && <div className="row mt-3">
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
                <div className="text-sm mb-4"> {t("exchange.cancel_this_order")}
                </div>
                <div className='font-medium mb-2'>{t("exchange.order_description")}</div>
                
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
                    >{t("exchange.cancel_order")}</Button>
                </div>
            </Modal>
        </>
    );
}

export default OpenOrders;
