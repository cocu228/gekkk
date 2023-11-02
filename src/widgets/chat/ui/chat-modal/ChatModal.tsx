import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import styles from './style.module.scss'
import Chat from 'gekkard-chat';
import ReactDOM from "react-dom";
import { getCookieData } from "@/shared/lib/helpers";

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose }) => {

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
        {/* <div className={styles.ChatContent}> */}
          <Chat chatConfig={chatConfig} />
          <button onClick={onClose}>Close</button>
        {/* </div> */}
      </div>,
      document.getElementById("chat") as Element
    )
    : null;
};

export default ChatModal;