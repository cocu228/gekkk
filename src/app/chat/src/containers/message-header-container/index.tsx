import {FC} from "react";
import {IconApp} from "../../shared/components/icon-app";
import style from './styles.module.scss'

const MessageHeaderContainer: FC = () => {

    const handleOnClose = () => {
        document.getElementById("chat")?.classList.toggle("isOpen")
    }

    return (
        <div className={style.HeaderContainer}>
            <div className={style.IconMobContainer} onClick={handleOnClose}>
                <IconApp code={"t08"} size={13} className={style.IconMob} color={'#fff'} />
                <p className={style.Title}>Chat us</p>
            </div>
            <IconApp code={"t26"} size={20} className={style.IconDesk} color={'#7B797C'} onClick={handleOnClose}/>
        </div>
    );
}

export default MessageHeaderContainer