import { useContext, useEffect, useState } from "react";
import { CtxExchangeData, ICtxExchangeData } from "./context";
import { CtxRootData } from "@/processes/RootContext";
import { IRoomInfo } from "@/shared/api";
import { useNavigate } from "react-router-dom";
import { storeListExchangeRooms } from "@/shared/store/exchange-rooms/exchangeRooms";

interface IProps {
    to?: string;
    from?: string;
    roomInfo?: IRoomInfo;
    children: React.ReactNode;
}

const ExchangeProvider = ({ children, from, to, roomInfo, ...props }: IProps) => {
    const navigate = useNavigate();
    const {currencies} = useContext(CtxRootData);
    const addExchangeRoom = storeListExchangeRooms(state => state.addRoom);
    const removeExchangeRoom = storeListExchangeRooms(state => state.removeRoom);

    const initialState: ICtxExchangeData = {
        roomInfo: roomInfo,
        validationErrors: false,
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
    }, [roomInfo])

    const calculatePrice = (from: number, to: number, isSwapped: boolean) => {
        const result = isSwapped ? from / to : to / from;

        return !Number.isFinite(result) || Number.isNaN(result) ? 0 :
            +result.toFixed(currencies.get(isSwapped ? state.from.currency : state.to.currency)?.roundPrec);
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
                amount: value
            },
            price: {
                ...prev.price,
                amount: calculatePrice(+value, +prev.to.amount, prev.price.isSwapped)
            }
        }));
    }

    const handleToAmountChange = (value: string) => {
        setState(prev => ({
            ...prev,
            to: {
                ...prev.to,
                amount: value
            },
            price: {
                ...prev.price,
                amount: calculatePrice(+prev.from.amount, +value, prev.price.isSwapped)
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
                amount: null
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

    const handleRoomCreation = (info: IRoomInfo) => {
        addExchangeRoom(info);
        navigate(`/private-room/${info.timetick}`);
    }

    const handleRoomClosing = (roomNumber: string) => {
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
        onFromCurrencyChange: handleFromCurrencyChange,
        onPriceCurrenciesSwap: handlePriceCurrenciesSwap
    }}>
        {children}
    </CtxExchangeData.Provider>
};

export default ExchangeProvider;
