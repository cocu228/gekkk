import styles from './style.module.scss';
import {useEffect, useState} from "react";
import {useTranslation} from 'react-i18next';
import Dropdown from "@/shared/ui/dropdown/Dropdown";
import DropdownItem from "@/shared/ui/dropdown/dropdown-item/DropdownItem";
import {storeListExchangeRooms} from "@/shared/store/exchange-rooms/exchangeRooms";
import IconPrivateRoom from "@/shared/ui/icons/IconPrivateRoom";
import IconParticipant from '@/shared/ui/icons/IconParticipant';
import {useNavigate} from 'react-router-dom';
import {RoomInfo} from '@/shared/(orval)api/gek/model';
import Modal from '@/shared/ui/modal/Modal';
import InviteLink from '@/shared/ui/invite-link/InviteLink';
import Button from '@/shared/ui/button/Button';
import {apiCloseRoom} from '@/shared/(orval)api';
import useModal from '@/shared/model/hooks/useModal';
import IconClose from '@/shared/ui/icons/IconClose';
import IconQR from '@/shared/ui/icons/IconQR';
import IconAddRoom from '@/shared/ui/icons/IconAddRoom';
import CreateRoom from '@/shared/ui/create-room/CreateRoom';
import { IExchangeField } from '@/widgets/exchange/model/types';

export const ExchangeRoomMenu = ({
    roomNumber
}: {
    roomNumber: string;
}) => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const roomModal = useModal();
    const roomCloseModal = useModal();
    const [to, setTo] = useState<IExchangeField>({
        amount: null,
        currency: null
    });
    const [from, setFrom] = useState<IExchangeField>({
        amount: null,
        currency: null
    });
    const [active, setActive] = useState<RoomInfo>(null);
    const {roomsList, removeRoom} = storeListExchangeRooms(state => state);
    const {
        addRoom: addExchangeRoom,
        removeRoom: closeExchangeRoom
    } = storeListExchangeRooms(state => state);

    useEffect(() => {
        if (roomsList) {
            setActive(roomsList.find(r => r.timetick === +roomNumber));
        }
    }, [roomsList, roomNumber])

    return !roomsList ? null : (
        <div>
            <Dropdown
                className={'min-w-[214px] flex justify-end bg-transparent'}
                trigger={<div className='flex gap-2 items-center'>
                    <span className={styles.HeaderTitle}>Rooms</span>
                    <button className={styles.ArrowBtn}></button>
                </div>}
                items={[
                    ...roomsList.map(r => ({
                        key: r.timetick,
                        label: <RoomItem room={r} isActive={r.timetick === active?.timetick}/>
                    })),
                    ...(!active ? [{
                        key: 'new-room',
                        label: <DropdownItem className='w-full bg-[#DCDCD9]' onClick={roomModal.showModal}>
                            <div className='flex justify-between items-center w-full'>
                                <span className='font-semibold text-[#1F3446]'>New room</span>

                                <IconAddRoom
                                    size={26}
                                    stroke='#285E69'
                                />
                            </div>
                        </DropdownItem>
                    }] : [{
                        key: 'invite-link',
                        label: <DropdownItem className='w-full bg-[#DCDCD9]' onClick={roomModal.showModal}>
                            <div className='flex justify-between items-center w-full'>
                                <span className='font-semibold text-[#1F3446]'>Invite link</span>

                                <IconQR
                                    size={26}
                                    stroke='#285E69'
                                />
                            </div>
                        </DropdownItem>
                    }, {
                        key: 'close-room',
                        label: <DropdownItem className='w-full bg-[#DCDCD9]' onClick={roomCloseModal.showModal}>
                            <div className='flex justify-between items-center w-full'>
                                <span className='font-semibold text-[#1F3446]'>Close current room</span>

                                <IconClose
                                    size={22}
                                    stroke='#285E69'
                                />
                            </div>
                        </DropdownItem>
                    }])
                ]}
            />

            <Modal
                width={450}
                open={roomModal.isModalOpen}
                onCancel={roomModal.handleCancel}
                title={t("invite_link")}
            >
                {active
                    ? <InviteLink roomInfo={active}/>
                    : <CreateRoom
                        to={to}
                        from={from}
                        onRoomCreation={(roomInfo) => {
                            addExchangeRoom(roomInfo);
                            roomModal.handleCancel();
                            navigate(`/private-room/${roomInfo.timetick}`)
                        }}
                        onToCurrencyChange={(value) => setTo({...to, currency: value})}
                        onFromCurrencyChange={(value) => setFrom({...from, currency: value})}
                    />
                }
            </Modal>

            <Modal
                width={450}
                open={roomCloseModal.isModalOpen}
                onCancel={roomCloseModal.handleCancel}
                title='Invite link'
            >
                <div className="pt-5 text-sm">
                    Are you sure you want to {active ?
                    `close ${active?.currency1} - ${active?.currency2} private
                        exchange room? All `
                    : `leave ${active?.currency1} - ${active?.currency2} private
                        exchange room? Your `}
                    unclosed orders will be canceled.
                </div>
                
                <div className="mt-16 sm:mt-14">
                    <Button
                        size="xl"
                        className="w-full"
                        onClick={() => {
                            apiCloseRoom({
                                roomId: active.timetick
                            }).then(() => {
                                removeRoom(active.timetick);
                                roomCloseModal.handleCancel();
                                navigate('/exchange');
                            }).catch(roomCloseModal.handleCancel);
                        }}
                    >Close private exchange room</Button>
                </div>
            </Modal>
        </div>
    )
}

const RoomItem = ({
    room,
    isActive
}: {
    room: RoomInfo;
    isActive: boolean;
}) => {
    const navigate = useNavigate();

    return (
        <DropdownItem
            className={`w-full py-2.5 px-2.5 ${isActive ? 'bg-[#DCDCD9]' : ''}`}
            icon={<div className={styles.RoomsMenuItemIcon}>
                <IconPrivateRoom/>
            </div>}
            onClick={() => navigate(`private-room/${room.timetick}`)}
        >
            <div className='flex flex-auto justify-between w-full'>
                <div className={styles.RoomsMenuItem}>
                    <span className={styles.RoomsMenuItemTokens}>
                        {room.currency1} - {room.currency2}
                    </span>
                    <span className={styles.RoomsMenuItemNumber}>
                        {room.timetick}
                    </span>
                </div>
                
                <div className={`${styles.RoomsMenuItemIcon} flex items-center gap-[1px]`}>
                    <span>{room.count}</span>
                    <IconParticipant
                        height={24}
                        width={24}
                        fill='inherit'
                    />
                </div>
            </div>
        </DropdownItem>
    );
}
