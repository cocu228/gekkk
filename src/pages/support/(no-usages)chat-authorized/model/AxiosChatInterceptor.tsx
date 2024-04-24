import {useLayoutEffect} from 'react';
import {chat_axios} from '../config/(cs)axios';
import useDeviceIdHash from "./../../(no-usages)chat-authorized/model/hooks/useDeviceIdHash";

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
