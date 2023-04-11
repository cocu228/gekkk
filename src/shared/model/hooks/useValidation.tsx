import {useCallback} from 'react';
import {RuleRender} from 'antd/es/form';

function useValidator() {

    const passwordValidator = useCallback<RuleRender>(
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
                    const isPhone = value.length > 5
                    // const isRusPhone = new RegExp(/^((\+7|7|8)+([0-9]){10})$/gi).test(value.replace(/\D+/g, ''));

                    if (!value || isPhone) {
                        resolve('');
                    } else {
                        reject(new Error('Please enter your number in full'));
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
                        reject(new Error('Enter correct E-mail'));
                    }
                });
            },
        }),
        [],
    );

    return {phoneValidator, emailValidator, validationPassword: passwordValidator};
}

export default useValidator;
