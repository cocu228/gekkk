import style from './style.module.scss' 
import Loader from "@/shared/ui/loader";
import Input from "@/shared/ui/input/Input";
import { TxInfoProps } from '../../model/types';
import { useTranslation } from "react-i18next";
import Button from "@/shared/ui/button/Button";
import { useEffect, useRef, useState } from "react";
import useError from "@/shared/model/hooks/useError";
import { actionResSuccess } from "@/shared/lib/helpers";
import { apiUpdateTxPartnerInfo } from "@/shared/(orval)api/gek";

interface InputRef {
  focus: () => void;
  blur: () => void;
  input: HTMLInputElement;
  select: () => void;
  setSelectionRange: () => void;
}

export const InfoConfirmPartner = (props: TxInfoProps) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [localErrorHunter, , localErrorInfoBox] = useError();

  const [input, setInput] = useState("");
  const [partnerInfo, setPartnerInfo] = useState(null);

  const confirmPartnerInfo = async () => {
    setLoading(true);

    const response = await apiUpdateTxPartnerInfo({
      partner_info: input,
      timetick: +props.id_transaction,
    });

    actionResSuccess(response)
      .success(() => {
        if (!!props.onUpdateTxInfo) {
          props.onUpdateTxInfo(props.id_transaction, input);
        }
        props.handleCancel();
      })
      .reject(localErrorHunter);

    setLoading(false);
  };

  const applyInputRef = useRef<InputRef|null>(null);

  useEffect(() => {
    !loading && applyInputRef.current && applyInputRef.current.focus();
  }, []);

  const inputChage = (event: any) => {
    setInput(event.target.value);
  };

  return (
    <div className="row relative font-medium">
      {loading ? (
        <Loader />
      ) : partnerInfo === null ? (
        <div className="col">
          <div className="row mb-2">
            <div>
              <span className={style.InfoItemTitle}>{t("sender_name")}</span>
            </div>
          </div>
          <div className="row w-full flex justify-center gap-5 h-[43px] mb-5">
            <div className="col flex items-center border-[2px] rounded-[8px] border-[#2BAB72] border-solid w-3/5">
              <Input
                placeholder={t("enter_sender_name")}
                ref={applyInputRef}
                value={input}
                onChange={inputChage}
                className="text-[10px] border-none font-[400]"
              />
            </div>
            <div className="flex justify-center w-[40%]">
              <Button
                size={"lg"}
                onClick={() => setPartnerInfo(input)}
                disabled={input === ""}
                className="w-full"
              >
                <span className="font-bold">{t("apply")}</span>
              </Button>
            </div>
          </div>
        </div>
      ) : localErrorInfoBox ? (
        localErrorInfoBox
      ) : (
        <div className="col">
          <div className={style.InfoItem}>
            <div>
              <span className={style.InfoItemTitle}>{t("sender_name")}</span>
            </div>
            <div>
              <span className={style.InfoItemValue}>
                {input}
              </span>
            </div>
          </div>
          
          <div className="row flex gap-3">
            <div className="col w-full">
              <Button
                size="lg"
                onClick={confirmPartnerInfo}
                className="w-full m-auto"
              >
                <span className="font-bold">{t("confirm")}</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoConfirmPartner;
