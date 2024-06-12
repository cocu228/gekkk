import {Key, useLayoutEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import styles from "../../style.module.scss"
import {ObjectType, ISelectDropdown} from "../../select.types";

const SelectDropdown = <O extends ObjectType,>({
    isOpen,
    value,
    options,
    optionsKey,
    getOptionValue,
    getFilterValue,
    renderOption,
    noDataText,
    onChange,
    onToggleIsOpen,
}: ISelectDropdown<O>) => {
    const { t } = useTranslation()
    const dropdownRef = useRef<HTMLDivElement | null>(null)
    const [height, setHeight] = useState<number>(150)

    const handleOnChange = (option: O) => () => {
        onChange(option)
        onToggleIsOpen(false)()
    }

    const getActiveOption = (option: O) => value && option[optionsKey] === value[optionsKey];
    const filteredOptions = getFilterValue ? options.filter(getFilterValue) : options;

    useLayoutEffect(() => {
        if (dropdownRef.current) {
            if (filteredOptions.length) {
                const listHeight = dropdownRef.current.children[0].clientHeight;
                setHeight((listHeight * 4) + 33)
            } else {
                setHeight(150)
            }
        }
    }, [filteredOptions]);

    return (
        <div
            style={{ minHeight: height, maxHeight: height }}
            className={`${styles.SelectDropdownContainer} ${isOpen ? styles.SelectDropdownContainerOpen : ""}`}
        >
            {filteredOptions.length ? (
                <div ref={dropdownRef} className={`${styles.SelectDropdownContainerInner}`}>
                    {filteredOptions.map(option => (
                        <div key={option[optionsKey] as Key} data-active={getActiveOption(option)}
                             onClick={handleOnChange(option)}>
                            {renderOption ? renderOption({option}) : getOptionValue(option)}
                        </div>
                    ))}
                </div>
            ) : (
                <div className={styles.SelectDropdownContainerNoData}>
                    {noDataText ? noDataText : t("select.token_no_data")}
                </div>
            )}
        </div>
    )
}

export default SelectDropdown;
