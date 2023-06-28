import Loader from '@/shared/ui/loader';
import styles from './style.module.scss';
import Modal from '@/shared/ui/modal/Modal';
import Button from '@/shared/ui/button/Button';
import {CtxExchangeData} from '../model/context';
import IconSwap from '@/shared/ui/icons/IconSwap';
import History from '@/widgets/history/ui/History';
import useModal from '@/shared/model/hooks/useModal';
import Dropdown from '@/shared/ui/dropdown/Dropdown';
import Checkbox from '@/shared/ui/checkbox/Checkbox';
import {useContext, useEffect, useState} from 'react';
import PageHead from '@/shared/ui/page-head/PageHead';
import {CtxRootData} from '@/app/CurrenciesContext';
import SplitGrid from '@/shared/ui/split-grid/SplitGrid';
import {apiCloseRoom, apiCreateOrder} from '@/shared/api';
import Confirm from '@/widgets/exchange/ui/confirm/Confirm';
import InviteLink from '@/shared/ui/invite-link/InviteLink';
import IconPrivateRoom from '@/shared/ui/icons/IconPrivateRoom';
import InputCurrencyPercented from '@/shared/ui/input-currency';
import {CurrencyFlags} from '@/shared/config/mask-currency-flags';
import PriceField from '@/widgets/exchange/ui/price-field/PriceField';
import OpenOrders from '@/widgets/exchange/ui/open-orders/OpenOrders';
import CreateRoom from '@/widgets/exchange/ui/create-room/CreateRoom';
import DropdownItem from '@/shared/ui/dropdown/dropdown-item/DropdownItem';
import InputItemCurrency from "@/shared/ui/input-currency/InputItemCurrency";
import DepthOfMarket from '@/widgets/exchange/ui/depth-of-market/DepthOfMarket';
import {storeListExchangeRooms} from '@/shared/store/exchange-rooms/exchangeRooms';
import ParticipantsNumber from '@/shared/ui/participants-number/ParticipantsNumber';
import OperationResult from '@/widgets/exchange/ui/operation-result/OperationResult';

