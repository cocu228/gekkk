import styles from "./style.module.scss";

interface IParams {
  className?: string;
  style?: React.CSSProperties;
}

const Loader = ({ className = "", style }: IParams) => (
  <div className={`${className} ${styles.Loader}`} style={style} />
);

export default Loader;
