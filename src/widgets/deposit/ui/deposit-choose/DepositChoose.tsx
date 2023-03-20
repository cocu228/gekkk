import {Input as InputAnt, Radio, RadioChangeEvent} from "antd";
import FormItem from "@/shared/ui/form/form-item/FormItem";
import React, {useState} from "react";
import Button from "@/shared/ui/button/Button";
import useMask from "@/shared/model/hooks/useMask";
import useModal from "@/shared/model/hooks/useModal";
import {MASK_SUM} from "@/shared/config/mask";
import styles from "./style.module.scss"
import ParamsDepositModal from "@/widgets/deposit/ui/modals/ParamsDepositModal";
import ClosingConditionsModal from "@/widgets/deposit/ui/modals/ClosingConditionsModal";

const DepositChoose = () => {

    const {onInput} = useMask(MASK_SUM)

    const paramsModal = useModal()
    const conditionsModal = useModal();

    const [radio, setRadio] = useState(1)
    const [sum, setSum] = useState<string>("0")

    const onChangeRadio = (event: RadioChangeEvent) => {
        setRadio(event.target.value)
    }

    const onChangeSum = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.target.value !== sum ? setSum(event.target.value) : null
    }

    return (
    <div className='wrapper col-span-3 bg-white rounded-l-md p-10 flex flex-col justify-between items-start'>
        <div className='wrapper'>
            <p className="text-base font-medium text-gray mb-6">Choose deposit types</p>

            <div className="row grid grid-cols-2 gap-5">
                <div className="wrapper">
                    <label className="flex gap-2">
                        <div><Radio value={1} checked={radio === 1} onChange={onChangeRadio} name={"deposit-types"}/></div>
                        <div className="row">
                            <p className="text-base font-medium mb-2">Fixed rate</p>
                            <p className="text-gray"><span className="font-bold">9,6%</span> per annum (<span className="font-bold">0,8%</span> per month)</p>
                        </div>
                    </label>
                </div>
                <div className="wrapper">
                    <label className="flex gap-2">
                        <div><Radio value={2} onChange={onChangeRadio} checked={radio === 2} name={"deposit-types"}/></div>
                        <div className="row">
                            <p className="text-base font-medium mb-2">Structured</p>
                            <p className="text-gray">Crypto investments with customizable risk/profit</p>
                        </div>
                    </label>
                </div>
            </div>

            <div className="row my-10">
                <div className="row flex justify-between mb-2">
                    <p className="text-gray font-medium text-base">Enter deposit amount</p>

                    <div className="row flex gap-2 text-gekGray">
                        <button className={styles.PercentBtn}>25%</button>
                        <button className={styles.PercentBtn}>50%</button>
                        <button className={styles.PercentBtn}>75%</button>
                        <button className={styles.PercentBtn}>100%</button>
                    </div>
                </div>
                <FormItem extra={<span className="text-green">The minimum deposit amount is 100 EURG</span>}>
                    <InputAnt 
                            onChange={onChangeSum} 
                            onInput={onInput}
                            suffix={
                                <>
                                    <img className="!mr-3" src="/public/img/tokens/EurgIcon.svg" width={30} height={30} alt="eurg"/>
                                    <span className="text-sm font-medium">EURG</span>
                                </>
                            }
                            />
                </FormItem>
            </div>

            <Button className="w-full mb-5" onClick={paramsModal.showModal}>Open deposit</Button>

            <div className="row">
                <p className="text-gekGray text-center text-xs">
                    The deposit services are provided by Adventarium PTE.LTD. 
                    By pressing button "Open deposit" 
                    I confirm that I have read carefully and fully accepted
                    {' '}
                    <a
                        className='font-inherit text-blue underline'
                        href="https://gekkoin.com/source/GeneralTermsandConditions.pdf"
                        target="_blank"
                        rel="noreferrer noopener"
                        >
                        Terms and Conditions with Risk Disclosure here
                    </a>
                </p>
            </div>
        </div>

        <Button text><span className="underline underline-offset-4" onClick={conditionsModal.showModal}>Early closing conditions →</span></Button>

        <ParamsDepositModal isModalOpen={paramsModal.isModalOpen} handleCancel={paramsModal.handleCancel}/>
        <ClosingConditionsModal isModalOpen={conditionsModal.isModalOpen} handleCancel={conditionsModal.handleCancel}/>
    </div>
    )
}

export default DepositChoose