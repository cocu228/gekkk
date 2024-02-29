import { useEffect, useState } from "react"
import getUnixTime from 'date-fns/getUnixTime';
import { apiUserKeys } from '@/shared/(orval)api/auth';
import { UserKey } from "@/shared/(orval)api/auth/model";
import parseISO from "date-fns/parseISO";


export const useUserKeys = () => {
    const [keys, setKeys] = useState<UserKey[]>([]);

    useEffect(() => {
        (async () => {
            try {

                const response = await apiUserKeys();
                const keysArrCurrent: UserKey[] = []
                const keysArrSort: UserKey[] = []
                
                response?.data?.result.map(el=>{
                    if(el.current){
                    keysArrCurrent.push(el)
                    }
                })
                response?.data?.result.map(el=>{
                    if(!el.current){
                    keysArrSort.push(el)
                    }
                })
                keysArrSort.sort((a, b) => getUnixTime(parseISO(b.utc_create)) - getUnixTime(parseISO(a.utc_create)))
                const newArr = keysArrCurrent.concat(keysArrSort)
                setKeys(newArr)
            } catch(err: unknown) {
                setKeys([]);
            }
        })();
    }, []);
    
    return keys;  
}