import {Navigate, Outlet, useLocation} from 'react-router'
import {useAuth} from '../../entities/auth/model/RequireAuth'

export default () => {
    const auth = useAuth()
    const location = useLocation()

    if(!auth.isAuthorized)
        return <Navigate to={'/auth'} replace={true}/>


    return <div>
            <Outlet/>
        </div>
}