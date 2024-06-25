import {useEffect, useState} from "react";
import {apiCodeTxInfo} from "@/shared/(orval)api/gek";
import Loader from "@/shared/ui/loader";
import ReactQRCode from "react-qr-code";
import Button from "@/shared/ui/button/Button";
import useError from "@/shared/model/hooks/useError";
import {actionResSuccess} from "@/shared/lib/helpers";
import type {TxCodesOut} from "@/shared/(orval)api/gek/model";
import ClipboardField from "@/shared/ui/clipboard-field/ClipboardField";
import { useTranslation } from "react-i18next";
import Commissions from "@/widgets/wallet/transfer/components/commissions";
import ConfirmNotice from "@/widgets/wallet/transfer/components/confirm-notice";

const CodeTxInfo = ({code, currency=null, onBtnApply = null, applyTxCodeInfoBox=null, inputCurr=null, onClose=null}) => {
    const [localErrorHunter, , codeTxInfoErrorInfoBox] = useError();
    const [infoCode, setInfoCode] = useState<TxCodesOut | null>(null);
    const {t} = useTranslation()
    
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        (async () => {
            const response = await apiCodeTxInfo({
                code: code
            });
            
            actionResSuccess(response).success(() => {
                setInfoCode(response.data.result);
            }).reject(localErrorHunter)

            setLoading(false);
        })();
    }, []);

    const loader = (
      <div className={"min-h-[200px] relative"}><Loader className="justify-center" /></div>
    )

    return (
      <>
          {codeTxInfoErrorInfoBox ? codeTxInfoErrorInfoBox : loading ? loader : (
                <div>
                    <ConfirmNotice text={t("this_code_can_be_used")} />
                    {onBtnApply === null && (
                      <div className="flex flex-col items-center gap-[20px]">
                          <div className="w-[max-content] border-1 border-[#A5B7C5] border-solid p-[10px] rounded-md">
                              <div className="w-full max-w-[120px] h-auto">
                                  <ReactQRCode
                                    style={{ height: "auto", maxWidth: "120px", minWidth: "100%", width: "100%" }}
                                    value={infoCode.code}
                                    viewBox={`0 0 148 148`}
                                  />
                              </div>
                          </div>
                          <Commissions
                            youWillPay={inputCurr}
                            youWillGet={inputCurr}
                            fee={"-"}
                          />
                          <div className="w-full px-[10px]">
                              <div className="flex items-start gap-[10px] md:text-fs12 text-fs14 px-[5px] mb-[10px]">
                                  <span className="text-[var(--gek-mid-grey)]">
                                      {t("confirmation")}:
                                  </span>
                                  {
                                      infoCode.typeTx === 12 ? (
                                        <span className="text-[var(--gek-green)]">on</span>
                                      ) : (
                                        <span className="text-[#1F3446]">off</span>
                                      )
                                  }
                              </div>
                              <div className="w-full mb-[20px]">
                                  <ClipboardField value={infoCode.code} />
                              </div>
                              <div className="w-full flex justify-center">
                                  <Button
                                    size="md"
                                    color="blue"
                                    className="h-[43px] w-full"
                                    onClick={onClose}
                                  >
                                      {t("close")}
                                  </Button>
                              </div>
                          </div>
                      </div>
                    )}
                </div>
            )}
            {onBtnApply && (
                <div className="row">
                    <div className="flex justify-center col">
                        <Button disabled={loading} onClick={() => onBtnApply(infoCode)}
                                size="md"
                                className={"w-full"}>
                            {t("confirm")}
                        </Button>
                    </div>
                </div>
            )}
            {applyTxCodeInfoBox && <div className={"row mt-4"}>{applyTxCodeInfoBox}</div>}
        </>
    )
}

export default CodeTxInfo
