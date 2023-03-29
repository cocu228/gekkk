import styles from "./style.module.scss"

interface LoaderParams {
    className?: string;
}

const Loader = ({className = ""}: LoaderParams) => {
    return <div className={`${className} ${styles.Loader}`}>
    </div>
}
export default Loader;
