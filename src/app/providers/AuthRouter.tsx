import $axios from "@/shared/lib/(cs)axios";
import {useNavigate} from "react-router-dom";
import {createContext, FC, PropsWithChildren, useContext, useMemo} from "react";
import {clearAllCookies, getCookieData, setCookieData} from "@/shared/lib/helpers";
import {formatAsNumber} from "@/shared/lib/formatting-helper";

const AuthContext = createContext({});


interface IValue {
    token: string;
    login: (phone: string, token: string, tokenHeaderName?: string) => void;
    logout: () => void;
}

export const AuthProvider: FC<PropsWithChildren<unknown>> = ({children}) => {

    const navigate = useNavigate();
    const {token} = getCookieData<{ token: string }>();

    // call this function when you want to authenticate the user
    const login = (phone: string, token: string, tokenHeaderName: string = 'token') => {

        setCookieData([
            {
                key: "phone",
                value: formatAsNumber(phone),
                expiration: 1800
            }, {
                key: "token",
                value: token,
                expiration: 1800
            },
            {
                key: "tokenHeaderName",
                value: tokenHeaderName,
                expiration: 1800
            }])

        $axios.defaults.headers[tokenHeaderName] = token;
        $axios.defaults.headers['Authorization'] = formatAsNumber(phone);

        const pathUrl = window.location.pathname + window.location.search;
        
        navigate(pathUrl !== '/' ? pathUrl : '/wallet/EUR');
    };

    const logout = () => {

        $axios.defaults.headers['token'] = undefined;
        $axios.defaults.headers['Authorization'] = undefined;
        $axios.defaults.headers['AccountId'] = undefined;
        window.recaptchaVerifier = undefined
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
