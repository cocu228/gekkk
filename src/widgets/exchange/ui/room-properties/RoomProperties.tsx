import {IRoomInfo} from "@/shared/api";
import InlineProperty from "@/shared/ui/inline-property";
import { useTranslation } from 'react-i18next';

interface IParams {
    room: IRoomInfo;
}

function RoomProperties({room}: IParams) {
    const {t} = useTranslation();

    return (
        <>
            <div className="row mb-2">
                <div className="col">
                    <InlineProperty
                        left={t("exchange.room_number")}
                        right={room.timetick.toString()}
                    />
                </div>
            </div>

            <div className="row mb-2">
                <div className="col">
                    <InlineProperty
                        left={t("exchange.from")}
                        right={room.currency1}
                    />
                </div>
            </div>

            <div className="row mb-2">
                <div className="col">
                    <InlineProperty
                        left={t("exchange.to")}
                        right={room.currency2}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <InlineProperty
                        left={t("exchange.participants_number")}
                        right={room.count.toString()}
                    />
                </div>
            </div>
        </>
    )
}

export default RoomProperties;
