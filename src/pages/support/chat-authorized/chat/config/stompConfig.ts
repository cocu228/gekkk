import {ChatConfig} from '../../model/types';
import {$ENV} from "@/shared/lib";

export const stompConfig = (deviceIdHash: string, chatConfig: ChatConfig) => {
  const brokerURL = $ENV.VITE_SUPPORT_WS_URL;
  const login = chatConfig.phone ? chatConfig.phone : deviceIdHash;

  return {
    brokerURL: brokerURL,
    connectHeaders: {
      login: login,
      passcode: chatConfig.token,
    },
  }
};
