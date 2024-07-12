// import {useCallback} from 'react';
// import {RuleRender} from 'antd/es/form';
// import { useTranslation } from 'react-i18next';

// function useValidator() {
//     const {t} = useTranslation();

//     const passwordValidator = useCallback<RuleRender>(
//         () => ({
//             validator(rule, value = '') {
//                 return new Promise((resolve, reject) => {
//                     const test = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(value)
//                     if (!test && value.length < 8) {
//                         resolve('');
//                     } else {
//                         reject(new Error(t("auth.invalid_password")));
//                     }
//                 });
//             },
//         }),
//         [],
//     );

//     const phoneValidator = useCallback<RuleRender>(
//         () => ({
//             validator(rule, value = '') {
//                 return new Promise((resolve, reject) => {
//                     const isV = value.length > 5
//                     // const isRusPhone = new RegExp(/^((\+7|7|8)+([0-9]){10})$/gi).test(value.replace(/\D+/g, ''));

//                     if (!value || isV) {
//                         resolve('');
//                     } else {
//                         reject(new Error(t("auth.invalid_phone")));
//                     }
//                 });
//             },
//         }),
//         [],
//     );

//     return {phoneValidator, passwordValidator};
// }

// export default useValidator;
