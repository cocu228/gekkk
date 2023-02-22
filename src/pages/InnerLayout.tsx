import {Navigate, Outlet, useLocation} from 'react-router'
import {useAuth} from './auth/RequireAuth'

export default () => {
    const auth = useAuth()
    const location = useLocation()

    if(!auth.isAuthorized)
        return <Navigate to={'/auth'} replace={true}/>


    return <div>
            <Outlet/>
        </div>
}