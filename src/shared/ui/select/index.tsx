import {useEffect, useRef, useState} from "react";
import {ISelectProps, ObjectType} from "./select.types";
import SelectLayout from "./ui/selectLayout";
import SelectInput from "./ui/selectInput";
import SelectDropdown from "./ui/selectDropdown";
import SelectOverlay from "./ui/selectOverlay";

const useDebounce = () => {
    const debounceRef = useRef<NodeJS.Timeout | null>(null);

    return <A,>(cb: (...args: A[]) => void, delay: number = 500) => {
        return (...args: A[]) => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
            debounceRef.current = setTimeout(() => {
                cb(...args)
            }, delay);
        }
    }
}

const Select = <O extends ObjectType,>({
    searchable,
    placeholder,
    value,
    label,
    getOptionValue,
    getFilterValue,
    options,
    onChange,
    optionsKey,
    renderOption,
    getIconCode,
}: ISelectProps<O>) => {
    const debounce = useDebounce()

    const [currentOptions, setCurrentOptions] = useState<O[]>(options);
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [iconCode, setIconCode] = useState<string | number | null>(null)
    const [inputValue, setInputValue] = useState<string>(value ? `${getOptionValue(value)}` : "")

    const handleOnFilterOptions = debounce((inputValue: string) => {
        setCurrentOptions(() => !inputValue ? options : options.filter(opt => `${getOptionValue(opt)}`.toLowerCase().includes(inputValue.toLowerCase())))
    })

    const handleOnToggleIsOpen = (open?: boolean) => () => {
        setIsOpen(prevState => open === undefined ? !prevState : open)
    }

    const handleOnChangeInputValue = (inputValue: string) => {
        if (searchable) {
            console.log({inputValue})
            setInputValue(inputValue)
            handleOnFilterOptions(inputValue)
        }
    }

    const handleOnChange = (value: O) => {
        setCurrentOptions(options)
        onChange(value)
    }

    useEffect(() => {
        if (value) {
            setInputValue(`${getOptionValue(value)}`)
        }
    }, [getOptionValue, value]);

    useEffect(() => {
        if (getIconCode && value) {
            setIconCode(getIconCode(value))
        } else {
            setIconCode(null)
        }
    }, [getIconCode, value]);

    return (
        <SelectLayout label={label}>
            <SelectInput
                label={label}
                isOpen={isOpen}
                iconCode={iconCode}
                placeholder={placeholder}
                searchable={searchable}
                inputValue={inputValue}
                onToggleIsOpen={handleOnToggleIsOpen}
                onChangeInputValue={handleOnChangeInputValue}
            />
            <SelectDropdown
                isOpen={isOpen}
                options={currentOptions}
                optionsKey={optionsKey}
                value={value}
                getFilterValue={getFilterValue}
                getOptionValue={getOptionValue}
                renderOption={renderOption}
                onChange={handleOnChange}
                onToggleIsOpen={handleOnToggleIsOpen}
            />
            <SelectOverlay isOpen={isOpen} onClose={handleOnToggleIsOpen(false)}/>
        </SelectLayout>
    )
}

export default Select;
