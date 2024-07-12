import { useTranslation } from "react-i18next";
import { InternalAxiosRequestConfig } from "axios";
import { useContext, useEffect, useState } from "react";

import { $axios } from "@/shared/lib";
import Loader from "@/shared/ui/loader";
import Input from "@/shared/ui/input/Input";
import Button from "@/shared/ui/button/Button";
import { scrollToTop } from "@/shared/lib/helpers";
import useModal from "@/shared/model/hooks/useModal";
import useError from "@/shared/model/hooks/useError";
import { UasConfirmCtx } from "@/processes/errors-provider-context";
import { Modal } from "@/shared/ui/modal/Modal";

import style from "./styles.module.scss";

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
    loading: false
  });
  const { t } = useTranslation();
  const { isModalOpen, handleCancel, showModal } = useModal();
  const [localErrorHunter, , localErrorInfoBox, localErrorClear] = useError();
  const { pending, setSuccess, actionConfirmResponse: response } = useContext(UasConfirmCtx);

  useEffect(() => {
    (async () => {
      if (response) {
        setState({
          code: null,
          loading: false,
          config: response.config,
          // @ts-ignore
          sessid: response.data.result.sessid
        });

        scrollToTop();
        showModal();
      }
    })();
  }, [response]);

  const handleError = () => {
    setState(prev => ({
      ...prev,
      code: null,
      loading: false
    }));

    localErrorHunter({
      code: 401,
      message: t("invalid_confirmation_code")
    });
  };

  const onConfirm = async () => {
    setState(prev => ({
      ...prev,
      loading: true
    }));

    try {
      const response = await $axios.request({
        ...config,
        params: {
          sessid,
          code: code.replace(/ /g, "")
        }
      });

      pending.resolve(response);

      handleCancel();
      setSuccess();
    } catch (_) {
      handleError();
    }
  };

  return (
    <Modal
      zIndex
      isModalOpen={isModalOpen}
      title={t("identity_verification")}
      onCancel={() => {
        handleCancel();
        localErrorClear();
      }}
    >
      {loading && <Loader className='' />}

      <div className={loading ? "collapse" : ""}>
        <span className={style.ModalText}>&emsp;&emsp;{t("action_confirmation_message")}</span>

        <div className=''>
          <Input
            allowDigits
            size={"md"}
            className={style.Input}
            wrapperClassname={style.InputWrap}
            type='text'
            value={code}
            placeholder={t("enter_sms_code")}
            onChange={({ target }) => {
              localErrorClear();
              setState(prev => ({
                ...prev,
                code: target.value
              }));
            }}
          />
        </div>

        {localErrorInfoBox && <div className='mb-4'>{localErrorInfoBox}</div>}

        <div className={style.ButtonWrap}>
          <Button size='md' disabled={!code} onClick={onConfirm} className='w-full mt-4'>
            {t("confirm")}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ActionConfirmationWindow;
