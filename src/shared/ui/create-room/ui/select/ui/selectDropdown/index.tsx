import {FC, useLayoutEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import styles from "../../style.module.scss"
import {IconCoin} from "@/shared/ui/icons/icon-coin";
import {useBreakpoints} from "@/app/providers/BreakpointsProvider";
import {ICtxCurrency} from "@/processes/CurrenciesContext";

interface ISelectDropdownProps {
    isOpen: boolean
    options: ICtxCurrency[]
    value: ICtxCurrency | null
    onChange: (value: ICtxCurrency) => void;
    onToggleIsOpen: (open?: boolean) => () => void
}

const SelectDropdown: FC<ISelectDropdownProps> = ({
    isOpen,
    value,
    options,
    onChange,
    onToggleIsOpen,
}) => {
    const {md} = useBreakpoints()
    const {t} = useTranslation()
    const dropdownRef = useRef<HTMLDivElement | null>(null)
    const [height, setHeight] = useState<number>(150)

    const handleOnChange = (option: ICtxCurrency) => () => {
        onChange(option)
        onToggleIsOpen(false)()
    }

    const getActiveOption = (option: ICtxCurrency) => value && option.name === value.name;

    useLayoutEffect(() => {
        if (dropdownRef.current) {
            if (options.length && isOpen) {
                const listHeight = dropdownRef.current.children[0].clientHeight;
                setHeight((listHeight * 4) + 33)
            } else {
                setHeight(150)
            }
        }
    }, [options, isOpen]);

    return (
        <div
            style={{minHeight: height, maxHeight: height}}
            className={`${styles.SelectDropdownContainer} ${isOpen ? styles.SelectDropdownContainerOpen : ""}`}
        >
            {options.length ? (
                <div ref={dropdownRef} className={`${styles.SelectDropdownContainerInner}`}>
                    {options.map(option => (
                        <div
                            key={option.name}
                            data-active={getActiveOption(option)}
                            onClick={handleOnChange(option)}
                        >
                            <div className={styles.RenderOptionContainer}>
                                <IconCoin width={md ? 20 : 25} height={md ? 20 : 25} code={option.$const}/>
                                <p className={styles.RenderOptionContainerText}>{option.$const}</p>
                                <p className={styles.RenderOptionContainerText}>{option.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className={styles.SelectDropdownContainerNoData}>
                    {t("select_token_no_data")}
                </div>
            )}
        </div>
    )
}

export default SelectDropdown;
