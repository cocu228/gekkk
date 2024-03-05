import { apiLoginLog } from "@/shared/(orval)api/auth"
import { UserLoginLog } from "@/shared/(orval)api/auth/model"
import getUnixTime from "date-fns/getUnixTime"
import parseISO from "date-fns/parseISO"
import { useEffect, useState } from "react"

export const useLoginList = () => {
    const [data, setData] = useState<UserLoginLog[]>([]);
    
    useEffect(() => {
        (async () => {
            const response = await apiLoginLog();
            const sortedLoginArr: UserLoginLog[] = [...response?.data?.result];
            sortedLoginArr.sort((a, b) => getUnixTime(parseISO(b.utc_time)) - getUnixTime(parseISO(a.utc_time)));
            setData(sortedLoginArr);
        })();
    }, []);

    return data;
};