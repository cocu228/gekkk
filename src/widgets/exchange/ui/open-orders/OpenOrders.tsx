import Loader from "@/shared/ui/loader";
import styles from "./style.module.scss";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import Button from "@/shared/ui/button/Button";
import { ordersTabs } from "../../model/heplers";
import Tooltip from "@/shared/ui/tooltip/Tooltip";
import { CtxRootData } from "@/processes/RootContext";
import { CtxExchangeData } from "../../model/context";
import useModal from "@/shared/model/hooks/useModal";
import { OrderState, TabKey } from "../../model/types";
import CopyIcon from "@/shared/ui/copy-icon/CopyIcon";
import { useContext, useEffect, useState } from "react";
import { CtxCurrencies } from "@/processes/CurrenciesContext";
import { GetOrderListOut } from "@/shared/(orval)api/gek/model";
import OrderProperties from "./order-properties/OrderProperties";
import { apiGetOrders, apiCancelOrder } from "@/shared/(orval)api/gek";
import {
  actionResSuccess,
} from "@/shared/lib/helpers";
import useError from "@/shared/model/hooks/useError";
import { useBreakpoints } from "@/app/providers/BreakpointsProvider";
import { IconApp } from "@/shared/ui/icons/icon-app";
import { Modal } from "@/shared/ui/modal/Modal";
import {Switch } from "@/shared/ui/Switch/index";
import { Datepicker } from "@/shared/ui/Datepicker/Datepicker";
import { formatForApi } from "@/shared/lib/date-helper";

interface IParams {
  refreshKey?: string;
}

