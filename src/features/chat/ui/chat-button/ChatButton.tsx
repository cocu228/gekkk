import { WechatOutlined } from "@ant-design/icons";

import styles from "./style.module.scss";

interface ChatButtonProps {
  onClick: () => void;
}

const ChatButton = ({ onClick }: ChatButtonProps) => (
  <div className={styles.ChatButton} onClick={onClick}>
    <div className={styles.ChatIcon}>
      <WechatOutlined />
    </div>
  </div>
);

export default ChatButton;
