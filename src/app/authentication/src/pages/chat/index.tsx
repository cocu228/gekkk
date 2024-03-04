import styles from './style.module.scss';
import Loader from './ui/loader/Loader';
import { useState, Fragment, useEffect, useRef} from 'react';
import StompInit from './stomp-init/StompInit';
import { apiPostFile } from './api/post-file';
import { ApiResponse } from './config/(cs)axios';
import { MessageFormValues } from './model/types';
import MessageForm from './message-form/MessageForm';
import { apiPostMessage } from './api/post-message';
import useSessionId from './model/hooks/useSessionId';
import useDeviceIdHash from './model/hooks/useDeviceIdHash';
import useChatMessages from './model/hooks/useChatMessages';
import { getCookieData } from '../../shared';
import AxiosChatInterceptor from './model/AxiosChatInterceptor';
import Message from './message/Message';
import NewHeader from '../../widgets/chat-header/Header';
import { MutableRef, StateUpdater } from 'preact/hooks';
import PageHead from '../../widgets/chat-page-head/PageHead';


interface IChatProps {
    setClose: StateUpdater<boolean>
}

const SupportChatUnauthorized = ({setClose}: IChatProps) => {
    const { phone, token, tokenHeaderName } = getCookieData<{
        phone: string,
        token: string,
        tokenHeaderName: string
    }>()

    const tokenChat = token && tokenHeaderName
        ? (tokenHeaderName === 'token-firebase')
            ? "FB " + token
            : "UAS " + token
        : "UAS anonymous";

    const chatConfig = {
        token: tokenChat,
        phone: phone,
    }

    const [deviceIdHash] = useDeviceIdHash();
    const sessionId = useSessionId(deviceIdHash);
    const { messages, setMessages } = useChatMessages(sessionId);
    const [isWebSocketReady, setIsWebSocketReady] = useState(false);
    const chatWindowRef = useRef(null);

    useEffect(() => {
        if (chatWindowRef.current) {

            const timer = setTimeout(() => {
                chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
            }, 100);

            return () => clearTimeout(timer);
        }
    }, [messages]);


    const handleSendMessage = async (values: MessageFormValues, form: MutableRef<HTMLFormElement>) => {
        if (!values.message || !sessionId) {
            alert('Type your message before submit')
            return
        }

        await apiPostMessage('raw', sessionId, values.message)
            .then(() => {
                form.current.resetFields();
            })
    };

    const handleSendFile = async (options: any) => {
        const { file, onSuccess, onError } = options;

        if (!sessionId) return

        const response = await apiPostFile(file, sessionId)

        if (response.status === 'success') {
            alert('File uploaded successfully');
            onSuccess('ok');
        } else {
            const errorResponse = response as ApiResponse<undefined, 'error'>;
            alert(errorResponse.errorMessage || 'File upload failed');
            onError('error');
        }
    };

    return (
        <div
            style={{height:"100vh", backgroundColor: "var(--new-brand-white)"}}
        >
            <NewHeader setClose={setClose}/>
            <div className={`${styles.SupportChatComponent}`}>
                <StompInit
                    chatConfig={chatConfig}
                    deviceIdHash={deviceIdHash}
                    sessionId={sessionId}
                    setMessages={setMessages}
                    setIsWebSocketReady={setIsWebSocketReady}
                />

                <AxiosChatInterceptor chatToken={chatConfig.token}>
                    <div style={{width:"90%"}}>
                        <span style={{
                            position: "relative",
                            left: "0.5rem", 
                            top: "1.5rem" 
                        }}>
                            <PageHead title={`Support chat`} />
                        </span>
                        <div className={`${styles.ChatWrapper}`}>

                            <div className={styles.ChatWrapperDiv} ref={chatWindowRef}>
                                {!isWebSocketReady ? <Loader /> : (
                                    <div>
                                        {messages?.map((message) => (
                                            <Fragment key={message.id}>
                                                <Message key={message.id} message={message} />
                                            </Fragment>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div style={{display:"flex", width:"100%", justifyContent:"center"}}>
                                <MessageForm onSubmit={handleSendMessage} onFileUpload={handleSendFile} />
                            </div>
                        </div>
                    </div>
                </AxiosChatInterceptor>
            </div>
        </div>
    );
};

export default SupportChatUnauthorized;
