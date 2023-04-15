import {createContext, FC, PropsWithChildren, useContext, useMemo} from "react";
import {useNavigate} from "react-router-dom";
import {useSessionStorage} from "usehooks-ts";
import $axios from "@/shared/lib/(cs)axios";

const AuthContext = createContext({});


interface IValue {
    token: string;
    login: (phone: string, token: string, tokenHeaderName?: string) => void;
    logout: () => void;
}

export const AuthProvider: FC<PropsWithChildren<unknown>> = ({children}) => {

    const [{token}, setSessionGlobal] = useSessionStorage<Partial<Record<string, any>>>("session-global", {});
    const navigate = useNavigate();

    // call this function when you want to authenticate the user
    const login = (phone: string, token: string, tokenHeaderName: string = 'token') => {

        // const listener = function (event) {
        //
        //     window.removeEventListener('click', listener, false);
        // };
        //
        // window.addEventListener('click', listener, false);

        sessionStorage.removeItem("session-auth")

        setSessionGlobal(prev => ({token, phone}))


        $axios.defaults.headers.common[tokenHeaderName] = token;
        $axios.defaults.headers.common['Authorization'] = phone;

        navigate("/");


    };

    const logout = () => {

        $axios.defaults.headers.common['token'] = undefined;
        $axios.defaults.headers.common['Authorization'] = undefined;

        setSessionGlobal({});

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