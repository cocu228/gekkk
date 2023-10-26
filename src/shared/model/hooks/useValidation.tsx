import {useCallback} from 'react';
import {RuleRender} from 'antd/es/form';
import { useTranslation } from 'react-i18next';

function useValidator() {
    const {t} = useTranslation();


    const promoCodeValidator = useCallback<RuleRender>(
        () => ({
            validator(rule, value = '') {
                return new Promise((resolve, reject) => {

                    const isAlphaNumeric = /^[0-9A-Z]+$/i.test(value)

                    if (isAlphaNumeric) {
                        resolve('');
                    } else {
                        reject('');
                    }
                });
            },
        }),
        [],
    );

    const pinValidator = useCallback<RuleRender>(
        () => ({
            validator(rule, value = '') {
                return new Promise((resolve, reject) => {
                    const test = /\D/.test(value)
                    if (!test && value.length >= 4) {
                        resolve('');
                    } else {
                        reject(new Error(t("auth.invalid_pin")));
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
                    const isV = value.length > 5
                    // const isRusPhone = new RegExp(/^((\+7|7|8)+([0-9]){10})$/gi).test(value.replace(/\D+/g, ''));

                    if (!value || isV) {
                        resolve('');
                    } else {
                        reject(new Error(t("auth.invalid_phone")));
                    }
                });
            },
        }),
        [],
    );


    return {phoneValidator, pinValidator, promoCodeValidator};
}

export default useValidator;
