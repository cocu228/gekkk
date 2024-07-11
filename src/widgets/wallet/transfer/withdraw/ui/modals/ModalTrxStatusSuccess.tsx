import Button from '@/shared/ui/button/Button';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import styles from "../forms/styles.module.scss"
import { useContext } from 'react';
import {CtxGlobalModalContext} from "@/app/providers/CtxGlobalModalProvider";
import { IconApp } from '@/shared/ui/icons/icon-app';

interface IParams {
    
}

function ModalTrxStatusSuccess({}: IParams) {
  const {t} = useTranslation();
  const {handleCancel} = useContext(CtxGlobalModalContext);

  return (
    <div className='w-full flex flex-col items-center md:mb-4'>
        <IconApp code="t57" size={108} color="#45AD77" className='mb-[30px]' />  

        <div className='text-center w-[80%] flex flex-col items-center gap-[20px]'>
            <span className='font-bold font-[Inter] text-[20px] text-[#3A5E66]'>
                {t("success")}!
            </span>
            <span className='md:text-[12px] font-normal text-[#9D9D9D]'>
                {t("your_transaction_success")} {" "} <br />
                <NavLink to={"/support"}>
                    <span className='text-[#45AD77]'>
                        {t("our_support_team")}
                    </span>
                </NavLink>
            </span>
        </div>
        <div className={`${styles.ButtonContainer} flex gap-[20px] align-center mt-[10px] md:mt-[30px] px-4`}>
            <Button
                color='blue'
                className='w-full'
                onClick={handleCancel}
            >
                {t("close")}
            </Button>
        </div>
    </div>
  )
}

export default ModalTrxStatusSuccess;
