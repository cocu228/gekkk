import styles from './style.module.scss'
import Chat from 'gekkard-chat';
import ReactDOM from "react-dom";
import { getCookieData } from "@/shared/lib/helpers";

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatModal = ({ isOpen, onClose }: ChatModalProps) => {

  const {phone, token, tokenHeaderName} = getCookieData<{
    phone: string,
    token: string,
    tokenHeaderName: string
  }>()

  const tokenChat = token && tokenHeaderName
    ? (tokenHeaderName === 'token-firebase') ? "FB " + token : "UAS " + token
    : "UAS anonymous";


  const chatConfig = {
    token: tokenChat,
    phone: phone,
  }

  console.log(chatConfig)

  return isOpen
    ? ReactDOM.createPortal(
      <div className={styles.ChatModal}>
        <Chat chatConfig={chatConfig} />
        <button onClick={onClose}>Close</button>
      </div>,
      document.getElementById("chat") as Element
    )
    : null;
};

export default ChatModal;