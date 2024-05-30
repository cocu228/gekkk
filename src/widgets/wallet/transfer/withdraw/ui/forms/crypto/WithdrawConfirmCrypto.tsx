import {useCallback, useContext, useState, memo, useRef, useEffect} from "react";
import {CtxWalletNetworks, CtxWalletData} from "@/widgets/wallet/transfer/model/context";
import { apiCreateWithdraw } from "@/shared/(orval)api/gek";
import Decimal from "decimal.js";
import {actionResSuccess, getRandomInt32, isNull} from "@/shared/lib/helpers";
import {codeMessage} from "@/shared/config/message";
import useMask from "@/shared/model/hooks/useMask";
import {MASK_CODE} from "@/shared/config/mask";
import useError from "@/shared/model/hooks/useError";
import {getChosenNetwork} from "@/widgets/wallet/transfer/model/helpers";
import {IWithdrawFormCryptoState} from "@/widgets/wallet/transfer/withdraw/ui/forms/crypto/WithdrawFormCrypto";
import {IUseInputState} from "@/shared/ui/input-currency/model/useInputState";
import {useForm} from "antd/es/form/Form";
import {CtxGlobalModalContext} from "@/app/providers/CtxGlobalModalProvider";
import {CreateWithdrawIn} from "@/shared/(orval)api/gek/model";
import {formatAsNumber} from "@/shared/lib/formatting-helper";
import {SignTX} from "./signTX";
import {useTranslation} from "react-i18next";
import {useBreakpoints} from "@/app/providers/BreakpointsProvider";
import ModalTrxStatusSuccess from "../../modals/ModalTrxStatusSuccess";
import { IconApp } from "@/shared/ui/icons/icon-app";
import styles from "../styles.module.scss";
import style from './styles.module.scss'
import FormItem from "@/shared/ui/form/form-item/FormItem";
import Input from "@/shared/ui/input/Input";
import Timer from "@/shared/model/hooks/useTimer";
import Loader from "@/shared/ui/loader";
import Button from "@/shared/ui/button/Button";
import InfoBox from "@/widgets/info-box";
import Form from "@/shared/ui/form/Form";
import GekReceipt from "@/widgets/wallet/transfer/components/receipt/gek";
import { CtxDisplayHistory } from "@/pages/transfers/history-wrapper/model/CtxDisplayHistory";
import { CtxRootData } from "@/processes/RootContext";

const initStageConfirm = {
  status: null,
  txId: null,
  fee: null,
  autoInnerTransfer: false,
  code: null,
};

type TProps = IWithdrawFormCryptoState & {
  amount: IUseInputState["value"]["number"];
  handleCancel: () => void;
};

