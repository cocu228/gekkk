import {FC, useContext} from "react";
import {CtxAuthInfo} from '../../contexts/AuthContext'
import {IconApp} from "../../shared/components/icon-app";
import useMessage from "../../hooks/useMessage";
import style from './styles.module.scss'

const MessageFooterContainer: FC = () => {

    const {
        config: authConfig,
        loading: authLoading
    } = useContext(CtxAuthInfo);

    const {
        text,
        onChange,
        onEnter,
        onAttach,
        onSubmit
    } = useMessage()

    const isAttachmentDisable = authLoading || !authConfig?.token;
    const showSendCursor = text.trim().length > 0

    return (
        <div data-testid='message-form' className={`fade-animation ${style.Container}`}>
            <div className={`
                    ${style.AttachmentContainer}
                    ${!isAttachmentDisable ? 'cursor-pointer opacity-100' : 'opacity-60 pointer-events-none'}
                `} onClick={onAttach}>
                {<IconApp code={"t80"} size={20} color='#285E69' />}
            </div>
            <div className={style.InputContainer}>
                <input
                    className={style.Input}
                    placeholder="Type message here"
                    data-testid='message-input'
                    value={text}
                    onChange={onChange}
                    onKeyDown={onEnter}
                />
            </div>
            <div className={`${style.IconsContainer} ${showSendCursor && !isAttachmentDisable ? 'cursor-pointer' : 'cursor-default'} ${showSendCursor && !isAttachmentDisable ? 'opacity-100' : 'opacity-40'}`} onClick={onSubmit}>
                {<IconApp code={"t51"} size={20} color={'#285E69'} />}
            </div>
        </div>

    )
}

export default MessageFooterContainer;