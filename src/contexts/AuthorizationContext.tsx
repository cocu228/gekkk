import { contextFactory } from "./context-factory";
import React, {ComponentProps, useCallback, useLayoutEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Navigate, Route, RouteProps,} from 'react-router';
import {authApi, Credentials} from '../api/authApi'
import * as R from 'ramda'
import {any} from 'ramda'
export type Token = string





type AuthProviderProps = ComponentProps<typeof AuthContext['Provider']>




const defaultAuthState = {
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

export const AuthProvider = ({children}: AuthProviderProps) => {

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
            const logoutResponse = await fetch(' https://node.int.gekkoin.lan/logout')
            const logoutResult = logoutResponse.status
            setState({...state,sessid: '',isAuthorized: false,token: '',phone: '',time: 0})
            return ''
        },
        []
    )

    return (
        <AuthContext.Provider
            value={{
                ...state, doLogin,doLogout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
/*
export const AuthRoute = ({ component, ...rest }: RouteProps) => (
    <AuthContext.Consumer>
        {({ authorize, checkAuth }) => {
            let content = '';

            if (authorize) {
                content = (
                    <Route
                        render={props => (
                            <Component {...props} />
                        )}
                        {...rest}
                    />
                );
            } else if (checkAuth && !authorize) {
                console.log('You must be login')
                content = <Navigate to="/" />;
            }
            return content;
        }}
    </AuthContext.Consumer>
);

*/
