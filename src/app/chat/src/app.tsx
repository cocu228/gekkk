import styles from './style.module.scss';
import Loader from './ui/loader/Loader';
import {Fragment, useEffect, useRef, useState} from 'react';
import {FormInstance, message} from 'antd';
import StompInit from './stomp-init/StompInit';
import {apiPostFile} from './api/post-file';
import {ApiResponse} from './config/(cs)axios';
import {MessageFormValues} from './model/types';
import MessageForm from './message-form/MessageForm';
import {apiPostMessage} from './api/post-message';
import useSessionId from './model/hooks/useSessionId';
import useDeviceIdHash from './model/hooks/useDeviceIdHash';
import useChatMessages from './model/hooks/useChatMessages';
import AxiosChatInterceptor from "./model/AxiosChatInterceptor";
import Message from './message/Message';

const getCookieData = () => {

    const cookieValue = document.cookie;
    const cookiePairs = cookieValue.split(';');
    const cookieData = {};

    for (let i = 0; i < cookiePairs.length; i++) {
        const pair = cookiePairs[i].trim();
        const separatorIndex = pair.indexOf('=');
        const key = pair.substring(0, separatorIndex);
        const value = pair.substring(separatorIndex + 1);

        const decodedValue = decodeURIComponent(value);

        cookieData[key] = decodedValue;
    }

    return cookieData;
};

const SupportChatAuthorized = () => {

    //@ts-ignore
    const {phone, token, tokenHeaderName} = getCookieData()

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
    const {messages, setMessages} = useChatMessages(sessionId);
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
        const {file, onSuccess, onError} = options;

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
        <div className={styles.SupportChatComponent}>
            <StompInit
                chatConfig={chatConfig}
                deviceIdHash={deviceIdHash}
                sessionId={sessionId}
                setMessages={setMessages}
                setIsWebSocketReady={setIsWebSocketReady}
            />

            <AxiosChatInterceptor chatToken={chatConfig.token}>
                <>
                    <div
                        className={`${styles.ChatWrapper} rounded-sm max-w-full px-10 py-2.6 pt-2 flex flex-col justify-between pb-2`}>
                        <div className={`h-full overflow-scroll`} ref={chatWindowRef}>

                            <span style={{fontSize: "12px"}} className='top-6 left-2 relative'>
                                Support chat
                            </span>

                            {!isWebSocketReady ? <Loader/> : (
                                <div>
                                    {messages?.map((message, i, arr) => (
                                        <Fragment key={message.id}>
                                            <Message key={message.id} message={message}/>
                                        </Fragment>
                                    ))}
                                </div>
                            )}
                        </div>
                        <MessageForm onSubmit={handleSendMessage} onFileUpload={handleSendFile}/>
                    </div>
                </>
            </AxiosChatInterceptor>
        </div>
    );
};

export default SupportChatAuthorized;
