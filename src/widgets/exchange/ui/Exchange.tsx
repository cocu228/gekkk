import Loader from '@/shared/ui/loader';
import styles from './style.module.scss';
import Modal from '@/shared/ui/modal/Modal';
import {useNavigate} from 'react-router-dom';
import {randomId} from '@/shared/lib/helpers';
import Button from '@/shared/ui/button/Button';
import {CtxExchangeData} from '../model/context';
import IconSwap from '@/shared/ui/icons/IconSwap';
import History from '@/widgets/history/ui/History';
import useModal from '@/shared/model/hooks/useModal';
import Dropdown from '@/shared/ui/dropdown/Dropdown';
import Checkbox from '@/shared/ui/checkbox/Checkbox';
import {useContext, useEffect, useState} from 'react';
import PageHead from '@/shared/ui/page-head/PageHead';
import SplitGrid from '@/shared/ui/split-grid/SplitGrid';
import InputCurrency from '@/shared/ui/input-currency/ui';
import {apiCloseRoom, apiCreateOrder} from '@/shared/api';
import Confirm from '@/widgets/exchange/ui/confirm/Confirm';
import InviteLink from '@/shared/ui/invite-link/InviteLink';
import RoomProperties from './room-properties/RoomProperties';
import IconPrivateRoom from '@/shared/ui/icons/IconPrivateRoom';
import {CurrencyFlags} from '@/shared/config/mask-currency-flags';
import PriceField from '@/widgets/exchange/ui/price-field/PriceField';
import OpenOrders from '@/widgets/exchange/ui/open-orders/OpenOrders';
import CreateRoom from '@/widgets/exchange/ui/create-room/CreateRoom';
import DropdownItem from '@/shared/ui/dropdown/dropdown-item/DropdownItem';
import DepthOfMarket from '@/widgets/exchange/ui/depth-of-market/DepthOfMarket';
import {validateBalance, validateMinimumAmount} from '@/shared/config/validators';
import {storeListExchangeRooms} from '@/shared/store/exchange-rooms/exchangeRooms';
import ParticipantsNumber from '@/shared/ui/participants-number/ParticipantsNumber';
import OperationResult from '@/widgets/exchange/ui/operation-result/OperationResult';
import {CtxCurrencies} from "@/processes/CurrenciesContext";

