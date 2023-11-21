import PageHead from '@/shared/ui/page-head/PageHead';
import styles from './style.module.scss';
import Loader from './../chat-authorised/ui/loader/Loader';
import { useState, Fragment, useEffect, useRef } from 'react';
import { FormInstance, message } from 'antd';
import StompInit from './../chat-authorised/stomp-init/StompInit';
import { apiPostFile } from './../chat-authorised/api/post-file';
import { ApiResponse } from './../chat-authorised/config/(cs)axios';
import { MessageFormValues } from './../chat-authorised/model/types';
import MessageForm from './../chat-authorised/message-form/MessageForm';
import { apiPostMessage } from './../chat-authorised/api/post-message';
import useSessionId from './../chat-authorised/model/hooks/useSessionId';
import useDeviceIdHash from './../chat-authorised/model/hooks/useDeviceIdHash';
import useChatMessages from './../chat-authorised/model/hooks/useChatMessages';
import { getCookieData } from "@/shared/lib/helpers";
import AxiosChatInterceptor from "./../chat-authorised/model/AxiosChatInterceptor";
import Message from './../chat-authorised/message/Message';
import NewHeader from '@/widgets/new-header/ui/NewHeader';

const SupportChatUnauthorised = () => {
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
        <div>
            <NewHeader />
            <div className={`${styles.SupportChatComponent} py-20 px-[16.25rem] pb-6`}>
                <StompInit
                    chatConfig={chatConfig}
                    deviceIdHash={deviceIdHash}
                    sessionId={sessionId}
                    setMessages={setMessages}
                    setIsWebSocketReady={setIsWebSocketReady}
                />

                <AxiosChatInterceptor chatToken={chatConfig.token}>
                    <div>
                        <span className='top-6 relative'>
                            <PageHead title={`Support chat`} />
                        </span>
                        <div className={`${styles.ChatWrapper} max-w-full px-10 py-2.6 pt-2 flex flex-col justify-between mb-1.5`}>

                            <div className={`h-[38rem] overflow-scroll`} ref={chatWindowRef}>
                                {!isWebSocketReady ? <Loader /> : (
                                    <div>
                                        {messages?.map((message, i, arr) => (
                                            <Fragment key={message.id}>
                                                <Message key={message.id} message={message} />
                                            </Fragment>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <MessageForm onSubmit={handleSendMessage} onFileUpload={handleSendFile} />
                        </div>
                    </div>
                </AxiosChatInterceptor>
            </div>

        </div>
    );
};

export default SupportChatUnauthorised;
