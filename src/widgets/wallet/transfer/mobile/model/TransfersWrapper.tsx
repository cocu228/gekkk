import { ChangeEvent, Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { CtxCurrencies, ICtxCurrency } from "@/processes/CurrenciesContext";
import { IconCoin } from "@/shared/ui/icons/icon-coin";
import { getRoundingValue } from "@/shared/lib";
import Loader from "@/shared/ui/loader";
import { IconApp } from "@/shared/ui/icons/icon-app";

import { CtxWalletNetworks } from "../../model/context";

type IProps = {
  children: JSX.Element[] | [JSX.Element];
  curr: string;
  setCurr: Dispatch<SetStateAction<string>>;
  network: number;
  setNetwork: Dispatch<SetStateAction<number>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

export default function TransfersWrapper({
  children,
  curr,
  setCurr,
  network,
  setNetwork,
  loading,
  setLoading
}: IProps) {
  const {
    networkTypeSelect,
    networksForSelector,
    setNetworkType,
    loading: networkLoading
  } = useContext(CtxWalletNetworks);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState<string>("");
  const { currencies } = useContext(CtxCurrencies);

  const currenciesList =
    currencies && !![...currencies].find(el => el[0] === "EUR")[1].balance
      ? [...currencies]
          .sort((x, y) => (x[0] == "EUR" ? -1 : y[0] == "EUR" ? 1 : 0))
          ?.map(el => ({
            $const: el[0],
            currency: el[1]
          }))
      : [];

  function returnTitle(tag) {
    if (tag === "select_currency") {
      return `${t("currency")}:`;
    } else if (tag === "choose_network") {
      return `${t("type")}:`;
    }
  }

  function returnText(tag) {
    if (tag === "select_currency" && !curr) {
      return t("select_the_currency");
    } else if (tag === "select_currency" && curr) {
      return "";
    } else if (tag === "choose_network" && !network && !!networksForSelector?.length && !loading && !networkLoading) {
      return t("select_transfer_type");
    } else if (tag === "choose_network" && network) {
      return "";
    }
  }
  function searchTokenFilter(currency: ICtxCurrency, searchValue: string) {
    return (
      (currency.$const?.toLowerCase().includes(searchValue) || currency.name?.toLowerCase().includes(searchValue)) &&
      currency.balance?.free_balance
    );
  }

  const setValueSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value.trim().toLowerCase());
  };

  useEffect(() => {
    setNetworkType(network);
  }, [networkTypeSelect]);

  useEffect(() => {
    if (!networkLoading && networksForSelector) {
      setLoading(false);
    } else if (!networkLoading && !networksForSelector) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [networkLoading, networksForSelector]);

  return (
    <>
      {children.map((child, index) => {
        if (child?.props["data-tag"] !== "main" && child) {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index} className='flex flex-col items-center justify-center'>
              <div className='flex h-[54px] w-full items-center flex-row justify-start mb-[10px] rounded-[8px] bg-[white]'>
                <span className='ml-[20px] min-w-[80px] text-[12px] text-[#1F3446] font-bold text-start'>
                  {returnTitle(child?.props["data-tag"])}
                </span>
                <div className='flex w-full overflow-hidden mr-[10px] justify-center items-center'>{child}</div>
              </div>
              {returnText(child?.props["data-tag"]) && (
                <span className='w-full flex flex-col self-start text-[12px] text-[#1F3446] font-bold items-start mt-1 mb-4'>
                  {returnText(child?.props["data-tag"])}
                </span>
              )}
              {!curr && (
                <div className='min-h-[200px]  gap-5 w-full'>
                  <div className='bg-[white] h-[40px] items-center border-solid w-full flex gap-[9px] px-[18px] py-2.5 rounded-lg'>
                    <IconApp size={20} code='t12' color='#000' />
                    <input
                      className={`w-full text-[10px] border-[none] bg-inherit outline-none`}
                      type='text'
                      ref={inputRef}
                      data-testid='SearchName'
                      placeholder={t("crypto_assets.search_currency")}
                      onChange={setValueSearch}
                    />
                  </div>
                  {currenciesList.length > 0 ? (
                    currenciesList
                      ?.filter(curr => searchTokenFilter(curr.currency, searchValue))
                      ?.map(currency => (
                        <div
                          key={currency.$const}
                          className='w-full flex justify-between min-h-[60px] mt-2 bg-[white] rounded-lg cursor-pointer'
                          onClick={() => {
                            setCurr(currency.$const);
                            setLoading(true);
                            navigate(`/transfers?currency=${currency.$const}`);
                          }}
                        >
                          <div className='ml-2 flex flex-row p-2 gap-5 justify-center items-center '>
                            <IconCoin height={40} code={currency.$const} />
                            <span className='text-[12px] h-full flex items-center text-[#1F3446] font-bold'>
                              {currency.$const === "EUR" ? (
                                currency.$const
                              ) : (
                                <div className='flex h-full flex-col justify-around'>
                                  <span>{currency.$const}</span>
                                  <span className='font-[400] whitespace-nowrap text-[#676767]'>
                                    {currency.currency.name}
                                  </span>
                                </div>
                              )}
                            </span>
                          </div>
                          <div className='mr-2 flex flex-col justify-evenly p-2 min-w-[150px]'>
                            <span className='self-start ml-[15%] text-[12px] text-[var(--gek-dark-grey)] font-regular'>
                              {t("free_balance")}:
                            </span>
                            <span className='self-end text-[12px] text-[#1F3446] font-regular'>
                              {getRoundingValue(currency.currency.balance?.free_balance, currency.currency.roundPrec)}{" "}
                              {currency.$const}
                            </span>
                          </div>
                        </div>
                      ))
                  ) : (
                    <div className='min-h-[100px] flex justify-center w-full relative'>
                      <Loader />
                    </div>
                  )}
                </div>
              )}
              {!!(
                !network &&
                child?.props["data-tag"] === "choose_network" &&
                curr &&
                networksForSelector?.length &&
                !loading &&
                !networkLoading
              ) ? (
                <div className='min-h-[200px] gap-5 w-full'>
                  {networksForSelector?.map(network => (
                    <div
                      key={network.label}
                      className='w-full flex justify-between items-center min-h-[60px] first:mt-0 mt-2 overflow-hidden px-5 bg-[white] rounded-lg cursor-pointer'
                      onClick={() => {
                        setNetworkType(network.value);
                        setNetwork(network.value);
                        navigate(`/transfers?currency=${curr}&type=${network.value}`);
                      }}
                    >
                      <span className='text-[12px] text-[#1F3446] font-bold overflow-hidden overflow-ellipsis'>
                        {network.label}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (loading || networkLoading) && !network && child?.props["data-tag"] === "choose_network" ? (
                <div className='min-h-[100px] flex justify-center w-full relative'>
                  <Loader />
                </div>
              ) : null}
            </div>
          );
        } else {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index} className='flex justify-center w-full'>
              {child}
            </div>
          );
        }
      })}
    </>
  );
}