function Exchange() {

    const confirmModal = useModal();
    const roomInfoModal = useModal();
    const cancelRoomModal = useModal();

    const navigate = useNavigate();
    const {currencies} = useContext(CtxCurrencies);
    const [loading, setLoading] = useState<boolean>(false);
    const [ordersRefresh, setOrdersRefresh] = useState<string>('');
    const [historyFilter, setHistoryFilter] = useState<string[]>([]);
    const roomsList = storeListExchangeRooms(state => state.roomsList);
    const [hasValidationError, setHasValidationError] = useState<boolean>(false);

    const {
        to,
        from,
        price,
        roomType,
        roomInfo,
        isLimitOrder,
        onRoomClosing,
        onToValueChange,
        onCurrenciesSwap,
        onFromValueChange,
        onToCurrencyChange,
        onFromCurrencyChange,
        onIsLimitOrderChange
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
                        isOpen={roomInfoModal.isModalOpen}
                        trigger={
                            <span>Exchange</span>
                        }
                        items={[{key: '1', label: (<DropdownItem onClick={roomInfoModal.showModal} icon={<IconPrivateRoom />}>Create private exchange room</DropdownItem>)}]}
                    />
                );
            case 'creator':
                return `Private room ${from.currency} - ${to.currency}, ID: ...${roomInfo.timetick.toString().slice(-6)}`;
            case 'visitor':
                return `Private room ${from.currency} - ${to.currency} participant, ID: ...${roomInfo.timetick.toString().slice(-6)}`;
        }
    };

    const getHeadSubtitle = () => {
        switch (roomType) {
            case 'default':
                return 'Cryptocurrency exchange - fast and easily';
            case 'creator':
                return (
                    <>
                        You are owner of this private room. A Gekkard user will be able to join your room using this&nbsp;
                        <button className="underline text-accent" onClick={roomInfoModal.showModal}>invite link</button>
                    </>
                );
            case 'visitor':
                return 'Private exchange room';

        }
    };

    if (!roomsList) return <Loader/>;

    return (
        <div className="wrapper">
            <PageHead
                title={getHeadTitle()}
                subtitle={getHeadSubtitle()}
                rightContent={roomType !== 'creator' ? null : (
                    <ParticipantsNumber
                        quantity={roomInfo.count}
                        onLeave={cancelRoomModal.showModal}
                        onIconClick={roomInfoModal.showModal}
                    />
                )}
            />

            <SplitGrid
                leftColumn={
                    <div className="py-5 px-10 lg:px-5 md:px-4">
                        <div className={`gap-x-14 xl:gap-x-5 ${styles.Grid}`}>
                            <div className="h-full flex flex-col">
                                <InputCurrency.CurrencySelector
                                    balanceFilter
                                    onSelect={onFromCurrencyChange}
                                    disabled={roomType !== 'default'}
                                    excludedCurrencies={[to.currency]}
                                    allowedFlags={[CurrencyFlags.ExchangeAvailable]}
                                >
                                    <InputCurrency.Validator
                                        className='text-sm'
                                        value={from.amount}
                                        onError={setHasValidationError}
                                        description={!from.currency ? null
                                            : `Minimum order amount is ${currencies.get(from.currency)?.minOrder} ${from.currency}`}
                                        validators={[
                                            validateBalance(currencies.get(from.currency), navigate),
                                            validateMinimumAmount(currencies.get(from.currency)?.minOrder, from.amount)
                                        ]}
                                    >
                                        <InputCurrency.PercentSelector
                                            onSelect={onFromValueChange}
                                            currency={currencies.get(from.currency)}
                                            header={<span className='font-medium text-md lg:text-sm md:text-xs select-none'>
                                                Pay from
                                            </span>}
                                        >
                                            <InputCurrency.DisplayBalance currency={currencies.get(from.currency)}>
                                                <InputCurrency
                                                    value={from.amount}
                                                    currency={from.currency}
                                                    onChange={v => onFromValueChange(v)}
                                                />
                                            </InputCurrency.DisplayBalance>        
                                        </InputCurrency.PercentSelector>
                                    </InputCurrency.Validator>
                                </InputCurrency.CurrencySelector>

                                <div className={`flex justify-center ${styles.FieldsSpacer}`}>
                                    <div
                                        onClick={onCurrenciesSwap}
                                        className={`${styles.SwapButton} ${!(from.currency && to.currency) ? styles.Disabled : ''}`}
                                    >
                                        <IconSwap/>
                                    </div>
                                </div>

                                <div className="font-medium text-md lg:text-sm md:text-xs mb-2 select-none">Receive to</div>

                                <InputCurrency.CurrencySelector
                                    className='mt-0'
                                    onSelect={onToCurrencyChange}
                                    disabled={roomType !== 'default'}
                                    excludedCurrencies={[from.currency]}
                                    allowedFlags={[CurrencyFlags.ExchangeAvailable]}
                                >
                                    <InputCurrency
                                        value={to.amount}
                                        currency={to.currency}
                                        onChange={v => onToValueChange(v)}
                                    />
                                </InputCurrency.CurrencySelector>

                                <div className="mt-3 md:mt-2">
                                    <div className="font-medium text-md lg:text-sm md:text-xs">Price</div>
                                    <PriceField />
                                </div>

                                {roomType === 'creator' && (
                                    <div className="mt-6 md:mt-3.5">
                                        <Checkbox defaultChecked={!isLimitOrder} onChange={onIsLimitOrderChange}>
                                            <span className="lg:text-sm md:text-xs sm:text-[0.625rem]">Sell a <strong
                                                className="font-semibold">{from.currency}</strong> at the market rate</span>
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
                                    disabled={!price.amount || hasValidationError}
                                    onClick={confirmModal.showModal}
                                >Buy {to.currency ? to.currency : "a token"}</Button>

                                <div className="mt-5 lg:mt-2.5 px-8 text-secondary text-xs text-center">
                                    order execution depends on the market situation
                                </div>
                            </div>
                        </div>

                        <div className="mt-12">
                            <OpenOrders refreshKey={ordersRefresh}/>
                        </div>

                        <Modal
                            width={400}
                            title="Confirm the order"
                            open={confirmModal.isModalOpen}
                            onCancel={confirmModal.handleCancel}
                        >
                            <Confirm
                                loading={loading}
                                onConfirm={() => {
                                    setLoading(true);

                                    (async () => {
                                        await apiCreateOrder({
                                            from_currency: from.currency,
                                            to_currency: to.currency,
                                            from_amount: from.amount,
                                            to_amount: to.amount,
                                            client_nonce: 0,
                                            is_limit: isLimitOrder,
                                            room_key: roomType === 'default' ? 0 : +roomInfo.timetick
                                        });

                                        setOrdersRefresh(randomId());
                                        confirmModal.handleCancel();
                                        setLoading(false);
                                    })();
                                }}
                            />
                        </Modal>
                    </div>
                }
                rightColumn={
                    <div className="py-5 px-10 lg:px-5 md:px-4">
                        <History
                            currenciesFilter={historyFilter}
                            types={[2, 15, 16]}
                        />
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
                {roomType === 'default'
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
                <div className="text-sm">
                    Are you sure you want to {roomType === 'creator' ? 
                        `close the current private exchange room? All `
                    : `leave the current private exchange room? Your `}
                    unclosed orders will be canceled.
                </div>

                {roomType !== 'creator' ? null : <>
                    <div className='mt-4 mb-2 font-medium'>Room description:</div>
                    <RoomProperties room={roomInfo}/>
                </>}

                <div className="mt-16 sm:mt-14">
                    <Button
                        size="xl"
                        className="w-full"
                        onClick={() => {
                            cancelRoomModal.handleCancel();

                            apiCloseRoom(roomInfo.timetick).then(() => {
                                onRoomClosing(roomInfo.timetick);
                                navigate('/exchange');
                            });
                        }}
                    >{`${roomType === 'creator' ? 'Close' : 'Leave'} private exchange room`}</Button>
                </div>
            </Modal>
        </div>
    );
}

export default Exchange;
