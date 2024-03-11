import styles from './style.module.scss';
import {MouseEventHandler} from "react";

interface IParams {
	alert?: boolean;
	dataItem?: string;
	className?: string;
	leftPrimary: JSX.Element | string;
	rightPrimary?: JSX.Element | string;
	leftSecondary?: JSX.Element | string;
	rightSecondary?: JSX.Element | string;
	onClick?: MouseEventHandler<HTMLDivElement>;
}

export const MobileMenuItem = ({
	className,
	leftPrimary,
	rightPrimary,
	alert = false,
	leftSecondary,
	rightSecondary,
	dataItem = null,
	onClick = () => {}
}: IParams) => {
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

