import {useEffect, useState} from 'react';
import {apiInitSessionId} from '../../api/init-session-id';

export function useSessionId(deviceIdHash: string) {
  const [sessionId, setSessionId] = useState<number | null>(null);

  useEffect(() => {
    async function initSession() {
      const response = await apiInitSessionId();
      if (response.status === 'success' && response.data) {
        console.log(response.data)
        setSessionId(response.data.id);
      }
    }

    if (deviceIdHash) {
      initSession();
    }
  }, [deviceIdHash]);

  return sessionId;
}

export default useSessionId;
