import dayjs from "dayjs";
import { DatePicker, Switch } from "antd";
import Loader from "@/shared/ui/loader";
import styles from "./style.module.scss";
import { format, addDays } from "date-fns";
import Modal from "@/shared/ui/modal/Modal";
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
import SecondaryTabGroup from "@/shared/ui/tabs-group/secondary";
import { apiGetOrders, apiCancelOrder } from "@/shared/(orval)api/gek";
import {
  actionResSuccess,
  getSecondaryTabsAsRecord,
} from "@/shared/lib/helpers";
import useError from "@/shared/model/hooks/useError";
import { useBreakpoints } from "@/app/providers/BreakpointsProvider";

const { RangePicker } = DatePicker;

interface IParams {
  refreshKey?: string;
}

function OpenOrders({ refreshKey }: IParams) {
  const { t } = useTranslation();
  const { md } = useBreakpoints();
  const cancelOrderModal = useModal();
  const { account } = useContext(CtxRootData);
  const { roomInfo } = useContext(CtxExchangeData);
  const { currencies } = useContext(CtxCurrencies);
  const [lazyLoading, setLazyLoading] = useState(false);
  const [allOrdVisibly, setAllOrdVisibly] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [ordersList, setOrdersList] = useState<GetOrderListOut[]>([]);
  const [activeTab, setActiveTab] = useState<string>(ordersTabs[0].Key);
  const [selectedOrder, setSelectedOrder] = useState<GetOrderListOut>(null);
  const [localErrorHunter, , localErrorInfoBox, localErrorClear] = useError();
  const [customDate, setCustomDate] = useState<[dayjs.Dayjs, dayjs.Dayjs]>([
    dayjs(addDays(new Date(), -90)),
    dayjs(),
  ]);

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
            end: customDate[1].format("YYYY-MM-DD"),
            start: customDate[0].format("YYYY-MM-DD"),
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
            end: customDate[1].format("YYYY-MM-DD"),
            start: customDate[0].format("YYYY-MM-DD"),
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

  return (
    <>
      {!md ? (
        <>
          <div className="flex justify-between mb-2">
            <span className="font-medium lg:text-sm md:text-md">
              {t("exchange.orders")}
            </span>
          </div>

          <SecondaryTabGroup
            activeTab={activeTab}
            setActiveTab={(value) => setActiveTab(value)}
            tabs={getSecondaryTabsAsRecord(ordersTabs)}
          />
        </>
      ) : (
        <div className="flex gap-x-4 w-full justify-center">
          <span
            className={`text-[12px] font-semibold text-${
              activeTab === "Opened" ? "[#B9B9B5]" : "[#29354C]s"
            }`}
          >
            {t("exchange.closed_orders")}
          </span>
          <Switch
            defaultChecked={activeTab === ordersTabs[0].Key}
            onChange={(isCheked) =>
              setActiveTab(isCheked ? ordersTabs[0].Key : ordersTabs[1].Key)
            }
          />
          <span
            className={`text-[12px] font-semibold text-${
              activeTab === "Opened" ? "[#29354C]" : "[#B9B9B5]"
            }`}
          >
            {t("exchange.active_orders")}
          </span>
        </div>
      )}

      {activeTab === TabKey.CLOSED && (
        <div className="mt-2 mb-4">
          {t("enter_period")}

          <div className="flex grow-0 max-w-[400px]">
            <RangePicker
              className="mt-2 w-full"
              value={customDate}
              onChange={setCustomDate}
            />

            <Button
              className="ml-5"
              disabled={isLoading || !customDate}
              onClick={requestOrders}
            >
              {t("apply")}
            </Button>
          </div>
        </div>
      )}

      <div className="mt-1.5">
        {!isLoading ? null : <Loader className="relative mt-10 mb-10" />}

        {!(isLoading || ordersList.length) && (
          <div className="text-center mb-10 mt-3 text-gray-400">
            {t("exchange.no_opened_orders")}
          </div>
        )}

        {isLoading
          ? null
          : ordersList.map((ord: GetOrderListOut) => (
              <div
                key={ord.id}
                className={`py-2.5 rounded-md md:rounded-none ${styles.Item} ${
                  activeTab === TabKey.OPENED ? "" : "grayscale"
                }`}
              >
                <div className="flex justify-between">
                  <div className="flex gap-2">
                    <div className="bg-opacity-10 rounded-md">
                      <strong>
                        {currencyPrecision(ord.volume_source, ord.from)}
                      </strong>{" "}
                      {ord.from} &rarr;{" "}
                      <strong>
                        {ord.type_order === "Market" && "~"}
                        {currencyPrecision(ord.volume_dest, ord.to)}
                      </strong>{" "}
                      {ord.to}
                    </div>

                    <span className="text-gray-400">
                      {ord.state}{" "}
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
                  <div className="text-secondary">
                    {format(new Date(ord.time_created), "dd/MM/yyyy HH:mm")}
                  </div>
                </div>
                <div className="flex justify-between gap-0.5 mt-1.5">
                  <div className="flex gap-2.5 items-center">
                    <div className="text-secondary">{t("price")}: </div>
                    <div>
                      <span>
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
                    <button
                      className={styles.CancelOrderBtn}
                      onClick={() => {
                        setSelectedOrder(ord);
                        cancelOrderModal.showModal();
                      }}
                    >
                      {t("cancel")}
                    </button>
                  )}
                </div>
              </div>
            ))}

        {!isLoading && ordersList.length >= 10 && !allOrdVisibly && (
          <div className="row mt-3">
            <div className="col flex justify-center relative">
              {lazyLoading ? (
                <Loader className={"w-[24px] h-[24px] top-[4px]"} />
              ) : (
                <span
                  onClick={requestMoreOrders}
                  className="text-gray-400 cursor-pointer inline-flex items-center"
                >
                  {t("exchange.see_more")}{" "}
                  <img
                    className="ml-2"
                    width={10}
                    height={8}
                    src="/img/icon/ArrowPlainDown.svg"
                    alt="ArrowPlainDown"
                  />
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      <Modal
        width={450}
        title={t("exchange.cancel_order")}
        open={cancelOrderModal.isModalOpen}
        onCancel={cancelOrderModal.handleCancel}
        padding
      >
        <div className="text-sm mb-4"> {t("exchange.cancel_this_order")}</div>
        <div className="font-medium mb-2">
          {t("exchange.order_description")}
        </div>

        <OrderProperties order={selectedOrder} />

        <div className="mt-4">{localErrorInfoBox}</div>

        <div className="flex gap-4 mt-8 sm:mt-4">
          <Button size="xl" className="w-full" onClick={cancelOrder}>
            {t("exchange.cancel_order")}
          </Button>

          <Button
            variant='gray'
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
