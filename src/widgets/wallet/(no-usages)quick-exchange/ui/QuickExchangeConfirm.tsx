import { useCallback, useState, memo, useContext } from "react";
import Button from "@/shared/ui/button/Button";
import Input from "@/shared/ui/input/Input";
import Form from "@/shared/ui/form/Form";
// import FormItem from "@/shared/ui/form/form-item/FormItem";
import { codeMessage } from "@/shared/config/message";
import useMask from "@/shared/model/hooks/useMask";
import { MASK_CODE } from "@/shared/config/mask";
import Loader from "@/shared/ui/loader";
import useError from "@/shared/model/hooks/useError";
import Timer from "@/shared/model/hooks/useTimer";
import { IOperationInfo } from "@/widgets/wallet/quick-exchange/model/types";
// import { useForm } from "antd/es/form/Form";
// import {CtxGlobalModalContext} from "@/app/providers/GlobalCtxModalProvider";
// import { CtnTrxInfo } from "@/widgets/wallet/transfer/withdraw/model/entitys";
import { useTranslation } from "react-i18next";

const QuickExchangeConfirm = memo(
  ({
    get,
    pay,
    rate,
    currency,
    handleCancel,
  }: IOperationInfo & { handleCancel: () => void }) => {
    //const setContent = useContext(CtxGlobalModalContext);
    // const [form] = useForm();
    const { onInput } = useMask(MASK_CODE);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [
      localErrorHunter,
      ,
      localErrorInfoBox,
      localErrorClear,
      localIndicatorError,
    ] = useError();
    const onConfirm = () => {
      //setContent(<CtnTrxInfo />);
      handleCancel();
    };
    const { t } = useTranslation();
    const onReSendCode = useCallback(() => {
      onConfirm();
    }, []);

    const setInp = (target: any) => {
      setInput(target.value);
    };

    return (
      <>
        <div className="row mb-2">
          <div className="col">
            <span className="text-gray-400">{t("you_will_pay")}</span>
          </div>
        </div>
        <div className="row mb-4">
          <div className="col">
            <span>{pay}</span>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col">
            <span className="text-gray-400">{t("you_will_get")}</span>
          </div>
        </div>
        <div className="row mb-4">
          <div className="col">
            <span>~ {get}</span>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col">
            <span className="text-gray-400">Exchange rate</span>
          </div>
        </div>
        <div className="row mb-10">
          <div className="col">
            <span>
              1 {currency} ≈ {rate} EUR
            </span>
          </div>
        </div>
        <Form 
          // form={form} 
          onFinish={onConfirm}
        >
          <span>{t("transfer_confirm")}</span>
          {/* <FormItem
            name="code"
            label="Code"
            preserve
            rules={[{ required: true, ...codeMessage }]}
          > */}
            <Input
              type="text"
              allowDigits
              onInput={onInput}
              placeholder={t("enter_sms_code")}
              onChange={setInp}
              autoComplete="off"
            />
          {/* </FormItem> */}
          <Timer onAction={onReSendCode} />
          <div className="row mt-4 mb-5">
            <div className="col relative">
              {loading ? (
                <Loader className={"relative w-[24px] h-[24px]"} />
              ) : (
                <Button
                  htmlType={"submit"}
                  disabled={input === ""}
                  className="w-full"
                  size={"xl"}
                >
                  {t("confirm")}
                </Button>
              )}
            </div>
            <div className="col flex justify-center mt-4">
              {localErrorInfoBox}
            </div>
          </div>
        </Form>
      </>
    );
  }
);

export default QuickExchangeConfirm;
