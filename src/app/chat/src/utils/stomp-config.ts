import {ChatConfig} from '../types/Shared';

export const stompConfig = (deviceIdHash: string, chatConfig: ChatConfig) => {
    //@ts-ignore
    const brokerURL = import.meta.env.VITE_SUPPORT_WS_URL;
    const login = chatConfig.phone ? chatConfig.phone : deviceIdHash;

    return {
        brokerURL: brokerURL,
        connectHeaders: {
            login: login,
            passcode: chatConfig.token,
        },
    }
};
