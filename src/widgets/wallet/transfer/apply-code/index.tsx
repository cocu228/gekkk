import {Form, Input} from "antd";
import Button from "@/shared/ui/button/Button";
import {useState} from "react";
import TransferTableCode from "@/widgets/wallet/transfer/TransferTableCode";
import {apiApplyTxCode} from "@/shared/api";

const ApplyCode = () => {
    const [input, setInput] = useState("")


    const onBtnApply = async () => {
        const response = await apiApplyTxCode(input)
        console.log(response)
    }

    return <>
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
        <div className="row">
            <TransferTableCode/>
        </div>
    </>

}

export default ApplyCode