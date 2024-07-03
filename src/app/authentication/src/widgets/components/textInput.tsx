import classNames from "classnames";
import styles from "./textInput.module.css";
import {memo, useState} from "preact/compat";
import {JSX} from "preact";

interface Props extends React.HTMLProps<HTMLInputElement> {
    id: string;
    name: string;
    className?: string;
    label?: string;
    errorText?: string;
    autoComplete?: string;
    RhsComponent?: JSX.Element;
}

const TextInput = memo(
    ({className, label, errorText, id, autoComplete, RhsComponent, ...rest}: Props) => {
        const [validationMessage, setValidationMessage] = useState<string>("");

        const onInvalid = (e) => {
            const target = e.target as HTMLInputElement;
            setValidationMessage(target.validationMessage);
        };

        const onBlur = (e) => {
            const target = e.target as HTMLInputElement;

            if (!!validationMessage) {
                setValidationMessage(target.validationMessage);
            }
        };

        const wrapperCn = classNames(className, styles.wrapper);

        return (
            <div className={wrapperCn}>
                <div>
                    {label && (
                        <div className={styles.label}>
                            <label htmlFor={id}>{label}</label>
                        </div>
                    )}
                </div>
                <div className={styles.innerContent}>
                    <input
                        id={id}
                        onBlur={onBlur}
                        onInvalid={onInvalid}
                        className={styles.input}
                        autoComplete={autoComplete ?? null}
                        {...rest}
                    />

                    {RhsComponent && (
                        <div className={styles.rhsComponent}>{RhsComponent}</div>
                    )}
                </div>

                {!!validationMessage && (
                    <div className={styles.validationMessage}>
                        {errorText || validationMessage}
                    </div>
                )}
            </div>
        );
    }
);

// TextInput.displayName = "TextInput";

export default TextInput;
export type {Props};
