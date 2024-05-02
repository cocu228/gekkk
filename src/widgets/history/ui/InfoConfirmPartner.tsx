import Loader from "@/shared/ui/loader";
import Input from "@/shared/ui/input/Input";
import { useTranslation } from "react-i18next";
import Button from "@/shared/ui/button/Button";
import React, { useContext, useEffect, useRef, useState } from "react";
import { CtxRootData } from "@/processes/RootContext";
import useError from "@/shared/model/hooks/useError";
import { actionResSuccess } from "@/shared/lib/helpers";
import { apiUpdateTxPartnerInfo } from "@/shared/(orval)api/gek";
import { GetHistoryTrasactionOut } from "@/shared/(orval)api/gek/model";
import { containsNonLatinCharacters } from "@/widgets/history/model/helpers";

type TypeProps = GetHistoryTrasactionOut & {
  handleCancel: () => void;
};

interface InputRef {
  focus: () => void;
  blur: () => void;
  input: HTMLInputElement;
  select: () => void;
  setSelectionRange: () => void;
}

export const InfoConfirmPartner = (props: TypeProps) => {
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
      .success(props.handleCancel)
      .reject(localErrorHunter);

    setLoading(false);
  };

  const applyInputRef = useRef<InputRef | null>(null);

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
            <div className="col w-auto">
              <span className="font-bold text-[14px] text-[#285E69]">
                {t("sender_name")}
              </span>
            </div>
          </div>
          <div className="row w-full flex justify-center h-[43px] mb-5">
            <div className="col flex items-center border-[2px] rounded-[8px] border-[#2BAB72] border-solid w-3/5">
              <Input
                placeholder={t("enter_sender_name")}
                bordered={false}
                ref={applyInputRef}
                autoComplete="on"
                value={input}
                onChange={inputChage}
                className="text-[10px] font-[400]"
              />
            </div>
            <div className="flex justify-center w-[40%]">
              <Button
                variant='greenTransfer'
                onClick={() => setPartnerInfo(input)}
                disabled={input === "" || containsNonLatinCharacters(input)}
                size={"xl"}
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
          <div className="row mb-4 flex flex-wrap gap-2">
            <div className="col w-auto">
              <span className="font-bold text-[10px] text-[#285E69]">
                {t("sender_name")}
              </span>
            </div>
            <div className="col w-auto">
              <span className="break-all font-medium">{input}</span>
            </div>
          </div>
          <div className="row flex gap-3">
            <div className="col w-full">
              <Button
                onClick={confirmPartnerInfo}
                size={"xl"}
                className="w-full !font-medium"
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
