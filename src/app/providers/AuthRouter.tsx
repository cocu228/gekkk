import {createContext, FC, PropsWithChildren, useContext, useMemo} from "react";
import {useNavigate} from "react-router-dom";
import {useSessionStorage} from "usehooks-ts";

const AuthContext = createContext({});


interface IValue {
    user: string;
    login: () => void;
    logout: () => void;
}

export const AuthProvider: FC<PropsWithChildren<unknown>> = ({children}) => {

    const [{token}, setSessionGlobal] = useSessionStorage<null | string>("session-global", {});
    const navigate = useNavigate();

    // call this function when you want to authenticate the user
    const login = async (data: string) => {
        setSessionGlobal(prev => ({...prev, token: data}));

        navigate("/");
    };

    // call this function to sign out logged in user
    const logout = () => {
        setSessionGlobal({});
        navigate("/", {replace: true});
    };

    const value = useMemo(
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
    return useContext<IValue | {}>(AuthContext);
};