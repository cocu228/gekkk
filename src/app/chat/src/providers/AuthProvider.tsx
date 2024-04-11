import './style.css';
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { getCookieData } from '../utils/shared';
import { apiGetUas, UasInfo } from "../api/gate/get-uas";
import AuthProvider, { ICtxAuth } from "../contexts/AuthContext";
import { apiGetClientDetails } from "../api/gate/get-client-details";

interface IParams {
    children?: any;
}

const cookies = getCookieData();

export default function UasTokenProvider({
    children
}: IParams) {
    const [state, setState] = useState<ICtxAuth | null>(null);
    const [uasInfo, setUasInfo] = useState<UasInfo | undefined>();
    
    useEffect(() => {
        (async () => {
            const detailsRes = await apiGetClientDetails();
            
            if (detailsRes.status === 'success' && detailsRes.data?.result?.phone) {
                const uasRes = await apiGetUas({
                    newtoken: true,
                    phone: detailsRes.data.result.phone,
                    // @ts-ignore
                    accountId: cookies['accountId']
                });

                if (uasRes.status === 'success') {
                    if (uasRes.data.result?.token) {
                        setState({
                            phone: detailsRes.data.result.phone,
                            uasToken: `UAS ${uasRes.data.result.token}`
                        });
                    }
                    else {
                        // @ts-ignore
                        setState({phone: detailsRes.data.result.phone});
                        setUasInfo(uasRes.data.result);
                    }
                }
                else {
                    setState({uasToken: "UAS anonymous"});
                }
            }
            else {
                setState({uasToken: "UAS anonymous"});
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            if (state?.phone && uasInfo) {
                const {value} = await Swal.fire({
                    input: "text",
                    allowEscapeKey: false,
                    title: "Enter SMS code",
                    showConfirmButton: true,
                    allowOutsideClick: false,
                });

                const uasRes = await apiGetUas({
                    code: value,
                    sessid: uasInfo.sessid,
                    phone: state.phone,
                    // @ts-ignore
                    accountId: cookies['accountId']
                });
    
                if (uasRes.status === 'success') {
                    if (uasRes.data.result?.token) {
                        setState({
                            phone: state.phone,
                            uasToken: `UAS ${uasRes.data.result.token}`
                        });
                    }
                    else {
                        // @ts-ignore
                        setState({phone: detailsRes.data.result.phone});
                        setUasInfo(uasRes.data.result);
                    }
                }
            }
        })();
    }, [uasInfo])

    return (
        <AuthProvider.Provider value={state}>
            {children}
        </AuthProvider.Provider>
    );
}
