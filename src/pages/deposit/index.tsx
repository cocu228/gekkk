import React, {useState} from 'react';
import {Outlet} from 'react-router'
import {Input, Radio, RadioChangeEvent} from 'antd';
import Button from "../../shared/ui/button/Button";

function Deposit() {

    const [radio, setRadio] = useState(1)


    const onChange = (event: RadioChangeEvent) => {
        setRadio(event.target.value)
    }

    return (

        <div className="wrapper p-4">
            <section className="-mx-4 bg-gray-200 px-4 py-2 text-black">
                <div className="row mb-2">
                    <h2>
                        New deposit
                    </h2>
                </div>
                <div className="row">
                    <p className="text-sm">
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
                    <Radio value={1} checked={radio === 1} onChange={onChange} name={"deposit-types"}/>
                    <div className="row">
                        <p>Fixed rate</p>
                        <span>12% per annum</span>
                    </div>
                </div>
                <div className="wrapper w-1/2">
                    <Radio value={2} onChange={onChange} checked={radio === 2} name={"deposit-types"}/>
                    <div className="row">
                        <p>Structured</p>
                        <span>Risk-protected investments in crypto</span>
                    </div>
                </div>
            </div>
            <div className="row my-10">
                <Input/>
            </div>
            <div className="row flex my-10 gap-2">
                <div className="wrapper w-1/2">
                    <Input className={""}/>
                </div>
                <div className="wrapper w-1/2 h-inherit">
                    <Button ghost className={"w-full min-h-full text-black !text-black !border-1 !border-solid !border-black"}>Apply</Button>
                </div>
            </div>
            <div className="row flex my-10">
                <Button size={"large"} className={"w-full h-full"}>Apply</Button>
            </div>
            <div className={`wrapper`}>
                <Outlet/>
            </div>
        </div>

    )
}

export default Deposit;
