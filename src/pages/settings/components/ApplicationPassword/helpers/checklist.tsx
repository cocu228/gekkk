import { Dispatch, SetStateAction, useEffect } from "react";
import styles from "./checklist.module.css";

// Importing the validation rules
import {
  UPPERCASE_REGEX,
  NUMBER_REGEX,
  LENGTH_REGEX,
  SPECIAL_CHARS_REGEX
} from "./validationRules";
import { useTranslation } from "react-i18next";

interface Props {
  value: string | undefined;
  className?: string;
  setValid: Dispatch<SetStateAction<boolean>>
}

const rules = [
  { label: "One uppercase", pattern: UPPERCASE_REGEX, t: "one_uppercase" },
  { label: "One number", pattern: NUMBER_REGEX, t: "one_number" },
  { label: "Min 8 characters", pattern: LENGTH_REGEX, t: "min_8_characters" },
  { label: "One special char", pattern: SPECIAL_CHARS_REGEX, t: "one_special_char" }
];

const CheckList = (props: Props) => {

  const {t} = useTranslation()

  useEffect(()=>{
    if(props.value){
      if(rules.every(el=> props?.value.match(el.pattern))){
        props.setValid(true)
      }else{
        props.setValid(false)
      }
    }
  },[props.value])
  return (
    <div className={styles.wrapper}>
      {rules.map((rule) => {
        const cn =
          props.value && props.value.match(rule.pattern) ? styles.passed : "";
        return <p className={cn}>{t(rule.t)}</p>;
      })}
    </div>
  );
};

export default CheckList;
