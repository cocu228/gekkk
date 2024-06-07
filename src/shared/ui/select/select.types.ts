import {FC} from "react";

export interface ObjectType {
    [key: string]: unknown
}

export interface ISelectProps<O extends ObjectType> {
    searchable?: boolean;
    placeholder?: string;
    getIconCode?: (option: O) => string | number;
    getFilterValue?: (option: O) => boolean;
    label?: string;
    optionsKey: keyof O;
    value?: O | null;
    options: O[];
    getOptionValue: (option: O) => string | number;
    renderOption?: FC<{ option: O }>
    onChange: (value: O | null) => void;
}

export interface ISelectInput<O extends ObjectType> extends Pick<ISelectProps<O>, "placeholder" | "searchable" | "label"> {
    isOpen: boolean;
    iconCode: string | number | null;
    inputValue: string
    onToggleIsOpen: (open?: boolean) => () => void;
    onChangeInputValue: (inputValue: string) => void
}

export interface ISelectDropdown<O extends ObjectType> extends Omit<ISelectProps<O>, "searchable" | "placeholder"> {
    isOpen: boolean;
    onToggleIsOpen: (open?: boolean) => () => void;
}
