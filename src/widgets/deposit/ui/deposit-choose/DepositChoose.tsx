import {RadioChangeEvent} from "antd";
import React, {useState} from "react";
import Button from "@/shared/ui/button/Button";
import useModal from "@/shared/model/hooks/useModal";
import PercentBtn from '@/shared/ui/percent-btn/PercentBtn';
import ParamsDepositModal from "@/widgets/deposit/ui/modals/ParamsDepositModal";
import ClosingConditionsModal from "@/widgets/deposit/ui/modals/ClosingConditionsModal";
import DepositRadio from "../deposit-radio";
import DepositInput from "../deposit-input";
import InfoBlock from "../info-block";
import styles from "./style.module.scss"

const DepositChoose = () => {

    const paramsModal = useModal()
    const conditionsModal = useModal();

    const [radio, setRadio] = useState(1)

    const onChangeRadio = (event: RadioChangeEvent) => {
        setRadio(event.target.value)
    }

    return (
    <div className={`${styles.DepositChoose} wrapper col-span-3 bg-white rounded-l-md p-10 flex flex-col justify-between items-start xxl:py-3 xxl:px-4 xl:col-span-5 md:bg-transparent md:p-0`}>
        <p className="text-base font-medium text-gray mb-6 md:text-sm md:mb-4">Choose deposit types</p>

        <div className="wrapper grid grid-cols-2 gap-6 mb-8 w-full xxl:justify-between">
            <DepositRadio 
                title="Fixed rate" 
                subtitle={<><span className="font-bold">9,6%</span> per annum (<span className="font-bold">0,8%</span> per month)</>}
                value={1} 
                checked={radio === 1} 
                onChange={onChangeRadio} 
                name={"deposit-types"}
            />
            <DepositRadio 
                title="Structured" 
                subtitle="Crypto investments with customizable risk/profit"
                value={2} 
                checked={radio === 2} 
                onChange={onChangeRadio} 
                name={"deposit-types"}
            />
        </div>

        <div className="wrapper mb-8 hidden xl:block md:mb-5">
            <InfoBlock />
        </div>

        <div className="wrapper w-full mb-10 xl:mb-8 md:mb-7">
            <div className="row flex justify-between mb-2 md:mb-1">
                <p className="text-gray font-medium text-base md:text-sm">Enter deposit amount</p>

                <div className="row flex gap-1">
                    <PercentBtn>25%</PercentBtn>
                    <PercentBtn>50%</PercentBtn>
                    <PercentBtn>75%</PercentBtn>
                    <PercentBtn>100%</PercentBtn>
                </div>
            </div>

            <DepositInput />
        </div>

        <Button className="w-full mb-5 md:mb-3" onClick={paramsModal.showModal}>Open deposit</Button>

        <div className="row mb-60 xxl:mb-40 xl:mb-8 md:mb-6">
            <p className="text-gekGray text-center text-xs">
                The deposit services are provided by Adventarium PTE.LTD. 
                By pressing button "Open deposit" 
                I confirm that I have read carefully and fully accepted
                {' '}
                <a
                    className='font-inherit text-blue-300 underline'
                    href="https://gekkoin.com/source/GeneralTermsandConditions.pdf"
                    target="_blank"
                    rel="noreferrer noopener"
                    >
                    Terms and Conditions with Risk Disclosure here
                </a>
            </p>
        </div>

        <Button text><span className="underline underline-offset-4" onClick={conditionsModal.showModal}>Early closing conditions →</span></Button>

        <ParamsDepositModal open={paramsModal.isModalOpen} onCancel={paramsModal.handleCancel}/>
        <ClosingConditionsModal open={conditionsModal.isModalOpen} onCancel={conditionsModal.handleCancel}/>
    </div>
    )
}

export default DepositChoose