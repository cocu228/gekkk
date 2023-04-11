import {Input, Form} from "antd";
import Button from "@/shared/ui/button/Button";
import React, {memo, useState} from "react";
import {apiPromoCode} from "../api"
import {alarmText, validateStatus} from "@/features/promo-code/model";

const PromoCode = memo(() => {

    const [valInput, setValInput] = useState("")
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState(null)
    const handlerInput = ({target}) => {
        setValInput(target.value)
        if (status) setStatus(null)
    }

    const onSubmit = async () => {
        setLoading(true)
        const res = await apiPromoCode(valInput)

        if (res.data?.status) {
            setStatus(res.data.status)
        }

        setLoading(false)
    }

    return <>
        <div className="py-10 px-8 md:px-0 md:pb-0">
            <Form onFinish={onSubmit}>
                <h2 className="text-[var(--color-gray-600)] font-bold text-lg mb-10">Enter Promo Code</h2>
                <Form.Item hasFeedback help={alarmText(status)} className="mb-2"
                           preserve
                           validateStatus={validateStatus(status)}
                           rules={[{required: false}]}>
                    <Input suffix={false} value={valInput} disabled={loading} onChange={handlerInput} type={"text"}/>
                </Form.Item>
                <Button htmlType={"submit"} disabled={valInput === "" || loading || status === "SUCCESS"}
                        className={"w-full mt-10"}>
                    Apply
                </Button>
            </Form>
        </div>
    </>
})

export default PromoCode