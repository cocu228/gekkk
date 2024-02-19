import styles from "./style.module.scss"
import Logo from '@/assets/logo-loading.svg?react';

interface LoaderParams {
    className?: string;
}

const Loader = ({className = ""}: LoaderParams) => {
    return <div className={`${className} ${styles.Loader}`}>
        <Logo className='hover:cursor-pointer' onClick={null}></Logo>
    </div>
}
export default Loader;
