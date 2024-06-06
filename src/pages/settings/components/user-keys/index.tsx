import { MobileWrapper } from "@/shared/ui/mobile-wrapper/mobile-wrapper"
import style from './style.module.scss'
import { useState } from "react";
import { useUserKeys } from "./model/use-user-keys";
import { t } from "i18next";
import Loader from "@/shared/ui/loader";
import getUnixTime from "date-fns/getUnixTime";
import { formatDate } from "./model/date-formater";
import parseISO from "date-fns/parseISO";
import useModal from "@/shared/model/hooks/useModal";
import { UserKey } from "@/shared/(orval)api/auth/model/userKey";
import { Modal as ModalUi} from "@/shared/ui/ModalUi/Modal";
import { apiCloseSessions, apiRemoveKey } from "@/shared/(orval)api/auth";
import { UserSession } from "@/shared/(orval)api/auth/model/userSession";
import { RegisterKey, RegisterOption } from "../change-password/api/register-key";
import Button from "@/shared/ui/button/Button";
import Input from "@/shared/ui/input/Input";

interface IChallange {
  newCredential:string,
  id:string,
}

export function UserKeys() {
    const [code, setCode] = useState<string>(null);
    const [keyToRemove, setKeyToRemove] = useState<UserKey>();
    const [keyDeleted, setKeyDeleted] = useState<boolean>(false);
    const keysList = useUserKeys(keyDeleted);
    const {isModalOpen, handleCancel, showModal} = useModal();
    const [sessionToRemove, setSessionToRemove] = useState<UserSession>()

    const [smsSent, setSmsSent] = useState<boolean>(false)
    const [challenge, setChallenge] = useState<IChallange>({
      newCredential:"",
      id:"",
    })    


    function onRemoveKey(id){
      apiRemoveKey({key_id: id}).then(res=>{
          setKeyDeleted(n=>!n)
      })
    }

    function onCloseSession(id){
      apiCloseSessions({id: id});
    }

    return (
        <MobileWrapper className="w-[90%]">
            <div className={style.addGekkeyBlock}>
              <div className={style.TabTitleGroup}>
                  <h4 className={style.addGekkeyTitle}>{t("add_new_gekkey")}</h4>
                  <hr className="border-[var(--gek-dark-grey)]"/>
              </div>
              <div className={style.CodeWrap}>
                <span className={style.CodeTitle}>
                  {t("confirmation_code")}:
                </span>
                <Input
                    allowDigits
                    className={style.CodeInput}
                    placeholder={"-" + t("enter_sms_code") + "-"}
                    value={code}
                    onChange={({target}) => setCode(target.value)}
                    disabled={!smsSent}
                />
              </div>

              <div className={style.btnsBlock}>
                  <Button  
                    className={style.Button + " w-[120px]"}
                    onClick={()=> {
                      RegisterOption(setChallenge, setSmsSent)
                    }}
                  >
                      {t("send_sms")}
                  </Button>
                  <Button
                    className="w-full"
                    disabled={!smsSent}
                    onClick={()=>{
                      RegisterKey(challenge.newCredential, challenge.id, code, setKeyDeleted, setSmsSent)
                      setCode("")
                    }}
                  >
                      {t("create_key")}
                  </Button>
              </div>
            </div>

            <div className={style.keysWrap}>
                {keysList.map((key,index) => <div className={style.keysItem}>
                  <div className="w-4/5 overflow-hidden">
                    {/* timestampToDateFormat(getUnixTime(parseISO(key?.utc_create))) */}
                    <p className={style.keyItemDate}>{formatDate(getUnixTime(parseISO(key?.utc_create)))}</p>
                    <p className={style.keyItemDate}>{t("type")}: {key.key_type}</p>
                    <h4 className={style.keyItemDate}>{t("public_key")}: {key?.public_key}</h4>
                  </div>
                  <div className={style.keyBtnWrap}>
                    <Button
                      skeleton
                      size="sm"
                      custom={index === 0}
                      color={index === 0 ? null : "red"}
                      className={`w-full ${index === 0 ? style.CurentButton : ""}`}
                      onClick={()=>{
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
                  <Loader className="top-1/2 m-0 left-[50%] translate-x-[-50%]"/>
                </div>
                )}
            </div>
            <ModalUi
              closable={false}
              noBorder
              onCancel={handleCancel}
              placeBottom={window.innerWidth<768}
              isModalOpen={isModalOpen}
              title={keyToRemove ? `${t('remove_key')}` : `${t('close_session')}`}
            >
              <span>
                {keyToRemove?t("remove_key_warning"):t("close_session_warning")}
              </span>
              <div className='w-full flex mt-[20px] justify-center gap-2'>
                  {keyToRemove ? <><Button
                    color="blue"
                    onClick={()=>{
                      onRemoveKey(keyToRemove.id)
                      handleCancel()
                    }}
                    >
                    {t("remove")}
                  </Button>
                  <Button
                    color="blue"
                    onClick={()=>{
                      handleCancel()
                      setKeyToRemove(null)
                    }}
                  >
                    {t("cancel")}
                  </Button> </>:<> <Button
                    color="blue"
                    onClick={()=>{
                      onCloseSession(sessionToRemove.id)
                      handleCancel()
                    }}
                    >
                    {t("close")}
                  </Button>
                  <Button
                    color="blue"
                    onClick={()=>{
                      setSessionToRemove(null)
                      handleCancel()
                    }}
                  >
                    {t("cancel")}
                  </Button> </>
        
                  }
                </div>
            </ModalUi>
        </MobileWrapper>
    )
}