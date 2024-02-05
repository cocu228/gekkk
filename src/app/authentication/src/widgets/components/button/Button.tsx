import styles from './style.module.css';
import {HTMLAttributes} from 'preact/compat';

interface IParams {
	text?: boolean;
	className?: string;
	children?: JSX.Element | string;
}

const Button = ({
	text,
	children,
	className,
	...params
}: IParams & HTMLAttributes<HTMLButtonElement>) => {
	return <button
		{...params}
		className={`${text ? styles.TextButton : styles.Button} ${className}`}
	>
		{children}
	</button>;
}

export default Button;
