import Button from "@/shared/ui/button/Button";
import {Form, Input} from "antd";
import React, {useContext} from "react";
import {CtxWalletCurrency} from "@/widgets/wallet/model/context";
import styles from "@/widgets/history/ui/style.module.scss";

const {TextArea} = Input;

const Transfer = () => {

    const currency = useContext(CtxWalletCurrency)

    return (<>
            <div className="row mb-9">
                <div className="info-box-description">
                    <div className="row mb-4">
                        <span className="font-semibold">Funds transfer code</span>
                    </div>
                    <div className="row">
                        <span>Create a special code with which you can transfer EURG funds between Gekkoin users with or without your confirmation.</span>
                    </div>
                </div>
            </div>
            <Form onFinish={() => null}>
                <div className="row flex gap-12 mb-10">
                    <div className="col flex items-center w-1/2">
                        <Form.Item hasFeedback className="mb-0"
                                   preserve
                                   name={"promo-code"}
                            // validateStatus={validateStatus(status)}
                            // rules={[{required: true, ...promoCodeMessage}, promoCodeValidator]}>
                        >
                            {/*<Input suffix={false} value={valInput} disabled={loading} onChange={handlerInput}*/}
                            <Input placeholder={"Enter top up code"} type={"text"}/>
                        </Form.Item>
                    </div>
                    <div className="col h-inherit flex items-center w-1/2">
                        {/*<Button htmlType={"submit"} disabled={valInput === "" || loading || status === "SUCCESS"}*/}
                        <Button htmlType={"submit"}
                                size={"xl"}
                                className={"w-full !h-full !font-medium"}>
                            Apply
                        </Button>
                    </div>
                </div>
            </Form>
            <div className="row mb-5">
                <Button size={"xl"} className="w-full !font-medium">Create transfer code...</Button>
            </div>
            <div className="row mb-2">
                <h3 className="text-lg font-bold">
                    Unredeemed codes info
                </h3>
            </div>
            <div className="row">
                <div className={`${styles.Table}`}>
                    <div className={styles.TableHead + " py-4"}>
                        <div data-text={"Data"} className="col col-span-3 flex">
                            <span>Code</span>
                        </div>
                        <div data-text={"Flow of funds"} className="col col-span-3">
                            <span>Amount</span>
                        </div>
                        <div data-text={"Information"} className="col col-span-3 flex justify-center">
                            <span>Status</span>
                        </div>
                        <div data-text={"Information"} className="col col-span-3 flex justify-center">
                            <span>Action</span>
                        </div>
                    </div>
                    <div className={styles.TableBody}>
                        <div className="row grid grid-cols-12 px-4 py-3 gap-3">
                            <div className="col col-span-3">
                                <div className="row flex items-center">
                                    <div className="col mr-2">
                                        <span className="text-gra-600 font-bold">23frG45</span>
                                    </div>
                                    <div className="col">
                                        <img width={14} height={14} src="/img/icon/Copy.svg" alt="Copy"/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <span className="text-gray-500 text-xs">19.04.23 at 12:37</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col col-span-3">
                                <span className="text-gra-600 text-xs">23frG45</span>
                            </div>
                            <div className="col col-span-3"><span className="text-gray-600 text-xs">
                                Without confirmation. The code not used yet
                            </span></div>
                            <div className="col col-span-3 flex justify-center items-center">
                                <Button size={"lg"} className={"!py-3 !h-[fit-content]"}>Delete</Button>
                            </div>
                        </div>
                        <div className="row grid grid-cols-12 px-4 py-3 gap-3">
                            <div className="col col-span-3">
                                <div className="row flex">
                                    <div className="col mr-2">
                                        <span className="text-gra-600 font-bold">23frG45</span>
                                    </div>
                                    <div className="col">
                                        <img width={14} height={14} src="/img/icon/Copy.svg" alt="Copy"/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <span className="text-gray-500 text-xs">19.04.23 at 12:37</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col col-span-3">
                                <span className="text-gra-600 text-xs">23frG45</span>
                            </div>
                            <div className="col col-span-3"><span className="text-orange text-xs">
                                Your confirmation required
                            </span></div>
                            <div className="col col-span-3 flex justify-center items-center">
                                <Button gray disabled className="!py-3 !h-[fit-content]">Confirm</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Transfer;
