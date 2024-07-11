import Loader from "@/shared/ui/loader";
import Input from "@/shared/ui/input/Input";
import Modal from "@/shared/ui/modal/Modal";
import { $axios } from "@/shared/lib/(orval)axios";
import Button from "@/shared/ui/button/Button";
import { InternalAxiosRequestConfig } from "axios";
import { CtxRootData } from "@/processes/RootContext";
import useModal from "@/shared/model/hooks/useModal";
import useError from "@/shared/model/hooks/useError";
import { useContext, useEffect, useState } from "react";
import { getCookieData, scrollToTop } from "@/shared/lib/helpers";
import { CtxNeedConfirm } from "@/processes/errors-provider-context";
import { signHeadersGeneration } from "@/widgets/action-confirmation-window/model/helpers";
import { useTranslation } from "react-i18next";
import { setCookieData } from "@/shared/lib";
import { apiRequestCode, apiSignIn } from "@/shared/api";
import ModalTitle from "@/shared/ui/modal/modal-title/ModalTitle";

interface IState {
  code: string;
  token: string;
  loading: boolean;
  // return if PIN required
  //type: "SIGN" | "PIN";
  config: InternalAxiosRequestConfig<any>;
}

const ActionConfirmationWindow = () => {
  const [{ code, token, config, loading }, setState] = useState<IState>({
    code: null,
    token: null,
    config: null,
    loading: false,
  });
  const { t } = useTranslation();
  const { setRefresh } = useContext(CtxRootData);
  const phoneNumber = "79111111111"; //getCookieData<{phoneNumber: string}>();
  const { isModalOpen, handleCancel, showModal } = useModal();
  const [localErrorHunter, , localErrorInfoBox, localErrorClear] = useError();
  const {
    pending,
    setSuccess,
    actionConfirmResponse: response,
  } = useContext(CtxNeedConfirm);

  const onSingInUAS = async () => {
    const requestCodeResponse = await apiRequestCode(phoneNumber);
    const sessionIdUas = requestCodeResponse.data.sessid;

    const { data } = await apiSignIn(
      code.replace(/ /g, ""),
      sessionIdUas,
      phoneNumber
    );

    if (!data.success) {
      return;
    }

    setCookieData([
      {
        key: "bankToken",
        value: data.token,
        expiration: data.expires_in,
      },
    ]);
  };

  useEffect(() => {
    (async () => {
      if (response) {
        setState({
          code: null,
          loading: false,
          config: response.config,
          //type: response.config.headers['X-Confirmation-Type'],
          token: response.data.errors[0].properties.confirmationToken,
        });

        if (response.data?.errors[0]?.code === 449) {
          await confirm(true);
        } else {
          scrollToTop();
          showModal();
        }
      }
    })();
  }, [response]);

  const confirm = async (silentMode: boolean) => {
    setState((prev) => ({
      ...prev,
      loading: true,
    }));

    const signedRequest = async () => {
      const { bankToken } = getCookieData<{ bankToken: string }>();

      const signHeaders = await signHeadersGeneration(token);
      // type === "PIN"
      // ? await pinHeadersGeneration(token, code.replace(/ /g, ''));

      try {
        const response = await $axios.request({
          ...config,
          headers: {
            ...signHeaders,
            Token: bankToken,
            Authorization: phoneNumber,
          },
        });

        pending.resolve(response);

        handleCancel();
        setSuccess();
        //setRefresh();
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

    if (silentMode) {
      //  || type === 'PIN'
      await signedRequest();
    } else {
      onSingInUAS().then(signedRequest).catch(handleError);
    }
  };

  return (
    <Modal
      open={isModalOpen}
      closable={false}
      title={<ModalTitle handleCancel={handleCancel} title={t("confirm_action")}/>}
      padding
      onCancel={() => {
        handleCancel();
        localErrorClear();
      }}
    >
      {loading && <Loader className="" />}

      <div className={loading ? "collapse" : ""}>
        <div className="row -mt-5 mb-2">
          <div className="col">
            <span className="text-gray-600">
              {t("to_confirm_enter_sms_code")}:
            </span>
          </div>
        </div>

        <div className="mb-4">
          <Input
            allowDigits
            type="text"
            value={code}
            maxLength={11}
            autoComplete="off"
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

        <div>
          <Button
            size={"xl"}
            disabled={!code}
            onClick={() => confirm(false)}
            className="w-full mt-4"
          >
            {t("confirm")}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ActionConfirmationWindow;
