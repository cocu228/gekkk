import { ChatConfig } from "../../model/types";

export const stompConfig = (deviceIdHash: string, chatConfig: ChatConfig) => {
  const brokerURL = import.meta.env.VITE_SUPPORT_WS_URL;
  const login = chatConfig.phone ? chatConfig.phone : deviceIdHash;

  return {
    brokerURL: brokerURL,
    connectHeaders: {
      login: login,
      passcode: chatConfig.token
    }
  };
};
