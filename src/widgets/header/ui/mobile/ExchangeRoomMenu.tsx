import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Dropdown as DropdownC } from "@/shared/ui/!dropdown";
import { storeListExchangeRooms } from "@/shared/store/exchange-rooms/exchangeRooms";
import { RoomInfo } from "@/shared/(orval)api/gek/model";
import InviteLink from "@/shared/ui/invite-link/InviteLink";
import Button from "@/shared/ui/button/Button";
import { apiCloseRoom } from "@/shared/(orval)api";
import useModal from "@/shared/model/hooks/useModal";
import CreateRoom from "@/shared/ui/create-room/CreateRoom";
import { IExchangeField } from "@/widgets/exchange/model/types";
import { IconApp } from "@/shared/ui/icons/icon-app";
import { DropdownCItem } from "@/shared/ui/!dropdown/item";
import { Modal } from "@/shared/ui/modal/Modal";

import styles from "./style.module.scss";

export const ExchangeRoomMenu = ({ roomId }: { roomId: string }) => {
  const { t } = useTranslation();
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
  const { roomsList, removeRoom, addRoom: addExchangeRoom } = storeListExchangeRooms(state => state);

  useEffect(() => {
    if (roomsList) {
      setActive(roomsList.find(r => r.timetick === +roomId));
    }
  }, [roomsList, roomId]);

  return !roomsList ? null : (
    <div>
      <DropdownC
        position='right'
        customBodyClassName={styles.DropdownBody}
        trigger={
          <div className='flex gap-2 items-center'>
            {!active ? (
              <>
                <span className={styles.HeaderTitle}>{t("exchange.rooms")}</span>
                <IconApp className='rotate-[-270deg]' size={13} code='t08' color='#fff' />
              </>
            ) : (
              <div className={styles.RoomsMenuItem}>
                <span className={`${styles.RoomsMenuItemTokens} text-white`}>
                  {active.currency1} - {active.currency2}
                </span>
                <span className={`${styles.RoomsMenuItemNumber} text-white`}>{active.timetick}</span>
              </div>
            )}
            <button className={styles.ArrowBtn} />
          </div>
        }
      >
        {roomsList.map((r, i) => (
          <RoomItem key={i} room={r} isActive={r.timetick === active?.timetick} />
        ))}
        <div className={styles.LastButtons}>
          {!active ? (
            <DropdownCItem className='w-full min-w-[214px] bg-[var(--gek-light-grey)]' onClick={roomModal.showModal}>
              <div className='flex justify-between items-center w-full'>
                <span className='font-semibold text-[#1F3446]'>{t("exchange.new_room")}</span>
                <IconApp size={22} color='var(--gek-additional)' code='t35' />
              </div>
            </DropdownCItem>
          ) : (
            <>
              <DropdownCItem className='w-full min-w-[214px] bg-[#EDEDED]' onClick={roomModal.showModal}>
                <div className='flex justify-between items-center w-full'>
                  <span className='font-semibold text-[#1F3446]'>{t("invite_link")}</span>
                  <IconApp size={22} color='var(--gek-additional)' code='t34' />
                </div>
              </DropdownCItem>
              <DropdownCItem
                className='w-full min-w-[214px] border-b-1 border-[var(--gek-additional)] bg-[#EDEDED]'
                onClick={roomCloseModal.showModal}
              >
                <div className='flex justify-between items-center w-full'>
                  <span className='font-semibold text-[var(--gek-red)]'>{t("close_current_room")}</span>
                  <div className={styles.CloseWrap}>
                    <IconApp size={20} color='var(--gek-red)' code='t69' />
                  </div>
                </div>
              </DropdownCItem>
              <DropdownCItem className='w-full min-w-[214px] bg-[#EDEDED]' onClick={() => navigate("/exchange")}>
                <div className='flex justify-between items-center w-full'>
                  <span className='font-semibold text-[#1F3446]'>{t("back_to_exchange")}</span>
                  <IconApp code='t20' size={22} color='var(--gek-additional)' />
                </div>
              </DropdownCItem>
            </>
          )}
        </div>
      </DropdownC>

      <Modal
        isModalOpen={roomModal.isModalOpen}
        onCancel={roomModal.handleCancel}
        title={active ? t("invite_link") : t("exchange.open_private_exchange_room")}
      >
        {active ? (
          <InviteLink onClose={roomModal.handleCancel} roomInfo={active} />
        ) : (
          <CreateRoom
            to={to}
            from={from}
            onCancel={roomModal.handleCancel}
            onCurrenciesSwap={() => {
              const fromCurr = from.currency;
              const toCurr = to.currency;

              setTo({ ...to, currency: fromCurr });
              setFrom({ ...from, currency: toCurr });
            }}
            onRoomCreation={roomInfo => {
              addExchangeRoom(roomInfo);
              roomModal.handleCancel();
              navigate(`/private-room?roomId=${roomInfo.timetick}`);
            }}
            onToCurrencyChange={value => setTo({ ...to, currency: value })}
            onFromCurrencyChange={value => setFrom({ ...from, currency: value })}
          />
        )}
      </Modal>

      <Modal
        isModalOpen={roomCloseModal.isModalOpen}
        onCancel={roomCloseModal.handleCancel}
        title={t("close_current_room")}
      >
        <div className='pt-5 text-sm'>
          {active
            ? t("are_you_sure_close", {
                currency1: active?.currency1,
                currency2: active?.currency2
              })
            : t("are_you_sure_leave", {
                currency1: active?.currency1,
                currency2: active?.currency2
              })}
        </div>

        <div className='mt-16 sm:mt-14 flex justify-center'>
          <Button
            size='lg'
            className='w-full'
            onClick={() => {
              apiCloseRoom({
                roomId: active.timetick
              })
                .then(() => {
                  removeRoom(active.timetick);
                  roomCloseModal.handleCancel();
                  navigate("/exchange");
                })
                .catch(roomCloseModal.handleCancel);
            }}
          >
            {t("close_private_exchange_room")}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

const RoomItem = ({ room, isActive }: { room: RoomInfo; isActive: boolean }) => {
  const navigate = useNavigate();

  return (
    <DropdownCItem
      className={`w-full h-[42px] border-[1px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border-[var(--gek-light-grey)] rounded-[6px] min-w-[214px] py-2.5 px-2.5 ${
        isActive ? "bg-[var(--gek-light-grey)]" : "bg-white"
      }`}
      icon={
        <div className={styles.RoomsMenuItemIcon}>
          <IconApp color='red' code='t33' size={20} />
        </div>
      }
      onClick={() => navigate(`private-room?roomId=${room.timetick}`)}
    >
      <div className='flex flex-auto justify-between w-full'>
        <div className={styles.RoomsMenuItem}>
          <span className={styles.RoomsMenuItemTokens}>
            {room.currency1} - {room.currency2}
          </span>
          <span className={styles.RoomsMenuItemNumber}>{room.timetick}</span>
        </div>

        <div className={`${styles.RoomsMenuItemIcon} flex items-center gap-[1px]`}>
          <span>{room.count}</span>
          <IconApp code='t63' size={20} color='var(--gek-additional)' className='ml-[2px]' />
        </div>
      </div>
    </DropdownCItem>
  );
};
