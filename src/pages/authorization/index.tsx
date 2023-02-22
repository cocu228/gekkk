import {Input} from 'antd';
import Form from "../../shared/ui/form/Form";
import FormItem from "../../shared/ui/form/form-item/FormItem";
import React, {memo, useState} from "react";
import useMask from '../../shared/model/hooks/useMask';
import useValidation from '../../shared/model/hooks/useValidation';
import Button from "../../shared/ui/button/Button";
import {emailMessage, passwordMessage, phoneMessage} from "../../shared/config/message";
import {MASK_PHONE} from "../../shared/config/mask";
import Checkbox from "../../shared/ui/checkbox/Checkbox";


function Authorization() {

    const [toggle, setToggle] = useState("Login")


    return (
        <div className="w-full h-full relative">
            <div className="wrapper absolute top-0 left-0 right-0 px-4 pt-6">
                <div className="wrapper">
                    <div className="grid grid-rows-1 justify-center pb-6">
                        <img width={72} height={24} src="public/logo.png" alt="logo"/>
                    </div>
                </div>
                <div className="grid justify-center pb-10">
                    <div className="gap-2 inline-grid grid-cols-2 grid-rows-1">
                        <span onClick={() => setToggle(prev => "Login")}
                              className={`${toggle === "Login" ? "active border-b-2 text-center border-b-blue-600" : "text-center"}`}>Login</span>
                        <span onClick={() => setToggle(prev => "Create")}
                              className={`${toggle === "Create" ? "active text-center border-b-2 border-b-blue-600" : "text-center"}`}>Create</span>
                    </div>
                </div>
                <div className={`wrapper ${toggle === "Login" ? "" : "hidden"}`}>
                    <FormLoginAccount/>
                </div>
                <div className={`wrapper ${toggle === "Create" ? "" : "hidden"}`}>
                    <FormCreateAccount/>
                </div>
            </div>
        </div>
    )
}

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
const FormCreateAccount = memo(() => {

    const {emailValidator, validationPassword} = useValidation();
    const onSubmit = (event: unknown) => {
        console.log(event)
    }

    return <Form onFinishFailed={onSubmit} onFinish={onSubmit}>
        <h2 className="text-2xl pt-8 pb-4 font-extrabold text-gray-600 text-center">Create your account</h2>
        <FormItem className="mb-2" name="email" label="Email" preserve
                  rules={[{required: true, ...emailMessage}, emailValidator]}>
            <Input
                type="email"
                placeholder="Email"
                autoComplete="email"
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
            <Button htmlType="submit" className="w-full">Create</Button>
        </div>
        <div className="row">
            <Checkbox className="top-1" onChange={() => null}>
                <span className="text-xs">I certify that I’m 18 or older and I agree\n" +
                "to the User Agreement and Privacy Policy of Adventarium LTD</span>
            </Checkbox>
        </div>
        <div className="row">
            <Checkbox className="top-1" onChange={() => null}>
                <span className="text-xs">I agree to the Terms and conditions of AtlantEX OU</span>
            </Checkbox>
        </div>
    </Form>
})

export default Authorization;
