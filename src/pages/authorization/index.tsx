import {Input} from 'antd';
import Form from "../../entities/form/Form";
import FormItem from "../../entities/form/form-item/FormItem";
import React, {useCallback, useState} from "react";
import {AnyMaskedOptions} from 'imask';
import useMask from '../../features/useMask';
import useValidation from '../../features/useValidation';
import Button from "../../entities/button/Button";
import {emailMessage, passwordMessage, phoneMessage} from "../../processes/message";
import {RuleRender} from "antd/es/form";

export const MASK_PHONE: AnyMaskedOptions = {
    mask: '+{7} (000) 000-00-00',
};

function Authorization() {

    const {onInput} = useMask(MASK_PHONE);
    const {phoneValidator, emailValidator} = useValidation();
    const [toggle, setToggle] = useState(true)

    const validationPassword = useCallback<RuleRender>(
        () => ({
            validator(rule, value = '') {

                return new Promise((resolve, reject) => {
                    if (value) {
                        resolve('');
                    } else {
                        reject();
                    }
                });
            },
        }),
        [],
    );
    const onSubmit = (event: unknown) => {
        console.log(event)
    }

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
                    <span onClick={() => setToggle(prev => !prev)}
                          className={`${toggle ? "active border-b-2 text-center border-b-blue-600" : "text-center"}`}>Login</span>
                        <span onClick={() => setToggle(prev => !prev)}
                              className={`${!toggle ? "active text-center border-b-2 border-b-blue-600" : "text-center"}`}>Create</span>
                    </div>
                </div>
                {toggle ? <Form onFinishFailed={onSubmit} onFinish={onSubmit}>
                    <h2 className="text-2xl pt-8 pb-4 font-extrabold text-gray-600 text-center">Login to your
                        account</h2>
                    <FormItem name="phone" label="Телефон" preserve
                              rules={[{required: true, ...phoneMessage}, phoneValidator]}>
                        <Input
                            type="tel"
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
                </Form> : <Form onFinishFailed={onSubmit} onFinish={onSubmit}>
                    <h2 className="text-2xl pt-8 pb-4 font-extrabold text-gray-600 text-center">Create your account</h2>
                    <FormItem name="email" label="Email" preserve
                              rules={[{required: true, ...emailMessage}, emailValidator]}>
                        <Input
                            type="email"
                            placeholder="Email"
                            onInput={onInput}
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
                        <Button htmlType="submit" className={"w-full"}>Login</Button>
                    </div>
                </Form>}
            </div>
        </div>
    )
}

export default Authorization;
