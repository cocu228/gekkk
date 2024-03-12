import { MobileWrapper } from "@/shared/ui/mobile-wrapper/mobile-wrapper"
import { Typography } from "@/shared/ui/typography/typography"
import { MobileInput } from "@/shared/ui/mobile-input/mobile-input";
import { MobileButton } from "@/shared/ui/mobile-button/mobile-button";
import style from './style.module.scss'
import { useState } from "react";
import { useUserKeys } from "../model/use-user-keys";
import { t } from "i18next";
import Loader from "@/shared/ui/loader";
import { timestampToDateFormat } from '@/features/chat/model/helpers';
import getUnixTime from "date-fns/getUnixTime";
import { formatDate } from "../model/date-formater";
import parseISO from "date-fns/parseISO";
import useModal from "@/shared/model/hooks/useModal";
import { UserKey } from "@/shared/(orval)api/auth/model/userKey";
import Modal from "@/shared/ui/modal/Modal";
import { apiCloseSessions, apiRemoveKey } from "@/shared/(orval)api/auth";
import { UserSession } from "@/shared/(orval)api/auth/model/userSession";
import { RegisterKey, RegisterOption } from "../../change-password/api/register-key";

interface IChallange {
  newCredential:string,
  id:string,
}

export function UserKeys() {
    const [code, setCode] = useState<string>('');
    const keysList = useUserKeys();
    const {isModalOpen, handleCancel, showModal} = useModal();
    const [keyToRemove, setKeyToRemove] = useState<UserKey>();
    const [keyDeleted, setKeyDeleted] = useState<boolean>(false);
    const [sessionClosed, setSessionClosed] = useState<boolean>(false);
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
        apiCloseSessions({id: id}).then(res=>{      
          setSessionClosed(n=>!n)
        })
      }

    return (
        <MobileWrapper className="w-[90%]">
            <div className="substrate w-full rounded-lg flex flex-row justify-between items-center">
                <Typography variant={"h"}>Add new Gekkey:</Typography>
                <MobileInput 
                    wrapperClassName="w-1/2"
                    className="min-h-[40px]"
                    placeholder={t("enter_sms_code")} 
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    disabled={!smsSent}
                />
            </div>
            <div className="flex flex-row mt-10 min-h-[45px] gap-2">
                <MobileButton  
                  varitant="light" 
                  className="w-48"
                  onClick={()=> {
                    RegisterOption(setChallenge, setSmsSent)
                  }}
                >
                    Send SMS-code
                </MobileButton>
                <MobileButton 
                  className="w-24" 
                  varitant={code ? 'default' : 'disabeled'}
                  onClick={()=>{
                    RegisterKey(challenge.newCredential, challenge.id, code, setKeyDeleted, setSmsSent)
                  }}  
                >
                    Create key
                </MobileButton>
            </div>

            <div className="flex flex-col w-full items-center">

                {keysList.map((key,index) => <div className='substrate w-full rounded-lg flex flex-row items-center justify-between mt-6 max-h-[500px] gap-3'>
                <div className="w-4/5 overflow-hidden">
                {/* timestampToDateFormat(getUnixTime(parseISO(key?.utc_create))) */}
                    <Typography variant="p" color="light-green">{formatDate(getUnixTime(parseISO(key?.utc_create)))}</Typography>
                    <Typography variant="p" color="light-green">{t("type")}: {key.key_type}</Typography>
                    <Typography variant="h" color="light-green">{t("public_key")}: {key?.public_key}</Typography>
                </div>
                <div className="w-1/5 min-h-[45px] flex items-center justify-center">
                    <MobileButton
                    className={`w-full ${style.button}`}
                    onClick={()=>{
                        showModal()
                        setKeyToRemove(key)
                    }}
                    varitant={index === 0 ? 'warn' : 'alarm'}
                    >
                    {index === 0 ? 'Current' : t("remove")}
                    </MobileButton>
                </div>
                </div>)
                }
                {!keysList.length && (
                    <div className='relative mt-32'>
                        <Loader className="top-1/2 left-1/2"/>
                    </div>
                )}
            </div>
          
          <Modal
              closable={false}
              open={isModalOpen}
              title={keyToRemove?t('remove_key'):t("close_session")}
              width={400}
              footer={
                <div className='w-full flex justify-center gap-2'>
                  {keyToRemove ? <><MobileButton
                    onClick={()=>{
                      onRemoveKey(keyToRemove.id)
                      handleCancel()
                    }}
                    >
                    {t("remove")}
                  </MobileButton>
                  <MobileButton
                    onClick={()=>{
                      handleCancel()
                      setKeyToRemove(null)
                    }}
                  >
                    {t("cancel")}
                  </MobileButton> </>:<> <MobileButton
                    onClick={()=>{
                      onCloseSession(sessionToRemove.id)
                      handleCancel()
                    }}
                    >
                    {t("close")}
                  </MobileButton>
                  <MobileButton
                    onClick={()=>{
                      setSessionToRemove(null)
                      handleCancel()
                    }}
                  >
                    {t("cancel")}
                  </MobileButton> </>
        
                  }
                </div>
              }
          >
              <span>
                {keyToRemove?t("remove_key_warning"):t("close_session_warning")}
              </span>
          </Modal>
        </MobileWrapper>
    )
}