import styles from "./style.module.scss";
import { FC, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {Dropdown as DropdownC} from '@/shared/ui/!dropdown'
import { storeListExchangeRooms } from "@/shared/store/exchange-rooms/exchangeRooms";
import { useLocation, useNavigate } from "react-router-dom";
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
import { CtxExchangeData } from "@/widgets/exchange/model/context";
import RoomProperties from "@/widgets/exchange/ui/room-properties/RoomProperties";
import useError from "@/shared/model/hooks/useError";

type roomType = {
  isModalOpen: boolean;
  showModal: () => void;
  handleCancel: () => void;
}

interface ExchangeRoomMenuProps {
  roomId: string;
  desktop?:boolean;
  roomModal?: roomType;
  roomCloseModal?: roomType
}

export const ExchangeRoomMenu:FC<ExchangeRoomMenuProps> = ({ roomId, desktop, roomCloseModal }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const roomModal = useModal();
  const location = useLocation()
  const [to, setTo] = useState<IExchangeField>({
    amount: null,
    currency: null,
  });
  const [from, setFrom] = useState<IExchangeField>({
    amount: null,
    currency: null,
  });
  const [active, setActive] = useState<RoomInfo>(null);
  const [localErrorHunter, , localErrorInfoBox, localErrorClear] = useError();
  const {
    roomsList,
    addRoom: addExchangeRoom,
    removeRoom: closeExchangeRoom
  } = storeListExchangeRooms((state) => state);
  const {
    roomType,
    roomInfo,
  } = useContext(CtxExchangeData);

  const closeRoom = async () => {
    localErrorClear();

    const { data } = await apiCloseRoom({
      roomId: roomInfo.timetick,
    });

    if (data.error) {
      localErrorHunter(data.error);
      return;
    }

    closeExchangeRoom(roomInfo.timetick);
    roomCloseModal.handleCancel();
    navigate("/exchange");
  };
  useEffect(() => {
    if (roomsList) {
      setActive(roomsList.find((r) => r.timetick === +roomId));
    }
  }, [roomsList, roomId]);

  return !roomsList ? null : (
    <div>
      <DropdownC
        desktop={desktop}
        position={window.innerWidth < 768 ? 'right' : 'left'}
        customBodyClassName={styles.DropdownBody}
        trigger={
          <div className="flex gap-2 items-center">
            {
              desktop ? (
                <>
                  <span className={`${styles.HeaderTitle} ${location.pathname === '/private-room' && desktop && styles.HeaderTitleActive}`}>{t("exchange.rooms")}</span>
                  <IconApp className="rotate-[-270deg] duration-150" size={13} code="t08" color={location.pathname === '/private-room' && desktop ? '#285E69' : "#fff"} />
                </>
              ) : (
                <>
                  {!active ? (
                    <>
                      <span className={styles.HeaderTitle}>{t("exchange.rooms")}</span>
                      <IconApp className="rotate-[-270deg]" size={13} code="t08" color="#fff" />
                    </>
                    ) : (
                      <div className={styles.RoomsMenuItem}>
                        <span className={`${styles.RoomsMenuItemTokens} text-white`}>
                          {active.currency1} - {active.currency2}
                        </span>
                        <span className={`${styles.RoomsMenuItemNumber} text-white`}>
                          {active.timetick}
                        </span>
                      </div>
                    )}
                </>
              )
            }
          </div>
        }
      >
        {
          roomsList.map((r, i) => (
            <RoomItem key={i} room={r} isActive={r.timetick === active?.timetick} />
          ))
        }
        <div className={styles.LastButtons}>
          {
            !desktop ? (
              <>
                {
                  !active ? (
                    <DropdownCItem
                      className="w-full min-w-[214px] bg-[var(--gek-light-grey)]"
                      onClick={roomModal?.showModal}
                    >
                      <div className="flex justify-between items-center w-full">
                        <span className="font-semibold text-[#1F3446]">
                          {t("exchange.new_room")}
                        </span>
                        <IconApp size={22} color="var(--gek-additional)" code="t35" />
                      </div>
                    </DropdownCItem>
                  ) : (
                    <>
                      <DropdownCItem
                        className="w-full min-w-[214px] bg-[#EDEDED]"
                        onClick={roomModal?.showModal}
                      >
                        <div className="flex justify-between items-center w-full">
                          <span className="font-semibold text-[#1F3446]">
                            {t("invite_link")}
                          </span>
                          <IconApp size={22} color="var(--gek-additional)" code='t34' />
                        </div>
                      </DropdownCItem>
                      <DropdownCItem
                        className="w-full min-w-[214px] border-b-1 border-[var(--gek-additional)] bg-[#EDEDED]"
                        onClick={roomCloseModal?.showModal}
                      >
                        <div className="flex justify-between items-center w-full">
                          <span className="font-semibold text-[var(--gek-red)]">
                            {t("close_current_room")}
                          </span>
                          <div className={styles.CloseWrap}>
                            <IconApp size={20} color="var(--gek-red)" code="t69" />
                          </div>
                        </div>
                      </DropdownCItem>
                      <DropdownCItem
                        className="w-full min-w-[214px] bg-[#EDEDED]"
                        onClick={() => navigate("/exchange")}
                      >
                        <div className="flex justify-between items-center w-full">
                          <span className="font-semibold text-[#1F3446]">
                            {t("back_to_exchange")}
                          </span>
                          <IconApp code='t20' size={22} color="var(--gek-additional)" />
                        </div>
                      </DropdownCItem>
                    </>
                  )
                }
              </>
            ) : (
              <DropdownCItem
                      className="w-full min-w-[214px] bg-[var(--gek-light-grey)]"
                      onClick={roomModal?.showModal}
                    >
                      <div className="flex justify-between items-center w-full">
                        <span className="font-semibold text-[#1F3446]">
                          {t("exchange.new_room")}
                        </span>
                        <IconApp size={22} color="var(--gek-additional)" code="t35" />
                      </div>
                    </DropdownCItem>
                    
            )
          }
        </div>
      </DropdownC>

      <Modal
        isModalOpen={roomModal.isModalOpen}
        onCancel={roomModal.handleCancel}
        title={
          active ? t("invite_link") : t("exchange.open_private_exchange_room")
        }
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
            onRoomCreation={(roomInfo) => {
              addExchangeRoom(roomInfo);
              roomModal.handleCancel();
              navigate(`/private-room?roomId=${roomInfo.timetick}`);
            }}
            onToCurrencyChange={(value) => setTo({ ...to, currency: value })}
            onFromCurrencyChange={(value) => setFrom({ ...from, currency: value })}
          />
        )}
      </Modal>

      <Modal
        title={`${roomType === "creator" ? t("exchange.close") : t("exchange.leave")
      } ${t("exchange.private_exchange_room")}`}
        isModalOpen={roomCloseModal.isModalOpen}
        onCancel={roomCloseModal.handleCancel}
      >
        <div className="text-sm">
          {t("exchange.are_you_sure")}{" "}
          {roomType === "creator"
            ? t("exchange.close_private_exchange")
            : t("exchange.leave_private_exchange")}
          {t("exchange.unclosed_orders")}.
        </div>

        {roomType !== "creator" ? null : (
          <>
            <div className="mt-4 mb-2 font-medium">
              {t("exchange.room_description")}:
            </div>
            <RoomProperties room={roomInfo} />
          </>
        )}

        <div className="mt-4">{localErrorInfoBox}</div>

        <div className="mt-8 sm:mt-4 flex justify-center">
          <Button size="lg" className="w-full" onClick={closeRoom}>{`${roomType === "creator" ? t("exchange.close") : t("exchange.leave")
            } ${t("exchange.private_exchange_room")}`}</Button>
        </div>
      </Modal>
    </div>
  );
};

