import { Box, TextField } from '@mui/material'
import Button from "@/shared/ui/button/Button";
import { AreaWrapper } from '../AreaWrapper'
import { useTranslation } from 'react-i18next';
import { Grid, Modal } from 'antd';
import { apiUserKeys } from '@/shared/(orval)api/auth';
import { useEffect, useState } from 'react';
import { log } from 'console';
import { timestampToDayYear } from '@/features/chat/model/helpers';
import { parseISO } from 'date-fns';
import { UserKey } from '@/shared/(orval)api/auth/model';
import getUnixTime from 'date-fns/getUnixTime';
import { timestampToDateFormat } from '@/features/chat/model/helpers';
import styles from "./styles.module.scss"
import useModal from "@/shared/model/hooks/useModal";
import { apiRemoveKey } from '@/shared/(orval)api/auth';

interface ILimit {
  start:number,
  end:number
}

export function AccessManagement(): JSX.Element | null{
  const {t} = useTranslation();
  const [keysList, setKeysList] = useState<UserKey[]>([])
  const {isModalOpen, handleCancel, showModal} = useModal();
  const [keyToRemove, setKeyToRemove] = useState<UserKey>()
  const [keyDeleted, setKeDeleted] = useState<boolean>(false)
  const [limit, setLimit] = useState<ILimit>({start:0,end:5})

  function onRemove(id){
    apiRemoveKey({key_id: id}).then(res=>{
      setKeDeleted(n=>!n)
    })
    
  }

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
  
  return (
    <>
      <AreaWrapper title={t("change_application_password")}>
        <Box display="flex" padding="36px 0" gap="24px" flexDirection="column">
          <TextField label={t("current_online_bank_password")} placeholder={t("enter_password")} />
          <TextField label={t("new_online_bank_password")} placeholder={t("enter_new_password")} />
        </Box>
        <Button>{t('Save')}</Button>
      </AreaWrapper>
      <AreaWrapper secondary title={t("user_keys_list")}>
        <div className={styles.KeysContainer}>
          {keysList.slice(limit.start, limit.end).map((key,index) => <div className={index===0?styles.Key + " " + styles.CurrentKey:styles.Key}>
            <div className={styles.KeyText}> 
              <span>{t("date")}: {timestampToDateFormat(getUnixTime(parseISO(key?.utc_create)))}</span>
              <span>{t("type")}: {key.key_type}</span>
              <span>{t("public_key")}: {key?.public_key}</span>
            </div>
            <div className={styles.KeyButton}>
              <Button
                className='absolute right-0 mr-5 justify-center'
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
          {(limit.end <= keysList.length && keysList.length>5) ? <Button 
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
          <Button 
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
            title={t('remove_key')}
            width={400}
            footer={
              <div className='w-full flex justify-center gap-2'>
                <Button 
                  onClick={()=>{
                    onRemove(keyToRemove.id)
                    handleCancel()
                  }}
                  >
                  {t("remove")}
                </Button>
                <Button onClick={handleCancel}>
                  {t("cancel")}
                </Button>
              </div>
            }
        >
            <span>
              {t("remove_key_warning")}
            </span>
        </Modal>
    </>
  )
}
