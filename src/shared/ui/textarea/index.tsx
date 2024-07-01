import { ChangeEvent, FC, useRef, useState } from "react";
import styles from "./style.module.css"
import { validateInput } from "@/shared/ui/input/model/helpers";

interface ITextareaProps {
  name: string;
  value: string;
  disabled?: boolean;
  placeholder?: string;
  allowDigits?: boolean;
  allowSymbols?: boolean;
  discardLetters?: boolean;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
}

const Textarea: FC<ITextareaProps> = ({
  onChange,
  placeholder,
  allowDigits,
  allowSymbols,
  discardLetters,
  ...props
}) => {
  const [value, setValue] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (validateInput(event, allowDigits || false, allowSymbols || false, discardLetters || true)) {
      setValue(event.target.value);
      onChange(event);
    }
  };

  return (
    <div className={styles.Wrapper}>
      <textarea
        rows={1}
        {...props}
        value={value}
        ref={textareaRef}
        onChange={handleChange}
        placeholder={`-${placeholder.toLowerCase()}-`}
        className={styles.Textarea}
        onInput={() => {
          textareaRef.current.style.height = 'auto';
          textareaRef.current.style.height = (textareaRef.current.scrollHeight) + "px";
        }}
      />
    </div>
  )
}

export default Textarea;
