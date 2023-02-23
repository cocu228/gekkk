import React, {useContext} from 'react'
import {AuthContext} from './AuthContext'
import {Navigate, useLocation} from 'react-router'

export const useAuth = () =>
    useContext(AuthContext)

export default ({ children }: { children: JSX.Element }) => {
    let auth = useAuth();
    let location = useLocation();

    if (!auth.phone)
        return <Navigate to="/auth" state={{ from: location }} replace />;

    return children
}