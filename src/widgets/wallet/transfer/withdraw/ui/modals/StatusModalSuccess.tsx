import { Dispatch, SetStateAction } from 'react'
import { Modal } from 'antd';
import Button from '@/shared/ui/button/Button';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import styles from "../forms/styles.module.scss"
import ReceiptIcon from "@/assets/receipt.svg?react"

type Props = {
    open: boolean;
    width?: number;
    setIsSuccess: Dispatch<SetStateAction<boolean>>,
    cancelParent?: () => void;
    refresh: () => void;
}

function StatusModalSuccess({
    open,
    width = 418,
    refresh,
    setIsSuccess,
    cancelParent
}: Props) {
  const {t} = useTranslation()

  return (
    <Modal
            width={width}
            open={open}
            closeIcon={<div></div>}
            onCancel={()=>{
                setIsSuccess(false)
                refresh()
            }}
            footer={null}
        >
            <div className='w-full flex flex-col gap-[30px] items-center'>
                <svg width="108" height="108" viewBox="0 0 108 108" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M54 0C24.3 0 0 24.3 0 54C0 83.7 24.3 108 54 108C83.7 108 108 83.7 108 54C108 24.3 83.7 0 54 0ZM54 99.9C28.62 99.9 8.1 79.38 8.1 54C8.1 28.62 28.62 8.1 54 8.1C79.38 8.1 99.9 28.62 99.9 54C99.9 79.38 79.38 99.9 54 99.9ZM82.08 38.88C82.08 39.96 81.54 41.04 81 41.58L50.76 71.82C50.22 72.36 49.14 72.9 48.06 72.9C46.98 72.9 45.9 72.36 45.36 71.82L28.08 54.54C27 53.5846 26.1692 52.5877 26.1692 51.5077C26.1692 49.3477 27.6231 47.3538 30.3231 47.3538C31.5692 47.5615 32.4 48.6 32.94 49.14L47.52 63.72L75.06 36.18C75.6 35.64 76.68 35.1 77.76 35.1C79.92 34.56 82.08 36.72 82.08 38.88Z" fill="#45AD77"/>
                </svg>

                <div className='text-center w-[80%] flex flex-col items-center gap-[30px]'>
                    <span className='font-bold text-[20px] text-[#3A5E66]'>
                        {t("success")}!
                    </span>
                    <span className='text-[12px] text-[#9D9D9D]'>
                        {t("your_transaction_success")} 
                        <NavLink to={"/support"}>
                            <span className='text-[#45AD77]'>
                                {t("our_support_team")}
                            </span>
                        </NavLink>
                    </span>
                </div>
                <div className={styles.ButtonContainer + " mt-[30px] px-4"}>
                    <Button
                        className='w-full'
                        onClick={()=>{
                            // to receipt TODO
                        }}
                        size='xl'
                        whiteGreenTransfer
                    >
                        <ReceiptIcon/>  {t("receipt")}
                    </Button>
                    <Button
                        className='w-full'
                        onClick={()=>{
                            setIsSuccess(false);
                            cancelParent();
                            refresh();
                        }}
                        size='xl'
                        blueTransfer
                    >
                        {t("close")}
                    </Button>
                </div>
            </div>
        </Modal>
  )
}

export default StatusModalSuccess