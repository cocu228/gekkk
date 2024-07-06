import styles from './style.module.scss';
import { useEffect, useState } from "react";
import { useUserKeys } from "./model/use-user-keys";
import { t } from "i18next";
import Loader from "@/shared/ui/loader";
import getUnixTime from "date-fns/getUnixTime";
import { formatDate } from "./model/date-formater";
import parseISO from "date-fns/parseISO";
import useModal from "@/shared/model/hooks/useModal";
import { UserKey } from "@/shared/(orval)api/auth/model/userKey";
import { Modal } from "@/shared/ui/modal/Modal";
import { apiCloseSessions, apiRemoveKey } from "@/shared/(orval)api/auth";
import { UserSession } from "@/shared/(orval)api/auth/model/userSession";
import { RegisterKey, RegisterOption } from "../change-password/api/register-key";
import Button from "@/shared/ui/button/Button";
import Input from "@/shared/ui/input/Input";
import { useNavigate } from "react-router-dom";
import { BoxWrapper } from '@/shared/ui/mobile-wrapper/mobile-wrapper';

interface IChallange {
  id: string;
  newCredential: string;
}

export function UserKeys() {
  const navigate = useNavigate();
  const [timer, setTimer] = useState(0);
  const [smsCode, setSmsCode] = useState<string>(null);
  const [keyToRemove, setKeyToRemove] = useState<UserKey>();
  const { isModalOpen, handleCancel, showModal } = useModal();
  const [smsCodeSent, setSmsCodeSent] = useState<boolean>(false);
  const [sessionToRemove, setSessionToRemove] = useState<UserSession>();
  const [challenge, setChallenge] = useState<IChallange>({
    newCredential: "",
    id: "",
  });

  const [keyDeleted, setKeyDeleted] = useState<boolean>(false);
  const keysList = useUserKeys(keyDeleted);

  function onRemoveKey(id) {
    apiRemoveKey({ key_id: id }).then(() => {
      setKeyDeleted(n => !n)
    })
  }

  const startTimer = () => setTimer(60);
  const onCloseSession = (id) => apiCloseSessions({ id: id });

  const sendSmsCode = () => {
    startTimer();
    RegisterOption(setChallenge, setSmsCodeSent);
  }

  function onContinue() {
    if (!smsCodeSent) {
      sendSmsCode();
    }
    else {
      RegisterKey(
        challenge.newCredential,
        challenge.id,
        smsCode,
        setKeyDeleted,
        setSmsCodeSent
      );
      setSmsCode("");
      setSmsCodeSent(false);
    }
  }

  // useEffect(() => {
  //   const setOtp = () => {
  //     const input = document.querySelector('input[autocomplete="one-time-code"]');

  //     console.log('OTP input:');
  //     console.log(input);

  //     if (!input) return;
  //     // Set up an AbortController to use with the OTP request
  //     const ac = new AbortController();
  //     const form = input.closest("form");
  //     if (form) {
  //       // Abort the OTP request if the user attempts to submit the form manually
  //       form.addEventListener("submit", (e) => {
  //         ac.abort();
  //       });
  //     }
      
  //     // Request the OTP via get()
  //     navigator.credentials
  //       .get({
  //         // @ts-ignore
  //         otp: { transport: ["sms"] },
  //         signal: ac.signal,
  //       })
  //       .then((otp) => {
  //         // When the OTP is received by the app client, enter it into the form
  //         // input and submit the form automatically
  //         // @ts-ignore
  //         input.value = otp.code;
  //         if (form) form.submit();
  //       })
  //       .catch((err) => {
  //         console.error(err);
  //       });
  //   }

  //   console.log(`"OTPCredential" in window: ${"OTPCredential" in window}`)

  //   if ("OTPCredential" in window) {
  //     window.addEventListener("DOMContentLoaded", setOtp);
  //   }

  //   return () => window.removeEventListener('DOMContentLoaded', setOtp);
  // })

  useEffect(() => {
    const timerInterval = setInterval(() => setTimer((prevTime) => {
      if (prevTime > 0) {
        return prevTime - 1;
      }

      clearInterval(timerInterval);
      return 0;
    }), 1000);

    return () => clearInterval(timerInterval);
  }, [timer]);

  return (
    <div className="w-full">
      <BoxWrapper>
        <div className={styles.addGekkeyBlock}>
          <div className={styles.TabTitleGroup}>
            <h4 className={styles.addGekkeyTitle}>{t("add_new_gekkey")}</h4>
            <hr className="border-[#DCDCD9]" />
          </div>
          <div className={styles.CodeWrap}>
            <span className={styles.CodeTitle}>
              {t("confirmation_code")}:
            </span>
            <Input
              allowDigits
              value={smsCode}
              disabled={!smsCodeSent}
              autoComplete='one-time-code'
              className={styles.CodeInput}
              placeholder={t("enter_sms_code")}
              onChange={({ target }) => setSmsCode(target.value)}
            />
          </div>
          {!smsCodeSent ? null : timer > 0 ? (
            <div className={styles.Resend}>Resend the code after:
              <span className={styles.ResendTimer}>{" "}{timer} seconds</span>
            </div>
          ) : (
            <div onClick={sendSmsCode} className={`${styles.Resend} ${styles.ResendActive}`}>
              Resend the code
            </div>
          )}
          <div className={styles.btnsBlock}>
            <Button
              className="w-full"
              onClick={onContinue}
              disabled={smsCodeSent ? !smsCode : false}
            >
              {t(smsCodeSent ? "create_key" : "send_sms")}
            </Button>
            <Button
              skeleton
              className="w-full"
              onClick={() => navigate('/settings', { replace: true })}
            >
              {t("back")}
            </Button>
          </div>
        </div>
        <div className={styles.keysWrap}>
          {keysList.map((key, index) => <div className={styles.keysItem}>
            <div className="w-4/5 overflow-hidden">
              {/* timestampToDateFormat(getUnixTime(parseISO(key?.utc_create))) */}
              <p className={styles.keyItemDate}>{formatDate(getUnixTime(parseISO(key?.utc_create)))}</p>
              <p className={styles.keyItemDate}>{t("type")}: {key.key_type}</p>
              <h4 className={styles.keyItemDate}>{t("public_key")}: {key?.public_key}</h4>
            </div>
            <div className={styles.keyBtnWrap}>
              <Button
                skeleton
                size="sm"
                custom={index === 0}
                color={index === 0 ? null : "red"}
                className={`w-full ${index === 0 ? styles.CurentButton : ""}`}
                onClick={() => {
                  showModal()
                  setKeyToRemove(key)
                }}
              >
                <span className="capitalize">
                  {index === 0 ? t("current") : t("remove")}
                </span>
              </Button>
            </div>
          </div>)
          }
          {!keysList.length && (
            <div className='relative mt-32 w-full'>
              <Loader className="top-1/2 m-0 left-[50%] translate-x-[-50%]" />
            </div>
          )}
        </div>
      </BoxWrapper>
      <Modal
        onCancel={handleCancel}
        placeBottom={window.innerWidth < 768}
        isModalOpen={isModalOpen}
        title={keyToRemove ? `${t('remove_key')}` : `${t('close_session')}`}
      >
        <span className={styles.ModalText}>
          {keyToRemove ? t("remove_key_warning") : t("close_session_warning")}
        </span>
        <div className='w-full flex mt-[25px] justify-center gap-[20px]'>
          {keyToRemove ? <><Button
            color="red"
            skeleton
            className="w-full"
            onClick={() => {
              onRemoveKey(keyToRemove.id)
              handleCancel()
            }}
          >
            {t("remove")}
          </Button>
            <Button
              color="green"
              skeleton
              className="w-full"
              onClick={() => {
                handleCancel()
                setKeyToRemove(null)
              }}
            >
              {t("cancel")}
            </Button> </> : <> <Button
              color="blue"
              onClick={() => {
                onCloseSession(sessionToRemove.id)
                handleCancel()
              }}
            >
              {t("close")}
            </Button>
            <Button
              color="blue"
              onClick={() => {
                setSessionToRemove(null)
                handleCancel()
              }}
            >
              {t("cancel")}
            </Button> </>
          }
        </div>
      </Modal>
    </div>
  )
}