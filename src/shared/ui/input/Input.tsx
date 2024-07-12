import {
  ChangeEvent,
  FormEvent,
  forwardRef,
  HTMLInputAutoCompleteAttribute,
  MutableRefObject,
  ReactNode,
  useState
} from "react";

import { useBreakpoints } from "@/app/providers/BreakpointsProvider";
import { IconApp } from "@/shared/ui/icons/icon-app";

import styles from "./style.module.scss";
import { validateInput } from "./model/helpers";

type IParams = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  allowDigits?: boolean;
  allowSymbols?: boolean;
  discardLetters?: boolean;
  className?: string;
  wrapperClassname?: string;
  suffix?: ReactNode;
  caption?: string;
  size?: "md" | "sm";
  value?: string;
  name?: string;
  placeholder?: string;
  prefix?: ReactNode;
  disabled?: boolean;
  type?: string;
  autoComplete?: HTMLInputAutoCompleteAttribute;
  onInput?: (event: FormEvent) => void;
};

const Input = forwardRef(
  (
    {
      onChange,
      allowDigits,
      allowSymbols,
      discardLetters,
      className,
      suffix,
      prefix,
      caption,
      value,
      name,
      wrapperClassname,
      placeholder,
      size,
      disabled,
      type,
      onInput,
      autoComplete,
      ...props
    }: IParams,
    ref: MutableRefObject<any>
  ) => {
    const { md } = useBreakpoints();
    const inputSize = size || (md ? "sm" : "md");
    const [showCaption, setShowCaption] = useState(true);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (validateInput(event, allowDigits || false, allowSymbols || false, discardLetters || true)) {
        onChange(event);
        setShowCaption(event.target.value.length === 0);
      }
    };

    return (
      <div className={"w-full"}>
        <div
          data-size={inputSize}
          className={`${styles.Input} ${wrapperClassname} ${className || ""}${
            inputSize === "md" ? styles.InputDesktopWrapper : styles.InputMobileWrapper
          }`}
        >
          <div className={styles.PrefixWrap}>
            {prefix && <span className={styles.Prefix}>{prefix}</span>}
            <input
              autoComplete={autoComplete ?? null}
              className={`${inputSize === "md" ? styles.InputDesktop : styles.InputMobile} ${className && className}`}
              {...props}
              type={type}
              onInput={onInput}
              ref={ref}
              disabled={disabled}
              name={name}
              value={value ?? ""}
              placeholder={`-${placeholder.toLowerCase()}-`}
              onChange={handleChange}
            />
          </div>
          {suffix && <div className={styles.SuffixBlock}>{suffix}</div>}
        </div>
        {caption && showCaption ? (
          <div className={styles.Caption}>
            <IconApp color={"var(--gek-orange)"} code='t27' size={13} />
            <span>{caption}</span>
          </div>
        ) : null}
      </div>
    );
  }
);

export default Input;
