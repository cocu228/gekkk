import {FC, useContext} from "react";
import {CtxAuthInfo} from '../../contexts/AuthContext'
import {
    ArrowContainer,
    AttachmentContainer,
    Container,
    Input,
    InputContainer,
} from "./style";
import {IconApp} from "../../shared/components/icon-app";
import {useTheme} from "styled-components";
import useMessage from "../../hooks/useMessage";

const MessageFooterContainer: FC = () => {
    const theme = useTheme()

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
        <Container data-testid='message-form' className='fade-animation'>
            <AttachmentContainer disabled={isAttachmentDisable} onClick={onAttach}>
                {<IconApp code={"t80"} size={20} color={theme.lightBlue} />}
            </AttachmentContainer>
            <InputContainer>
                <Input
                    placeholder="Type message here"
                    data-testid='message-input'
                    value={text}
                    onChange={onChange}
                    onKeyDown={onEnter}
                />
            </InputContainer>
            <ArrowContainer disabled={isAttachmentDisable} showCursor={showSendCursor} onClick={onSubmit}>
                {<IconApp code={"t51"} size={20} color={theme.lightBlue} />}
            </ArrowContainer>
        </Container>

    )
}

export default MessageFooterContainer;