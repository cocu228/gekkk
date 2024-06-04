import { PASSWORD_VALID_REGEX } from "./validationRules";
import { memo, useState } from "react";
import TextInput, { Props } from "./textInput";
import styles from "./passwordInput.module.css";
import { IconApp } from "@/shared/ui/icons/icon-app";

interface PasswordInputProps extends Omit<Props, "pattern" | "type" | "ref"> {
  skipValidation?: boolean;
  onChange?: (event) => void;
}

const PlainTextToggle = ({
  setIsPlainText,
  isPlainText
}: {
  setIsPlainText: any;
  isPlainText: boolean;
}) => {
  return (
    <button
      className={styles.rhsComponent}
      type="button"
      onClick={() => setIsPlainText(!isPlainText)}
    >
      <span className="flex items-center flex-nowrap gap-2">
        {!isPlainText ? (
          <IconApp code="t71" size={24} color="#000" />
        ) : (
          <IconApp code="t41" size={24} color="#000" />
        )}
      </span>
    </button>
  );
};

const PasswordInput = memo(
  ({ skipValidation = false, ...rest }: PasswordInputProps) => {
    const [isPlainText, setIsPlainText] = useState(false);

    return (
      <TextInput
        type={isPlainText ? "text" : "password"}
        pattern={skipValidation ? undefined : PASSWORD_VALID_REGEX.source}
        RhsComponent={PlainTextToggle({ setIsPlainText, isPlainText })}
        {...rest}
      />
    );
  }
);

// PasswordInput.displayName = "PasswordInput";
export default PasswordInput;
export type { PasswordInputProps };
