import {forwardRef, PropsWithChildren} from "react";
import LoaderIco from "../../assets/logo-loading.svg";
import MessageListBackground from "../../components/message-list-background";
import style from './style.module.scss'

interface IMessageLayoutProps extends PropsWithChildren {
    loading: boolean
}

const MessageLayout = forwardRef<HTMLDivElement | null, IMessageLayoutProps>(({
        children,
        loading
    },
    ref
) => {
    return (
        <div className={style.Container} ref={ref}>
            {loading &&
                <div className={style.ImageContainer} >
                    <img
                        className={style.Image}
                        height={30}
                        src={LoaderIco}
                        alt={LoaderIco}
                    />
                </div>
            }
            <MessageListBackground roundedCorners={false}/>
            <div className={style.InnerContainer} >
                {children}
            </div>
        </div>
    )
})

export default MessageLayout;