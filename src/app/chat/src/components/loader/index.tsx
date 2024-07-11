import Logo from '../../assets/logo-loading.svg';
import style from './styles.module.scss'

const Loader = () => {
    return <div className={style.Container} >
        <img src={Logo} />
    </div>
}
export default Loader;
