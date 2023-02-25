import React, {useState} from 'react';
import {Outlet} from 'react-router'
import {Input as InputAnt, Radio, RadioChangeEvent} from 'antd';
import Button from "@/shared/ui/button/Button";
import FormItem from "@/shared/ui/form/form-item/FormItem";
import PromoCode from "@/features/promo-code/ui/PromoCode";
import ChooseDeposit from "@/widgets/choose-deposit/ui/ChooseDeposit";


function Deposit() {

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
            <ChooseDeposit/>
            <div className={`wrapper`}>
                <Outlet/>
            </div>
        </div>

    )
}

export default Deposit;
