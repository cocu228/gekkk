import styles from "./styles.module.scss";
import {
  RegisterOptionsToChangePass,
  ChangePass,
} from "./api/change-password";
import CheckList from "./helpers/checklist";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Input from "@/shared/ui/input/Input";
import Button from "@/shared/ui/button/Button";
import {IconApp} from "@/shared/ui/icons/icon-app";

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
  const [code, setCode] = useState("t84");
  const [type, setType] = useState('password');

  const passSave = (e: any) => {
    setNewPass(e.target.value);
  };

  const handleToggle = () => {
    if (type==='password'){
      setCode('t85')
      setType('text')
    } else {
      setCode('t84')
      setType('password')
    }
  }

  const passConfirm = (e: any) => {
    setConfirmNewPass(e.target.value);
  };

  const codeConfirm = (e: any) => {
    setConfirmCode(e.target.value);
  };

  useEffect(() => {
    console.log('VALID', valid)
  }, [valid])

  return (
    <div className="w-full">
      <div className={styles.passwordWrap}>
        <div className={styles.passwordLine}>
          <h4 className={styles.inputTitle}>{t("new_password")}:</h4>
          <Input
              allowDigits
              allowSymbols
              type={type}
              onChange={passSave}
              suffix={<IconApp className="cursor-pointer pt-1" size={20} code={code} onClick={handleToggle}/>}
              value={newPass}
              className="min-h-[40px] h-[52px]"
              placeholder={t("enter_new_password")}
          />
        </div>
        <div className={styles.passwordLine}>
          <h4 className={styles.inputTitle}>{t("confirm_password")}:</h4>
          <Input
            allowDigits
            allowSymbols
            onChange={passConfirm}
            suffix={<IconApp className="cursor-pointer pt-1" size={20} code={code} onClick={handleToggle}/>}
            value={confirmNewPass}
            className="min-h-[40px] h-[52px]"
            placeholder={t("confirm_new_password")}
          />
        </div>
        <div className="flex justify-end pr-4">
          <CheckList setValid={setValid} value={newPass} />
        </div>
        {
          valid && (
            <div className={styles.passwordLine}>
              <h4 className={styles.inputTitle}>{t("confirmation_code")}:</h4>
              <Input
                allowDigits
                disabled={!changeCodeSent}
                onChange={codeConfirm}
                value={confirmCode}
                className="min-h-[40px]"
                placeholder={t("enter_confirm_code")}
              />
          </div>
          )
        }
        <div className="w-full flex flex-row justify-center min-h-[40px] gap-6">
          <Button
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
