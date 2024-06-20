import styles from "./style.module.scss";
import { ChatMessage } from "./../model/types";
import { timestampToTimeFormat, timestampToDateFormat } from "./../model/helpers";
import ImagePreview from "./../ui/chat/image-preview/ImagePreview";

type IParams = {
  message: ChatMessage;
};

export const Message = ({ message }: IParams) => {
  const { content, sender, role, isRead, createdAt, file } = message; //взял isRead из пропса message для отрисовки статуса сообщения таска 558
  const isOutgoingMessage = role === "client";

  return (
    <div className={`${styles.ChatWindow} ${isOutgoingMessage ? styles.Outgoing : ""}`}>
      <div className={`${styles.Container} ${isOutgoingMessage ? styles.Outgoing : ""}`}>
        <div className={`${styles.Window} ${isOutgoingMessage ? styles.Outgoing : ""}`}>
          <div className={styles.Content}>
            <div className={`${styles.Message} ${isOutgoingMessage ? styles.MessageUser : styles.MessageSupport}`}>
              <div className={styles.MessageHeader}>
                <div className={styles.AuthorDetails}>
                  <span className={`${styles.AuthorName} typography-b1-bold`}>{sender}</span>
                  <span className={`${styles.AuthorRole} typography-b2`}>{role}</span>
                </div>
                <div className={`${styles.MessageTimestamp} ${isOutgoingMessage ? styles.Outgoing : ""}`}>
                  <span className={`${styles.MessageDate} typography-b2`}>{timestampToDateFormat(createdAt)}</span>
                  <span className={`typography-b2`}>{timestampToTimeFormat(createdAt)}</span>
                </div>
              </div>

              {content && <p className={`${styles.MessageText} typography-b1`}>{content}</p>}

              {file && <ImagePreview file={file} />}

              {/* { (isOutgoingMessage && isRead) && <img className={styles.MessageRead} src=''/>} тут будет статус сообщения (отправлено и прочитано) таска 558  */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
