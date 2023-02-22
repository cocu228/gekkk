import {Navigate, Outlet, useLocation} from 'react-router'
import {useContext} from 'react'
import {AuthContext} from '../contexts/AuthorizationContext'

export default () => {
/*
    const auth = useContext(AuthContext)
    const location = useLocation()
    if( auth.isAuthorized && location.pathname.startsWith('/auth') )
        return <Navigate to={'/in/dashboard'}/>

    if(!auth.isAuthorized && location.pathname.startsWith('/in') )
        return <Navigate to={'/auth'}/>
    */
    return <div className="w-full h-full relative">

        <Outlet />
    </div>
}