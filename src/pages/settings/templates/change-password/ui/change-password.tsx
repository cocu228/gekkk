import { MobileWrapper } from "@/shared/ui/mobile-wrapper/mobile-wrapper"
import { Typography } from "@/shared/ui/typography/typography"
import { MobileInput } from "@/shared/ui/mobile-input/mobile-input";
import { MobileButton } from "@/shared/ui/mobile-button/mobile-button";
import style from '../style/style.module.scss'
import { RegisterOptionsToChangePass, ChangePass } from "../api/change-password";
import CheckList from "../helpers/checklist";
import { useState } from "react";
import { useTranslation } from "react-i18next";


export function ChangePassword() {
    const {t} = useTranslation();

  const [changeCodeSent, setChangeCodeSent] = useState<boolean>(false)
  const [confirmCode, setConfirmCode] = useState<string>()
  const [newPass, setNewPass] = useState<string>()
  const [confirmNewPass, setConfirmNewPass] = useState<string>()
  const [phoneNumber, setPhoneNumber] = useState<string>()
  const [options, setOptions] = useState()
  const [challengeReg, setChallengeReg] = useState()
  const [valid, setValid] = useState<boolean>(false)

    return (
        <MobileWrapper className="w-full">
            <div className="substrate w-full rounded-lg flex flex-col gap-3">
                <div className="flex flex-row justify-between items-center">
                    <Typography variant="h">New password:</Typography>
                    <MobileInput 
                    wrapperClassName="w-1/2"
                    className="min-h-[40px]"
                    placeholder={t("enter_new_password")} 
                    value={newPass}
                    onChange={(e)=>{setNewPass(e.target.value)}}
                    />
                </div>
                <div className="flex flex-row justify-between items-center">
                    <Typography variant="h">{t("confirm_password")}:</Typography>
                    <MobileInput 
                    wrapperClassName="w-1/2"
                    className="min-h-[40px]"
                    placeholder={t("confirm_new_password")}
                    value={confirmNewPass}
                    onChange={(e)=>{setConfirmNewPass(e.target.value)}}
                    />
                </div>
                <div className="flex justify-end">
                    <CheckList setValid={setValid} value={newPass}/>
                </div>
                <div className="flex flex-row justify-between items-center">
                    <Typography variant="h">{t("confirmation_code")}:</Typography>
                    <MobileInput 
                    value={confirmCode}
                    onChange={(e)=>{setConfirmCode(e.target.value);
                    }}
                    disabled={!changeCodeSent} 
                    placeholder={t("enter_confirm_code")} 
                    wrapperClassName="w-1/2"
                    className="min-h-[40px]"
                    />
                </div>
            
                <div className='w-full flex flex-row justify-center min-h-[40px] gap-6'>
                    <MobileButton
                    varitant={!valid || !(newPass === confirmNewPass) ? 'disabeled' : 'default'}
                    onClick={()=>{
                        if(valid && newPass === confirmNewPass){
                        RegisterOptionsToChangePass(setOptions, setChallengeReg, setChangeCodeSent)
                        }
                    }}
                    className="w-36"
                    >
                    {t('send_code')}
                    </MobileButton>
                    <MobileButton
                    varitant={!changeCodeSent ? 'disabeled' : 'default'}
                    onClick={()=>{
                        if((newPass === confirmNewPass) && changeCodeSent){
                        ChangePass(phoneNumber, newPass, confirmCode, options, challengeReg)
                        setChangeCodeSent(false)
                        }
                    }}
                    >
                    {t('Save')}
                    </MobileButton>
                </div>
            </div>
        </MobileWrapper>
    )
}