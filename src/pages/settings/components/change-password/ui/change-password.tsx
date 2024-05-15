import styles from "../styles.module.scss";
import {
  RegisterOptionsToChangePass,
  ChangePass,
} from "../api/change-password";
import CheckList from "../helpers/checklist";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Input from "@/shared/ui/input/Input";
import Button from "@/shared/ui/!button/Button";

export function ChangePassword() {
  const { t } = useTranslation();

  const [phoneNumber] = useState<string>();
  const [options, setOptions] = useState();
  const [newPass, setNewPass] = useState<string>();
  const [valid, setValid] = useState<boolean>(false);
  const [challengeReg, setChallengeReg] = useState();
  const [confirmCode, setConfirmCode] = useState<string>();
  const [confirmNewPass, setConfirmNewPass] = useState<string>();
  const [changeCodeSent, setChangeCodeSent] = useState<boolean>(false);

  const passSave = (e: any) => {
    setNewPass(e.target.value);
  };

  const passConfirm = (e: any) => {
    setConfirmNewPass(e.target.value);
  };

  const codeConfirm = (e: any) => {
    setConfirmCode(e.target.value);
  };

  return (
    <div className="w-full">
      <div className={styles.passwordWrap}>
        <div className={styles.passwordLine}>
          <h4 className={styles.inputTitle}>{t("new_password")}:</h4>
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
          <Button
            color="green"
            className="w-full"
            disabled={!valid || !(newPass === confirmNewPass)}
            onClick={() => {
              RegisterOptionsToChangePass(
                setOptions,
                setChallengeReg,
                setChangeCodeSent
              );
            }}
          >
            {t("send_code")}
          </Button>
          <Button
            color="green"
            className="w-full"
            disabled={!(newPass === confirmNewPass && changeCodeSent)}
            onClick={() => {
              ChangePass(
                phoneNumber,
                newPass,
                confirmCode,
                options,
                challengeReg
              );
              setChangeCodeSent(false);
            }}
          >
            <span className="capitalize">{t("save")}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
