import {Input} from "antd";
import Button from "@/shared/ui/button/Button";
import React, {memo, useState} from "react";
import {apiPromoCode} from "../api"

const PromoCode = memo(() => {

    const [valInput, setValInput] = useState("")
    const [loading, setLoading] = useState(false)
    const handlerInput = ({target}) => {
        setValInput(target.value)
    }

    const onSubmit = async () => {
        setLoading(true)
        const res = await apiPromoCode(valInput)

        // console.log(res)

        setLoading(false)
    }

    return <>
        <div className="py-10 px-8 md:px-0 md:pb-0">
            <h2 className="text-[var(--color-gray-600)] font-bold text-lg mb-10">Enter Promo Code</h2>
            <Input value={valInput} disabled={loading} onChange={handlerInput} type={"text"} className={"mb-10"}/>
            <Button onClick={onSubmit} disabled={valInput === "" || loading} className={"w-full"}>
                Apply
            </Button>
        </div>
    </>
})

export default PromoCode