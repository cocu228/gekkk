import { useContext, useEffect, useState } from "react";
import { CtxExchangeData, ICtxExchangeData } from "./context";
import { CtxRootData } from "@/app/CurrenciesContext";
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
        price: null,
        roomInfo: roomInfo,
        roomType: roomInfo ? roomInfo.room_code ? "creator" : "visitor" : "default",
        validationErrors: false,
        to: {
            amount: null,
            currency: roomInfo ? roomInfo.currency2 : to && to !== from ? to : null
        },
        from: {
            amount: null,
            currency: roomInfo ? roomInfo.currency1 : from ? from : null
        }
    }
    
    const [state, setState] = useState<ICtxExchangeData>(initialState);

    useEffect(() => {
        setState(initialState);
    }, [roomInfo])

    const calculatePrice = (from: number, to: number) => {
        const result = to / from;
        return !Number.isFinite(result) || Number.isNaN(result) ? 0 :
            +result.toFixed(currencies.get(state.to.currency)?.roundPrec);
    }

    const handleFromCurrencyChange = (value: string) => {
        setState(prev => ({
            ...prev,
            from: {
                ...prev.from,
                currency: value
            }
        }))
    }

    const handleFromAmountChange = (value: string) => {
        setState(prev => ({
            ...prev,
            price: Number.isNaN(+value) ? 0 : calculatePrice(+value, +prev.to.amount),
            from: {
                ...prev.from,
                amount: value
            }
        }))
    }
    
    const handleToCurrencyChange = (value: string) => {
        setState(prev => ({
            ...prev,
            to: {
                ...prev.to,
                currency: value
            }
        }))
    }

    const handleToAmountChange = (value: string) => {
        setState(prev => ({
            ...prev,
            price: Number.isNaN(+value) ? 0 : calculatePrice(+prev.from.amount, +value),
            to: {
                ...prev.to,
                amount: value
            }
        }))
    }

    const handleCurrenciesSwap = () => {
        setState(prev => ({
            ...prev,
            to: prev.from,
            from: prev.to,
            price: calculatePrice(+prev.to.amount, +prev.from.amount)
        }))
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
        onFromCurrencyChange: handleFromCurrencyChange
    }}>
        {children}
    </CtxExchangeData.Provider>
};

export default ExchangeProvider;
