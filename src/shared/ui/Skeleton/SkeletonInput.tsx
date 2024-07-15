import { FC } from "react";

import style from "./styles.module.scss";

interface SkeletonInputProps {
  className?: string;
}

export const SkeletonInput: FC<SkeletonInputProps> = ({ className }) => (
  <div className={`${style.inp} ${className}`}>
    <span className={`${style.inpBg}`} />
  </div>
);
