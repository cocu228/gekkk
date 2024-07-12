import styles from "./style.module.css";
import { HTMLAttributes } from "preact/compat";
import { JSX } from "preact";

interface IParams {
  text?: boolean;
  className?: string;
  secondary?: boolean;
  children?: JSX.Element | string;
}

const Button = ({ text, children, secondary, className, ...params }: IParams & HTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...params}
      className={`${text ? styles.TextButton : secondary ? styles.SecondaryButton : styles.Button} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