const RoomItem = ({
  room,
  isActive,
}: {
  room: RoomInfo;
  isActive: boolean;
}) => {
  const navigate = useNavigate();

  return (
    <DropdownCItem
      className={`w-full h-[42px] border-[1px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border-[var(--gek-light-grey)] rounded-[6px] min-w-[214px] py-2.5 px-2.5 ${isActive ? "bg-[var(--gek-light-grey)]" : "bg-white"}`}
      icon={
        <div className={styles.RoomsMenuItemIcon}>
          <IconApp color="red" code="t33" size={20} />
        </div>
      }
      onClick={() => navigate(`/private-room?roomId=${room.timetick}`)}
    >
      <div className="flex flex-auto justify-between w-full">
        <div className={styles.RoomsMenuItem}>
          <span className={styles.RoomsMenuItemTokens}>
            {room.currency1} - {room.currency2}
          </span>
          <span className={styles.RoomsMenuItemNumber}>{room.timetick}</span>
        </div>

        <div
          className={`${styles.RoomsMenuItemIcon} flex items-center gap-[1px]`}
        >
          <span>{room.count}</span>
          <IconApp code="t63" size={20} color="var(--gek-additional)" className="ml-[2px]" />
        </div>
      </div>
    </DropdownCItem>
  );
};
