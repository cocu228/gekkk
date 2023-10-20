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

const MenuItem = ({
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
			className={`${styles.MenuItem} ${alert ? styles.Alert : ''} ${className}`}
		>
			<div className='grid gap-1'>
				<div className='row font-bold'>{leftPrimary}</div>
				
				{!leftSecondary ? null : (
					<div className='row text-gray-500'>{leftSecondary}</div>
				)}
			</div>
			
			<div className='grid gap-1'>
				<div className='row font-bold'>{rightPrimary}</div>
				
				{!rightSecondary ? null : (
					<div className='row text-gray-500'>{rightSecondary}</div>
				)}
			</div>
		</div>
	)
}

export default MenuItem;
