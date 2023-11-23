import $axios from "@/shared/lib/(cs)axios";
import {useNavigate} from "react-router-dom";
import {auth} from "@/processes/firebaseConfig";
import {onAuthStateChanged} from "firebase/auth";
import {formatAsNumber} from "@/shared/lib/formatting-helper";
import {AXIOS_INSTANCE as $new_axios} from "@/shared/lib/(cs)axios-new";
import {createContext, FC, PropsWithChildren, useContext, useEffect, useMemo} from "react";
import {clearAllCookies, getCookieData, setCookieData, throttle} from "@/shared/lib/helpers";

const AuthContext = createContext({});

interface IValue {
    token: string;
    login: (phone: string, token: string, tokenHeaderName?: string, refreshToken?: string) => void;
    logout: () => void;
}


function inactivityTime() {

    let time = undefined

    document.addEventListener('mousemove', throttle(resetTimer, 5000));
    document.addEventListener('keypress', throttle(resetTimer, 5000));

    function resetTimer() {
        clearTimeout(time);
        time = setTimeout(fn, 900000)
    }

    function fn() {
        this.logout()
    }

};

export const AuthProvider: FC<PropsWithChildren<unknown>> = ({children}) => {


    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                console.log(user)
            } else {
                const idToken = await user.getIdToken(/* forceRefresh */ true);
                console.log("idToken")
                console.log(idToken)
            }
        });

        inactivityTime.call({logout});
    }, []);

    const navigate = useNavigate();
    const {token, tokenHeaderName} = getCookieData<{ token: string, tokenHeaderName: string }>();

    // call this function when you want to authenticate the user
    const login = (phone: string, token: string, tokenHeaderName: string = 'token', refreshToken: string = null) => {

        setCookieData([
            {
                key: "phone",
                value: formatAsNumber(phone),
                expiration: 3600000
            }, {
                key: "token",
                value: token,
                expiration: 3600000
            },
            {
                key: "tokenHeaderName",
                value: tokenHeaderName,
                expiration: 3600000
            }, {
                key: "refreshToken",
                value: refreshToken,
                expiration: 3600000
            }])

        // TEMP: OLD API
        $axios.defaults.headers[tokenHeaderName] = token;
        $axios.defaults.headers['Authorization'] = formatAsNumber(phone);

        // NEW API
        $new_axios.defaults.headers[tokenHeaderName] = token;
        $new_axios.defaults.headers['Authorization'] = formatAsNumber(phone);
        
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
