import { FC, useEffect, useRef, useState } from "react";

import { ICtxCurrency } from "@/processes/CurrenciesContext";
import { useBreakpoints } from "@/app/providers/BreakpointsProvider";

import SelectLayout from "./ui/selectLayout";
import SelectInput from "./ui/selectInput";
import SelectDropdown from "./ui/selectDropdown";
import SelectOverlay from "./ui/selectOverlay";

const useDebounce = () => {
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  return <A,>(cb: (...args: A[]) => void, delay: number = 500) =>
    (...args: A[]) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        cb(...args);
      }, delay);
    };
};

interface ISelectProps {
  label: string;
  placeholder: string;
  value: ICtxCurrency | null;
  options: ICtxCurrency[];
  onChange: (value: ICtxCurrency | null) => void;
}

const Select: FC<ISelectProps> = ({ placeholder, value, label, options, onChange }) => {
  const { md } = useBreakpoints();
  const debounce = useDebounce();

  const [currentOptions, setCurrentOptions] = useState<ICtxCurrency[]>(options);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [iconCode, setIconCode] = useState<string | number | null>(null);
  const [inputValue, setInputValue] = useState<string>(value?.name || "");

  const filterOptions =
    (inputValue: string) =>
    ({ name, $const }: ICtxCurrency) => {
      const byCode = $const.toLowerCase().includes(inputValue.toLowerCase());
      const byName = name.toLowerCase().includes(inputValue.toLowerCase());
      return byCode || byName;
    };

  const handleOnFilterOptions = debounce((inputValue: string) => {
    setCurrentOptions(() => (!inputValue ? options : options.filter(filterOptions(inputValue))));
  });

  const handleOnToggleIsOpen = (open?: boolean) => () => {
    setIsOpen(prevState => {
      const isOpen = open === undefined ? !prevState : open;
      if (value) {
        if (!inputValue) {
          setInputValue("");
          onChange(null);
        } else if (!isOpen) {
          setInputValue(md ? value.$const : value.name);
        }
      }
      return isOpen;
    });
  };

  const handleOnChangeInputValue = (inputValue: string) => {
    setInputValue(inputValue);
    handleOnFilterOptions(inputValue);
    if (!inputValue && value) {
      onChange(null);
    }
  };

  const handleOnChange = (value: ICtxCurrency) => {
    setCurrentOptions(options);
    setInputValue(md ? value.$const : value.name);
    onChange(value);
  };

  useEffect(() => {
    if (value) {
      setInputValue(md ? value.$const : value.name);
      setIconCode(value.$const);
    } else {
      setInputValue("");
      setIconCode(null);
    }
  }, [value, md]);

  useEffect(() => {
    setCurrentOptions(options);
  }, [options]);

  return (
    <SelectLayout label={label}>
      <SelectInput
        label={label}
        isOpen={isOpen}
        iconCode={iconCode}
        placeholder={placeholder}
        inputValue={inputValue}
        onToggleIsOpen={handleOnToggleIsOpen}
        onChangeInputValue={handleOnChangeInputValue}
      />
      <SelectDropdown
        isOpen={isOpen}
        options={currentOptions}
        value={value}
        onChange={handleOnChange}
        onToggleIsOpen={handleOnToggleIsOpen}
      />
      <SelectOverlay isOpen={isOpen} onClose={handleOnToggleIsOpen(false)} />
    </SelectLayout>
  );
};

export default Select;
