import Button from "@/shared/ui/button/Button";
import { AreaWrapper } from '../AreaWrapper'
import { useTranslation } from 'react-i18next';
import { Modal } from 'antd';
import { apiCloseSessions, apiLoginLog, apiResetPassword, apiSessions, apiUserKeys } from '@/shared/(orval)api/auth';
import { useEffect, useState } from 'react';
import { timestampToDayYear } from '@/features/chat/model/helpers';
import { parseISO } from 'date-fns';
import { UserKey, UserLoginLog, UserSession } from '@/shared/(orval)api/auth/model';
import getUnixTime from 'date-fns/getUnixTime';
import { timestampToDateFormat } from '@/features/chat/model/helpers';
import styles from "./styles.module.scss"
import useModal from "@/shared/model/hooks/useModal";
import { apiRemoveKey } from '@/shared/(orval)api/auth';
import Loader from '@/shared/ui/loader';
import { RegisterOption, RegisterKey } from './api/register-key';
import { apiGetUserInfo } from '../PersonalInformation/api/get-user-info';
import { ChangePass, RegisterOptionsToChangePass } from './api/change-password';
import PasswordInput from './helpers/passwordInput';
import CheckList from './helpers/checklist';
import Input from '@/shared/ui/input/Input';
interface ILimit {
  start:number,
  end:number
}

interface IChallange {
  newCredential:string,
  id:string,
}