const WithdrawConfirmCrypto = memo(
  ({ address, amount, recipient, description, handleCancel }: TProps) => {
    const [form] = useForm();
    const { md } = useBreakpoints();
    const [input, setInput] = useState("");
    const { $const } = useContext(CtxWalletData);
    const [loading, setLoading] = useState(false);
    const { setRefresh } = useContext(CtxRootData);
    const { setContent } = useContext(CtxGlobalModalContext);
    const { displayHistory } = useContext(CtxDisplayHistory);
    const [localErrorHunter,,localErrorInfoBox] = useError();
    const [stageReq, setStageReq] = useState(initStageConfirm);

    const { networkTypeSelect, networksForSelector, tokenNetworks } =
      useContext(CtxWalletNetworks);

    const { label } = networksForSelector.find(
      (it) => it.value === networkTypeSelect
    );
    
    const {
      id,
      withdraw_fee = 0,
    } = getChosenNetwork(tokenNetworks, networkTypeSelect) ?? {};

    const fragmentReqParams = useRef<
      Omit<CreateWithdrawIn, "client_nonce" | "auto_inner_transfer">
    >({
      currency: $const,
      token_network: id,
      amount: amount,
      fee: withdraw_fee,
      address: isNull(address) ? "" : address,
      partner_info: recipient,
      tag: isNull(description) ? "" : description,
    });
    const { t } = useTranslation();
    const onReSendCode = useCallback(async () => {
      await onConfirm(true);
    }, []);

    // TODO: split confirmation logit into 2 layers
    useEffect(() => {
      (async () => {
        onConfirm();
      })()
    }, [])

    const { onInput } = useMask(MASK_CODE);
    const onConfirm = async (reSendCode = false) => {
      setLoading(!reSendCode);

      const response = await apiCreateWithdraw(
        {
          ...fragmentReqParams.current,
          client_nonce: getRandomInt32(),
          auto_inner_transfer: stageReq.autoInnerTransfer,
        },
        {
          confirmationTimetick: reSendCode ? null : stageReq.txId,
          confirmationCode: reSendCode
            ? null
            : stageReq.status === 2
            ? stageReq.code
            : input !== ""
            ? formatAsNumber(input)
            : null,
        },
        {
          headers: {
            // В случае когда требуется подпись
            ...(stageReq?.status !== 2
              ? {}
              : {
                  "x-signature": await SignTX(
                    stageReq.txId + "" + stageReq.code
                  ),
                }),
          },
        }
      );

      actionResSuccess(response)
        .success(() => {
          const result = response.data?.result;

          if (
            reSendCode ||
            result.confirmationStatusCode === 0 ||
            result.confirmationStatusCode === 1 ||
            result.confirmationStatusCode === 2
          ) {
            setStageReq((prev) => ({
              ...prev,
              status: result.confirmationStatusCode,
              txId: result.txId,
              fee: result.fee,
              code: result.confirmCode,
            }));
          }
          if (result.confirmationStatusCode === 4) {
            handleCancel();
            setRefresh();
            displayHistory();
            setContent({content: <ModalTrxStatusSuccess onReceipt={getReceipt(result.txId)}/>});
          } else {
            localErrorHunter({ message: "Something went wrong.", code: 1 });
          }
        })
        .reject((err) => {
          if (err.code === 10035) {
            setStageReq((prev) => ({
              ...prev,
              autoInnerTransfer: true,
            }));
          } else {
            localErrorHunter(err);
            form.resetFields();
          }
        });

      setLoading(false);
    };

    const getReceipt = (txId: string) => async () => {
      setContent({
          content: <GekReceipt txId={txId}/>,
          title: 'Transaction receipt'
      });
    };

    const inputChange = ({target}: any) => {
      setInput(target.value);
    };

    return (
      <>
        <div className="flex justify-center">
          <div className="flex flex-col items-start self-center w-full">
            <div className={style.MobileWarnBlock}>
              <IconApp color="#8F123A" size={50} code="t27" />
              <span className={styles.ModalInfoText}>
                {t("use_withdraw_addr_supported")}
              </span>
            </div>
            <div className="flex flex-col gap-[10px]">
              {
                label ? (
                  <div className={`${style.ConfirmList} ${md && style.ConfirmListMobile}`}>
                    <div className={style.ConfirmItem}>
                      <span className={`text-gray-400 ${style.ConfirmItemTitle}`}>{t('type_transaction')}</span>
                      <span className={style.ConfirmItemValue}>{label}</span>
                    </div>
                  </div>
                ) : null
              }
              {
                address ? (
                  <div className={`${style.ConfirmList} ${md && style.ConfirmListMobile}`}>
                    <div className={style.ConfirmItem}>
                      <span className={`text-gray-400 ${style.ConfirmItemTitle}`}>{t('address')}</span>
                      <span className={style.ConfirmItemValue}>{address}</span>
                    </div>
                  </div>
                ) : null
              }
              {
                recipient ? (
                  <div className={`${style.ConfirmList} ${md && style.ConfirmListMobile}`}>
                    <div className={style.ConfirmItem}>
                      <span className={`text-gray-400 ${style.ConfirmItemTitle}`}>{t('recipient_name')}</span>
                      <span className={style.ConfirmItemValue}>{recipient}</span>
                    </div>
                  </div>
                ) : null
              }
              {
                amount && $const ? (
                  <div className={`${style.ConfirmList} ${md && style.ConfirmListMobile}`}>
                    <div className={style.ConfirmItem}>
                      <span className={`text-gray-400 ${style.ConfirmItemTitle}`}>{t('amount')}</span>
                      <span className={style.ConfirmItemValue}>{amount} {$const}</span>
                    </div>
                  </div>
                ) : null
              }
              {
                withdraw_fee && $const ? (
                  <div className={`${style.ConfirmList} ${md && style.ConfirmListMobile}`}>
                    <div className={style.ConfirmItem}>
                      <span className={`text-gray-400 ${style.ConfirmItemTitle}`}>{t('fee')}</span>
                      <span className={style.ConfirmItemValue}>{new Decimal(withdraw_fee).toString()} {$const}</span>
                    </div>
                  </div>
                ) : null
              }
            </div>
          {description && (
            <>
              <div className="row mb-2">
                <div className="col">
                  <span className="text-gray-400">{t("description")}</span>
                </div>
              </div>
              <div className="row mb-4">
                <div className="col">
                  <span>{description}</span>
                </div>
              </div>
            </>
          )}
            <div className={styles.PayInfo}>
              <div className={styles.PayInfoCol}>
                  <div className="row">
                      <span className={styles.PayInfoText}>{t("you_will_pay")}:</span>
                  </div>
                  <div className="row">
                  <span className={styles.PayInfoText}>
                      {t("you_will_get")}:
                  </span>
                  </div>
                  <div className="row">
                      <span className={styles.PayInfoTextFee}>
                          {t("fee")}:
                      </span>
                  </div>
              </div>
              <div className={styles.PayInfoColValue}>
            
                  <div className={styles.PayInfoCol}>
                      <div className={styles.PayInfoValueFlex}>
                          <span
                              className={styles.PayInfoValueFlexText}>{amount}</span>
                      </div>
                      <div className={styles.PayInfoValueFlex}>
                          {loading ? t("loading")+"..." : <span
                              className={styles.PayInfoValueFlexText}>{amount + withdraw_fee}</span>}
                      </div>
                      <div className={styles.PayInfoValueFlex}>
                          {loading ? t("loading")+"..." : <span
                              className={styles.PayInfoValueFlexTextFee}>{withdraw_fee}</span>}
                      </div>
                  </div>
                  
                  <div className={styles.PayInfoCol}>
                      <span className={styles.PayInfoValueFlexTextCurrency}>
                          {$const}
                      </span>
                      <span className={styles.PayInfoValueFlexTextCurrency}>
                          {$const}
                      </span>
                      <span className={styles.PayInfoValueFlexTextFee}>
                          {$const}
                      </span>
                  </div>
              </div>
            </div>

            <div className="w-full">
              <Form
              form={form}
              wrapperClassName="w-full"
              onSubmit={() => onConfirm()}
            >
              <div className="w-full row mt-4">
                <div className="w-full flex flex-row gap-[5px] relative">
                  {loading ? (
                    <Loader className={"relative w-[24px] h-[24px]"} />
                  ) : (
                    <>
                      <div className="w-full gap-5 flex flex-col justify-between">
                        {(stageReq.status === 0 || stageReq.status === 1) && (
                          <>
                            <span className="text-gray-400">
                              {t("transfer_confirmation")}
                            </span>
                            <FormItem
                              name="code"
                              label="Code"
                              preserve
                              rules={[{ required: true, ...codeMessage }]}
                            >
                              <Input
                                allowDigits
                                type="text"
                                onInput={onInput}
                                autoComplete="off"
                                onChange={inputChange}
                                placeholder={
                                  stageReq.status === 0
                                    ? t("enter_sms_code")
                                    : stageReq.status === 1
                                    ? t("enter_code")
                                    : t("enter_pin_code")
                                }
                              />
                            </FormItem>
                            <Timer onAction={onReSendCode} />
                          </>
                        )}
                        <div className={styles.ButtonContainer + " w-full"}>
                          <Button
                            htmlType={"submit"}
                            onClick={() => {
                              onConfirm();
                            }}
                            disabled={
                              input === "" &&
                              (stageReq.status === 0 || stageReq.status === 1)
                            }
                            className={styles.ButtonTwo}
                          >
                            {t(
                              stageReq.status === 2
                                ? "sign_transfer"
                                : "confirm"
                            )}
                          </Button>
                          <Button
                            skeleton
                            onClick={() => {
                              handleCancel();
                            }}
                            className={styles.ButtonTwo}
                          >
                            {t("cancel")}
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div className="col flex justify-center mt-4">
                  {localErrorInfoBox
                    ? localErrorInfoBox
                    : stageReq.autoInnerTransfer && (
                        <InfoBox>
                          The address is within our system. The transfer will be
                          made via the internal network, and not through the
                          blockchain. Are you sure you want to continue?
                        </InfoBox>
                      )}
                </div>
              </div>
            </Form>
            </div>
          </div>
        </div>
      </>
    );
  }
);

export default WithdrawConfirmCrypto;
