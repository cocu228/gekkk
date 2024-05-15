import Button from '@/shared/ui/button/Button';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import styles from "../forms/styles.module.scss"
import { useContext } from 'react';
import { CtxModalTrxResult } from '../../model/context';
import { IconApp } from '@/shared/ui/icons/icon-app';

type IParams = {}

function ModalTrxStatusError({}: IParams) {
  const {t} = useTranslation();
  const {handleCancel} = useContext(CtxModalTrxResult);

  return (
        <div className='w-full flex flex-col gap-[30px] items-center my-8 md:mb-4'>
            <IconApp code="t56" size={108} color="#8F123A" />  
            <div className='text-center w-[80%] flex flex-col items-center gap-[30px]'>
                <span className='font-bold text-[20px] text-[#3A5E66]'>
                    {t("transfer_error")}
                </span>
                <span className='text-[12px] text-[#9D9D9D]'>
                    {t("your_transfer_was_not_completed")} 
                    <NavLink to={"/support"}>
                        <span className='text-[#45AD77]'>{" "}
                            {t("our_support_team")}
                        </span>
                    </NavLink>
                </span>
            </div>
            <div className={styles.ButtonContainerCenter + " mt-[30px]"}>
                <Button
                    size='lg'
                    color="blue"
                    className='w-full'
                    onClick={handleCancel}
                >
                    {t("close")}
                </Button>
            </div>
        </div>
    );
}

export default ModalTrxStatusError;
