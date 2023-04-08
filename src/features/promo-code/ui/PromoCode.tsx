import {Input, notification, Form} from "antd";
import Button from "@/shared/ui/button/Button";
import React, {memo, useState} from "react";
import {apiPromoCode} from "../api"


const validateStatus = (status) => {
    if (status === null) {
        return undefined
    } else {
        return status === "SUCCESS" ? "success" : "error"
    }
}

const alarmText = (status) => status === "INVALID" ?
    "The code is invalid" : status === null ? "" :
        status === "SUCCESS" ? "The code is applied" : ""

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