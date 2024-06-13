import {ChangeEvent, MouseEvent, ReactNode, useEffect, useMemo, useRef} from "react";
import {IconApp} from "@/shared/ui/icons/icon-app";
import {IconCoin} from "@/shared/ui/icons/icon-coin";
import {ISelectInput, ObjectType} from "../../select.types";
import styles from '../../style.module.scss'

const SelectInput = <O extends ObjectType,>({
    isOpen,
    label,
    placeholder,
    searchable,
    onToggleIsOpen,
    inputValue,
    iconCode,
    onChangeInputValue
}: ISelectInput<O>) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleOnPreventDefault = (e: MouseEvent<HTMLInputElement>) => {
        e.preventDefault()
    }

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChangeInputValue(e.target.value);
    }

    const renderIcon = useMemo<ReactNode>(() => {
        if (iconCode === null) {
            return <IconApp code='t08' size={10} className={`${!isOpen ? 'rotate-[90deg]' : 'rotate-[-90deg]'}`} color='#var(--color-gray-600)' />
        } else {
            return <IconCoin width={20} height={20} code={iconCode} />
        }
    }, [iconCode, isOpen])

    useEffect(() => {
        if (inputRef.current && isOpen) {
            inputRef.current.focus()
        }
    }, [isOpen]);

    return (
        <div className={`${styles.SelectInputContainer} ${styles.SelectInputContainerSearchable} ${isOpen ? styles.SelectInputContainerOpen : ""}`} onClick={onToggleIsOpen()}>
            <input
                id={label}
                type="text"
                ref={inputRef}
                placeholder={placeholder}
                className={styles.SelectInputContainerInput}
                value={inputValue}
                readOnly={!searchable}
                onClick={handleOnPreventDefault}
                onChange={handleOnChange}
            />
            {renderIcon}
        </div>
    )
}

export default SelectInput;
