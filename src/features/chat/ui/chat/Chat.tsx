import Loader from './loader/Loader';
import Header from './header/Header';
import Message from './message/Message';
import styles from './style.module.scss';
import {useState, Fragment} from 'react';
import {FormInstance, message} from 'antd';
import ChatDate from './chat-date/ChatDate';
import {ChatConfig} from '../../model/types';
import StompInit from './stomp-init/StompInit';
import {apiPostFile} from '../../api/post-file';
import {ApiResponse} from '../../config/(cs)axios';
import {MessageFormValues} from '../../model/types';
import MessageForm from './message-form/MessageForm';
import {apiPostMessage} from '../../api/post-message';
import {timestampToDayYear} from '../../model/helpers';
import useSessionId from '../../model/hooks/useSessionId';
import useDeviceIdHash from '../../model/hooks/useDeviceIdHash';
import useChatMessages from '../../model/hooks/useChatMessages';

type IParams = {
	chatConfig: ChatConfig;
}

const Chat = ({chatConfig}: IParams) => {
	const [deviceIdHash] = useDeviceIdHash();
	const sessionId = useSessionId(deviceIdHash);
	const {messages, setMessages} = useChatMessages(sessionId);
	const [isWebSocketReady, setIsWebSocketReady] = useState(false);
	
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleSendMessage = async (values: MessageFormValues, form: FormInstance<any>) => {
		if (!values.message || !sessionId) {
			message.error('Type your message before submit')
			return
		}
		
		await apiPostMessage('raw', sessionId, values.message)
			.then(res => {
				console.log(res)
				form.resetFields()
			})
	};
	
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleSendFile = async (options: any) => {
		const { file, onSuccess, onError } = options;
		
		if(!sessionId) return
		
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
		<div className={styles.ChatRoot}>
			<div className={styles.ChatContainer}>
				<StompInit
					chatConfig={chatConfig}
					deviceIdHash={deviceIdHash}
					sessionId={sessionId}
					setMessages={setMessages}
					setIsWebSocketReady={setIsWebSocketReady}
				/>
				
				{/* <Header /> */}
				
				<div className={styles.ChatBody}>
					{!isWebSocketReady ? <Loader /> : (
						<div className={styles.ChatContentContainer}>
							{messages.length ? messages.map((message, i, arr) => (
								<Fragment key={message.id}>
									{
										(i === 0 || timestampToDayYear(message.createdAt) !== timestampToDayYear(arr[i - 1]?.createdAt))
										&& <ChatDate createdAt={message.createdAt} />
									}
									<Message key={message.id} message={message} />
								</Fragment>
							)) : ''}
						</div>
					)}
					
					<MessageForm onSubmit={handleSendMessage} onFileUpload={handleSendFile} />
				</div>
			</div>
		</div>
	);
};

export default Chat;
