import {IRoomInfo} from "@/shared/api";
import {useNavigate} from "react-router-dom";
import {CtxCurrencies} from "@/processes/CurrenciesContext";
import {CtxExchangeData, ICtxExchangeData} from "./context";
import React, {ReactNode, useContext, useEffect, useState} from "react";
import {storeListExchangeRooms} from "@/shared/store/exchange-rooms/exchangeRooms";
import Decimal from "decimal.js";
import {formatAsNumberAndDot} from "@/shared/lib/formatting-helper";

interface IProps {
    to?: string;
    from?: string;
    roomInfo?: IRoomInfo;
    children: ReactNode;
}

const ExchangeProvider = ({ children, from, to, roomInfo, ...props }: IProps) => {
    const navigate = useNavigate();
    const {currencies} = useContext(CtxCurrencies);
    const addExchangeRoom = storeListExchangeRooms(state => state.addRoom);
    const removeExchangeRoom = storeListExchangeRooms(state => state.removeRoom);

    const initialState: ICtxExchangeData = {
        roomInfo: roomInfo,
        isLimitOrder: true,
        roomType: roomInfo ? roomInfo.room_code ? "creator" : "visitor" : "default",
        to: {
            amount: null,
            currency: roomInfo ? roomInfo.currency2 : to && to !== from ? to : null
        },
        from: {
            amount: null,
            currency: roomInfo ? roomInfo.currency1 : from ? from : null
        },
        price: {
            amount: null,
            isSwapped: false
        }
    }

    const [state, setState] = useState<ICtxExchangeData>(initialState);

    useEffect(() => {
        setState(initialState);
    }, [roomInfo]);

    const calculatePrice = (from: number, to: number, isSwapped: boolean) => {
        if (from === 0 && to === 0) return;

        const result = isSwapped
            ? new Decimal(from).div(to)
            : new Decimal(to).div(from);

        return !result.isFinite() || result.isNaN() ? null :
            result.toFixed(currencies.get(isSwapped ? state.from.currency : state.to.currency)?.roundPrec);
    }

    const calculateToAmount = (from: number, price: number, isSwapped: boolean) => {
        if (from === 0 || price === 0) return;

        const result = isSwapped
            ? new Decimal(from).div(price)
            : new Decimal(price).mul(from);

        return !result.isFinite() || result.isNaN() ? null :
            result.toFixed(currencies.get(state.to.currency)?.roundPrec);
    }

    const handleFromCurrencyChange = (value: string) => {
        setState(prev => ({
            ...prev,
            from: {
                ...prev.from,
                currency: value
            },
            price: {
                ...prev.price,
                from: value
            }
        }));
    }
    
    const handleToCurrencyChange = (value: string) => {
        setState(prev => ({
            ...prev,
            to: {
                ...prev.to,
                currency: value
            },
            price: {
                ...prev.price,
                to: value
            }
        }));
    }

    const handleFromAmountChange = (value: string) => {
        
        setState(prev => ({
            ...prev,
            from: {
                ...prev.from,
                amount: formatAsNumberAndDot(value)
            },
            price: {
                ...prev.price,
                amount: calculatePrice(+formatAsNumberAndDot(value), +prev.to.amount, prev.price.isSwapped)
            }
        }));
    }

    const handleToAmountChange = (value: string) => {
        setState(prev => ({
            ...prev,
            to: {
                ...prev.to,
                amount: formatAsNumberAndDot(value)
            },
            price: {
                ...prev.price,
                amount: calculatePrice(+prev.from.amount, +formatAsNumberAndDot(value), prev.price.isSwapped)
            }
        }));
    }

    const handlePriceAmountChange = (value: string) => {
        if(Number.isNaN(+value)) return;

        setState(prev => ({
            ...prev,
            to: {
                ...prev.to,
                amount: calculateToAmount(+prev.from.amount, +value, prev.price.isSwapped)?.toString()
            },
            price: {
                ...prev.price,
                amount: formatAsNumberAndDot(value)
            }
        }));
    }

    const handleCurrenciesSwap = () => {
        setState(prev => ({
            ...prev,
            to: {
                currency: prev.from.currency,
                amount: null
            },
            from: {
                currency: prev.to.currency,
                amount: null
            },
            price: {
                ...prev.price,
                amount: null,
                isSwapped: false
            }
        }));
    }

    const handlePriceCurrenciesSwap = () => {
        setState(prev => ({
            ...prev,
            price: {
                isSwapped: !prev.price.isSwapped,
                amount: calculatePrice(
                    +prev.from.amount,
                    +prev.to.amount,
                    !prev.price.isSwapped
                )
            }
        }));
    }

    const handleIsLimitOrderChange = (value: boolean) => {
        setState(prev => ({
            ...prev,
            isLimitOrder: value
        }));
    }

    const handleRoomCreation = (info: IRoomInfo) => {
        addExchangeRoom(info);
        navigate(`/private-room/${info.timetick}`);
    }

    const handleRoomClosing = (roomNumber: number) => {
        removeExchangeRoom(roomNumber);
        navigate('/exchange');
    }

    return <CtxExchangeData.Provider value={{
        ...state,
        onRoomClosing: handleRoomClosing,
        onRoomCreation: handleRoomCreation,
        onToValueChange: handleToAmountChange,
        onCurrenciesSwap: handleCurrenciesSwap,
        onFromValueChange: handleFromAmountChange,
        onToCurrencyChange: handleToCurrencyChange,
        onPriceAmountChange: handlePriceAmountChange,
        onIsLimitOrderChange: handleIsLimitOrderChange,
        onFromCurrencyChange: handleFromCurrencyChange,
        onPriceCurrenciesSwap: handlePriceCurrenciesSwap
    }}>
        {children}
    </CtxExchangeData.Provider>
};

export default ExchangeProvider;
