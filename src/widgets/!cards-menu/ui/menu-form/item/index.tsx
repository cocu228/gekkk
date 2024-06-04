import styles from './styles.module.scss';
import {MouseEventHandler, useRef} from "react";

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
	onClick = () => {},
}: IParams) => {
    const bar = useRef<HTMLDivElement>();
	
	if (progress && bar.current) bar.current.style.width = `${progress}%`

	return (
		<div
			onClick={onClick}
			data-item={dataItem}
			className={`${styles.MenuItem} ${className}`}
		>
            <div className='flex justify-between'>
                <div className={styles.MenuItemColumn}>
			    	<div className='font-bold'>{leftPrimary}</div>

			    	{!leftSecondary ? null : (
			    		<div className='text-[var(--gek-mid-grey)]'>{leftSecondary}</div>
			    	)}
			    </div>
                    
			    <div className={styles.MenuItemColumn}>
			    	<div className='font-bold text-right'>{rightPrimary}</div>
                    
			    	{!rightSecondary ? null : (
			    		<div className='text-[var(--gek-mid-grey)] text-right'>{rightSecondary}</div>
			    	)}
			    </div>
            </div>

            {progress !== null && (
     		    <div className={`${styles.ProgressBar} mt-2`}>
	 		    	<div className={`${styles.CurrentProgress}`} ref={bar}></div>
	 		    </div>
            )}
		</div>
	)
}

export default MenuItem;
