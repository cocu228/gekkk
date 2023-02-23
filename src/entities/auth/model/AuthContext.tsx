import React, {ComponentProps, PropsWithChildren, useCallback, useState} from 'react';
import {authApi, Credentials} from '../api/auth-api'

export type Token = string

type AuthProviderProps = ComponentProps<typeof AuthContext['Provider']>


export const defaultAuthState = {
    isAuthorized: false,
    phone: undefined as any as string,
    token: '',
    time: 0,
    sessid: '',
}


type AuthState = typeof defaultAuthState

export const AuthContext = React.createContext({
    ...defaultAuthState,
    doLogin: undefined as any as {(cred:Credentials) : any},
    doLogout: undefined as any as {() : any},
});

export const AuthProvider = ({children}:PropsWithChildren) => {

    const [state, setState] = useState(defaultAuthState)

    const doLogin = useCallback (

        async (creds: Credentials): Promise<Token> => {
            const checkResponse = await authApi.post('/password/check',{body: creds})
            if(checkResponse.status === 'ok') {
                const requestCodeResponse = await authApi.post('/requestCode')
                if(requestCodeResponse.success) {
                    const sessid = requestCodeResponse.sessid
                    const signInResponse = await authApi.post('/signin',{body: {sessid,code: '000000'}})
                    if(signInResponse.success) {
                        setState({...state, sessid, phone:creds.phone,token: signInResponse.token,isAuthorized: true, })
                    }
                }
            }
            throw new Error ('login function is not defined for AuthContextProvider')
            return ''
        },
        []
    )

    const doLogout = useCallback(
        async (): Promise<Token> => {
            const logoutResponse = await fetch('http://node.int.gekkoin.lan/logout')
            const logoutResult = logoutResponse.status
            setState({...state,sessid: '',isAuthorized: false,token: '',phone: '',time: 0})
            return ''
        },
        []
    )

    return (
        <AuthContext.Provider
            value={{
                ...state,
                doLogin,
                doLogout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
