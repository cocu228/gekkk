import { MobileWrapper } from "@/shared/ui/mobile-wrapper/mobile-wrapper";
import { MobileButton } from "@/shared/ui/mobile-button/mobile-button";
import styles from "../styles.module.scss";
import {
  RegisterOptionsToChangePass,
  ChangePass,
} from "../api/change-password";
import CheckList from "../helpers/checklist";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Input from "@/shared/ui/input/Input";

export function ChangePassword() {
  const { t } = useTranslation();

  const [changeCodeSent, setChangeCodeSent] = useState<boolean>(false);
  const [confirmCode, setConfirmCode] = useState<string>();
  const [newPass, setNewPass] = useState<string>();
  const [confirmNewPass, setConfirmNewPass] = useState<string>();
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const [options, setOptions] = useState();
  const [challengeReg, setChallengeReg] = useState();
  const [valid, setValid] = useState<boolean>(false);

  const passSave = (e: any) => {
    setNewPass(e.target.value);
  };

  const passConfirm = (e: any) => {
    setConfirmNewPass(e.target.value);
  };

  const codeConfirm = (e: any) => {
    setConfirmCode(e.target.value);
  };

  const handleEyeClick = () => {
    
  }

  return (
    <MobileWrapper className="w-full">
      <div className={styles.passwordWrap}>
        <div className={styles.passwordLine}>
          <h4 className={styles.inputTitle}>{t("new_password")}:</h4>
          {/* <MobileInput 
                    wrapperClassName="w-1/2"
                    className="min-h-[40px]"
                    placeholder={t("enter_new_password")} 
                    value={newPass}
                    onChange={(e)=>{setNewPass(e.target.value)}}
                    /> */}
            <Input
              eye={true}
              allowDigits
              allowSymbols
              onChange={passSave}
              value={newPass}
              wrapperClassName="w-1/2"
              className="min-h-[40px] h-[52px]"
              placeholder={t("enter_new_password")}
            />
        </div>
        <div className={styles.passwordLine}>
          <h4 className={styles.inputTitle}>{t("confirm_password")}:</h4>
          {/* <MobileInput
            wrapperClassName="w-1/2"
            className="min-h-[40px]"
            placeholder={t("confirm_new_password")}
            value={confirmNewPass}
            onChange={(e) => {
              setConfirmNewPass(e.target.value);
            }}
          /> */}
          <Input
            eye={true}
            allowDigits
            allowSymbols
            onChange={passConfirm}
            value={confirmNewPass}
            wrapperClassName="w-1/2"
            className="min-h-[40px] h-[52px]"
            placeholder={t("confirm_new_password")}
          />
        </div>
        <div className="flex justify-end">
          <CheckList setValid={setValid} value={newPass} />
        </div>
        <div className={styles.passwordLine}>
          <h4 className={styles.inputTitle}>{t("confirmation_code")}:</h4>
          {/* <MobileInput
            value={confirmCode}
            onChange={(e) => {
              setConfirmCode(e.target.value);
            }}
            disabled={!changeCodeSent}
            placeholder={t("enter_confirm_code")}
            wrapperClassName="w-1/2"
            className="min-h-[40px]"
          /> */}
          <Input
            allowDigits
            disabled={!changeCodeSent}
            onChange={codeConfirm}
            value={confirmCode}
            wrapperClassName="w-1/2"
            className="min-h-[40px]"
            placeholder={t("enter_confirm_code")}
          />
        </div>
        <div className="w-full flex flex-row justify-center min-h-[40px] gap-6">
          <MobileButton
            varitant={
              !valid || !(newPass === confirmNewPass) ? "disabeled" : "default"
            }
            onClick={() => {
              if (valid && newPass === confirmNewPass) {
                RegisterOptionsToChangePass(
                  setOptions,
                  setChallengeReg,
                  setChangeCodeSent
                );
              }
            }}
            className="w-36"
          >
            {t("send_code")}
          </MobileButton>
          <MobileButton
            varitant={!changeCodeSent ? "disabeled" : "default"}
            onClick={() => {
              if (newPass === confirmNewPass && changeCodeSent) {
                ChangePass(
                  phoneNumber,
                  newPass,
                  confirmCode,
                  options,
                  challengeReg
                );
                setChangeCodeSent(false);
              }
            }}
          >
            <span className="capitalize">{t("save")}</span>
          </MobileButton>
        </div>
      </div>
    </MobileWrapper>
  );
}
