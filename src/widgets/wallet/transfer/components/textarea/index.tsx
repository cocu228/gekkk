import { ChangeEvent, FC, useEffect, useRef } from "react";
import styles from "./style.module.css"

interface IAddressInputProps {
  name: string;
  value: string;
  placeholder?: string;
  disabled?: boolean;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
}

const Textarea: FC<IAddressInputProps> = ({ placeholder, ...props }) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  const holder = `-${placeholder.toLowerCase()}-`

  useEffect(() => {
    function OnInput() {
      this.style.height = 'auto';
      this.style.height = (this.scrollHeight) + "px";
    }

    if (textareaRef.current) {
      textareaRef.current.addEventListener("input", OnInput, false);
    }

    return () => {
      textareaRef.current?.removeEventListener("input", OnInput)
    }
  }, []);

  return (
    <div className={styles.Wrapper}>
      <textarea
        ref={textareaRef}
        className={styles.Textarea}
        rows={1}
        {...props}
        placeholder={holder}
      />
    </div>
  )
}

export default Textarea;