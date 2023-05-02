import React, {useState} from 'react';
import styles from "@/widgets/exchange/ui/operation-result/style.module.scss";
import PercentBtn from "@/shared/ui/percent-btn/PercentBtn";
import DepositInput from "@/widgets/deposit/ui/deposit-input";
import Button from "@/shared/ui/button/Button";

const GekkardAccount = () => {

    return (<div className="wrapper">
        <div className="row mb-8 flex flex-col gap-2 md:gap-1 font-medium info-box-warning">
            <div className="col text-xl font-bold">
                <span>1 EUR = 1 EURG*</span>
            </div>
            <div className="col text-xs">
                <span>* Note:  Standart exchange fee is 1,5%.   If you freeze GKE tokens fee is 0%.          </span>
            </div>
        </div>
        <div className="row">
            <div className="col">
                <div className="wrapper w-full mb-10 xl:mb-8 md:mb-7">
                    <div className="row flex justify-between mb-2 md:mb-1 items-center">
                        <div className="wrapper flex text-xs gap-1">
                            <p className="text-gray-400 font-medium md:text-sm sm:text-xs">
                                I want to
                            </p>
                            <PercentBtn>give</PercentBtn>
                            <PercentBtn>recieve</PercentBtn>
                        </div>

                        <div className="row flex gap-1 text-xs">
                            <PercentBtn>25%</PercentBtn>
                            <PercentBtn>50%</PercentBtn>
                            <PercentBtn>75%</PercentBtn>
                            <PercentBtn>100%</PercentBtn>
                        </div>
                    </div>

                    <DepositInput/>
                </div>
            </div>
        </div>
        <div className="row flex gap-4 text-gray-400 font-medium mb-14">
            <div className="col flex flex-col w-[max-content] gap-2">
                <div className="row">
                    <span>You will pay</span>
                </div>
                <div className="row">
                        <span>
                          You will get
                        </span>
                </div>
            </div>
            <div className="col flex flex-col w-[max-content] gap-2">
                <div className="row flex items-end">
                    <span className="w-full text-end">101.50 EUR</span>
                </div>
                <div className="row flex items-end">
                    <span className="w-full text-end">100.00 EURG</span>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col">
                <Button className="w-full" size={"xl"}>Buy EURG</Button>
            </div>
        </div>
    </div>)

};

export default GekkardAccount;
