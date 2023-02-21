/* eslint-disable no-template-curly-in-string */

import {ConfigProviderProps} from 'antd/es/config-provider';
import {Rule} from 'antd/es/form';

type validateMessages = Required<Required<ConfigProviderProps>['form']>['validateMessages'];

export const validateMessages: validateMessages = {
    required: 'Пожалуйста, заполните поле "${label}"',
    whitespace: 'Поле не поддерживает пробелы',

    string: {
        min: "'${label}' не менее ${min} символов",
        max: "'${label}' не более ${max} символов",
        range: "'${label}' от ${min} до ${max} символов",
        len: "'${label}' состоит из ${len} символов",
    },

    number: {
        min: "Значение '${label}' не менее ${min}",
        max: "Значение '${label}' не более ${max}",
        range: "Значение '${label}' от ${min} до ${max}",
    },

    types: {
        string: "Поле '${label}' должно быть строкой",
        number: "Поле '${label}' должно быть числом",
        email: "Поле '${label}' должно быть в формате электронной почты",
        url: "Поле '${label}' должно быть в формате URL",
        array: "Поле '${label}' должно быть перечислением",
    },
};

export const nameMessage: Rule = {
    message: 'Пожалуйста, введите своё имя',
};

export const phoneMessage: Rule = {
    message: 'Пожалуйста, введите свой номер',
};

export const emailMessage: Rule = {
    message: 'Пожалуйста, укажите E-mail',
};

export const dateMessage: Rule = {
    message: 'Пожалуйста, укажите дату',
};

export const passwordMessage: Rule = {
    message: 'Пожалуйста, введите пароль',
};
