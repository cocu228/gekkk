import React, {useState} from 'react';
import {Outlet} from 'react-router'
import {Input as InputAnt, Radio, RadioChangeEvent} from 'antd';
import Button from "@/shared/ui/button/Button";
import FormItem from "@/shared/ui/form/form-item/FormItem";


function Deposit() {


    const [radio, setRadio] = useState(1)

    const onChange = (event: RadioChangeEvent) => {
        setRadio(event.target.value)
    }

    return (

        <div className="wrapper p-4">
            <section className="-mx-4 bg-gray-50 px-4 py-2 text-black">
                <div className="row mb-2">
                    <h2 className="text-2xl font-bold">
                        New deposit
                    </h2>
                </div>
                <div className="row">
                    <p className="text-sm font-light leading-6">
                        A modern alternative to a bank deposit.
                        Invest in a cryptocurrency with full or partial protection of investments
                    </p>
                </div>
            </section>
            <div className="row my-2">
                <span className="text-gray-300">Choose deposit types</span>
            </div>
            <div className="row flex">
                <div className="wrapper w-1/2">
                    <label>
                        <Radio value={1} checked={radio === 1} onChange={onChange} name={"deposit-types"}/>
                        <div className="row">
                            <p>Fixed rate</p>
                            <span className="text-gray-400">12% per annum</span>
                        </div>
                    </label>
                </div>
                <div className="wrapper w-1/2">
                    <label>
                        <Radio value={2} onChange={onChange} checked={radio === 2} name={"deposit-types"}/>
                        <div className="row">
                            <p>Structured</p>
                            <span className="text-gray-400">Risk-protected investments in crypto</span>
                        </div>
                    </label>
                </div>
            </div>
            <div className="row my-10">
                <FormItem extra={<span className="text-green-600">The minimum deposit amount is 100 EURG</span>}>
                    <InputAnt suffix={<span className="text-gray-400 text-lg">EURG</span>}/>
                </FormItem></div>
            <div className="row flex my-10 gap-2">
                <div className="wrapper w-1/2">
                    <FormItem>
                        <InputAnt.Group>
                            <InputAnt placeholder={"Promo code"} className={""}/>
                        </InputAnt.Group>
                    </FormItem>
                </div>

                <div className="wrapper w-1/2 h-inherit">
                    <Button
                        className={"w-full !h-full rounded-b !bg-transparent !border-1 !border-solid !border-black !text-black !important"}>
                        Apply
                    </Button>
                </div>
            </div>
            <div className="row flex my-10">
                <Button disabled className={"w-full !text-white rounded-b bg-blue-600 disabled:opacity-50"}>Next
                    step</Button>
            </div>
            <div className={`wrapper`}>
                <Outlet/>
            </div>
        </div>

    )
}

export default Deposit;
