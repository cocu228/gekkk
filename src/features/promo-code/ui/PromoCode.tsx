import FormItem from "@/shared/ui/form/form-item/FormItem";
import {Input as InputAnt} from "antd";
import Button from "@/shared/ui/button/Button";
import React, {useState} from "react";


const PromoCode = () => {



    const [code, setCode] = useState("")

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCode(e.target.value)
    }

    return <>
        <div className="row flex my-10 gap-2">
            <div className="wrapper w-1/2">
                <FormItem>
                    <InputAnt.Group>
                        <InputAnt value={code} onChange={onChange} placeholder={"Promo code"}/>
                    </InputAnt.Group>
                </FormItem>
            </div>

            <div className="wrapper w-1/2 h-inherit">
                <Button
                    disabled={code === ""}
                    className={"w-full !h-full disabled:opacity-50 rounded-b !bg-transparent !border-1 !border-solid !border-black !text-black !important"}>
                    Apply
                </Button>
            </div>
        </div>
    </>
}

export default PromoCode