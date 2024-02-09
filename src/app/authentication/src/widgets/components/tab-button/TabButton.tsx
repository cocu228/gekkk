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
		className={`${styles.TabButton} ${active ? styles.TabButtonActive : ""} ${className}`}
	>
		{children}
	</button>;
}

export default TabButton;
