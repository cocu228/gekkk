import {useNavigate} from "react-router-dom";
import {getCookieData, logout} from "@/shared/lib/helpers";
import {createContext, FC, PropsWithChildren, useContext, useMemo, useState} from "react";

const AuthContext = createContext({});

interface IValue {
    access: boolean;
    login: (phone?: string, token?: string, tokenHeaderName?: string, refreshToken?: string) => void;
    logout: () => void;
}


// function inactivityTime() {
//
//     let time = undefined
//
//     document.addEventListener('mousemove', throttle(resetTimer, 5000));
//     document.addEventListener('keypress', throttle(resetTimer, 5000));
//
//     function resetTimer() {
//         clearTimeout(time);
//         time = setTimeout(fn, 900000)
//     }
//
//     function fn() {
//         this.logout()
//     }
//
// };

export const AuthProvider: FC<PropsWithChildren<unknown>> = ({children}) => {

    const {device_guid} = getCookieData<{ device_guid: string }>();
    const [access, setAccess] = useState(!!device_guid)

    // console.log(!!device_guid)

    // useEffect(() => {
    //     onAuthStateChanged(auth, async (user) => {
    //         if (user) {
    //             console.log(user)
    //         } else {
    //             const idToken = await user.getIdToken(/* forceRefresh */ true);
    //             console.log("idToken")
    //             console.log(idToken)
    //         }
    //     });
    //
    //     inactivityTime.call({logout});
    // }, []);

    const navigate = useNavigate();

    const login = () => {
        setAccess(true)
        // setCookieData([
        //     {
        //         key: "phone",
        //         value: formatAsNumber(phone),
        //         expiration: 3600000
        //     }, {
        //         key: "token",
        //         value: token,
        //         expiration: 3600000
        //     },
        //     {
        //         key: "tokenHeaderName",
        //         value: tokenHeaderName,
        //         expiration: 3600000
        //     }, {
        //         key: "refreshToken",
        //         value: refreshToken,
        //         expiration: 3600000
        //     }])

        // TEMP: OLD API
        // $axios.defaults.headers[tokenHeaderName] = token;
        // $axios.defaults.headers['Authorization'] = formatAsNumber(phone);
        //
        // // NEW API
        // $new_axios.defaults.headers[tokenHeaderName] = token;
        // $new_axios.defaults.headers['Authorization'] = formatAsNumber(phone);

        const pathUrl = window.location.pathname
            + window.location.search.replace('authMethod=UAS', '');

        navigate(!['/', '/?'].includes(pathUrl) ? pathUrl : '/wallet/EUR');
    };
    

    const value = useMemo<IValue>(
        () => ({
            access: access,
            login,
            logout
        }),
        [access]
    );

    return <AuthContext.Provider value={value}> {children} </AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext<Partial<IValue>>(AuthContext);
};
