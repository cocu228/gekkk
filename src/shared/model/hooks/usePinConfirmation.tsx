import md5 from "md5";
import { useState } from "react";
import { InternalAxiosRequestConfig } from "axios";
import { useTranslation } from "react-i18next";

import Loader from "@/shared/ui/loader";
import Input from "@/shared/ui/input/Input";
import { $axios } from "@/shared/lib/(orval)axios";
import Button from "@/shared/ui/button/Button";
import { MASK_CODE } from "@/shared/config/mask";
import useMask from "@/shared/model/hooks/useMask";
import { getCookieData } from "@/shared/lib/helpers";
import useModal from "@/shared/model/hooks/useModal";
import useError from "@/shared/model/hooks/useError";
import { apiPasswordVerify, SignHeaders } from "@/shared/api";
import { generateJWT, getTransactionSignParams } from "@/shared/lib/crypto-service";
import { Modal } from "@/shared/ui/modal/Modal";

const signHeadersGeneration = async (token: string | null = null): Promise<Partial<SignHeaders>> => {
  const header: Pick<SignHeaders, "X-Confirmation-Type"> = {
    "X-Confirmation-Type": "SIGN"
  };

  if (token === null) return header;

  const { appUuid, appPass } = token ? await getTransactionSignParams() : { appUuid: null, appPass: null };

  const jwtPayload = {
    initiator: getCookieData<{ phone: string }>().phone,
    confirmationToken: token,
    exp: Date.now() + 0.5 * 60 * 1000 // + 30sec
  };

  const keys: Omit<SignHeaders, "X-Confirmation-Type"> = {
    "X-Confirmation-Code": generateJWT(jwtPayload, appPass),
    "X-Confirmation-Token": token,
    "X-App-Uuid": appUuid
  };

  return {
    ...header,
    ...keys
  };
};

interface IState {
  code: string;
  token: string;
  loading: boolean;
  config: InternalAxiosRequestConfig<any>;
}

export type TypeUseConfirmation = {
  confirmationModal: JSX.Element | null;
  requestConfirmation: (config: InternalAxiosRequestConfig<any>, token: string) => Promise<void>;
};

const usePinConfirmation = (): TypeUseConfirmation => {
  const [{ code, token, config, loading }, setState] = useState<IState>({
    code: null,
    token: null,
    config: null,
    loading: false
  });
  const { t } = useTranslation();
  const { onInput } = useMask(MASK_CODE);
  const { phone } = getCookieData<{ phone: string }>();
  const { isModalOpen, handleCancel, showModal } = useModal();
  const [localErrorHunter, , localErrorInfoBox, localErrorClear] = useError();

  const requestConfirmation = async (config: InternalAxiosRequestConfig<any>, token: string) => {
    setState({
      code: null,
      token: token,
      config: config,
      loading: false
    });

    showModal();
  };

  const confirm = async () => {
    setState(prev => ({
      ...prev,
      loading: true
    }));

    const signedRequest = async () => {
      const headers = await signHeadersGeneration(token);
      await $axios.request({
        ...config,
        headers: { ...headers }
      });
    };

    apiPasswordVerify(md5(`${code}_${phone}`))
      .then(() => signedRequest().then(handleCancel))
      .catch(() => {
        localErrorHunter({
          code: 401,
          message: t("invalid_confirmation_code")
        });
      });

    setState(prev => ({
      ...prev,
      loading: false
    }));
  };

  const confirmationModal = (
    <Modal
      isModalOpen={isModalOpen}
      title={t("confirm_action")}
      noHeaderBorder
      onCancel={() => {
        handleCancel();
        localErrorClear();
      }}
    >
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className='mb-4'>
            <Input
              allowDigits
              type='text'
              onInput={onInput}
              placeholder={t("enter_code")}
              onChange={({ target }) => {
                localErrorClear();
                setState(prev => ({
                  ...prev,
                  code: target.value.replace(/ /g, "")
                }));
              }}
            />
          </div>
          Loading: {loading.toString()}
          <div className='mb-4'>{localErrorInfoBox}</div>
          <div className='flex justify-center w-full'>
            <Button disabled={!code} onClick={confirm} className='w-full'>
              {t("confirm")}
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );

  return {
    confirmationModal,
    requestConfirmation
  };
};

export default usePinConfirmation;
