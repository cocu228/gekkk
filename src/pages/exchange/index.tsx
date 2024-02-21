import {useEffect} from 'react';
import Exchange from '@/widgets/exchange/ui/Exchange';
import {apiApplyCode} from '@/shared/(orval)api/gek';
import ExchangeProvider from '@/widgets/exchange/model/ExchangeProvider';
import {useNavigate, useParams, useSearchParams} from 'react-router-dom';
import {storeListExchangeRooms} from '@/shared/store/exchange-rooms/exchangeRooms';

export default () => {
    const navigate = useNavigate();
    const {roomNumber} = useParams();
    const [params] = useSearchParams();
    const to = params.get("to");
    const from = params.get("from");
    const inviteCode = params.get("privateRoom");

    //Temporary
    const getRoomsList = storeListExchangeRooms(state => state.getRoomsList);

    const roomsList = storeListExchangeRooms(state => state.roomsList);
    const roomInfo = roomsList?.find(r => r.timetick.toString() === roomNumber);

    useEffect(() => {
        if (inviteCode) {
            (async () => {
                const {data} = await apiApplyCode({
                    code: inviteCode
                });
                getRoomsList();

                navigate(`/private-room/${data.result}`);
            })();
        }
    }, [inviteCode]);

    if (inviteCode) return null;
    if (roomNumber && !roomInfo) navigate('/exchange');    
    return (
        <ExchangeProvider roomInfo={roomInfo} to={to} from={from}>
            <Exchange/>
        </ExchangeProvider>
    );
}
