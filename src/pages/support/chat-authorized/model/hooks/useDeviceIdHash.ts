import {generateUid} from "../helpers";
import {useEffect, useState} from "react";

export function useDeviceIdHash() {
  const [value, setValue] = useState(() => {
    if (typeof window !== 'undefined') {
      const jsonValue = sessionStorage.getItem('DEVICE_ID_HASH')
      if (jsonValue != null) return JSON.parse(jsonValue)
    }
    return generateUid()
  })

  useEffect(() => {

    if (typeof window !== 'undefined') {
      sessionStorage.setItem('DEVICE_ID_HASH', JSON.stringify(value));
    }

    // sessionStorage.setItem('DEVICE_ID_HASH', JSON.stringify(value))
    // return () => {
    //   sessionStorage.removeItem('DEVICE_ID_HASH')
    // };
  }, [value])

  return [value, setValue]
}

export default useDeviceIdHash;
