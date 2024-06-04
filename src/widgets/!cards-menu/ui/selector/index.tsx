import styles from './styles.module.scss';
import {useTranslation} from 'react-i18next';
import {IconApp} from "@/shared/ui/icons/icon-app";
import {ReactNode, useEffect, useState} from "react";

interface IOption {
    value: string;
    label: ReactNode;
}

interface IParams {
    label?: string;
    value?: string;
    className?: string;
    options?: IOption[];
    children?: ReactNode;
    placeholder?: string;
    preContent?: ReactNode;
    onSelect?: (value: string) => void;
}

const ExtendedSelect = ({
    value,
    label,
    options,
    children,
    onSelect,
    className,
    preContent,
    placeholder
}: IParams) => {
    const {t} = useTranslation();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selected, setSelected] = useState<string>(value);

    useEffect(() => {
        setSelected(value);
    }, [value])

    return <>
        <div className={`${styles.Container} ${className}`}>
            {preContent}
            <div className={styles.Label}>{label}</div>
            <div className={styles.Suffix} onClick={() => setIsOpen(!isOpen)}>
                <div className={styles.Selector}>
                    {value ? (options.find(o => o.value === selected))?.label : placeholder}
                </div>

                <div className={styles.Icon}>
                    <IconApp code='t08' color='#fff' size={12} className="rotate-90" />
                </div>
            </div>
        </div>

        {!isOpen ? children : <>
            <div className={`${styles.Label} `}>
                {t('select_card_type')}
            </div>

            <div className={styles.OptionsContainer}>
                {options.map((option) => (
                    <div
                        className={styles.Option}
                        onClick={() => {
                            setSelected(option.value);
                            onSelect(option.value);
                            setIsOpen(false);
                        }}
                    >
                        {option.label}
                    </div>
                ))}
            </div>
        </>}
    </>
}

export default ExtendedSelect;
