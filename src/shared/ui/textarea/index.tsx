import { ChangeEvent, FC, useRef } from "react";

import { validateInput } from "@/shared/ui/input/model/helpers";

import styles from "./style.module.scss";

interface ITextareaProps {
  name: string;
  value: string;
  disabled?: boolean;
  placeholder?: string;
  allowDigits?: boolean;
  allowSymbols?: boolean;
  discardLetters?: boolean;
  className?: string;
  textareaClassName?: string;
  maxLength?: number;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const Textarea: FC<ITextareaProps> = ({
  onChange,
  placeholder,
  allowDigits,
  allowSymbols,
  discardLetters,
  className = "",
  textareaClassName,
  ...props
}) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (validateInput(event, allowDigits || false, allowSymbols || false, discardLetters || true)) {
      onChange(event);
    }
  };

  return (
    <div className={`${styles.Wrapper} ${className}`}>
      <textarea
        rows={1}
        {...props}
        ref={textareaRef}
        onChange={handleChange}
        placeholder={`-${placeholder.toLowerCase()}-`}
        className={`${styles.Textarea} ${textareaClassName}`}
        onInput={() => {
          textareaRef.current.style.height = "auto";
          textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }}
      />
    </div>
  );
};

export default Textarea;
