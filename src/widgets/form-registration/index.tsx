import React, {memo} from 'react';
import useValidation from '../../shared/model/hooks/useValidation';
import Form from '../../shared/ui/form/Form';
import FormItem from '../../shared/ui/form/form-item/FormItem';
import {emailMessage, passwordMessage} from '../../shared/config/message';
import {Input} from 'antd';
import Button from '../../shared/ui/button/Button';
import Checkbox from '../../shared/ui/checkbox/Checkbox';

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
            <Input.Password id="password2" placeholder="Password"/>
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

export default FormCreateAccount