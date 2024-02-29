import PageHead from '../components/PageHead';
import styles from './style.module.scss';
import Loader from '../chat-authorized/ui/loader/Loader';
import { useState, Fragment, useEffect, useRef } from 'react';
import { FormInstance, message } from 'antd';
import StompInit from '../chat-authorized/stomp-init/StompInit';
import { apiPostFile } from '../chat-authorized/api/post-file';
import { ApiResponse } from '../chat-authorized/config/(cs)axios';
import { MessageFormValues } from '../chat-authorized/model/types';
import MessageForm from '../chat-authorized/message-form/MessageForm';
import { apiPostMessage } from '../chat-authorized/api/post-message';
import useSessionId from '../chat-authorized/model/hooks/useSessionId';
import useDeviceIdHash from '../chat-authorized/model/hooks/useDeviceIdHash';
import useChatMessages from '../chat-authorized/model/hooks/useChatMessages';
import { getCookieData } from '../../../shared';
import AxiosChatInterceptor from "../chat-authorized/model/AxiosChatInterceptor";
import Message from '../chat-authorized/message/Message';
import NewHeader from '../components/NewHeader';

const SupportChatUnauthorized = ({closeChat}) => {
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


    const handleSendMessage = async (values: MessageFormValues, form: FormInstance<any>) => {
        if (!values.message || !sessionId) {
            message.error('Type your message before submit')
            return
        }

        await apiPostMessage('raw', sessionId, values.message)
        // @ts-ignore
            .then(res => {
                form.resetFields();
            })
    };

    const handleSendFile = async (options: any) => {
        const { file, onSuccess, onError } = options;

        if (!sessionId) return

        const response = await apiPostFile(file, sessionId)

        if (response.status === 'success') {
            message.success('File uploaded successfully');
            onSuccess('ok');
        } else {
            const errorResponse = response as ApiResponse<undefined, 'error'>;
            message.error(errorResponse.errorMessage || 'File upload failed');
            onError('error');
        }
    };

    return (
        <div
            style={{backgroundColor: "var(--new-brand-white)"}}
        >
            <NewHeader closeChat={closeChat}/>
            <div className={`${styles.SupportChatComponent} ${"px-[5%] px-[16.25rem] py-20"}  pb-6`}>
                <StompInit
                    chatConfig={chatConfig}
                    deviceIdHash={deviceIdHash}
                    sessionId={sessionId}
                    // @ts-ignore
                    setMessages={setMessages}
                    // @ts-ignore
                    setIsWebSocketReady={setIsWebSocketReady}
                />

                <AxiosChatInterceptor chatToken={chatConfig.token}>
                    <div style={{flexBasis:"80%"}}>
                        <span className='top-6 left-2 relative typography-h1'>
                            <PageHead title={`Support chat`} />
                        </span>
                        <div className={`${styles.ChatWrapper} rounded-sm max-w-full items-center w-[90%] px-10 py-2.6 pt-2 flex flex-col justify-cebter pb-2`}>

                            <div className={`${"h-[38rem]"} overflow-scroll`} ref={chatWindowRef}>
                                {!isWebSocketReady ? <Loader /> : (
                                    <div>
                                        {
                                        // @ts-ignore
                                        
                                        messages?.map((message, i, arr) => (
                                            <Fragment key={message.id}>
                                                <Message key={message.id} message={message} />
                                            </Fragment>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div style={{display:"flex", justifyContent:"center"}}>
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
