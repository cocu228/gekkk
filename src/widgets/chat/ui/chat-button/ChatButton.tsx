import React from "react";
import styles from './style.module.scss';
import { WechatOutlined } from '@ant-design/icons';


interface ChatButtonProps {
  onClick: () => void;
}

const ChatButton: React.FC<ChatButtonProps> = ({ onClick }) => {
  return (
    <div className={styles.ChatButton} onClick={onClick}>
      <div className={styles.ChatIcon}>
        <WechatOutlined rev={undefined} />
      </div>
    </div>
  );
};

export default ChatButton;