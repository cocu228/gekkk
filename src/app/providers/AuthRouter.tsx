import {createContext, FC, PropsWithChildren, useContext, useMemo} from "react";
import {useNavigate} from "react-router-dom";
import $axios from "@/shared/lib/(cs)axios";
import {clearAllCookies, getCookieData, setCookieData} from "@/shared/lib/helpers";

const AuthContext = createContext({});


interface IValue {
    token: string;
    login: (phone: string, token: string, tokenHeaderName?: string) => void;
    logout: () => void;
}

export const AuthProvider: FC<PropsWithChildren<unknown>> = ({children}) => {

    const {token} = getCookieData<{ token: string }>()
    const navigate = useNavigate();

    // call this function when you want to authenticate the user
    const login = (phone: string, token: string, tokenHeaderName: string = 'token') => {

        setCookieData([
            {key: "phone", value: phone, expiration: 3000000}, {
                key: "token",
                value: token,
                expiration: 3000000
            },
            {key: "tokenHeaderName", value: tokenHeaderName, expiration: 3000000}])

        sessionStorage.removeItem("session-auth")

        $axios.defaults.headers[tokenHeaderName] = token;
        $axios.defaults.headers['Authorization'] = phone;

        navigate("/");


    };

    const logout = () => {

        $axios.defaults.headers['token'] = undefined;
        $axios.defaults.headers['Authorization'] = undefined;

        clearAllCookies()

        navigate("/", {replace: true});
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