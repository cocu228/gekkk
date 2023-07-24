import {createContext, FC, PropsWithChildren, useContext, useMemo} from "react";
import {useNavigate} from "react-router-dom";
import $axios from "@/shared/lib/(cs)axios";
import {clearAllCookies, getCookieData, setCookieData} from "@/shared/lib/helpers";
import {storeOrganizations} from "@/shared/store/organizations";

const AuthContext = createContext({});


interface IValue {
    token: string;
    login: (phone: string, token: string, tokenHeaderName?: string) => void;
    logout: () => void;
}

export const AuthProvider: FC<PropsWithChildren<unknown>> = ({children}) => {

    const navigate = useNavigate();
    const {token} = getCookieData<{ token: string }>();
    // const cleaningOrganizationsStore = storeOrganizations(state => state.cleaning);

    // call this function when you want to authenticate the user
    const login = (phone: string, token: string, tokenHeaderName: string = 'token') => {

        setCookieData([
            {key: "phone", value: phone, expiration: 1800}, {
                key: "token",
                value: token,
                expiration: 1800
            },
            {key: "tokenHeaderName", value: tokenHeaderName, expiration: 1800}])

        sessionStorage.removeItem("session-auth")

        $axios.defaults.headers[tokenHeaderName] = token;
        $axios.defaults.headers['Authorization'] = phone;

        navigate("/");


    };

    const logout = () => {

        $axios.defaults.headers['token'] = undefined;
        $axios.defaults.headers['Authorization'] = undefined;
        $axios.defaults.headers['AccountId'] = undefined;
        
        clearAllCookies();
        // cleaningOrganizationsStore();
        navigate("/", {replace: true});
        location.reload()
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