import styles from './style.module.scss';
import { WechatOutlined } from '@ant-design/icons';


interface ChatButtonProps {
  onClick: () => void;
}

const ChatButton = ({ onClick }: ChatButtonProps) => {
  return (
    <div className={styles.ChatButton} onClick={onClick}>
      <div className={styles.ChatIcon}>
        <WechatOutlined />
      </div>
    </div>
  );
};

export default ChatButton;