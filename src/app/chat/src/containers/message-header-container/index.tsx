import {FC} from "react";
import {IconApp} from "../../shared/components/icon-app";
import style from './styles.module.scss'

const MessageHeaderContainer: FC = () => {

    const handleOnClose = () => {
        document.getElementById("chat")?.classList.toggle("isOpen")
    }

    return (
        <div className={style.InnerContainer}>
            <IconApp code={"t08"} size={15} className={style.IconMob} color={'#fff'} onClick={handleOnClose} />
            <p className={style.Title}>Chat us</p>
            <IconApp code={"t26"} size={20} className={style.IconDesk} color={'#7B797C'} onClick={handleOnClose}/>
        </div>
    );
}

export default MessageHeaderContainer