import {useContext, useEffect, useState} from "react";
import {Form, Input} from "antd";
import styles from "./style.module.scss";
import Button from "@/shared/ui/button/Button";
import {GTable} from "@/shared/ui/grid-table/GTable";
import {GTRow} from "@/shared/ui/grid-table/table-row/GTRow";
import {GTHead} from "@/shared/ui/grid-table/table-head/GTHead";
import {GTCol} from "@/shared/ui/grid-table/table-column/GTCol";
import {GTBody} from "@/shared/ui/grid-table/table-body/GTBody";
import {CtxWalletCurrency} from "@/widgets/wallet/model/context";
import Modal from "@/shared/ui/modal/Modal";
import useModal from "@/shared/model/hooks/useModal";
import CreateCode from "@/widgets/wallet/transfer/CreateCode";
import {storeListTxCode} from "@/widgets/wallet/transfer/store/list-tx-code";
import {apiApplyTxCode} from "@/shared/api";
import {apiCancelTxCode} from "@/widgets/wallet/transfer/api/cancel-code";

// const {TextArea} = Input;

const Transfer = () => {

    const {isModalOpen, showModal, handleCancel} = useModal()
    const [input, setInput] = useState("")
    const currency = useContext(CtxWalletCurrency)

    const listTxCode = storeListTxCode(state => state.listTxCode)
    const getListTxCode = storeListTxCode(state => state.getListTxCode)

    useEffect(() => {
        (async () => {

            await getListTxCode()

        })()
    }, [currency])


    const onBtnCancel = async (code) => {
        const response = await apiCancelTxCode(code)

    }

    const onBtnDelete = () => {

    }

    const onBtnConfirm = () => {

    }

    const onBtnApply = async () => {
        const response = await apiApplyTxCode(input)
        console.log(response)
    }

    // const onBtnCancel = () => {
    //
    // }

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
                <div className="row flex gap-10 mb-10">
                    <div className="col flex items-center w-3/5">
                        <Form.Item hasFeedback className="mb-0 w-full"
                                   preserve
                                   name={"promo-code"}
                            // validateStatus={validateStatus(status)}
                            // rules={[{required: true, ...promoCodeMessage}, promoCodeValidator]}>
                        >
                            {/*<Input suffix={false} value={valInput} disabled={loading} onChange={handlerInput}*/}
                            <Input className={"w-full"} onChange={({target}) => setInput(target.value)}
                                   placeholder={"Enter top up code"} type={"text"}/>
                        </Form.Item>
                    </div>
                    <div className="col h-inherit flex items-center w-2/5">
                        {/*<Button htmlType={"submit"} disabled={valInput === "" || loading || status === "SUCCESS"}*/}
                        <Button disabled={input === ""} onClick={onBtnApply} htmlType={"submit"}
                                size={"xl"}
                                className={"w-full !h-full !font-medium"}>
                            Apply
                        </Button>
                    </div>
                </div>
            </Form>
            <div className="row mb-5">
                <Button onClick={showModal} size={"xl"} className="w-full !font-medium">Create transfer code...</Button>
                <Modal onCancel={handleCancel} open={isModalOpen}>
                    <CreateCode handleCancel={handleCancel}/>
                </Modal>
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
                        {listTxCode.filter(item => item.currency === currency.const).map(it => <GTRow
                            className="px-4 py-3 gap-3">
                            <GTCol>
                                <div className="row flex items-center">
                                    <div className="col mr-2">
                                        <span className="text-gra-600 font-bold">{it.code}</span>
                                    </div>
                                    <div className="col">
                                        <img width={14} height={14} src="/img/icon/Copy.svg" alt="Copy"/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <span className="text-gray-500 text-xs">{it.dateTxUTC}</span>
                                    </div>
                                </div>
                            </GTCol>

                            <GTCol className="text-center">
                                <span className="text-gra-600 text-xs">{it.amount}</span>
                            </GTCol>

                            <GTCol className="text-center">
                                <span className="text-gray-600 text-xs">
                                   {it.state}
                                </span>
                            </GTCol>

                            <GTCol className="flex justify-center items-center">
                                {it.typeTx === 11 &&
                                    <Button size={"lg"} onClick={() => onBtnCancel(it.code)}
                                            className={"!py-3 !h-[fit-content]"}>{it.typeTx}</Button>}
                                {it.typeTx === 12 &&
                                    <Button size={"lg"} onClick={onBtnConfirm}
                                            className={"!py-3 !h-[fit-content]"}>{it.typeTx}</Button>}
                                {it.typeTx === 13 &&
                                    <Button size={"lg"} onClick={onBtnDelete}
                                            className={"!py-3 !h-[fit-content]"}>{it.typeTx}</Button>}
                                {/*{it.typeTx === 14 &&*/}
                                {/*    <Button size={"lg"} onClick={onBtn}*/}
                                {/*            className={"!py-3 !h-[fit-content]"}>{it.typeTx}</Button>}*/}
                            </GTCol>
                        </GTRow>)}
                    </GTBody>
                </GTable>
            </div>
        </>
    );
};

export default Transfer;
