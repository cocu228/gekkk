import { MouseEventHandler } from "react";

import styles from "./styles.module.scss";

interface IParams {
  progress?: number;
  dataItem?: string;
  className?: string;
  leftPrimary: JSX.Element | string;
  rightPrimary?: JSX.Element | string;
  leftSecondary?: JSX.Element | string;
  rightSecondary?: JSX.Element | string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const MenuItem = ({
  className,
  leftPrimary,
  rightPrimary,
  leftSecondary,
  rightSecondary,
  progress = null,
  dataItem = null,
  onClick = () => {}
}: IParams) => {
  const progressCL = progress !== null ? "p-[15px_20px_0_30px]" : "p-[15px_20px_15px_30px]";

  return (
    <div
      data-item={dataItem}
      className={`${styles.MenuItem} ${progress !== null ? "justify-between" : "justify-center"} ${className}`}
      onClick={onClick}
    >
      <div className={`w-full flex justify-between ${progressCL}`}>
        <div className={styles.MenuItemColumn}>
          <p className='font-semibold'>{leftPrimary}</p>
          {!leftSecondary ? null : <p className='text-[var(--gek-mid-grey)]'>{leftSecondary}</p>}
        </div>

        <div className={styles.MenuItemColumn}>
          <p className='font-semibold text-right text-[var(--gek-additional)]'>{rightPrimary}</p>
          {!rightSecondary ? null : <p className='text-[var(--gek-mid-grey)] text-right'>{rightSecondary}</p>}
        </div>
      </div>

      {progress !== null && (
        <div className='w-full p-[0_47px_5px_10px]'>
          <div className={`${styles.ProgressBar}`}>
            <div className={`${styles.CurrentProgress} ${progress ? `w-[${progress}%]` : ""}`} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuItem;
