import { memo, useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getInitialProps, useTranslation } from "react-i18next";

import Loader from "@/shared/ui/loader";
import TopUpFormQR from "@/widgets/wallet/transfer/top-up/ui/forms/TopUpFormQR";
import ChoseNetwork from "@/widgets/wallet/transfer/ChoseNetwork";
import { CtxWalletNetworks } from "@/widgets/wallet/transfer/model/context";
import TopUpFormSepa from "@/widgets/wallet/transfer/top-up/ui/forms/TopUpFormSepa";
import { getChosenNetwork, isCryptoNetwork } from "@/widgets/wallet/transfer/model/helpers";
import { useBreakpoints } from "@/app/providers/BreakpointsProvider";
import { IconApp } from "@/shared/ui/icons/icon-app";

import ApplyTransferCode from "./forms/ApplyTransferCode";
import styles from "./style.module.scss";
import TransferTableCode from "../../components/transfer-code/table/TransferTableCode";
import CrossPlatformTopUp from "./forms/CrossPlatformTopUp";

const TopUp = memo(() => {
  const { t } = useTranslation();
  const { initialLanguage } = getInitialProps();
  const { md } = useBreakpoints();
  const [params] = useSearchParams();
  const currency = params.get("currency");
  const type = params.get("type");
  const navigate = useNavigate();
  const {
    loading = true,
    networkTypeSelect,
    tokenNetworks,
    networksForSelector,
    setNetworkType
  } = useContext(CtxWalletNetworks);
  const { is_operable = null, network_type: networkType } = getChosenNetwork(tokenNetworks, networkTypeSelect) ?? {};
  const [network, setNetwork] = useState<number>(type ? +type : null);

  const getDisplayForm = (networkType: number): JSX.Element => {
    if (isCryptoNetwork(networkType)) {
      return <TopUpFormQR />;
    }

    switch (networkType) {
      case 150:
        return (
          <div>
            <b className={styles.ToTransfersContainer}>
              <span className=''>{`${t("top_up_EURG")} `}</span>
              <span
                className={styles.ToTransfersLink}
                onClick={() => {
                  if (md) {
                    navigate(`/transfers?currency=EUR&type=154`);
                  } else {
                    navigate("/wallet?currency=EUR&tab=withdraw");
                  }
                }}
              >
                {t("link")}
              </span>
            </b>
          </div>
        );
      case 151:
        return <TopUpFormSepa />;
      case 154:
        return (
          <div>
            <b className={styles.ToTransfersContainer}>
              {t("top_up_EUR_via_crypto")}
              <a
                className={styles.ToTransfersLink}
                onClick={() => {
                  if (md) {
                    navigate(`/transfers?currency=EURG&type=150`);
                  } else {
                    navigate("/wallet?currency=EURG&tab=withdraw");
                  }
                }}
                href='javascript:void(0)'
              >
                {t("link")}
              </a>
            </b>
          </div>
        );
      case 231:
        return <ApplyTransferCode />;
      case 232:
      case 233:
      case 234:
        return <CrossPlatformTopUp />;

      default:
        return <div className={styles.NoActions}>{t("no_actions_for_network")}</div>;
    }
  };
  const [displayedForm, setDisplayedForm] = useState(getDisplayForm(networkTypeSelect));

  useEffect(() => {
    setDisplayedForm(getDisplayForm(networkTypeSelect));
  }, [initialLanguage, networkTypeSelect]);

  useEffect(() => {
    md && setNetworkType(network);
  }, [networkTypeSelect]);

  useEffect(() => {
    !type && setNetwork(null);
  }, [type]);

  return (
    <div className={styles.TopUpMainContainer}>
      {loading ? (
        <Loader />
      ) : (
        <div className='w-full'>
          <div className={styles.TopUpContainer}>
            <ChoseNetwork network={network} setNetwork={setNetwork} />

            {md && network && displayedForm && (
              <div className={styles.TopUpMobileForm}>
                {is_operable === false && (
                  <div className={styles.TopUpAttentionMobile}>
                    <div className={styles.TopUpAttentionMobileContainer}>
                      <div className={styles.TopUpAttentionMobileContainerIcon}>
                        <IconApp code='t27' size={15} color='var(--gek-red)' />
                      </div>
                      <p>{t("attention")}</p>
                    </div>
                  </div>
                )}
                {displayedForm}
              </div>
            )}
          </div>
          {md && networkType === 231 && +type === 231 && (
            <div className={styles.TransferTableContainer}>
              <TransferTableCode />
            </div>
          )}

          {!md && displayedForm}

          {md && (
            <div className={`mt-5 h-[440px]`}>
              {!network && networksForSelector?.length > 0 && (
                <span className={styles.TextSelectTitle}>{t("select_top_up_type")}</span>
              )}
              {!network &&
                networksForSelector?.map(network => (
                  <div
                    key={network.label}
                    className={styles.TopUpNetworkContainer}
                    onClick={() => {
                      setNetworkType(network.value);
                      setNetwork(network.value);
                      navigate(`/wallet?currency=${currency}&tab=top_up&type=${network.value}`);
                    }}
                  >
                    <span className={styles.TopUpNetworkContainerTitle}>{network.label}</span>
                  </div>
                ))}
            </div>
          )}

          {!md && is_operable === false && (
            <div className='row mb-4 mt-4'>
              <div className='col'>
                <div className='info-box-danger'>
                  <p>{t("attention")}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
});

export default TopUp;
