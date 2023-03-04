import {Outlet} from 'react-router'
import Header from "@/widgets/header/ui/mobile";
import Footer from "@/widgets/footer";
export default () => {
    return <>
        <Header/>
        <Outlet/>
        <Footer/>
    </>
}