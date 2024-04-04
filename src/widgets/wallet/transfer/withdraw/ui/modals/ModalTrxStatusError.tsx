import Button from '@/shared/ui/button/Button';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import styles from "../forms/styles.module.scss"
import { useContext } from 'react';
import { CtxModalTrxResult } from '../../model/context';

type IParams = {}

function ModalTrxStatusError({}: IParams) {
  const {t} = useTranslation();
  const {handleCancel} = useContext(CtxModalTrxResult);

  return (
        <div className='w-full flex flex-col gap-[30px] items-center my-8 md:mb-4'>
            <svg width="108" height="108" viewBox="0 0 108 108" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_1190_22983)">
                    <path d="M54 0C24.2252 0 0 24.2252 0 54C0 83.7748 24.2252 108 54 108C83.7748 108 108 83.7748 108 54C108 24.2252 83.7748 0 54 0ZM54 8.30769C79.2845 8.30769 99.6923 28.7155 99.6923 54C99.6923 79.2845 79.2845 99.6923 54 99.6923C28.7155 99.6923 8.30769 79.2845 8.30769 54C8.30769 28.7155 28.7155 8.30769 54 8.30769ZM54 29.0769C51.7059 29.0769 49.8462 30.9367 49.8462 33.2308V58.1538C49.8462 60.448 51.7059 62.3077 54 62.3077C56.2941 62.3077 58.1538 60.448 58.1538 58.1538V33.2308C58.1538 30.9367 56.2941 29.0769 54 29.0769ZM54 70.6154C51.7059 70.6154 49.8462 72.4751 49.8462 74.7692C49.8462 77.0633 51.7059 78.9231 54 78.9231C56.2941 78.9231 58.1538 77.0633 58.1538 74.7692C58.1538 72.4751 56.2941 70.6154 54 70.6154Z" fill="#8F123A"/>
                </g>
                <defs>
                    <clipPath id="clip0_1190_22983">
                        <rect width="108" height="108" fill="white"/>
                    </clipPath>
                </defs>
            </svg>
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
                    className='w-full'
                    onClick={handleCancel}
                    size='xl'
                    blueTransfer
                >
                    {t("close")}
                </Button>
            </div>
        </div>
    );
}

export default ModalTrxStatusError;