function Exchange() {
    const confirmModal = useModal();
    const roomInfoModal = useModal();
    const cancelRoomModal = useModal();
    const {currencies} = useContext(CtxRootData);
    const roomsList = storeListExchangeRooms(state => state.roomsList);
    const [historyFilter, setHistoryFilter] = useState<string[]>([]);

    const {
        to,
        from,
        price,
        roomType,
        roomInfo,
        onRoomClosing,
        onToValueChange,
        onCurrenciesSwap,
        onFromValueChange,
        onToCurrencyChange,
        onFromCurrencyChange,
    } = useContext(CtxExchangeData);

    useEffect(() => {
        if (!(historyFilter.includes(from.currency) && historyFilter.includes(to.currency))) {
            setHistoryFilter([
                to.currency ? to.currency : null,
                from.currency ? from.currency : null
            ]);
        }
    }, [from.currency, to.currency])

    const getHeadTitle = () => {
        switch (roomType) {
            case 'default':
                return (
                    <Dropdown
                        trigger={
                            <span>Exchange</span>
                        }
                        items={[
                            {
                                key: '1',
                                label: (
                                    <DropdownItem onClick={roomInfoModal.showModal} icon={<IconPrivateRoom />}>
                                        Create private exchange room
                                    </DropdownItem>
                                )
                            }
                        ]}
                    />
                );
            case 'creator':
                return `Private exchange: ${roomInfo.timetick}`;
            case 'visitor':
                return `Private exchange participant: ${roomInfo.timetick}`;
        }
    };

    const getHeadSubtitle = () => {
        switch (roomType) {
            case 'default':
                return 'Cryptocurrency exchange - fast and easily';
            case 'creator':
                return (
                    <>
                        You are owner of this private room. A Gekkoin user will be able to join your room using this&nbsp;
                        <button className="underline text-accent" onClick={roomInfoModal.showModal}>invite link</button>
                    </>
                );
            case 'visitor':
                return 'Private exchange room';

        }
    };

    const getHeadRightContent = () => {
        if (roomType === 'creator' || roomType === 'visitor') {
            return (
                <ParticipantsNumber
                    quantity={roomInfo.count}
                    showIcon={roomType === 'creator'}
                    onLeave={cancelRoomModal.showModal}
                    onIconClick={roomInfoModal.showModal}
                />
            );
        }

        return null;
    };

    if (!roomsList) return <Loader/>;

    return (
        <div className="wrapper">
            <PageHead
                title={getHeadTitle()}
                subtitle={getHeadSubtitle()}
                rightContent={getHeadRightContent()}
            />

            <SplitGrid
                leftColumn={
                    <div className="py-5 px-10 lg:px-5 md:px-4">
                        <div className={`gap-x-14 xl:gap-x-5 ${styles.Grid}`}>
                            <div className="h-full flex flex-col">
                                <InputCurrencyPercented
                                    allowedFlags={[
                                        CurrencyFlags.AccountAvailable,
                                        CurrencyFlags.ExchangeAvailable
                                    ]}
                                    balanceFilter
                                    currencySelector={roomType === 'default'}
                                    onChange={onFromValueChange}
                                    onCurrencyChange={onFromCurrencyChange}
                                    currencyData={currencies.get(from.currency)}
                                    excludedCurrencies={[to.currency]}
                                    value={from.amount}
                                    minValue={currencies.get(from.currency)?.minOrder}
                                    header={
                                        <div className="font-medium text-md lg:text-sm md:text-xs select-none">Pay from</div>
                                    }
                                />
                                <div className={`flex justify-center ${styles.FieldsSpacer}`}>
                                    <div
                                        onClick={onCurrenciesSwap}
                                        className='border-[1px] z-[1] bg-white border-solid border-gray-400 rounded-[5px] hover:border-blue-400 hover:cursor-pointer'
                                    >
                                        <IconSwap/>
                                    </div>
                                </div>
                                <div className="font-medium text-md lg:text-sm md:text-xs mb-2 select-none">Receive to</div>
                                <InputItemCurrency
                                    allowedFlags={[
                                        CurrencyFlags.AccountAvailable,
                                        CurrencyFlags.ExchangeAvailable
                                    ]}
                                    currencySelector={roomType === 'default'}
                                    excludedCurrencies={[from.currency]}
                                    validateBalance={false}
                                    onChange={onToValueChange}
                                    onCurrencyChange={onToCurrencyChange}
                                    currencyData={currencies.get(to.currency)}
                                    value={to.amount}
                                    header={
                                        <div className="font-medium text-md lg:text-sm md:text-xs">Pay from</div>
                                    }
                                />
                                <div className="mt-3 md:mt-2">
                                    <div className="font-medium text-md lg:text-sm md:text-xs">Price</div>
                                    <PriceField />
                                </div>
                                {roomType === 'creator' && (
                                    <div className="mt-6 md:mt-3.5">
                                        <Checkbox disabled>
                                            <span className="lg:text-sm md:text-xs sm:text-[0.625rem]">Sell a <strong
                                                className="font-semibold">token</strong> at the market rate</span>
                                        </Checkbox>
                                    </div>
                                )}
                                <div className="mt-10 md:mt-6">
                                    <OperationResult />
                                </div>
                            </div>
                            <div className="wrapper">
                                <DepthOfMarket
                                    currencyFrom={from.currency}
                                    currencyTo={to.currency}
                                    roomKey={roomInfo ? roomInfo.timetick : null}
                                    isSwapped={price.isSwapped}
                                />
                            </div>
                            <div className={`mt-7 ${styles.GridFooter}`}>
                                <Button
                                    className="w-full"
                                    size="xl"
                                    disabled={!price.amount}
                                    onClick={confirmModal.showModal}
                                >Buy {to.currency ? to.currency : "a token"}</Button>
                                <div className="mt-5 lg:mt-2.5 px-8 text-secondary text-xs text-center">
                                    order execution depends on the market situation
                                </div>
                            </div>
                        </div>
                        <div className="mt-12">
                            <OpenOrders />
                        </div>
                        <Modal
                            width={400}
                            title="Confirm the order"
                            open={confirmModal.isModalOpen}
                            onCancel={confirmModal.handleCancel}
                        >
                            <Confirm
                                onConfirm={() => {
                                    apiCreateOrder({
                                        from_currency: from.currency,
                                        from_amount: +from.amount,
                                        to_currency: to.currency,
                                        to_amount: +to.amount,
                                        client_nonce: new Date().getTime(),
                                    })
                                    confirmModal.handleCancel();
                                }}
                            />
                        </Modal>
                    </div>
                }
                rightColumn={
                    <div className="py-5 px-10 lg:px-5 md:px-4">
                        <History currenciesFilter={historyFilter}/>
                    </div>
                }
            />

            <Modal
                width={450}
                open={roomInfoModal.isModalOpen}
                onCancel={roomInfoModal.handleCancel}
                title={roomType == 'default'
                    ? 'Open private exchange room'
                    : 'Invite link'
                }
            >
                {roomType == 'default'
                    ? <CreateRoom />
                    : <InviteLink roomInfo={roomInfo} />
                }
            </Modal>

            <Modal
                width={450}
                title={`${roomType === 'creator' ? 'Close' : 'Leave'} private exchange room`}
                open={cancelRoomModal.isModalOpen}
                onCancel={cancelRoomModal.handleCancel}
            >
                <div className="pt-5 text-sm">
                    Are you sure you want to {roomType === 'creator' ? 
                        `close the current ${from.currency} - ${to.currency} private
                        exchange room? All `
                    : `leave the current ${from.currency} - ${to.currency} private
                    exchange room? Your `}
                    unclosed orders will be canceled.
                </div>
                <div className="mt-16 sm:mt-14">
                    <Button
                        size="xl"
                        className="w-full"
                        onClick={() => {
                            apiCloseRoom(roomInfo.timetick).then(() => {
                                onRoomClosing(roomInfo.timetick);
                                cancelRoomModal.handleCancel();
                            }).catch(cancelRoomModal.handleCancel);
                        }}
                    >Close private exchange room</Button>
                </div>
            </Modal>
        </div>
    );
}

export default Exchange;
