import Button from '@/shared/ui/button/Button';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import styles from "../forms/styles.module.scss"
import { useContext } from 'react';
import {CtxGlobalModalContext} from "@/app/providers/CtxGlobalModalProvider";
import { IconApp } from '@/shared/ui/icons/icon-app';

interface IParams {
    onReceipt?: (() => (void | Promise<void>)) | null;
}

function ModalTrxStatusSuccess({
    onReceipt = null
}: IParams) {
  const {t} = useTranslation();
  const {handleCancel} = useContext(CtxGlobalModalContext);

  return (
    <div className='w-full flex flex-col gap-[30px] items-center my-8 md:mb-4'>
        <IconApp code="t57" size={108} color="#45AD77" />  

        <div className='text-center w-[80%] flex flex-col items-center gap-[30px]'>
            <span className='font-bold text-[20px] text-[#3A5E66]'>
                {t("success")}!
            </span>
            <span className='md:text-[12px] text-[#9D9D9D]'>
                {t("your_transaction_success")} {" "}
                <NavLink to={"/support"}>
                    <span className='text-[#45AD77]'>
                        {t("our_support_team")}
                    </span>
                </NavLink>
            </span>
        </div>
        <div className={(onReceipt !== null ? styles.ButtonContainer : styles.ButtonContainerCenter) + " mt-[10px] md:mt-[30px] px-4"}>
            {onReceipt === null ? null : (
                <Button
                    skeleton
                    className='w-full'
                    onClick={onReceipt}
                >
                    <IconApp size={20} code="t58" color="#2BAB72" />  {t("receipt")}
                </Button>
            )}

            <Button
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
