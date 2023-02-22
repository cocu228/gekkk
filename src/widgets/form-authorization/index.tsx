import React, {memo} from "react";
import useMask from "../../shared/model/hooks/useMask";
import {MASK_PHONE} from "../../shared/config/mask";
import useValidation from "../../shared/model/hooks/useValidation";
import Form from "../../shared/ui/form/Form";
import FormItem from "../../shared/ui/form/form-item/FormItem";
import {passwordMessage, phoneMessage} from "../../shared/config/message";
import {Input} from "antd";
import Button from "../../shared/ui/button/Button";

const FormLoginAccount = memo(() => {

    const {onInput} = useMask(MASK_PHONE);
    const {phoneValidator, validationPassword} = useValidation();
    const onSubmit = (event: unknown) => {
        console.log(event)
    }

    return <Form onFinishFailed={onSubmit} onFinish={onSubmit}>
        <h2 className="text-2xl pt-8 pb-4 font-extrabold text-gray-600 text-center">Login to your
            account</h2>
        <FormItem className={"mb-2"} name="phone" label="Телефон" preserve
                  rules={[{required: true, ...phoneMessage}, phoneValidator]}>
            <Input type="tel"
                   placeholder="Phone number"
                   onInput={onInput}
                   autoComplete="tel"
            />
        </FormItem>
        <FormItem name="password" label="Password"
                  rules={[{required: true, ...passwordMessage}, validationPassword]}>
            <Input.Password placeholder="Password"/>
        </FormItem>
        <div className="row text-right mb-9">
            <a className="text-sm text-blue-700 font-bold" href="#">Forgot password?</a>
        </div>
        <div className="row">
            <Button htmlType="submit" className={"w-full"}>Login</Button>
        </div>
    </Form>
})

export default FormLoginAccount