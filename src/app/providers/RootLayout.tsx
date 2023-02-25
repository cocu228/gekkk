import {Outlet} from 'react-router'
import Header from "@/widgets/header";
import Footer from "@/widgets/footer";
//import {useAuth} from './auth/RequireAuth'

export default () => {
/*
    const auth = useContext(AuthContext)
    const location = useLocation()
    if( auth.isAuthorized && location.pathname.startsWith('/auth') )
        return <Navigate to={'/in/dashboard'}/>

    if(!auth.isAuthorized && location.pathname.startsWith('/in') )
        return <Navigate to={'/auth'}/>
    */

//    const auth = useAuth()


    return <div className="w-full h-full relative">
        <Outlet/>
    </div>
}