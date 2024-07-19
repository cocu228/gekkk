import { ChangeEvent, FC, ReactNode, useState } from "react";

import styles from "@/widgets/custom-history/ui/style.module.scss";
import { IconApp } from "@/shared/ui/icons/icon-app";
import Input from "@/shared/ui/input/Input";
import Loader from "@/shared/ui/loader";

interface WithoutSearchProps<O = unknown> {
  title: string;
  isLoading?: boolean;
  noOption?: ReactNode;
  options: O[];
  onClick: (option: O) => void;
  renderOption: FC<{ option: O; onClick: WithoutSearchProps["onClick"] }>;
}

interface WithSearchProps<O = unknown> extends WithoutSearchProps<O> {
  searchable: boolean;
  placeholder: string;
  filterOption: (opt: O, searchValue: string) => boolean;
}

export type IOptionsProps<P = unknown> = WithoutSearchProps<P> | WithSearchProps<P>;

const Options = <O,>({ title, options, isLoading, noOption, renderOption, onClick, ...props }: IOptionsProps<O>) => {
  const [searchValue, setSearchValue] = useState<string>("");

  const handleOnChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(target.value);
  };

  const opts = () => {
    if ("searchable" in props && searchValue) {
      return options.filter(o => props.filterOption(o, searchValue.toLowerCase()));
    }
    return options;
  };

  return (
    <div className='w-full mt-[15px]'>
      <span className={styles.CurrencyListTitle}>{title}</span>
      {"searchable" in props ? (
        <div className='bg-[white] items-center border-solid w-full flex gap-[9px] px-[18px] py-2.5 rounded-lg'>
          <IconApp size={20} code='t12' color='#000' />
          <Input
            size='sm'
            type='text'
            value={searchValue}
            data-testid='SearchName'
            onChange={handleOnChange}
            placeholder={props.placeholder}
          />
        </div>
      ) : null}
      {isLoading ? (
        <div className='min-h-[100px] flex justify-center w-full relative'>
          <Loader />
        </div>
      ) : opts().length === 0 && noOption ? (
        noOption
      ) : (
        opts()?.map(option => renderOption({ option, onClick }))
      )}
    </div>
  );
};

export default Options;
