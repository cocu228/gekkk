import {useContext} from 'react'
import {AuthContext} from '../contexts/AuthorizationContext'
import {Navigate, useLocation} from 'react-router'

export default () => {
    const auth = useContext(AuthContext)
    const location = useLocation()
    if( auth.isAuthorized && location.pathname.startsWith('/auth') )
        return <Navigate to={'/in/dashboard'}/>


}