import { FC } from "react";
import { useTranslation } from "react-i18next";

import { ISelectTxTypes } from "@/widgets/custom-history/model/types";

interface ICurrencyOptionProps {
  option: ISelectTxTypes;
  onClick: (option: ISelectTxTypes) => void;
}

const TypeRenderOption: FC<ICurrencyOptionProps> = ({ option, onClick }) => {
  const { t } = useTranslation();
  return (
    <div
      className='w-full flex justify-between min-h-[60px] mt-2 bg-[white] text-[var(--gek-dark-blue)] active:text-[var(--gek-green)] rounded-lg cursor-pointer'
      onClick={() => onClick(option)}
    >
      <div className='ml-5 flex flex-row p-2 gap-5 justify-center items-center '>
        <span className='text-[12px] h-full flex items-center font-bold'>{t(option.t)}</span>
      </div>
    </div>
  );
};

export default TypeRenderOption;
