import {Key} from "react";
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
    onChange,
    onToggleIsOpen,
}: ISelectDropdown<O>) => {
    const { t } = useTranslation()

    const handleOnChange = (option: O) => () => {
        onChange(option)
        onToggleIsOpen(false)()
    }

    const getActiveOption = (option: O) => value && option[optionsKey] === value[optionsKey];
    const filteredOptions = getFilterValue ? options.filter(getFilterValue) : options

    return (
        <div className={`${styles.SelectDropdownContainer} ${isOpen ? styles.SelectDropdownContainerOpen : ""}`}>
            {filteredOptions.length ? filteredOptions.map(option => (
                <div key={option[optionsKey] as Key} data-active={getActiveOption(option)} onClick={handleOnChange(option)}>
                    {renderOption ? renderOption({ option }) : getOptionValue(option)}
                </div>
            )) : (
                <div>
                    {t("no-data")}
                </div>
            )}
        </div>
    )
}

export default SelectDropdown;
