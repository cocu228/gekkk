import styles from "./styles.module.scss";
import {
  RegisterOptionsToChangePass,
  ChangePass,
} from "./api/change-password";
import CheckList from "./helpers/checklist";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Input from "@/shared/ui/input/Input";
import Button from "@/shared/ui/button/Button";
import {IconApp} from "@/shared/ui/icons/icon-app";
import { useNavigate } from "react-router-dom";
import { BoxWrapper } from "@/shared/ui/mobile-wrapper/mobile-wrapper";

export function ChangePassword() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [timer, setTimer] = useState(0);
  const [phoneNumber] = useState<string>();
  const [options, setOptions] = useState();
  const [newPass, setNewPass] = useState<string>();
  const [valid, setValid] = useState<boolean>(false);
  const [challengeReg, setChallengeReg] = useState();
  const [confirmCode, setConfirmCode] = useState<string>();
  const [confirmNewPass, setConfirmNewPass] = useState<string>();
  const [smsCodeSent, setSmsCodeSent] = useState<boolean>(false);

  const [code, setCode] = useState("t41");
  const [type, setType] = useState('password');
  const [codeConfirmed, setCodeConfirm] = useState("t41");
  const [typeConfirmed, setTypeConfirm] = useState('password');
  
  const startTimer = () => setTimer(60);

  const passSave = (e: any) => {
    setNewPass(e.target.value);
  };

  const handleToggle = () => {
    if (type==='password'){
      setCode('t71')
      setType('text')
    } else {
      setCode('t41')
      setType('password')
    }
  }

  const handleToggleConfirmed = () => {
    if (typeConfirmed==='password'){
      setCodeConfirm('t71')
      setTypeConfirm('text')
    } else {
      setCodeConfirm('t41')
      setTypeConfirm('password')
    }
  }

  const passConfirm = (e: any) => {
    setConfirmNewPass(e.target.value);
  };

  const codeConfirm = (e: any) => {
    setConfirmCode(e.target.value);
  };

  const sendSmsCode = () => {
    startTimer();
    RegisterOptionsToChangePass(
      setOptions,
      setChallengeReg,
      setSmsCodeSent
    );
  }

  const onContinue = () => {
    if (!smsCodeSent) {
      sendSmsCode();
    }
    else {
      ChangePass(
        phoneNumber,
        newPass,
        confirmCode,
        options,
        challengeReg
      );
      setSmsCodeSent(false);
      setNewPass(null);
      setConfirmNewPass(null);
      setConfirmCode(null);
      setValid(false);
    }
  }

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
        <div className="bg-white md:p-[12px] w-full max-w-[400px] md:rounded-[8px] flex flex-col gap-[0.75rem]">
          <div className={styles.passwordLine}>
            <h4 className={styles.inputTitle}>{t("new_password")}:</h4>
            <Input
                allowDigits
                allowSymbols
                type={type}
                onChange={passSave}
                suffix={<IconApp className="cursor-pointer pt-1" size={20} code={code} color="var(--gek-additional)" onClick={handleToggle}/>}
                value={newPass}
                className="min-h-[30px] max-w-[190px] h-[37px] placeholder:text-[12px] py-0"
                placeholder={t("enter_password")}
            />
          </div>
          <div className={styles.passwordLine}>
            <h4 className={styles.inputTitle}>{t("confirm_password")}:</h4>
            <Input
              allowDigits
              allowSymbols
              type={typeConfirmed}
              onChange={passConfirm}
              suffix={<IconApp className="cursor-pointer pt-1" size={20} code={codeConfirmed} color="var(--gek-additional)" onClick={handleToggleConfirmed}/>}
              value={confirmNewPass}
              className="min-h-[30px] max-w-[190px] h-[37px] placeholder:text-[12px] py-0"
              placeholder={t("confirm_password")}
            />
          </div>
          <div className="flex justify-end pr-4">
            <CheckList setValid={setValid} value={newPass} />
          </div>
          {
            valid && smsCodeSent && (
              <div className={styles.passwordLine}>
                <h4 className={styles.inputTitle}>{t("confirmation_code")}:</h4>
                <Input
                  allowDigits
                  disabled={!smsCodeSent}
                  onChange={codeConfirm}
                  value={confirmCode}
                  className="min-h-[30px] max-w-[190px] h-[37px] placeholder:text-[12px] py-0"
                  placeholder={t("enter_confirm_code")}
                />
            </div>
            )
          }
          {!smsCodeSent ? null : timer > 0 ? (
            <div className={styles.Resend}>{t("resend_the_code")}:
              <span className={styles.ResendTimer}>{" "}{timer} {t("seconds")}</span>
            </div>
          ) : (
            <div onClick={sendSmsCode} className={`${styles.Resend} ${styles.ResendActive}`}>
              Resend the code
            </div>
          )}
          <div className="w-full flex flex-row justify-center min-h-[40px] gap-6">
            <Button
              className="w-full"
              disabled={
                // Disable send code if unvalid
                !valid || !(newPass === confirmNewPass) || !newPass.length
                // Disable save if unvalid
                || smsCodeSent ? !confirmCode : false
              }
              onClick={onContinue}
            >
              {t(smsCodeSent ? "confirm" : "send_code")}
            </Button>
            <Button
              skeleton
              className="w-full"
              onClick={() => navigate('/settings', { replace: true })}
            >
              <span className="capitalize">{t("back")}</span>
            </Button>
          </div>
        </div>
      </BoxWrapper>
    </div>
  );
}
