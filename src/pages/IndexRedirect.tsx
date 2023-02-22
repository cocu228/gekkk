import {Navigate, useLocation} from 'react-router'
import {useAuth} from './auth/RequireAuth'
import indexHandler from './IndexRedirect'

const IndexRedirect = () => {
    const auth = useAuth()
    const location = useLocation()

    console.log('render '+indexHandler.name+' auth '+auth+ '  location='+location)

    return <Navigate to={ auth.isAuthorized ? '/in/dashboard' : '/auth'}/>

}

export default IndexRedirect