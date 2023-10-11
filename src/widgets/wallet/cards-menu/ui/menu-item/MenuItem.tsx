import styles from './style.module.scss';

interface IParams {
	alert?: boolean;
	className?: string;
	onClick?: () => void;
	leftPrimary: JSX.Element | string;
	rightPrimary?: JSX.Element | string;
	leftSecondary?: JSX.Element | string;
	rightSecondary?: JSX.Element | string;
}

const MenuItem = ({
	className,
	leftPrimary,
	rightPrimary,
	alert = false,
	leftSecondary,
	rightSecondary,
	onClick = () => {}
}: IParams) => {
	return (
		<div
			className={`${styles.MenuItem} ${alert ? styles.Alert : ''} ${className}`}
			onClick={onClick}
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
