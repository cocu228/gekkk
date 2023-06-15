import {useParams, useSearchParams} from 'react-router-dom';
import Exchange from '@/widgets/exchange/ui/Exchange';
import ExchangeProvider from '@/widgets/exchange/model/ExchangeProvider';
import { storeListExchangeRooms } from '@/shared/store/exchange-rooms/exchangeRooms';

export default () => {
    const {roomNumber} = useParams();
    const [params] = useSearchParams();
    const from = params.get("from");
    const to = params.get("to");

    const roomsList = storeListExchangeRooms(state => state.roomsList);
    const roomInfo = roomsList?.find(r => r.timetick.toString() === roomNumber);

    if (roomNumber && !roomInfo) return null;

    return (
        <ExchangeProvider roomInfo={roomInfo} to={to} from={from}>
            <Exchange/>
        </ExchangeProvider>
    );
}
