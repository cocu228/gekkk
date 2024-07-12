import { FC } from "react";

import { IconApp } from "@/shared/ui/icons/icon-app";

interface IConfirmNoticeProps {
  text: string;
  isError?: boolean;
}

const Notice: FC<IConfirmNoticeProps> = ({ text, isError = false }) => (
  <div className={`flex items-start gap-[5px] ${isError ? "mb-[5px]" : "mb-[30px]"}`}>
    <IconApp color='#8F123A' size={15} className='min-w-[15px]' code='t27' />
    <span className={`text-[var(${isError ? "--gek-red" : "--gek-dark-grey"})] md:text-fs12 text-fs14`}>{text}</span>
  </div>
);

export default Notice;
