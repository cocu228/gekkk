import { FC } from "react";
import { IconApp } from "@/shared/ui/icons/icon-app";

interface IConfirmNoticeProps {
  text: string;
}

const ConfirmNotice: FC<IConfirmNoticeProps> = ({ text }) => {
  return (
    <div className="flex items-start gap-[5px] mb-[30px]">
      <IconApp color="#8F123A" size={15} className={"min-w-[15px]"} code="t27" />
      <span className="text-[var(--gek-dark-grey)] md:text-fs12 text-fs14">
          {text}
        </span>
    </div>
  )
}

export default ConfirmNotice;