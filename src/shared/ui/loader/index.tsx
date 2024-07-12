import Logo from "@/assets/logo-loading.svg?react";

import styles from "./style.module.scss";

interface LoaderParams {
  className?: string;
}

const Loader = ({ className = "" }: LoaderParams) => (
  <div className={`${className} ${styles.Loader}`}>
    <Logo className='hover:cursor-pointer' onClick={null} />
  </div>
);
export default Loader;
