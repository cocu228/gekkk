import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { CtxWalletNetworks } from "@/widgets/wallet/transfer/model/context";
import Loader from "@/shared/ui/loader";
import { useQuery } from "@/shared/lib";
import { IconApp } from "@/shared/ui/icons/icon-app";
import { CtxDisplayHistory } from "@/pages/transfers/history-wrapper/model/CtxDisplayHistory";

const ChooseNetworkMobile = ({ network, setNetwork, loading }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const query = useQuery();
  const currency = query.get("currency");
  const { displayHistory } = useContext(CtxDisplayHistory);

  const { networksForSelector } = useContext(CtxWalletNetworks);

  useEffect(() => {
    if (!query.get("type")) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      setNetwork(null);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      setNetwork(+query.get("type"));
    }
  }, []);

  return (
    <div className='w-full relative h-[32px] flex flex-row'>
      <div
        className='row w-full relative cursor-pointer border-r-[0px] px-3 items-center overflow-hidden flex flex-row font-medium border-[1px] rounded-l-[5px] border-solid border-[color:var(--gek-light-grey)]'
        onClick={() => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          setNetwork(null);
          displayHistory(false);
          navigate(`/transfers?currency=${currency}`);
        }}
      >
        <div
          onClick={() => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            setNetwork(null);
          }}
          className='flex w-full text-[12px] text-[#3A5E66] h-full justify-start items-center'
        >
          {!networksForSelector?.length && !loading ? (
            <span className='inline-flex justify-center w-full text-[10px] text-[var(--gek-mid-grey)]'>
              {t("networks_not_found")}
            </span>
          ) : loading ? (
            <div className='flex items-center justify-center min-h-[100px] w-full relative'>
              <Loader className='w-[24px] h-[24px]' />
            </div>
          ) : !network ? (
            <span className='inline-flex justify-center w-full text-[10px] text-[var(--gek-mid-grey)]'>
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
  );
};

export default ChooseNetworkMobile;
