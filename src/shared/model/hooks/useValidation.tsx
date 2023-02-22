import {useCallback} from "react";
import {RuleRender} from "antd/es/form";

function useValidator() {


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

    const phoneValidator = useCallback<RuleRender>(
        () => ({
            validator(rule, value = '') {
                return new Promise((resolve, reject) => {
                    const isPhone = new RegExp(/^((\+7|7|8)+([0-9]){10})$/gi).test(value.replace(/\D+/g, ''));

                    if (!value || isPhone) {
                        resolve('');
                    } else {
                        reject(new Error('Пожалуйста, введите свой номер полностью'));
                    }
                });
            },
        }),
        [],
    );

    const emailValidator = useCallback<RuleRender>(
        () => ({
            validator(rule, value = '') {
                return new Promise((resolve, reject) => {
                    const isEmail = new RegExp(
                        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gi,
                    ).test(value);
                    if (!value || isEmail) {
                        resolve('');
                    } else {
                        reject(new Error('Введите корректный E-mail'));
                    }
                });
            },
        }),
        [],
    );

    return {phoneValidator, emailValidator, validationPassword};
}

export default useValidator;
