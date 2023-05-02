import {useContext} from "react";
import {Form, Input} from "antd";
import styles from "./style.module.scss";
import Button from "@/shared/ui/button/Button";
import {GTable} from "@/shared/ui/grid-table/GTable";
import {GTRow} from "@/shared/ui/grid-table/table-row/GTRow";
import {GTHead} from "@/shared/ui/grid-table/table-head/GTHead";
import {GTCol} from "@/shared/ui/grid-table/table-column/GTCol";
import {GTBody} from "@/shared/ui/grid-table/table-body/GTBody";
import {CtxWalletCurrency} from "@/widgets/wallet/model/context";

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
                <GTable className={`${styles.Table}`}>
                    <GTHead className={styles.TableHead + " py-4"}>
                        <GTRow>
                            <GTCol className="text-left">Code</GTCol>
                            <GTCol>Amount</GTCol>
                            <GTCol>Status</GTCol>
                            <GTCol>Action</GTCol>
                        </GTRow>
                    </GTHead>
                    <GTBody className={styles.TableBody}>
                        <GTRow className="px-4 py-3 gap-3">
                            <GTCol>
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
                            </GTCol>

                            <GTCol className="text-center">
                                <span className="text-gra-600 text-xs">23frG45</span>
                            </GTCol>

                            <GTCol className="text-center">
                                <span className="text-gray-600 text-xs">
                                    Without confirmation. The code not used yet
                                </span>
                            </GTCol>

                            <GTCol className="flex justify-center items-center">
                                <Button size={"lg"} className={"!py-3 !h-[fit-content]"}>Delete</Button>
                            </GTCol>
                        </GTRow>

                        <GTRow className="px-4 py-3 gap-3">
                            <GTCol>
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
                            </GTCol>

                            <GTCol className="text-center">
                                <span className="text-gra-600 text-xs">23frG45</span>
                            </GTCol>

                            <GTCol className="text-center">
                                <span className="text-orange text-xs">
                                    Your confirmation required
                                </span>
                            </GTCol>

                            <GTCol className="flex justify-center items-center">
                                <Button gray disabled className="!py-3 !h-[fit-content]">Confirm</Button>
                            </GTCol>
                        </GTRow>
                    </GTBody>
                </GTable>
            </div>
        </>
    );
};

export default Transfer;