export function AccessManagement(): JSX.Element | null{
  const {t} = useTranslation();
  const [keysList, setKeysList] = useState<UserKey[]>([])
  const [sessionsList, setSessionsList] = useState<UserSession[]>([])
  const [loginLogList, setLoginLogList] = useState<UserLoginLog[]>([])
  const [sessionToRemove, setSessionToRemove] = useState<UserSession>()
  const [smsSent, setSmsSent] = useState<boolean>(false)
  const [challenge, setChallenge] = useState<IChallange>({
    newCredential:"",
    id:"",
  })

  const {isModalOpen, handleCancel, showModal} = useModal();
  const [keyToRemove, setKeyToRemove] = useState<UserKey>()
  const [keyDeleted, setKeyDeleted] = useState<boolean>(false)
  const [sessionClosed, setSessionClosed] = useState<boolean>(false)
  const [limit, setLimit] = useState<ILimit>({start:0,end:5})
  const [smsCode, setSmsCode] = useState<string>()
  const [changeCodeSent, setChangeCodeSent] = useState<boolean>(false)
  const [confirmCode, setConfirmCode] = useState<string>()
  const [newPass, setNewPass] = useState<string>()
  const [confirmNewPass, setConfirmNewPass] = useState<string>()
  const [phoneNumber, setPhoneNumber] = useState<string>()
  const [options, setOptions] = useState()
  const [challengeReg, setChallengeReg] = useState()
  const [valid, setValid] = useState<boolean>(false)


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

  useEffect(()=>{
      let phone;
      apiGetUserInfo()
        .then(res => phone = res.data.result.phone)
        .then(res =>{
          setPhoneNumber(phone)
        })
      
  },[])

  useEffect(()=>{
    apiUserKeys().then(res => {
      const keysArrCurrent: UserKey[] = []
      const keysArrSort: UserKey[] = []
      res?.data?.result.map(el=>{
        if(el.current){
          keysArrCurrent.push(el)
        }
      })
      res?.data?.result.map(el=>{
        if(!el.current){
          keysArrSort.push(el)
        }
      })
      keysArrSort.sort((a, b) => getUnixTime(parseISO(b.utc_create)) - getUnixTime(parseISO(a.utc_create)))
      const newArr = keysArrCurrent.concat(keysArrSort)
      setKeysList(newArr)
    })
  },[keyDeleted])
  
  useEffect(()=>{
    apiSessions().then(res=>{
      const sortedSeesionsArr: UserSession[] = [...res?.data?.result]
      sortedSeesionsArr.sort((a, b) => getUnixTime(parseISO(b.utc_create)) - getUnixTime(parseISO(a.utc_create)))
      setSessionsList(sortedSeesionsArr)      
    })
  },[sessionClosed])

  useEffect(()=>{
    apiLoginLog().then(res=>{
      const sortedLoginArr: UserLoginLog[] = [...res?.data?.result]
      sortedLoginArr.sort((a, b) => getUnixTime(parseISO(b.utc_time)) - getUnixTime(parseISO(a.utc_time)))
      setLoginLogList(sortedLoginArr)      
    })
  },[sessionClosed])
  
  return (
    <>
      <div className={styles.MainContainer}>
        <AreaWrapper title={t("change_application_password")}>
          <div className={styles.inputsWrap}>
            <Input
              allowDigits
              allowSymbols
              placeholder={t("enter_new_password")} 
              value={newPass}
              onChange={(e)=>{setNewPass(e.target.value)}}
            />
            <Input 
              allowDigits
              allowSymbols
              placeholder={t("confirm_new_password")}
              value={confirmNewPass}
              onChange={(e)=>{setConfirmNewPass(e.target.value)}}
            />
            <CheckList setValid={setValid} value={newPass}/>
            <Input
              allowDigits
              allowSymbols 
              value={confirmCode}
              onChange={(e)=>{setConfirmCode(e.target.value);
              }}
              disabled={!changeCodeSent} 
              placeholder={t("enter_confirm_code")} 
            />
          </div>
          <div className={styles.btnsList}>
            <Button
              disabled={!valid || !(newPass === confirmNewPass)}
              onClick={()=>{
                if(valid && newPass === confirmNewPass){
                  RegisterOptionsToChangePass(setOptions, setChallengeReg, setChangeCodeSent)
                }
            
              }}
            >
              {t('send_code')}
            </Button>
            <Button
              disabled={!changeCodeSent}
              onClick={()=>{
                if((newPass === confirmNewPass) && changeCodeSent){
                  ChangePass(phoneNumber, newPass, confirmCode, options, challengeReg)
                  setChangeCodeSent(false)
                }
              }}
            >
              {t('Save')}
            </Button>
          </div>
        </AreaWrapper>
        <AreaWrapper secondary title={t("user_keys_list")}>
          <div className={styles.Container}>
            {keysList.slice(limit.start, limit.end).map((key,index) => <div className={index===0?styles.Key + " " + styles.CurrentKey:styles.Key}>
              <div className={styles.KeyText}>
                <span>{t("date")}: {timestampToDateFormat(getUnixTime(parseISO(key?.utc_create)))}</span>
                <span>{t("type")}: {key.key_type}</span>
                <span>{t("public_key")}: {key?.public_key}</span>
              </div>
              <div className={styles.Button}>
                <Button
                  className={styles.removeBtn}
                  program={index===0}
                  onClick={()=>{
                    showModal()
                    setKeyToRemove(key)
                  }}
                >
                  {t("remove")}
                </Button>
              </div>
            </div>)
            }
            {!keysList.length && <Loader/>}
            {(limit.end <= keysList.length-1 && keysList.length>5) ? <Button
              onClick={()=>
                {
                  setLimit({
                    start:limit.start,
                    end:limit.end+5
                  })
                }
              }
            >
              {t("show_more")}
            </Button>
            :
            !(keysList.length<=5) && <Button
              onClick={()=>
                {
                  setLimit({
                    start:0,
                    end:5
                  })
                }
              }
            >
              {t("hide")}
            </Button>
            }
          </div>
        </AreaWrapper>
        <AreaWrapper
          title={t("add_key")}
          secondary
        >
            <div className={styles.KeyAddingContainer}>
              <Input
                allowDigits
                value={smsCode}
                disabled={!smsSent}
                placeholder='Type SMS-code'
                onChange={(e)=>{setSmsCode(e.target.value)}}
              />
              {smsSent?
                <>
                  <Button
                    onClick={()=>{
                      RegisterKey(challenge.newCredential, challenge.id, smsCode, setKeyDeleted, setSmsSent)
                    }}
                  >
                    {t("confirm")}
                  </Button>
                  <Button
                    onClick={()=>{
                      setSmsSent(false)
                    }}
                  >
                    {t("cancel")}
                  </Button>
                </>
              :
                <Button
                  onClick={()=>{
                    RegisterOption(setChallenge, setSmsSent)
                  }}
                >
                  {t("send_sms_code")}
                </Button>
              }
            </div>
        </AreaWrapper>
        <AreaWrapper
          title={t("user_sessions")}
          secondary
        >
          <div className={styles.Container}>
            {sessionsList.slice(limit.start, limit.end).map((session,index) =>
              <div className={styles.Key}>
                <div className={styles.KeyText}>
                  <span>{t("date")}: {timestampToDateFormat(getUnixTime(parseISO(session?.utc_create)))}</span>
                  <span>{t("login_type")}: {session.login_type}</span>
                  <span>{t("ip")}: {session?.ip}</span>
                </div>
                <div className={styles.Button}>
                  <Button
                    className={styles.removeBtn}
                    onClick={()=>{
                      showModal()
                      setSessionToRemove(session)
                    }}
                  >
                    {t("close")}
                  </Button>
                </div>
              </div>)
            }
            {!sessionsList.length && <Loader/>}
            <div className='p-5'>
              {(sessionsList?.length > 1) && <Button
                onClick={()=>{
                  apiCloseSessions().then(res=>{setSessionClosed(n=>!n)})
                }}
              >
                {t("close_all")}
              </Button>}
            </div>
            {(limit.end <= sessionsList.length-1 && sessionsList.length>5) ? <Button
              onClick={()=>
                {
                  setLimit({
                    start:limit.start,
                    end:limit.end+5
                  })
                }
              }
            >
              {t("show_more")}
            </Button>
            :
            !(sessionsList.length<=5) && <Button
              onClick={()=>
                {
                  setLimit({
                    start:0,
                    end:5
                  })
                }
              }
            >
              {t("hide")}
            </Button>
            }
          </div>
        </AreaWrapper>
        <AreaWrapper
          title={t("login_log")}
          secondary
        >
            <div className={styles.Container}>
            {loginLogList.slice(limit.start, limit.end).map((login,index) =>
              <div className={styles.Key}>
                <div className={styles.KeyText}>
                  <span>{t("date")}: {timestampToDateFormat(getUnixTime(parseISO(login?.utc_time)))}</span>
                  <span>{t("device_info")}: {login.device_info}</span>
                  <span>{t("ip")}: {login?.ip}</span>
                </div>
              </div>)
            }
            {!loginLogList.length && <Loader/>}
            {(limit.end <= loginLogList.length-1 && loginLogList.length>5) ? <Button
              onClick={()=>
                {
                  setLimit({
                    start:limit.start,
                    end:limit.end+5
                  })
                }
              }
            >
              {t("show_more")}
            </Button>
            :
            !(loginLogList.length<=5) && <Button
              onClick={()=>
                {
                  setLimit({
                    start:0,
                    end:5
                  })
                }
              }
            >
              {t("hide")}
            </Button>
            }
          </div>
        </AreaWrapper>
        <Modal
              closable={false}
              open={isModalOpen}
              title={keyToRemove?t('remove_key'):t("close_session")}
              width={400}
              footer={
                <div className={styles.modalFooter}>
                  {keyToRemove ? <><Button
                    onClick={()=>{
                      onRemoveKey(keyToRemove.id)
                      handleCancel()
                    }}
                    >
                    {t("remove")}
                  </Button>
                  <Button
                    onClick={()=>{
                      handleCancel()
                      setKeyToRemove(null)
                    }}
                  >
                    {t("cancel")}
                  </Button> </>:<> <Button
                    onClick={()=>{
                      onCloseSession(sessionToRemove.id)
                      handleCancel()
                    }}
                    >
                    {t("close")}
                  </Button>
                  <Button
                    onClick={()=>{
                      setSessionToRemove(null)
                      handleCancel()
                    }}
                  >
                    {t("cancel")}
                  </Button> </>
        
                  }
                </div>
              }
          >
              <span>
                {keyToRemove?t("remove_key_warning"):t("close_session_warning")}
              </span>
          </Modal>
      </div>
    </>
  )
}
