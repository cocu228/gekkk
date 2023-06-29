import {IRoomInfo} from "@/shared/api";
import InlineProperty from "@/shared/ui/inline-property";

interface IParams {
    room: IRoomInfo;
}

function RoomProperties({room}: IParams) {
    return (
        <>
            <div className="row mb-2">
                <div className="col">
                    <InlineProperty
                        left={"Room number"}
                        right={room.timetick}
                    />
                </div>
            </div>

            <div className="row mb-2">
                <div className="col">
                    <InlineProperty
                        left={"From"}
                        right={room.currency1}
                    />
                </div>
            </div>

            <div className="row mb-2">
                <div className="col">
                    <InlineProperty
                        left={"To"}
                        right={room.currency2}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <InlineProperty
                        left={"Participants number"}
                        right={room.count.toString()}
                    />
                </div>
            </div>
        </>
    )
}

export default RoomProperties;
