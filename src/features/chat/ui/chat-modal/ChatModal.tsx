import React from "react";
import ReactDOM from "react-dom";
import styles from './style.module.scss';
import Chat from "@/features/chat/ui/chat/Chat";
import {getCookieData} from "@/shared/lib/helpers";
import AxiosChatInterceptor from "../../model/AxiosChatInterceptor";
import { useTranslation } from "react-i18next";

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

	const {t} = useTranslation()
	
	const tokenChat = token && tokenHeaderName
		? (tokenHeaderName === 'token-firebase')
			? "FB " + token
			: "UAS " + token 
		: "UAS anonymous";
	
	const chatConfig = {
		token: tokenChat,
		phone: phone,
	}
	
	return isOpen
		? ReactDOM.createPortal(
			<div className={styles.ChatModal}>
				<AxiosChatInterceptor chatToken={chatConfig.token}>
					<Chat chatConfig={chatConfig}/>
				</AxiosChatInterceptor>
				<button onClick={onClose}>{t("close")}</button>
			</div>, document.getElementById("chat") as Element)
		: null;
};

export default ChatModal;
