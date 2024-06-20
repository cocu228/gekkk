import { ConfigProviderProps } from "antd/es/config-provider";
import { Rule } from "antd/es/form";

type validateMessages = Required<Required<ConfigProviderProps>["form"]>["validateMessages"];

export const validateMessages: validateMessages = {
  required: 'Please fill in the field "${label}"',
  whitespace: "The field does not support spaces",

  string: {
    min: "'${label}' at least ${min} characters",
    max: "'${label}' no more than ${max} characters",
    range: "'${label}' ${min} to ${max} characters",
    len: "'${label}' consists of ${len} characters"
  },
  //todo ru -en
  number: {
    min: "Значение '${label}' не менее ${min}",
    max: "Значение '${label}' не более ${max}",
    range: "Значение '${label}' от ${min} до ${max}"
  },

  types: {
    string: "Поле '${label}' должно быть строкой",
    number: "Поле '${label}' должно быть числом",
    email: "Поле '${label}' должно быть в формате электронной почты",
    url: "Поле '${label}' должно быть в формате URL",
    array: "Поле '${label}' должно быть перечислением"
  }
};

export const nameMessage: Rule = {
  message: "Please enter your name"
};

export const phoneMessage: Rule = {
  message: "Please enter your number"
};

export const codeMessage: Rule = {
  message: "Invalid confirmation code"
};

export const emailMessage: Rule = {
  message: "Please enter an E-mail"
};

export const dateMessage: Rule = {
  message: "Пожалуйста, укажите дату"
};

export const passwordMessage: Rule = {
  message: "Please enter a password"
};
export const pinMessage: Rule = {
  message: "Please enter a pin"
};
export const promoCodeMessage: Rule = {
  message: "Only latin letters and numbers"
};
