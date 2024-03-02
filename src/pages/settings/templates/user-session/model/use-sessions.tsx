import { useEffect, useState } from "react"
import getUnixTime from 'date-fns/getUnixTime';
import { apiCloseSessions, apiSessions } from '@/shared/(orval)api/auth';
import { UserSession } from "@/shared/(orval)api/auth/model";
import parseISO from "date-fns/parseISO";


export const useSession = () => {
    const [sessions, setSessionsList] = useState<UserSession[]>([]);
    const [sessionClosed, setSessionClosed] = useState<boolean>(false)

    useEffect(() => {
        (async () => {
            try {
                const response = await apiSessions();
                const sortedSeesionsArr: UserSession[] = [...response?.data?.result]
                sortedSeesionsArr.sort((a, b) => getUnixTime(parseISO(b.utc_create)) - getUnixTime(parseISO(a.utc_create)))
                setSessionsList(sortedSeesionsArr)      

            } catch(err: unknown) {
                setSessionsList([]);
            }
        })();
    }, [sessionClosed]);

    const closeAllSessions = () => {
        apiCloseSessions().then(res=>{
            setSessionClosed(n=>!n)
        })
    }

    const closeSession = ({id}: UserSession)  => {
        apiCloseSessions({id: id}).then(res=>{      
            setSessionClosed(n=>!n)
        })
    }

    return {sessions, closeAllSessions, closeSession};
}