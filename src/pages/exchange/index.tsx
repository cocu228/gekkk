import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import Exchange from "@/widgets/exchange/ui/Exchange";
import { apiApplyCode } from "@/shared/(orval)api/gek";
import ExchangeProvider from "@/widgets/exchange/model/ExchangeProvider";
import { storeListExchangeRooms } from "@/shared/store/exchange-rooms/exchangeRooms";

export default () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const to = params.get("to");
  const from = params.get("from");
  const roomId = params.get("roomId");
  const inviteCode = params.get("privateRoom");

  //Temporary
  const getRoomsList = storeListExchangeRooms(state => state.getRoomsList);

  const roomsList = storeListExchangeRooms(state => state.roomsList);
  const roomInfo = roomsList?.find(r => r.timetick.toString() === roomId);

  useEffect(() => {
    if (inviteCode) {
      (async () => {
        const { data } = await apiApplyCode({
          code: inviteCode
        });
        getRoomsList();

        navigate(`/private-room?roomId=${data.result}`);
      })();
    }
  }, [inviteCode]);

  if (inviteCode) return null;
  if (roomId && !roomInfo) navigate("/exchange");
  return (
    <ExchangeProvider roomInfo={roomInfo} to={to} from={from}>
      <Exchange />
    </ExchangeProvider>
  );
};
