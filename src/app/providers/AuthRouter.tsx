import {createContext, FC, PropsWithChildren, useContext, useMemo} from "react";
import {useNavigate} from "react-router-dom";
import {useSessionStorage} from "usehooks-ts";

const AuthContext = createContext({});


interface IValue {
    token: string;
    login: (data: string) => void;
    logout: () => void;
}

export const AuthProvider: FC<PropsWithChildren<unknown>> = ({children}) => {

    const [{token}, setSessionGlobal] = useSessionStorage<Partial<Record<string, any>>>("session-global", {});
    const navigate = useNavigate();

    // call this function when you want to authenticate the user
    const login = async (data: string) => {
        setSessionGlobal(prev => ({...prev, token: data}));

        navigate("/");
    };

    // call this function to sign out logged in userx
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