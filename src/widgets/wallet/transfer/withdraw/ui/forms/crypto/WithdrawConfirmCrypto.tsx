import { useCallback, useContext, useState, memo, useEffect, FC } from "react";
import {CtxWalletNetworks, CtxWalletData} from "@/widgets/wallet/transfer/model/context";
import { apiCreateWithdraw } from "@/shared/(orval)api/gek";
import {actionResSuccess, getRandomInt32, isNull} from "@/shared/lib/helpers";
import useError from "@/shared/model/hooks/useError";
import {getChosenNetwork} from "@/widgets/wallet/transfer/model/helpers";
import {IWithdrawFormCryptoState} from "@/widgets/wallet/transfer/withdraw/ui/forms/crypto/WithdrawFormCrypto";
import {IUseInputState} from "@/shared/ui/input-currency/model/useInputState";
import {CtxGlobalModalContext} from "@/app/providers/CtxGlobalModalProvider";
import {CreateWithdrawIn} from "@/shared/(orval)api/gek/model";
import {formatAsNumber} from "@/shared/lib/formatting-helper";
import {SignTX} from "./signTX";
import {useTranslation} from "react-i18next";
import ModalTrxStatusSuccess from "../../modals/ModalTrxStatusSuccess";
import styles from './styles.module.scss'
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
import { IconApp } from "@/shared/ui/icons/icon-app";

const initStageConfirm = {
  status: null,
  txId: null,
  fee: null,
  autoInnerTransfer: false,
  code: null,
};

interface IWithdrawConfirmCryptoProps extends IWithdrawFormCryptoState {
  amount: IUseInputState["value"]["number"];
  handleCancel: () => void;
}

const WithdrawConfirmCrypto: FC<IWithdrawConfirmCryptoProps> = ({
  address,
  amount,
  recipient,
  description,
  handleCancel
}) => {
  // Hooks
  const {t} = useTranslation();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [stageReq, setStageReq] = useState(initStageConfirm);
  const [localErrorHunter,,localErrorInfoBox, localErrorClear] = useError();

  // Context
  const {$const} = useContext(CtxWalletData);
  const {setContent} = useContext(CtxGlobalModalContext);
  const {setRefresh} = useContext(CtxRootData);
  const {displayHistory} = useContext(CtxDisplayHistory);
  const {
    networkTypeSelect,
    networksForSelector,
    tokenNetworks
  } = useContext(CtxWalletNetworks);

  // Handlers
  const {id, withdraw_fee = 0} = getChosenNetwork(tokenNetworks, networkTypeSelect) ?? {};

  const onReSendCode = useCallback(async () => {
    await onConfirm(true);
  }, []);

  const onConfirm = async (reSendCode = false) => {
    setLoading(!reSendCode);

    const fragmentReqParams: Omit<CreateWithdrawIn, "client_nonce" | "auto_inner_transfer"> = {
      currency: $const,
      token_network: id,
      amount: amount,
      fee: withdraw_fee,
      address: isNull(address) ? "" : address,
      partner_info: recipient,
      tag: isNull(description) ? "" : description,
    };

    const createWithdrawIn: CreateWithdrawIn = {
      ...fragmentReqParams,
      client_nonce: getRandomInt32(),
      auto_inner_transfer: stageReq.autoInnerTransfer,
    }

    const confirmationCode = reSendCode ? null :
      stageReq.status === 2 ? stageReq.code : input !== "" ? formatAsNumber(input) : null;

    const params = {
      confirmationTimetick: reSendCode ? null : stageReq.txId,
      confirmationCode
    }

    const options = {
      headers: {
        // В случае когда требуется подпись
        ...(stageReq?.status !== 2
          ? {}
          : {
            "x-signature": await SignTX(
              stageReq.txId + "" + stageReq.code
            ),
          }),
      }
    }

    const response = await apiCreateWithdraw(createWithdrawIn, params, options);

    actionResSuccess(response)
      .success(() => {
        const result = response.data?.result;
        const isStageReq = reSendCode || [0, 1, 2].includes(result.confirmationStatusCode);
        if (isStageReq) {
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
          setInput("");
        }
      });

    setLoading(false);
  };

  const inputChange = ({target}: any) => {
    localErrorClear();
    setInput(target.value);
  };

  // Effects
  // TODO: split confirmation logit into 2 layers
  useEffect(() => {
    void onConfirm();
  }, [])

  const { label } = networksForSelector.find((it) => it.value === networkTypeSelect);
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
                <p className="font-semibold text-[#3A5E66] md:text-fs12 text-fs14 break-words">{value}</p>
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
            <InfoBox icon={<IconApp size={30} code="t8" color="#ttt" />} >
              The address is within our system. The transfer will be
              made via the internal network, and not through the
              blockchain. Are you sure you want to continue?
            </InfoBox>
          )}
        </div>

        <Form
          wrapperClassName="w-full"
          onSubmit={() => onConfirm()}
        >
          {(stageReq.status === 0 || stageReq.status === 1) && (
            <div className="mb-[15px]">
                <Input
                  allowDigits
                  size={"sm"}
                  type="text"
                  value={input}
                  className={styles.Input}
                  onChange={inputChange}
                  placeholder={
                    stageReq.status === 0
                      ? t("enter_sms_code")
                      : stageReq.status === 1
                        ? t("enter_code")
                        : t("enter_pin_code")
                  }
                />
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
};

export default memo(WithdrawConfirmCrypto);
