import { useEffect } from "react";
import styles from "./checklist.module.css";

// Importing the validation rules
import { UPPERCASE_REGEX, NUMBER_REGEX, LENGTH_REGEX, SPECIAL_CHARS_REGEX } from "./validationRules";

interface Props {
  className?: string;
  value: string | undefined;
  onValidate?: (value: boolean) => void;
}

const rules = [
  { label: "One uppercase", pattern: UPPERCASE_REGEX },
  { label: "One number", pattern: NUMBER_REGEX },
  { label: "Min 8 characters", pattern: LENGTH_REGEX },
  { label: "One special char", pattern: SPECIAL_CHARS_REGEX }
];

const CheckList = ({ value, className, onValidate }: Props) => {
  useEffect(() => {
    onValidate(rules.every(r => value.match(r.pattern)));
  }, [value]);

  return (
    <div className={`${styles.wrapper} ${className}`}>
      {rules.map(rule => {
        const cn = value && value.match(rule.pattern) ? styles.passed : "";
        return <p className={cn}>{rule.label}</p>;
      })}
    </div>
  );
};

export default CheckList;