function  OpenOrders({ refreshKey }: IParams) {
  const { t } = useTranslation();
  const cancelOrderModal = useModal();
  const { account } = useContext(CtxRootData);
  const { roomInfo } = useContext(CtxExchangeData);
  const { currencies } = useContext(CtxCurrencies);
  const [lazyLoading, setLazyLoading] = useState(false);
  const [allOrdVisibly, setAllOrdVisibly] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [customOrders, setCustomOrders] = useState<boolean>(false)
  const [ordersList, setOrdersList] = useState<GetOrderListOut[]>([]);
  const [activeTab, setActiveTab] = useState<string>(ordersTabs[0].Key);
  const [selectedOrder, setSelectedOrder] = useState<GetOrderListOut>(null);
  const [localErrorHunter, , localErrorInfoBox, localErrorClear] = useError();
  
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  useEffect(() => {
    setIsLoading(true);

    (async () => {
      await requestOrders();
    })();
  }, [activeTab, account, roomInfo?.timetick, refreshKey]);

  const currencyPrecision = (value: number, currency: string) =>
    Number(value.toFixed(currencies.get(currency)?.ordersPrec));

  const requestOrders = async () => {
    setIsLoading(true);
    setAllOrdVisibly(false);

    const response =
      activeTab === TabKey.OPENED
        ? await apiGetOrders({
          ord_states: [1],
          room_key: roomInfo?.timetick ?? null,
        })
        : await apiGetOrders({
          room_key: roomInfo?.timetick,
          end: formatForApi(endDate),
          start: formatForApi(startDate),
          ord_states: [127, 198, 199, 200, 210, 211],
        });

    actionResSuccess(response).success(() => {
      const { result } = response.data;
      setOrdersList(result);
    });

    setIsLoading(false);
  };

  const requestMoreOrders = async () => {
    setLazyLoading(true);
    const lastValue = ordersList[ordersList.length - 1];

    const { data } =
      activeTab === TabKey.OPENED
        ? await apiGetOrders({
          ord_states: [1],
          from_order_id: lastValue.id,
          room_key: roomInfo?.timetick ?? null,
        })
        : await apiGetOrders({
          from_order_id: lastValue.id,
          room_key: roomInfo?.timetick,
          end: formatForApi(endDate),
          start: formatForApi(startDate),
          ord_states: [127, 198, 199, 200, 210, 211],
        });

    if (data.result.length < 10) setAllOrdVisibly(true);

    setOrdersList((state) => [...state, ...data.result]);
    setLazyLoading(false);
  };

  const cancelOrder = async () => {
    localErrorClear();

    const { data } = await apiCancelOrder({
      id: selectedOrder.id,
    });

    if (data.error) {
      localErrorHunter(data.error);
      return;
    }

    cancelOrderModal.handleCancel();
    setOrdersList(ordersList.filter((o) => o.id !== selectedOrder.id));
  };

  useEffect(()=>{
    setStartDate(new Date())
    setEndDate(new Date())
  },[activeTab])


  return (
    <>
      <div className={styles.Switch}>
        <span
          className={`${styles.SwitchText} text-${activeTab === "Opened" ? "[var(--gek-dark-blue)]" : "[var(--gek-mid-grey)]"
            }`}
        >
          {t("exchange.active_orders")}
        </span>
        <Switch
          className={styles.SwitchWrap}
          defaultCheked={false}
          onChange={(isCheked) => {
            setActiveTab(isCheked ? ordersTabs[0].Key : ordersTabs[1].Key)
          }}
        />
        <span
          className={`${styles.SwitchText} text-${activeTab === "Opened" ? "[var(--gek-mid-grey)]" : "[var(--gek-dark-blue)]"
            }`}
        >
          {t("exchange.closed_orders")}
        </span>

        {activeTab === TabKey.CLOSED && 
          <button 
            className="absolute right-[5px]"
            onClick={()=>{setCustomOrders(n=>!n)}}
          >
            <IconApp size={15} code="t30" color="var(--gek-dark-blue)"/>
          </button>
        }
      </div>

      {activeTab === TabKey.CLOSED && customOrders && (
        <div className={styles.CustomDateContainer}>
          <span className={styles.CustomDateContainerEnter}>
            {t("enter_period")}
          </span>

          <div className={styles.CustomDateContainerSecondary}>
            <div className={styles.CustomDateContainerPickers}>
              <div className={styles.DatepickerWrap}>
                <Datepicker 
                  date={startDate}
                  setDate={setStartDate}
                  isTo={false}
                  border
                />
              </div>

              <div className="">-</div>

              <div className={styles.DatepickerWrap}>
                <Datepicker
                  border
                  date={endDate}
                  setDate={setEndDate}
                  isTo={true}
                />
              </div>
            </div>

            <div className={styles.CustomDateContainerButtons}>
              <Button
                className={styles.CustomDateContainerButton}
                color="blue"
                disabled={isLoading || !endDate || !startDate}
                onClick={requestOrders}
              >
                {t("apply")}
              </Button>
              <Button
                className={styles.CustomDateContainerButton}
                color="gray"
                disabled={isLoading || !endDate || !startDate}
                onClick={()=>{
                  setStartDate(new Date())
                  setEndDate(new Date())
                }}
              >
                {t("clean")}
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-1.5">
        {!isLoading ? null : <div className="min-h-[70px]">
          <Loader className="relative mt-10 mb-10" />
        </div>}

        {!(isLoading || ordersList.length) && (
          <div className={styles.NoOpen}>
            {t("exchange.no_opened_orders")}
          </div>
        )}

        {isLoading
          ? null
          : ordersList.map((ord: GetOrderListOut) => (
            <div key={ord.id}
              className={`${styles.Item} ${activeTab === TabKey.OPENED ? "" : "grayscale"}`}>
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <div className="bg-opacity-10 rounded-md flex items-center gap-[4px]">
                    <span className="font-bold">
                      {currencyPrecision(ord.volume_source, ord.from)}
                    </span>{" "}
                    <span className="font-normal text-[#29354C] text-[12px]">{ord.from}</span> &rarr;{" "}
                    <span className="font-bold">
                      {ord.type_order === "Market" && "~"}
                      {currencyPrecision(ord.volume_dest, ord.to)}
                    </span>{" "}
                    <span className="font-normal text-[#29354C] text-[12px]">{ord.to}</span>
                  </div>

                  <span className="text-[10px] text-[#9D9D9D] font-normal font-[Inter] leading-[16px]">
                    {t(ord.state.toLowerCase()).capitalize()}{" "}
                    {ord.state !== OrderState.FAILED ? null : (
                      <Tooltip
                        text={
                          <div>
                            {t(
                              "exchange.error_occurred_while_executing_order"
                            )}

                            <span className="flex items-center">
                              {t("exchange.order_id")} {ord.id}
                              <CopyIcon value={ord.id} />
                            </span>
                          </div>
                        }
                      >
                        <div className="inline-block relative align-middle w-[14px] pb-1 ml-1 cursor-help">
                          <img src="/img/icon/HelpIcon.svg" alt="tooltip" />
                        </div>
                      </Tooltip>
                    )}
                  </span>
                </div>
                <div className="text-[#B9B9B5] text-[10px] font-medium font-[Inter]">
                  {format(new Date(ord.time_created), "dd/MM/yyyy HH:mm")}
                </div>
              </div>
              <div className="flex justify-between gap-0.5 mt-1.5">
                <div className="flex gap-2.5 items-center">
                  <div className="text-[10px] text-[#9D9D9D] font-normal font-[Inter]">{t("price")}: </div>
                  <div>
                    <span className="text-[#7B797C] text-[10px] font-normal">
                      1 {ord.from} ~{" "}
                      {currencyPrecision(
                        ord.volume_dest / ord.volume_source,
                        ord.to
                      )}{" "}
                      {ord.to}
                    </span>
                    &nbsp;
                    {ord.type_order === "Market" && (
                      <span>(sale at current market rate)</span>
                    )}
                  </div>
                </div>

                {ord.state !== OrderState.OPENED ? null : (
                  <Button
                    skeleton
                    color="red"
                    className={styles.CancelOrderBtn}
                    onClick={() => {
                      setSelectedOrder(ord);
                      cancelOrderModal.showModal();
                    }}
                  >
                    {t("cancel")}
                  </Button>
                )}
              </div>
            </div>
          ))}

        {!isLoading && ordersList.length >= 10 && !allOrdVisibly && (
          <div className="row mt-3">
            <div className="col flex justify-center relative">
              {lazyLoading ? (
                <div className="min-h-[20px]">
                  <Loader className={"w-[24px] h-[24px] top-[4px]"} />
                </div>
              ) : (
                <span
                  onClick={requestMoreOrders}
                  className="text-gray-400 cursor-pointer inline-flex items-center"
                >
                  <div className={styles.SeeMore}>
                    {t("exchange.see_more")}{" "}
                    <IconApp size={12} code="t08" className="rotate-[90deg] ml-2" color="var(--gek-mid-grey)" />
                  </div>
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      <Modal
        title={t('exchange.cancel_order')}
        isModalOpen={cancelOrderModal.isModalOpen}
        onCancel={cancelOrderModal.handleCancel}
      >
        <div className="text-sm mb-4"> {t("exchange.cancel_this_order")}</div>
        <div className="font-medium mb-2">
          {t("exchange.order_description")}
        </div>

        <OrderProperties order={selectedOrder} />

        <div className="mt-4">{localErrorInfoBox}</div>

        <div className="flex gap-4 mt-8 sm:mt-4 h-[43px] justify-between">
          <Button className="w-full" onClick={cancelOrder}>
            {t("exchange.cancel_order")}
          </Button>

          <Button
            skeleton
            color='green'
            className="w-full"
            onClick={cancelOrderModal.handleCancel}
          >
            {t("cancel")}
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default OpenOrders;
