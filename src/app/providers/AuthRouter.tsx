import $axios from "@/shared/lib/(cs)axios";
import {useNavigate} from "react-router-dom";
import {createContext, FC, PropsWithChildren, useContext, useEffect, useMemo} from "react";
import {clearAllCookies, getCookieData, setCookieData, throttle} from "@/shared/lib/helpers";
import {formatAsNumber} from "@/shared/lib/formatting-helper";
const AuthContext = createContext({});


interface IValue {
    token: string;
    login: (phone: string, token: string, tokenHeaderName?: string) => void;
    logout: () => void;
}

export const AuthProvider: FC<PropsWithChildren<unknown>> = ({children}) => {


    useEffect(() => {
        let inactivityTime = () => {
            let time = undefined

            document.addEventListener('mousemove', throttle(resetTimer, 5000));
            document.addEventListener('keypress', throttle(resetTimer, 5000));

            function resetTimer() {
                clearTimeout(time);
                time = setTimeout(fn, 900000)
            }

            function fn() {
                logout()
            }

        };

        inactivityTime();

    }, []);

    const navigate = useNavigate();
    const {token, tokenHeaderName} = getCookieData<{ token: string, tokenHeaderName: string }>();

    // call this function when you want to authenticate the user
    const login = (phone: string, token: string, tokenHeaderName: string = 'token') => {

        setCookieData([
            {
                key: "phone",
                value: formatAsNumber(phone),
                expiration: 9999999
            }, {
                key: "token",
                value: token,
                expiration: 9999999
            },
            {
                key: "tokenHeaderName",
                value: tokenHeaderName,
                expiration: 9999999
            }])

        $axios.defaults.headers[tokenHeaderName] = token;
        $axios.defaults.headers['Authorization'] = formatAsNumber(phone);

        const pathUrl = window.location.pathname + window.location.search;
        
        navigate(pathUrl !== '/' ? pathUrl : '/wallet/EUR');
    };

    const logout = () => {

        $axios.defaults.headers[tokenHeaderName] = undefined;
        $axios.defaults.headers['Authorization'] = undefined;
        $axios.defaults.headers['AccountId'] = undefined;
        window.recaptchaVerifier = undefined;
        clearAllCookies();
        navigate('/', {replace: true});
        location.reload();
    };

    const value = useMemo<IValue>(
        () => ({
            token,
            login,
            logout
        }),
        [token]
    );

    return <AuthContext.Provider value={value}> {children} </AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext<Partial<IValue>>(AuthContext);
};
