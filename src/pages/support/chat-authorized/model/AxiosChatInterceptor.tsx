import {useLayoutEffect} from 'react';
import {chat_axios} from '../config/(cs)axios';
<<<<<<<< HEAD:src/pages/support/chat-authorized/model/AxiosChatInterceptor.tsx
import useDeviceIdHash from "./../../chat-authorized/model/hooks/useDeviceIdHash";
========
import useDeviceIdHash from "./../../chat-authorised/model/hooks/useDeviceIdHash";

interface IParams {
    chatToken: string;
    children: JSX.Element;
}

function AxiosChatInterceptor({children, chatToken}: IParams) {
  const [deviceId] = useDeviceIdHash();

  useLayoutEffect(() => {
    const requestInterceptor = chat_axios.interceptors.request.use(
      (config) => {
		config.headers['Authorization'] = chatToken;
		  
        if (chatToken === 'UAS anonymous' && deviceId) {
          config.headers['X-Device'] = `id=${deviceId}`;
        }

        return config;
      }
    );

    return () => {
      chat_axios.interceptors.request.eject(requestInterceptor);
    };
  }, []);

  return children;
}

export default AxiosChatInterceptor;
