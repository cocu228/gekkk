import styles from './style.module.scss';
import {ChatMessage} from '@/features/chat/model/types';
import {timestampToTimeFormat} from '@/features/chat/model/helpers';
import ImagePreview from '@/pages/support/chat-authorized/ui/chat/image-preview/ImagePreview';

type IParams = {
  message: ChatMessage
}

export const Message = ({message}: IParams) => {
  const {content, sender, role, isRead, createdAt, file} = message;
  const isOutgoingMessage = role === 'client';

  return (
    <div className={`${styles.ChatItem} ${isOutgoingMessage ? styles.outgoing : ''}`}>
      <div className={`${styles.MessageContainer} ${isOutgoingMessage ? styles.outgoing : ''}`}>
        <div className={`${styles.MessageContent} ${isOutgoingMessage ? styles.outgoing : ''}`}>
          {!isOutgoingMessage && (
            <p className={styles.MessageContentName}>
              {sender}
            </p>
          )}
          {content &&
            <p>{content}</p>
          }

          {file &&
            <ImagePreview file={file}/>
          }
   
          <span className={`${styles.MessageContentTime} ${isOutgoingMessage ? styles.outgoing : ''}`}>
            {timestampToTimeFormat(createdAt)}
          </span>

          {isOutgoingMessage &&
            (<svg xmlns="http://www.w3.org/2000/svg" width="14" height="8" viewBox="0 0 14 8" 
            className={`${styles.MessageContentStatus} ${isRead ? styles.read : ''}`}
            >
                <path fillRule="evenodd" d="M.345 4.11a.799.799 0 0 1 .825-.074l2.028 1.098c.06.064.152.064.213 0L8.238.169a.609.609 0 0 1 .754-.073l-.128-.09a.473.473 0 0 1 .104.684L3.502 7.904A.27.27 0 0 1 3.289 8a.27.27 0 0 1-.213-.096l-2.94-2.98a.446.446 0 0 1 .033-.67l.176-.144zm6.703.555l1.08.469c.061.064.152.064.213 0L13.168.169a.609.609 0 0 1 .754-.073l-.128-.09a.473.473 0 0 1 .104.684L8.432 7.904A.27.27 0 0 1 8.22 8a.27.27 0 0 1-.212-.096L6.15 5.901l.897-1.236z" fill="#FFF"></path>
            </svg>)
          }

          {isOutgoingMessage 
            ? (
              <svg width="55" height="70" viewBox="0 0 55 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.MessageContentAfter}>
                <path d="M0.5 53.9L32.3 0C32.3 7.8 32.5 15.6 32.4 23.4C32.3 36.2 36.8 47.3 44.3 57.6C47.6 61.9 50.5 64.8 54.5 70C44.3 70 35.5 69 29.9 68C25 67 23.1 66 19.8 64.8C12.7 62.2 7 57.4 0.5 53.9Z" fill="#00AEEF">
                </path>
              </svg>
              )
            : (
              <svg width="55" height="70" viewBox="0 0 55 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.MessageContentBefore}>
                <path d="M54.5 53.9L22.7 0C22.7 7.8 22.5 15.6 22.6 23.4C22.7 36.2 18.2 47.3 10.7 57.6C7.4 61.9 4.5 64.8 0.5 70C10.7 70 19.5 69 25.1 68C30 67 31.9 66 35.2 64.8C42.3 62.2 48 57.4 54.5 53.9Z" fill="#f3f6f7"></path>
              </svg>
            ) 
          }
        </div>
      </div>
    </div>
  );
};

export default Message;
