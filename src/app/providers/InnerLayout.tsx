import {Navigate, Outlet, useLocation} from 'react-router'
import {useAuth} from '../../entities/auth/model/AuthRequire'
import Header from "../../widgets/header";
import Footer from "../../widgets/footer";

export default () => {
    const auth = useAuth()
    const location = useLocation()

    // if(!auth.isAuthorized)
    //     return <Navigate to={'/auth'} replace={true}/>


    return <div>
        <Header/>
        <Outlet/>
        <Footer/>
        </div>
}