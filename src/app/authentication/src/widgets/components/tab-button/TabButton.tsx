import styles from './style.module.css';
import {HTMLAttributes} from 'preact/compat';

interface IParams {
	active?: boolean;
	className?: string;
	children?: JSX.Element | string;
}

const TabButton = ({
	active = false,
	children,
	className = '',
	...params
}: IParams & HTMLAttributes<HTMLButtonElement>) => {
	return <button
		{...params}
		className={`${active ? styles.TabButtonActive : styles.TabButton} ${className}`}
	>
		{children}
	</button>;
}

export default TabButton;
