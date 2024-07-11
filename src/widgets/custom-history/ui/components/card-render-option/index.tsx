import { FC } from "react";

import { ISelectCard } from "@/widgets/custom-history/model/types";

interface ICardRenderOptionProps {
  option: ISelectCard;
  onClick: (option: ISelectCard) => void;
}

const CardRenderOption: FC<ICardRenderOptionProps> = ({ option, onClick }) => (
  <div
    className='w-full flex justify-between min-h-[60px] mt-2 bg-[white] rounded-lg cursor-pointer'
    onClick={() => onClick(option)}
  >
    <div className='ml-5 flex flex-row p-2 gap-5 justify-center items-center '>
      <span className='text-[12px] h-full flex items-center text-[#1F3446] font-bold'>{option.label}</span>
    </div>
  </div>
);

export default CardRenderOption;
