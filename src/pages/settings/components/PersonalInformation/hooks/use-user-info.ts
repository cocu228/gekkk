import { useContext, useEffect, useState } from "react";
import { apiGetUserInfo } from "../api/get-user-info";
import { IUserInfo } from "../types/types";
import { CtxRootData } from "@/processes/RootContext";


export function useUserInfo() {
    const [data, setData] = useState<IUserInfo>({
        address: 'adress',
        email: 'email',
        name: 'name',
        phone: 'phone',
        citizenship: 'citizenship',
    });

    const {account} = useContext(CtxRootData);
    
    useEffect(() => {
        apiGetUserInfo().then((resp) => {
            setData(resp.data.result);
        });
    }, [account])

    return data;
}