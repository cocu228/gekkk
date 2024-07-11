import { Dispatch, SetStateAction, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import InfoBox from "@/widgets/info-box";
import { CurrencyFlags } from "@/shared/config/mask-currency-flags";
import { CtxWalletData, CtxWalletNetworks } from "@/widgets/wallet/transfer/model/context";
import { CtxCurrencies } from "@/processes/CurrenciesContext";
import { isCryptoNetwork } from "@/widgets/wallet/transfer/model/helpers";
import { useBreakpoints } from "@/app/providers/BreakpointsProvider";
import { IconApp } from "@/shared/ui/icons/icon-app";
import { Select } from "@/shared/ui/oldVersions/Select";
import constants from "@/shared/config/coins/constants";

import styles from "./style.module.scss";

interface IProps {
  withdraw?: boolean;
  network?: number;
  setNetwork?: Dispatch<SetStateAction<number>>;
}

const ChoseNetwork = ({ withdraw = false, network, setNetwork }: IProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { $const } = useContext(CtxWalletData);
  const { md } = useBreakpoints();
  const { currencies } = useContext(CtxCurrencies);

  const { setNetworkType, networksForSelector, networkTypeSelect } = useContext(CtxWalletNetworks);
  const noteVisible =
    !withdraw &&
    !(Array.isArray(networksForSelector) && networksForSelector.length === 0) &&
    $const !== constants.EURG &&
    isCryptoNetwork(networkTypeSelect);
  // TODO: Refactoring for networks.length == 1
  return (
    <div>
      <div className={styles.Container}>
        {Array.isArray(networksForSelector) && networksForSelector.length < 2 ? null : md ? (
          <div className={styles.TypeTitle}>
            <span>{t("type")}:</span>
          </div>
        ) : withdraw ? (
          <span className='ml-[10px] mb-[5px] block'>{`${t("select_withdraw_network")}:`}</span>
        ) : (
          <span className='ml-[10px] mb-[5px] block'>{`${t("select_network")}:`}</span>
        )}

        <div className='col w-full md:overflow-hidden overflow-visible'>
          {Array.isArray(networksForSelector) && networksForSelector.length === 0 ? (
            md ? (
              <div className={styles.NoOptions}>
                <div className={styles.Icon}>
                  <IconApp code='t27' color='var(--gek-orange)' size={15} />
                </div>
                <span className={styles.NoOptionsText}>
                  {t("not_a_single_option_aviable", { do: withdraw ? t("to_withdraw") : t("top_up") })}
                  {!currencies?.get($const).flags[CurrencyFlags.ExchangeAvailable] ? null : (
                    <span>
                      {" "}
                      {`${t("or_create")} `}
                      <span
                        className='text-[var(--gek-green)] hover:cursor-pointer underline'
                        onClick={() => navigate(`/exchange?${withdraw ? "from" : "to"}=${$const}`)}
                      >
                        {withdraw ? t("sell").toLowerCase() : t("buy").toLowerCase()} {t("order")}
                      </span>
                      .
                    </span>
                  )}
                </span>
              </div>
            ) : (
              <InfoBox
                icon={
                  <div className='flex justify-center w-full'>
                    <IconApp code='t27' color='var(--gek-orange)' size={25} />
                  </div>
                }
                message={
                  <span>
                    {t("not_a_single_option_aviable", { do: withdraw ? t("to_withdraw") : t("top_up") })}
                    {!currencies?.get($const).flags[CurrencyFlags.ExchangeAvailable] ? null : (
                      <span>
                        {" "}
                        {`${t("or_create")} `}
                        <span
                          className='text-blue-400 hover:cursor-pointer hover:underline'
                          onClick={() => navigate(`/exchange?${withdraw ? "from" : "to"}=${$const}`)}
                        >
                          {withdraw ? t("sell").toLowerCase() : t("buy").toLowerCase()} {t("order")}
                        </span>
                        .
                      </span>
                    )}
                  </span>
                }
              />
            )
          ) : Array.isArray(networksForSelector) && md ? (
            <div className='w-full relative h-[32px] flex flex-row'>
              <div
                className='row w-full relative cursor-pointer border-r-[0px] px-3 items-center overflow-hidden flex flex-row font-medium border-[1px] rounded-l-[5px] border-solid border-[color:var(--gek-light-grey)]'
                onClick={() => {
                  setNetwork(null);
                  navigate(`/wallet?currency=${$const}&tab=top_up`);
                }}
              >
                <div
                  onClick={() => {
                    setNetwork(null);
                  }}
                  className='flex w-full text-[12px] text-[#3A5E66] h-full justify-start items-center'
                >
                  {!network ? (
                    <span className={"inline-flex justify-center w-full text-[10px] text-[#B9B9B5]"}>
                      -{t("select")}-
                    </span>
                  ) : (
                    <span className='text-[12px] text-[#3A5E66] text-nowrap overflow-ellipsis overflow-hidden'>
                      {[...networksForSelector].filter(el => el.value === network)[0]?.label}
                    </span>
                  )}
                </div>
              </div>
              <div className='rounded-r-[5px] h-full min-w-[22px] flex justify-center items-center bg-[#3A5E66]'>
                <IconApp code='t08' color='#fff' size={12} className={"rotate-90"} />
              </div>
            </div>
          ) : (
            <Select
              placeholder={"Networks not found"}
              value={
                networkTypeSelect
                  ? networksForSelector?.filter(item => item.value === networkTypeSelect)[0]?.label
                  : 151
              }
              typeChange={setNetworkType}
              options={networksForSelector}
            />
          )}
        </div>
      </div>

      {!md && noteVisible && (
        <div className='row mb-10'>
          <div className='col'>
            <div className='info-box-note mb-10'>
              <div className='row mb-3'>
                <div className='col'>
                  <span className='text-red-800'>{t("please_note")}</span>
                </div>
              </div>
              <div className='row mb-1'>
                <div className='col'>
                  <span className='text-gray-400 font-medium text-fs14 leading-6'>
                    {t("you_should_send_only")} <b>{$const}</b> {t("you_should_send_only_2")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChoseNetwork;
