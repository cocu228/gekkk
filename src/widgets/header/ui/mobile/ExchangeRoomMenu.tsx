import styles from "./style.module.scss";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Dropdown from "@/shared/ui/dropdown/Dropdown";
import DropdownItem from "@/shared/ui/dropdown/dropdown-item/DropdownItem";
import { storeListExchangeRooms } from "@/shared/store/exchange-rooms/exchangeRooms";
import { useNavigate } from "react-router-dom";
import { RoomInfo } from "@/shared/(orval)api/gek/model";
import Modal from "@/shared/ui/modal/Modal";
import InviteLink from "@/shared/ui/invite-link/InviteLink";
import Button from "@/shared/ui/button/Button";
import { apiCloseRoom } from "@/shared/(orval)api";
import useModal from "@/shared/model/hooks/useModal";
import CreateRoom from "@/shared/ui/create-room/CreateRoom";
import { IExchangeField } from "@/widgets/exchange/model/types";
import { IconApp } from "@/shared/ui/icons/icon-app";
import ModalTitle from "@/shared/ui/modal/modal-title/ModalTitle";

export const ExchangeRoomMenu = ({ roomId }: { roomId: string }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const roomModal = useModal();
  const roomCloseModal = useModal();
  const [to, setTo] = useState<IExchangeField>({
    amount: null,
    currency: null,
  });
  const [from, setFrom] = useState<IExchangeField>({
    amount: null,
    currency: null,
  });
  const [active, setActive] = useState<RoomInfo>(null);
  const {
    roomsList,
    removeRoom,
    addRoom: addExchangeRoom,
  } = storeListExchangeRooms((state) => state);

  useEffect(() => {
    if (roomsList) {
      setActive(roomsList.find((r) => r.timetick === +roomId));
    }
  }, [roomsList, roomId]);

  return !roomsList ? null : (
    <div>
      <Dropdown
        className={"min-w-[214px] flex justify-end bg-transparent"}
        trigger={
          <div className="flex gap-2 items-center">
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
            <button className={styles.ArrowBtn}></button>
          </div>
        }
        items={[
          ...roomsList.map((r) => ({
            key: r.timetick,
            label: (
              <RoomItem room={r} isActive={r.timetick === active?.timetick} />
            ),
          })),
          ...(!active
            ? [
                {
                  key: "new-room",
                  label: (
                    <DropdownItem
                      className="w-full bg-[var(--gek-light-grey)]"
                      onClick={roomModal.showModal}
                    >
                      <div className="flex justify-between items-center w-full">
                        <span className="font-semibold text-[#1F3446]">
                          {t("exchange.new_room")}
                        </span>
                        <IconApp size={22} color="#285E69" code="t35" />
                      </div>
                    </DropdownItem>
                  ),
                },
              ]
            : [
                {
                  key: "invite-link",
                  label: (
                    <DropdownItem
                      className="w-full bg-[var(--gek-light-grey)]"
                      onClick={roomModal.showModal}
                    >
                      <div className="flex justify-between items-center w-full">
                        <span className="font-semibold text-[#1F3446]">
                          {t("invite_link")}
                        </span>
                        <IconApp size={22} color="#285E69" code='t34' />
                      </div>
                    </DropdownItem>
                  ),
                },
                {
                  key: "close-room",
                  label: (
                    <DropdownItem
                      className="w-full border-b-1 border-[var(--gek-additional)] bg-[var(--gek-light-grey)]"
                      onClick={roomCloseModal.showModal}
                    >
                      <div className="flex justify-between items-center w-full">
                        <span className="font-semibold text-[var(--gek-red)]">
                          {t("close_current_room")}
                        </span>
                        <div className={styles.CloseWrap}>
                          <IconApp size={20} color="#8F123A" code="t69" />
                        </div>
                      </div>
                    </DropdownItem>
                  ),
                },
                {
                  key: "back",
                  label: (
                    <DropdownItem
                      className="w-full bg-[var(--gek-light-grey)]"
                      onClick={() => navigate("/exchange")}
                    >
                      <div className="flex justify-between items-center w-full">
                        <span className="font-semibold text-[#1F3446]">
                          {t("back_to_exchange")}
                        </span>

                        <IconApp code='t20' size={22} color="#285E69" />
                      </div>
                    </DropdownItem>
                  ),
                },
              ]),
        ]}
      />

      <Modal
        width={450}
        //className={styles.RoomModal}
        open={roomModal.isModalOpen}
        onCancel={roomModal.handleCancel}
        closable={false}
        title={<ModalTitle handleCancel={roomModal.handleCancel} title={
          active ? t("invite_link") : t("exchange.open_private_exchange_room")
        }/>}

      >
        {active ? (
          <InviteLink onClose={roomModal.handleCancel} roomInfo={active} />
        ) : (
          <CreateRoom
            to={to}
            from={from}
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
            onCancel={roomModal.handleCancel}
          />
        )}
      </Modal>

      <Modal
        width={450}
        open={roomCloseModal.isModalOpen}
        onCancel={roomCloseModal.handleCancel}
        closable={false}
        title={<ModalTitle handleCancel={roomCloseModal.handleCancel} title={t("invite_link")}/>}
        padding
      >
        <div className="pt-5 text-sm">
          {active
            ? t("are_you_sure_close", {
                currency1: active?.currency1,
                currency2: active?.currency2,
              })
            : t("are_you_sure_leave", {
                currency1: active?.currency1,
                currency2: active?.currency2,
              })}
        </div>

        <div className="mt-16 sm:mt-14 flex justify-center">
          <Button
            size="lg"
            className="w-full"
            onClick={() => {
              apiCloseRoom({
                roomId: active.timetick,
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

const RoomItem = ({
  room,
  isActive,
}: {
  room: RoomInfo;
  isActive: boolean;
}) => {
  const navigate = useNavigate();

  return (
    <DropdownItem
      className={`w-full py-2.5 px-2.5 ${isActive ? "bg-[var(--gek-light-grey)]" : ""}`}
      icon={
        <div className={styles.RoomsMenuItemIcon}>
          <IconApp color="red" code="t33" size={20} />
        </div>
      }
      onClick={() => navigate(`private-room?roomId=${room.timetick}`)}
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
          <IconApp code="t63" size={20} color="#285e69" className="ml-[2px]" />
        </div>
      </div>
    </DropdownItem>
  );
};
