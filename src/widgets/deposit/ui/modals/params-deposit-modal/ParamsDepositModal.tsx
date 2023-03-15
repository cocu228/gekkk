import {Modal} from "antd";
import Button from "@/shared/ui/button/Button";
import styles from "./style.module.scss"

interface IParamsDepositModal {
    isModalOpen: boolean,
    handleCancel: () => void
}

const ParamsDepositModal = ({isModalOpen, handleCancel}: IParamsDepositModal) => {

    return (
        <Modal open={isModalOpen} footer={null} onCancel={handleCancel} width="454px">
            <div className="p-10">
                <p className="font-bold text-xl">Your deposit parameters</p>
                <div className="pt-5 pb-8">
                    <div className='flex justify-between items-end mb-3 gap-1'>
                        <p className="text-gekGray whitespace-nowrap font-medium">Deposit</p>
                        <div className={styles.ParamsLine}/>
                        <p className="whitespace-nowrap font-medium">Fixed rate deposit: 0,8% per month</p>
                    </div>

                    <div className='flex justify-between items-end mb-3 gap-1'>
                        <p className="text-gekGray whitespace-nowrap font-medium">Opened</p>
                        <div className={styles.ParamsLine}/>
                        <p className="whitespace-nowrap font-medium">25.01.2023 at 16:04</p>
                    </div>

                    <div className='flex justify-between items-end mb-3 gap-1'>
                        <p className="text-gekGray whitespace-nowrap font-medium">Deposit amount</p>
                        <div className={styles.ParamsLine}/>
                        <p className="whitespace-nowrap font-medium">1000 EURG</p>
                    </div>

                    <div className='flex justify-between items-end mb-3 gap-1'>
                        <p className="text-gekGray whitespace-nowrap font-medium">Payments</p>
                        <div className={styles.ParamsLine}/>
                        <p className="whitespace-nowrap font-medium">Every 30 days</p>
                    </div>

                    <div className='flex justify-between items-end mb-3 gap-1'>
                        <p className="text-gekGray whitespace-nowrap font-medium">Term</p>
                        <div className={styles.ParamsLine}/>
                        <p className="whitespace-nowrap font-medium">360 days (until 22.02.2024 at 16:04)</p>
                    </div>
                </div>
                <Button className={"w-full !text-white rounded-b bg-blue-600 disabled:opacity-50"} onClick={handleCancel}>Confirm</Button>
            </div>
        </Modal>
    )
}

export default ParamsDepositModal