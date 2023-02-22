import {Input} from 'antd';
import Form from "../../entities/form/Form";
import FormItem from "../../entities/form/form-item/FormItem";
import React, {useCallback, useContext, useState} from 'react';
import {AnyMaskedOptions} from 'imask';
import useMask from '../../features/useMask';
import useValidation from '../../features/useValidation';
import Button from "../../entities/button/Button";
import {emailMessage, passwordMessage, phoneMessage} from "../../processes/message";
import {RuleRender, RuleObject} from "antd/es/form";
import CheckboxItem from "../../shared/checkbox-item/CheckboxItem";
import {FormInstance} from "rc-field-form/lib/interface";
import {Outlet} from 'react-router'
import {createBrowserRouter} from 'react-router-dom'
import {AuthContext} from '../../contexts/AuthorizationContext'
import useMaskedInput from '../../features/useMaskedInput'

export const MASK_PHONE: AnyMaskedOptions = {
    mask: '+{7} (000) 000-00-00',
};

export function Auth() {

    const [toggle, setToggle] = useState('Login' as 'Login' | 'Create')

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


    return (

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
                <FormLoginAccount show={toggle === "Login"} validationPassword={validationPassword}/>
                <FormCreateAccount show={toggle === "Create"} validationPassword={validationPassword}/>
            </div>

    )
}

const FormLoginAccount = ({
                              validationPassword, show
                          }: { validationPassword: (form: FormInstance) => RuleObject, show: boolean }) => {

    const auth = useContext(AuthContext)
    const [phone, onInput] = useMaskedInput(MASK_PHONE);
    const [password, setPassword] = useState('')
    const {phoneValidator} = useValidation();
    const onSubmit = async (event: unknown) => {

       await auth.doLogin(auth.doLogin({phone, password}))
    }

    return <Form className={show ? "" : "hidden"} onFinishFailed={onSubmit} onFinish={onSubmit}>
        <h2 className="text-2xl pt-8 pb-4 font-extrabold text-gray-600 text-center">Login to your
            account</h2>
        <FormItem className={"mb-2"} name="phone" label="Телефон" preserve
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
            <Input.Password placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
        </FormItem>
        <div className="row text-right mb-9">
            <a className="text-sm text-blue-700 font-bold" href="#">Forgot password?</a>
        </div>
        <div className="row">
            <Button htmlType="submit" className={"w-full"}>Login</Button>
        </div>
    </Form>
}
const FormCreateAccount = ({
                               validationPassword,
                               show
                           }: { validationPassword: (form: FormInstance) => RuleObject, show: boolean }) => {

    const {onInput} = useMask(MASK_PHONE);
    const {emailValidator} = useValidation();
    const onSubmit = (event: unknown) => {
        console.log(event)
    }

    return <Form className={show ? "" : "hidden"} onFinishFailed={onSubmit} onFinish={onSubmit}>
        <h2 className="text-2xl pt-8 pb-4 font-extrabold text-gray-600 text-center">Create your account</h2>
        <FormItem className={"mb-2"} name="email" label="Email" preserve
                  rules={[{required: true, ...emailMessage}, emailValidator]}>
            <Input
                type="email"
                placeholder="Email"
                // onInput={onInput}
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
            <Button htmlType="submit" className={"w-full"}>Create</Button>
        </div>
        <div className="row">
            <CheckboxItem onChange={() => null} title={"I certify that I’m 18 or older and I agree\n" +
                "to the User Agreement and Privacy Policy of Adventarium LTD"}/>
        </div>
        <div className="row">
            <CheckboxItem onChange={() => null} title={"I agree to the Terms and conditions of AtlantEX OU"}/>
        </div>
    </Form>
}

export default Auth;
