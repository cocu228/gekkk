import {useContext, useEffect} from 'react';
import Exchange from '@/widgets/exchange/ui/Exchange';
import {apiApplyCode} from '@/shared/(orval)api/gek';
import ExchangeProvider from '@/widgets/exchange/model/ExchangeProvider';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {storeListExchangeRooms} from '@/shared/store/exchange-rooms/exchangeRooms';
import { CtxRootData } from '@/processes/RootContext';
import Loader from '@/shared/ui/loader';

export default () => {
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const {account} = useContext(CtxRootData);
    const to = params.get("to");
    const from = params.get("from");
    const roomId = params.get('roomId');
    const inviteCode = params.get("privateRoom");
    const roomsList = storeListExchangeRooms(state => state.roomsList);
    const getRoomsList = storeListExchangeRooms(state => state.getRoomsList);
    const roomInfo = roomsList?.find(r => r.timetick.toString() === roomId);

    useEffect(() => {
        if (inviteCode) {
            (async () => {
                const {data} = await apiApplyCode({
                    code: inviteCode
                });

                if (!data) {
                    navigate(`/exchange`);
                }

                getRoomsList();

                navigate(`/private-room?roomId=${data.result.result}`);
            })();
        }
    }, [account, inviteCode]);

    if (inviteCode || !roomsList) return <Loader className='relative my-20'/>;
    
    if (roomId && !roomInfo) navigate('/exchange');    

    return (
        <ExchangeProvider roomInfo={roomInfo} to={to} from={from}>
            <Exchange/>
        </ExchangeProvider>
    );
}
