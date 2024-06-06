import { $axios } from "@/shared/lib";
import Loader from "@/shared/ui/loader";
import Input from "@/shared/ui/input/Input";
import { useTranslation } from "react-i18next";
import Button from "@/shared/ui/button/Button";
import { MASK_CODE } from "@/shared/config/mask";
import { scrollToTop } from "@/shared/lib/helpers";
import { InternalAxiosRequestConfig } from "axios";
import useMask from "@/shared/model/hooks/useMask";
import useModal from "@/shared/model/hooks/useModal";
import useError from "@/shared/model/hooks/useError";
import { useContext, useEffect, useState } from "react";
import { CtxNeedConfirm } from "@/processes/errors-provider-context";
import { Modal as ModalUi} from "@/shared/ui/ModalUi/Modal";

interface IState {
  code: string;
  sessid: string;
  loading: boolean;
  config: InternalAxiosRequestConfig<any>;
}

const ActionConfirmationWindow = () => {
  const [{ code, sessid, config, loading }, setState] = useState<IState>({
    code: null,
    sessid: null,
    config: null,
    loading: false,
  });
  const { t } = useTranslation();
  const { onInput } = useMask(MASK_CODE);
  const { isModalOpen, handleCancel, showModal } = useModal();
  const [localErrorHunter, , localErrorInfoBox, localErrorClear] = useError();
  const {
    pending,
    setSuccess,
    actionConfirmResponse: response,
  } = useContext(CtxNeedConfirm);

  useEffect(() => {
    (async () => {
      if (response) {
        setState({
          code: null,
          loading: false,
          config: response.config,
          // @ts-ignore
          sessid: response.data.result.sessid,
        });

        scrollToTop();
        showModal();
      }
    })();
  }, [response]);

  const onConfirm = async () => {
    setState((prev) => ({
      ...prev,
      loading: true,
    }));

    try {
      const response = await $axios.request({
        ...config,
        params: {
          sessid,
          code: code.replace(/ /g, ""),
        },
      });

      pending.resolve(response);

      handleCancel();
      setSuccess();
    } catch (error) {
      handleError();
    }
  };

  const handleError = () => {
    setState((prev) => ({
      ...prev,
      code: null,
      loading: false,
    }));

    localErrorHunter({
      code: 401,
      message: t("invalid_confirmation_code"),
    });
  };

  return (
    <ModalUi
      isModalOpen={isModalOpen}
      closable={false}
      title={t('identity_verification')}
      onCancel={() => {
        handleCancel();
        localErrorClear();
      }}
    >
      {loading && <Loader className="" />}

      <div className={loading ? "collapse" : "mt-[30px]"}>
        <div className="row -mt-5 mb-5">
          <div className="col">
            <span className="text-gray-600">
              {t("action_confirmation_message")}
            </span>
          </div>
        </div>

        <div className="mb-4">
          <Input
            allowDigits
            type="text"
            value={code}
            onInput={onInput}
            placeholder={t("enter_sms_code")}
            onChange={({ target }) => {
              localErrorClear();
              setState((prev) => ({
                ...prev,
                code: target.value,
              }));
            }}
          />
        </div>

        <div className="mb-4">{localErrorInfoBox}</div>

        <div className="flex justify-center w-full">
          <Button
            size="lg"
            disabled={!code}
            onClick={onConfirm}
            className="w-full mt-4"
          >
            {t("confirm")}
          </Button>
        </div>
      </div>
    </ModalUi>
  );
};

export default ActionConfirmationWindow;
