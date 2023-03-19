import {createContext, FC, PropsWithChildren, useContext, useMemo} from "react";
import {useNavigate} from "react-router-dom";
import {useSessionStorage} from "usehooks-ts";

const AuthContext = createContext({});


interface IValue {
    token: string;
    login: (phone: string, token: string) => void;
    logout: () => void;
}

export const AuthProvider: FC<PropsWithChildren<unknown>> = ({children}) => {

    const [{token}, setSessionGlobal] = useSessionStorage<Partial<Record<string, any>>>("session-global", {});
    const navigate = useNavigate();

    // call this function when you want to authenticate the user
    const login = (phone: string, token: string) => {

        const listener = function (event) {

            sessionStorage.removeItem("session-auth")

            navigate("/");

            window.removeEventListener('click', listener, false);
        };

        window.addEventListener('click', listener, false);

        setSessionGlobal(prev => ({phone, token}))

    };

    // call this function to sign out logged in user
    const logout = () => {
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