import styles from "./style.module.scss"

interface IParams {
    className?: string;
    style?: React.CSSProperties,
}

const Loader = ({className = "", style}: IParams) => {
    return <div className={`${className} ${styles.Loader}`} style={style}>
    </div>
}

export default Loader;
