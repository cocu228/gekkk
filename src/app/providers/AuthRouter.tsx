import $axios from "@/shared/lib/(cs)axios";
import {useNavigate} from "react-router-dom";
import {auth} from "@/processes/firebaseConfig";
import {onAuthStateChanged} from "firebase/auth";
import {formatAsNumber} from "@/shared/lib/formatting-helper";
import {AXIOS_INSTANCE as $new_axios} from "@/shared/lib/(cs)axios-new";
import {createContext, FC, PropsWithChildren, useContext, useEffect, useMemo, useState} from "react";
import {clearCookies, getCookieData, setCookieData, throttle} from "@/shared/lib/helpers";

const AuthContext = createContext({});

interface IValue {
    token: boolean;
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

    console.log(!!device_guid)

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

    // call this function when you want to authenticate the user
    const login = (phone: string, token: string, tokenHeaderName: string = 'token', refreshToken: string = null) => {


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

    const logout = () => {
        // $axios.defaults.headers[tokenHeaderName] = undefined;
        // $axios.defaults.headers['Authorization'] = undefined;
        // $axios.defaults.headers['AccountId'] = undefined;
        // window.recaptchaVerifier = undefined;

        clearCookies();

        location.replace('/');
    };

    const value = useMemo<IValue>(
        () => ({
            token: access,
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
