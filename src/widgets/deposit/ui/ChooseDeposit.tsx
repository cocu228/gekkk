import {Input as InputAnt, Radio, RadioChangeEvent, InputProps} from "antd";
import FormItem from "@/shared/ui/form/form-item/FormItem";
import React, {SyntheticEvent, useRef, useState} from "react";
import PromoCode from "@/features/promo-code/ui/PromoCode";
import Button from "@/shared/ui/button/Button";
import useMask from "@/shared/model/hooks/useMask";
import {MASK_SUM} from "@/shared/config/mask";


const ChooseDeposit = () => {

    const {onInput} = useMask(MASK_SUM)

    const [radio, setRadio] = useState(1)
    const [sum, setSum] = useState<string>("0")

    const onChangeRadio = (event: RadioChangeEvent) => {
        setRadio(event.target.value)
    }

    const onChangeSum = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.target.value !== sum ? setSum(event.target.value) : null
    }


    return <>
        <div className="row my-2">
            <span className="text-gray-300">Choose deposit types</span>
        </div>
        <div className="row flex">
            <div className="wrapper w-1/2">
                <label>
                    <Radio value={1} checked={radio === 1} onChange={onChangeRadio} name={"deposit-types"}/>
                    <div className="row">
                        <p>Fixed rate</p>
                        <span className="text-gray-400">12% per annum</span>
                    </div>
                </label>
            </div>
            <div className="wrapper w-1/2">
                <label>
                    <Radio value={2} onChange={onChangeRadio} checked={radio === 2} name={"deposit-types"}/>
                    <div className="row">
                        <p>Structured</p>
                        <span className="text-gray-400">Risk-protected investments in crypto</span>
                    </div>
                </label>
            </div>
        </div>
        <div className="row my-10">
            <FormItem extra={<span className="text-green-600">The minimum deposit amount is 100 EURG</span>}>
                <InputAnt onChange={onChangeSum} onInput={onInput}
                          suffix={<span className="text-gray-400 text-lg">EURG</span>}/>
            </FormItem>
        </div>
        <PromoCode/>
        <div className="row flex my-10">
            <Button disabled={+sum.replace(" ", "") < 5}
                    className={"w-full !text-white rounded-b bg-blue-600 disabled:opacity-50"}>Next
                step</Button>
        </div>
    </>
}

export default ChooseDeposit