import { timestampToDateFormat } from "@/features/chat/model/helpers";

import styles from "./style.module.scss";

interface IParams {
  createdAt: number;
}

const ChatDate = ({ createdAt }: IParams) => (
  <div className={styles.ChatDateContainer}>
    <span className={styles.ChatDateContent}>{timestampToDateFormat(createdAt)}</span>
  </div>
);

export default ChatDate;
