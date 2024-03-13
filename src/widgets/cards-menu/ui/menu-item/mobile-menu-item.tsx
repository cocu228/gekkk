import styles from './style.module.scss';
import {MouseEventHandler, useRef} from "react";

interface IParams {
	alert?: boolean;
	dataItem?: string;
	className?: string;
	leftPrimary: JSX.Element | string;
	rightPrimary?: JSX.Element | string;
	leftSecondary?: JSX.Element | string;
	rightSecondary?: JSX.Element | string;
	onClick?: MouseEventHandler<HTMLDivElement>;
	progres?: number;
}

export const MobileMenuItem = ({
	className,
	leftPrimary,
	rightPrimary,
	alert = false,
	leftSecondary,
	rightSecondary,
	dataItem = null,
	onClick = () => {},
	progres,
}: IParams) => {
	const bar = useRef<HTMLDivElement>();
	
	if (bar.current) bar.current.style.width = `${progres}%`

	if (progres != undefined) return (
		<div
		onClick={onClick}
		data-item={dataItem}
		className={`${styles.MobileMenuItem} ${className} typography-b1 flex-col pb-3`}
		>
			<div className='w-full flex flex-row justify-between'>
				<div className='grid gap-1'>
					<div className='row font-bold'>{leftPrimary}</div>
					
					{!leftSecondary ? null : (
						<div className='row text-gray-500'>{leftSecondary}</div>
					)}
				</div>
				
				<div className='grid gap-1'>
					<div className='row font-bold text-right'>{rightPrimary}</div>
					
					{!rightSecondary ? null : (
						<div className='row text-gray-500 text-right'>{rightSecondary}</div>
					)}
				</div>
			</div>
			<div className={`${styles.progressbar} mt-1`}>
				<div className={`${styles.curProgress}`} ref={bar}></div>
			</div>
	</div>
	);

	return (
		<div
			onClick={onClick}
			data-item={dataItem}
			className={`${styles.MobileMenuItem} ${className} typography-b1`}
		>
			<div className='grid gap-1'>
				<div className='row font-bold'>{leftPrimary}</div>
				
				{!leftSecondary ? null : (
					<div className='row text-gray-500'>{leftSecondary}</div>
				)}
			</div>
			
			<div className='grid gap-1'>
				<div className='row font-bold text-right'>{rightPrimary}</div>
				
				{!rightSecondary ? null : (
					<div className='row text-gray-500 text-right'>{rightSecondary}</div>
				)}
			</div>
		</div>
	)
}

