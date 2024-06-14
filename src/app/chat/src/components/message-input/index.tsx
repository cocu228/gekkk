import React, {ChangeEvent, KeyboardEvent, useContext, useState} from 'react'
import useTypingListener from '../../hooks/useTypingListener'
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

export type Props = {
    onSendMessage?: (text: string) => void
    onStartTyping?: () => void
    onEndTyping?: () => void
    showAttachButton?: boolean
    onAttachClick?: () => void
    disabled?: boolean
    showSendButton: boolean

    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement> | undefined
    onKeyUp?: React.KeyboardEventHandler<HTMLInputElement> | undefined
}

export default function MessageInput({
    onSendMessage,
    onStartTyping,
    onEndTyping,
    showAttachButton = true,
    showSendButton = true,
    disabled = false,
    onAttachClick,
    onKeyDown,
    onKeyUp
}: Props) {
    const theme = useTheme()

    const [text, setText] = useState("")
    const {
        config: authConfig,
        loading: authLoading
    } = useContext(CtxAuthInfo);

    const {setTyping, ...inputProps} = useTypingListener({onStartTyping, onEndTyping})

    const handleOnChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        setText(target.value)
    }

    const handleSubmit = () => {
        if (!disabled && text.trim().length > 0) {
            setTyping(false)
            onSendMessage && onSendMessage(text.trim())
            setText("")
        }
    }

    const handleOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();  // Prevents adding a new line
            handleSubmit();
            return;
        }
        inputProps.onKeyDown()
        onKeyDown && onKeyDown(e)
    }

    const handleOnKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
        inputProps.onKeyUp()
        onKeyUp && onKeyUp(e)
    }

    const isAttachmentDisable = disabled || authLoading || !authConfig?.token;
    const showSendCursor = text.trim().length > 0

    return (
        <Container data-testid='message-form' className='fade-animation'>
            <AttachmentContainer disabled={isAttachmentDisable} onClick={onAttachClick}>
                {showAttachButton && <IconApp code={"t80"} size={20} color={theme.lightBlue} />}
            </AttachmentContainer>
            <InputContainer>
                <Input
                    placeholder="Type message here"
                    data-testid='message-input'
                    value={text}
                    onChange={handleOnChange}
                    onKeyDown={handleOnKeyDown}
                    onKeyUp={handleOnKeyUp}
                />
            </InputContainer>
            <ArrowContainer disabled={isAttachmentDisable} showCursor={showSendCursor} onClick={handleSubmit}>
                {showSendButton && <IconApp code={"t51"} size={20} color={theme.lightBlue} />}
            </ArrowContainer>
        </Container>

    )
}