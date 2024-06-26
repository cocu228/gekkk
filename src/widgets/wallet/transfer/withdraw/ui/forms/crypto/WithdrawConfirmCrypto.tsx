import {useCallback, useContext, useState, memo, useRef, useEffect} from "react";
import {CtxWalletNetworks, CtxWalletData} from "@/widgets/wallet/transfer/model/context";
import { apiCreateWithdraw } from "@/shared/(orval)api/gek";
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
import ModalTrxStatusSuccess from "../../modals/ModalTrxStatusSuccess";
import styles from './styles.module.scss'
import FormItem from "@/shared/ui/form/form-item/FormItem";
import Input from "@/shared/ui/input/Input";
import Timer from "@/shared/model/hooks/useTimer";
import Loader from "@/shared/ui/loader";
import InfoBox from "@/widgets/info-box";
import Form from "@/shared/ui/form/Form";
import { CtxDisplayHistory } from "@/pages/transfers/history-wrapper/model/CtxDisplayHistory";
import { CtxRootData } from "@/processes/RootContext";
import Commissions from "@/widgets/wallet/transfer/components/commissions";
import ConfirmButtons from "@/widgets/wallet/transfer/components/confirm-buttons";
import Notice from "@/shared/ui/notice";

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
            setContent({content: <ModalTrxStatusSuccess/>});
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

    const inputChange = ({target}: any) => {
      setInput(target.value);
    };

    const cryptoInfo: { label: string; value: string }[] = [
      ...(label ? [{ label: t("type_transaction"), value: label }] : []),
      ...(address ? [{ label: t("address"), value: address }] : []),
      ...(recipient ? [{ label: t("recipient_name"), value: recipient }] : []),
      ...(amount && $const ? [{ label: t("amount"), value: `${amount} ${$const}` }] : []),
      ...(withdraw_fee && $const ? [{ label: t("fee"), value: `${withdraw_fee} ${$const}` }] : []),
      ...(description ? [{ label: t("description"), value: description }] : []),
    ]

    return (
      <>
        {loading && <Loader className='justify-center' />}
        <div className={loading ? "collapse" : ""}>
          <Notice text={t("use_withdraw_addr_supported")} />

          <div className="flex flex-col px-[10px] gap-[25px] mb-[25px]">
            <div className="flex flex-col gap-[10px]">
              {cryptoInfo.map(({ label, value }) => (
                <div key={value}>
                  <p className="text-[#9D9D9D] md:text-fs12 text-fs14">{label}</p>
                  <p className="font-semibold text-[#3A5E66] md:text-fs12 text-fs14">{value}</p>
                </div>
              ))}
            </div>
            <div className="w-full">
              <Commissions
                isLoading={loading}
                youWillPay={amount + withdraw_fee}
                youWillGet={amount}
                fee={withdraw_fee}
              />
            </div>
          </div>

          <div className="col flex justify-center mb-[10px]">
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

          <Form
            form={form}
            wrapperClassName="w-full"
            onSubmit={() => onConfirm()}
          >
            {(stageReq.status === 0 || stageReq.status === 1) && (
              <div className="mb-[15px]">
                <FormItem
                  name="code"
                  label="Code"
                  preserve
                  rules={[{ required: true, ...codeMessage }]}
                >
                  <Input
                    allowDigits
                    size={"sm"}
                    type="text"
                    className={styles.Input}
                    onInput={onInput}
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
              </div>
            )}
            <ConfirmButtons
              isConfirmDisabled={!!localErrorInfoBox || (input === "" && (stageReq.status === 0 || stageReq.status === 1))}
              confirmTitle={t(stageReq.status === 2 ? "sign_transfer" : "confirm")}
              confirmType={"submit"}
              onCancel={handleCancel}
            />
          </Form>
        </div>
      </>
    );
  }
);

export default WithdrawConfirmCrypto;
