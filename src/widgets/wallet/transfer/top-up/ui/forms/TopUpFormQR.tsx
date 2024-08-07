import { useContext } from "react";
import { useTranslation } from "react-i18next";

import { apiCreateAddress } from "@/shared/(orval)api/gek";
import { actionResSuccess } from "@/shared/lib/helpers";
import Button from "@/shared/ui/button/Button";
import { CtxWalletNetworks, CtxWalletData } from "@/widgets/wallet/transfer/model/context";
import useError from "@/shared/model/hooks/useError";
import { IconApp } from "@/shared/ui/icons/icon-app";
import ReactQRCode from "react-qr-code";
import ClipboardField from "@/shared/ui/clipboard-field/ClipboardField";

import { getChosenNetwork } from "../../../model/helpers";
import styles from "./style.module.scss";
import { useBreakpoints } from "@/app/providers/BreakpointsProvider";
import CopyIcon from "@/shared/ui/copy-icon/CopyIcon";

const TopUpFormQR = () => {
  const { $const, name } = useContext(CtxWalletData);
  const [localErrorHunter, , localErrorInfoBox] = useError();
  const { t } = useTranslation();
  const { setRefresh, setLoading, tokenNetworks, addressesForQR, networkTypeSelect } = useContext(CtxWalletNetworks);
  const { md } = useBreakpoints();

  const onCreateAddress = async () => {
    setLoading(true);

    const response = await apiCreateAddress({
      token_network: getChosenNetwork(tokenNetworks, networkTypeSelect).id
    });

    actionResSuccess(response)
      .success(() => setRefresh())
      .reject(localErrorHunter);
  };

  return (
    !!addressesForQR ? (
      <>
        <div className={styles.QRContainer}>
          <h3 className={styles.QRSendText}>
            {t("send_to_this")}{" "}
            <b>
              {$const} {name}
            </b>{" "}
            {t("address_small")}
          </h3>

          <div className={styles.QRWrapper}>
            <div className={styles.QRWrapperSecond}>
              <ReactQRCode className={styles.QRWrapperThird} value={addressesForQR} viewBox={`0 0 148 148`} />
            </div>
          </div>
          {!md ? (
            <div className={styles.QRFieldDesktop}>
              <ClipboardField value={addressesForQR} />
            </div>
          ) : (
            <div className={styles.QRFieldMobile}>
              <div className='col'>
                <div className={styles.QRFieldMobileWrapper}>
                  <div className={styles.QRFieldMobileWrapperSecond}>
                    <span className={styles.QRFieldMobileValue}>{addressesForQR}</span>
                    <CopyIcon value={addressesForQR} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    ) : (
      <>
      <div className={styles.GenerateQR}>
        <div className={styles.GenerateQRAttention}>
          <div className={styles.GenerateQRAttentionIcon}>
            <IconApp code='t27' size={15} color='var(--gek-red)' />
          </div>
          <span className={styles.GenerateQRAttentionText}>
            {t("you_should_send_only")} <b>{$const}</b> {t("you_should_send_only_2")}
          </span>
        </div>
        <div className='flex justify-center w-full'>
          <Button size='lg' color='green' htmlType='submit' className='w-full' onClick={onCreateAddress}>
            {t("generate_address")}
          </Button>
        </div>
      </div>
      <div className={styles.GenerateQRAttentionError}>{localErrorInfoBox}</div>
    </>
    )
  );
};

export default TopUpFormQR;
