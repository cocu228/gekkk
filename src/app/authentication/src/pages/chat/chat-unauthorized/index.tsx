// import PageHead from '@/shared/ui/page-head/PageHead';
import styles from './style.module.scss';
import Loader from '../chat-authorized/ui/loader/Loader';
import { useState, Fragment, useEffect, useRef, useContext } from 'react';
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
import NewHeader from '../chat-header/Header';
import { BreakpointsContext } from '../../../provider/BreakpointsProvider';
import { MutableRef, StateUpdater } from 'preact/hooks';
import PageHead from '../chat-page-head/PageHead';


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
    const {md} = useContext(BreakpointsContext);
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
            <div className={`${styles.SupportChatComponent} ${md? "px-[5%]" : "px-[16.25rem] py-20"}  pb-6`}>
                <StompInit
                    chatConfig={chatConfig}
                    deviceIdHash={deviceIdHash}
                    sessionId={sessionId}
                    setMessages={setMessages}
                    setIsWebSocketReady={setIsWebSocketReady}
                />

                <AxiosChatInterceptor chatToken={chatConfig.token}>
                    <div style={{width:"90%"}}>
                        <span className='top-6 left-2 relative typography-h1'>
                            <PageHead title={`Support chat`} />
                        </span>
                        <div className={`${styles.ChatWrapper} rounded-sm max-w-full px-10 py-2.6 pt-2 flex flex-col justify-between pb-2`}>

                            <div className={`${!md && "h-[38rem]"} overflow-scroll`} ref={chatWindowRef}>
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
