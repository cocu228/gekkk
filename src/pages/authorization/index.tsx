import styles from './style.module.scss';
import {Input} from 'antd';
import Form from "../../entities/form/Form";
import FormItem from "../../entities/form/form-item/FormItem";
import {useState} from "react";
import InputPassword from "../../entities/input-password";
import {AnyMaskedOptions} from 'imask';
import useMask from '../../features/useMask';
import useValidation from '../../features/useValidation';

export const MASK_PHONE: AnyMaskedOptions = {
    mask: '+7 (000) 000-00-00',
};

function Authorization() {
    const {onInput} = useMask(MASK_PHONE);
    const {phoneValidator} = useValidation();
    const [toggle, setToggle] = useState(true)


    return (
        <div className={`w-25 px-4 ${styles.App}`}>
            <div className="wrapper">
                <div className="grid grid-rows-1 justify-center pb-6">
                    <img width={72} height={24} src="public/logo.png" alt="logo"/>
                </div>
            </div>
            <div className="grid justify-center pb-10">
                <div className="gap-2 inline-grid grid-cols-2 grid-rows-1">
                    <span onClick={() => setToggle(prev => !prev)}
                          className={`${toggle ? "active border-b-2 text-center border-b-blue-600" : ""}`}>Login</span>
                    <span onClick={() => setToggle(prev => !prev)}
                          className={`${!toggle ? "active text-center border-b-2 border-b-blue-600" : "text-center"}`}>Create</span>
                </div>
            </div>
            {toggle && <Form>
                <FormItem name="phone" label="Телефон" preserve>
                    <Input
                        type="tel"
                        placeholder="Телефон"
                        onInput={onInput}
                        autoComplete="tel"
                    />
                </FormItem>
                <FormItem>
                    <InputPassword/>
                </FormItem>
            </Form>}
        </div>
    )
}

export default Authorization;
