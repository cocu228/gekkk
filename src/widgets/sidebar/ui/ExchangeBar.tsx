import { t } from 'i18next';
import styles from "./desktop/style.module.scss";
import { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { BreakpointsContext } from '@/app/providers/BreakpointsProvider';
import useModal from '@/shared/model/hooks/useModal';
import { RoomInfo } from '@/shared/(orval)api/gek/model';
import { storeListExchangeRooms } from '@/shared/store/exchange-rooms/exchangeRooms';
import { CtxRootData } from '@/processes/RootContext';
import { CtxCurrencies } from '@/processes/CurrenciesContext';
import { IconApp } from '@/shared/ui/icons/icon-app';
import NavCollapse from '@/widgets/gko-sidebar/ui/nav-collapse/NavCollapse';
import InviteLink from '@/shared/ui/invite-link/InviteLink';
import Button from '@/shared/ui/button/Button';
import { apiCloseRoom } from '@/shared/(orval)api';
import { Modal as ModalUi} from "@/shared/ui/ModalUi/Modal";

type IParams = {
    NavLinkEvent: () => void,
}

const ExchangeBar = ({NavLinkEvent}: IParams) => {
    const navigate = useNavigate();
    const roomInfoModal = useModal();
    const roomCloseModal = useModal();
    const [params] = useSearchParams();
    const roomId = params.get('roomId');
    const {account} = useContext(CtxRootData);
    const {xxxl} = useContext(BreakpointsContext);
    const {currencies} = useContext(CtxCurrencies);
    const [selectedRoom, setSelectedRoom] = useState<RoomInfo>(null);
    const {
        getRoomsList,
        roomsList: privateRooms,
        removeRoom: removeExchangeRoom
    } = storeListExchangeRooms(state => state);

    useEffect(() => {
        if (account) {
            getRoomsList();
        }
    }, [account]);

    return <>
        {/* Exchange page link */}
        <NavLink className={!currencies ? "disabled" : ""}
            onClick={NavLinkEvent}
            to={!currencies ? "" : "exchange"}>
            <div className={styles.ItemExchange}>
                <div className="absolute self-center place-self-center"><span
                    className={styles.NavName}>{t("exchange.title")}</span>
                </div>
                <div className="absolute right-4 self-center">
                    <IconApp code="t68" className={styles.Icon} color="#285E69" size={34} />
                </div>
            </div>
        </NavLink>

        {/* Private exchange rooms collapse */}
        {!(privateRooms && privateRooms.length) ? null :
            <NavCollapse header={t("private_exchange_rooms")} id={"exchange"}>
                {privateRooms.map((item, i) => (
                    <NavLink onClick={NavLinkEvent} to={`private-room?roomId=${item.timetick}`}
                        className={({ isActive }) => (isActive && +roomId === item.timetick) ? 'active' : ''}
                        key={item.timetick}>
                        <div className={styles.Item}>
                            <div className="col flex items-center pl-4 w-[85px]">
                                <IconApp color="#DEE2E7" code="t66" size={14} className={styles.SvgArrow} />
                                <div className="w-[50px] h-[50px] bg-[rgb(0,174,239)] rounded-[50%] flex items-center justify-center">
                                    <IconApp size={30} code="t33" color="#fff" />
                                </div>
                            </div>
                            <div className="col flex items-center justify-center flex-col pl-6">
                                <div className="flex w-full row mb-1 justify-between">
                                    <div className={styles.RoomName}>
                                        {!xxxl
                                            ? `${item.currency1} - ${item.currency2}`
                                            : `${item.currency1} - ${item.currency2}`
                                        }
                                    </div>
                                    <div
                                        className="mr-3 hover:cursor-pointer group"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setSelectedRoom(item);
                                            roomCloseModal.showModal();
                                        }}
                                    >
                                        <IconApp color="#fa94a9" code="t69" size={16} className="text-[12px] group-hover:stroke-red-500" />
                                    </div>
                                </div>
                                <div className="flex row w-full mb-1 justify-between"><span
                                    className={`text-gray-500 text-xs`}>
                                    {!xxxl ? t("number_of_participants") : t("participants")}
                                </span>
                                    <span
                                        className='mr-[17px] text-gray-500 text-xs font-semibold'>{item.count}</span>
                                </div>
                                {!item.room_code ? null : (
                                    <div className="flex row w-full justify-between"><span
                                        className={`underline text-gray-500 text-xs hover:text-blue-300`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setSelectedRoom(item);
                                            roomInfoModal.showModal();
                                        }}
                                    >
                                        {t("invite_link")}
                                    </span>
                                        <div
                                            className="mr-3 hover:cursor-pointer fill-gray-500 hover:fill-blue-400 group"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setSelectedRoom(item);
                                                roomInfoModal.showModal();
                                            }}
                                        >
                                            <IconApp color="gray-500" code="t63" size={16} className="text-[12px] group-hover:stroke-blue-400" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </NavLink>
                ))}
            </NavCollapse>
        }

        <ModalUi
            isModalOpen={roomInfoModal.isModalOpen}
            onCancel={roomInfoModal.handleCancel}
            title={t("invite_link")}
        >
            <InviteLink onClose={roomInfoModal.handleCancel} roomInfo={selectedRoom} />
        </ModalUi>
        
        <ModalUi
            isModalOpen={roomCloseModal.isModalOpen}
            onCancel={roomCloseModal.handleCancel}
            title={t('invite_link')}
        >
            <div className="pt-5 text-sm">
                {selectedRoom ?
                    t("are_you_sure_close", { currency1: selectedRoom?.currency1, currency2: selectedRoom?.currency2 })
                    :
                    t("are_you_sure_leave", { currency1: selectedRoom?.currency1, currency2: selectedRoom?.currency2 })
                }
            </div>
            <div className="mt-16 sm:mt-14 flex justify-center">
                <Button
                    size="lg"
                    className="w-full"
                    onClick={() => {
                        if (window.location.pathname === `/private-room?roomId=${selectedRoom.timetick}`) {
                            navigate('/exchange');
                        }
                        apiCloseRoom({
                            roomId: selectedRoom.timetick
                        }).then(() => {
                            removeExchangeRoom(selectedRoom.timetick);
                            roomCloseModal.handleCancel();
                        }).catch(roomCloseModal.handleCancel);
                    }}
                >{t("close_private_exchange_room")}</Button>
            </div>
        </ModalUi>
    </>
}

export default ExchangeBar;