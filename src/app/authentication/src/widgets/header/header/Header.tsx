import styles from './style.module.css';
import { IconApp } from '../../components/IconApp';

interface HeaderProps {
    code?: string;
}

export const Header = (props: HeaderProps) => {
    const {code} = props

    return (
        <div className={styles.Header}>
            <div className={styles.LogoContainer}>
                <IconApp width={120} height={40} code={code} color='none' lib={3}/>
            </div>
            <div
                onClick={() => {
                    document.getElementById("chat").classList.toggle("isOpen")
                    // setChatOpened(true)
                }}
                style={{cursor: "pointer"}}
            >
                <IconApp code='t25' color='#fff' size={22} />
            </div>
        </div>
    );
};
