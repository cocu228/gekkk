import { FC, useEffect, useState } from "react";
import ReactQRCode from "react-qr-code";
import { useTranslation } from "react-i18next";

import { apiCodeTxInfo } from "@/shared/(orval)api/gek";
import Loader from "@/shared/ui/loader";
import Button from "@/shared/ui/button/Button";
import useError from "@/shared/model/hooks/useError";
import { actionResSuccess } from "@/shared/lib/helpers";
import ClipboardField from "@/shared/ui/clipboard-field/ClipboardField";
import Commissions from "@/widgets/wallet/transfer/components/commissions";
import Notice from "@/shared/ui/notice";

import type { TxCodesOut } from "@/shared/(orval)api/gek/model";
import InlineProperty from "@/shared/ui/inline-property";
import { formatForCustomer } from "@/shared/lib/date-helper";

interface ICodeTxInfoProps {
  code: string;
  currency?: any;
  inputCurr?: any;
  onClose?: () => void;
  applyTxCodeInfoBox?: any;
  onBtnApply?: (codeInfo: TxCodesOut) => void;
}

const CodeTxInfo: FC<ICodeTxInfoProps> = ({
  code,
  onBtnApply = null,
  applyTxCodeInfoBox = null,
  inputCurr = null,
  onClose = null
}) => {
  const [localErrorHunter, , codeTxInfoErrorInfoBox] = useError();
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(true);
  const [infoCode, setInfoCode] = useState<TxCodesOut | null>(null);

  useEffect(() => {
    (async () => {
      const response = await apiCodeTxInfo({
        code: code
      });

      actionResSuccess(response)
        .success(() => setInfoCode(response.data.result))
        .reject(localErrorHunter);

      setLoading(false);
    })();
  }, []);

  return (
    <>
      {codeTxInfoErrorInfoBox ? (
        codeTxInfoErrorInfoBox
      ) : loading ? (
        <div className={"min-h-[100px] relative"}>
          <Loader className='justify-center' />
        </div>
      ) : (
        <div>
          {onBtnApply === null ? (
            <>
              <Notice text={t("this_code_can_be_used")} />
              <div className='flex flex-col items-center gap-[20px]'>
                <div className='w-[max-content] border-1 border-[#A5B7C5] border-solid p-[10px] rounded-md'>
                  <div className='w-full max-w-[120px] h-auto'>
                    <ReactQRCode
                      style={{ height: "auto", maxWidth: "120px", minWidth: "100%", width: "100%" }}
                      value={infoCode.code}
                      viewBox={`0 0 148 148`}
                    />
                  </div>
                </div>
                <Commissions youWillPay={inputCurr} youWillGet={inputCurr} fee={"-"} />
                <div className='w-full px-[10px]'>
                  <div className='flex items-start gap-[10px] md:text-fs12 text-fs14 px-[5px] mb-[10px]'>
                    <span className='text-[var(--gek-mid-grey)]'>{t("confirmation")}:</span>
                    {infoCode.typeTx === 12 ? (
                      <span className='text-[var(--gek-green)]'>on</span>
                    ) : (
                      <span className='text-[var(--gek-dark-blue)]'>off</span>
                    )}
                  </div>
                  <div className='w-full mb-[20px]'>
                    <ClipboardField value={infoCode.code} />
                  </div>
                  <div className='w-full flex justify-center'>
                    <Button size='md' color='blue' className='h-[43px] w-full' onClick={onClose}>
                      {t("close")}
                    </Button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col">
              <div className="mb-5">
                <div className='mb-2'>
                  <InlineProperty
                    left={t("creation_date")}
                    right={formatForCustomer(new Date(infoCode.dateTxUTC))}
                  />
                </div>

                <div className='mb-2'>
                  <InlineProperty
                    left={t("amount")}
                    right={`${infoCode.amount} ${infoCode.currency}`}
                  />
                </div>

                <div className='mb-3'>
                  <InlineProperty
                    left={t("status")}
                    right={infoCode.state.capitalize()}
                  />
                </div>

                <div className='flex items-start gap-[10px] md:text-fs12 text-fs14'>
                  <span className='text-[var(--gek-mid-grey)]'>{t("confirmation")}:</span>
                  {infoCode.typeTx === 12 ? (
                    <span className='text-[var(--gek-green)]'>on</span>
                  ) : (
                    <span className='text-[var(--gek-dark-blue)]'>off</span>
                  )}
                </div>
              </div>

              <div className='flex justify-center col'>
                {/* eslint-disable-next-line @typescript-eslint/no-unsafe-call */}
                <Button disabled={loading} onClick={() => onBtnApply(infoCode)} className={"w-full"}>
                  {t("confirm")}
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
      {applyTxCodeInfoBox && <div className={"row mt-4"}>{applyTxCodeInfoBox}</div>}
    </>
  );
};

export default CodeTxInfo;
