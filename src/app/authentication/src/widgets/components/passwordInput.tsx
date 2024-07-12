import { PASSWORD_VALID_REGEX } from "./validationRules";
import { useState } from "react";
import TextInput, { Props } from "./textInput";
import styles from "./passwordInput.module.css";
import { memo } from "preact/compat";
import { IconApp } from "./IconApp/index";

interface PasswordInputProps extends Omit<Props, "pattern" | "type" | "ref"> {
  skipValidation?: boolean;
  onChange?: (event) => void;
}

const PlainTextToggle = ({ setIsPlainText, isPlainText }: { setIsPlainText: any; isPlainText: boolean }) => {
  return (
    <button className={styles.rhsComponent} type='button' onClick={() => setIsPlainText(!isPlainText)}>
      <span className='flex items-center flex-nowrap gap-2'>
        {!isPlainText ? (
          <IconApp code='t71' color='#868686' size={24} />
        ) : (
          <IconApp code='t41' color='#868686' size={24} />
        )}
      </span>
    </button>
  );
};

const PasswordInput = memo(({ skipValidation = false, ...rest }: PasswordInputProps) => {
  const [isPlainText, setIsPlainText] = useState(false);

  return (
    <TextInput
      type={isPlainText ? "text" : "password"}
      pattern={skipValidation ? undefined : PASSWORD_VALID_REGEX.source}
      RhsComponent={PlainTextToggle({ setIsPlainText, isPlainText })}
      {...rest}
    />
  );
});

// PasswordInput.displayName = "PasswordInput";
export default PasswordInput;
export type { PasswordInputProps };
