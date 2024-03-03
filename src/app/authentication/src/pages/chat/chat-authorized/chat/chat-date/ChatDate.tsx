import styles from './style.module.scss';
import { timestampToDateFormat } from '../../model/helpers';

interface IParams {
    createdAt: number;
}

const ChatDate = ({createdAt}: IParams) => {
  return (
    <div className={styles.ChatDateContainer}>
      <span className={styles.ChatDateContent}>
        {timestampToDateFormat(createdAt)}
        </span>
    </div >
  )
}

export default ChatDate;
