import styles from './style.module.scss';
import {Input} from 'antd';
import Form from "../../entities/form/Form";
import FormItem from "../../entities/form/form-item/FormItem";
import {useState} from "react";

function Authorization() {

    const [toggle, setToggle] = useState(true)


    return (
        <div className={`w-25 px-4 ${styles.App}`}>
            <div className="wrapper">
                <div className="grid grid-rows-1 justify-center py-10">
                    <img src="public/logo.png" alt="logo"/>
                </div>
            </div>
            <div className="grid justify-center">
                <div className="gap-2 inline-grid grid-cols-2 grid-rows-1">
                    <span onClick={() => setToggle(prev => !prev)}
                          className={`${toggle ? "active border-b-2 text-center border-b-blue-600" : ""}`}>Login</span>
                    <span onClick={() => setToggle(prev => !prev)}
                          className={`${!toggle ? "active text-center border-b-2 border-b-blue-600" : "text-center"}`}>Create</span>
                </div>
            </div>
            {toggle && <Form title={""}>
                <FormItem hiddenLabel={false}>
                    <Input
                        type="tel/email"
                        placeholder="Email or Phone number"
                    />
                </FormItem>
                <FormItem hiddenLabel={false}>
                    <Input
                        type="password"
                        placeholder="Password"
                    />
                </FormItem>
            </Form>}
        </div>
    )
}

export default Authorization;
