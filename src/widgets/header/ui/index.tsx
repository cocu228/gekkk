import HeaderDesktop from "./desktop"
import HeaderMobile from "./mobile"
import {useContext} from "react";
import {BreakpointsContext} from "@/app/providers/BreakpointsProvider";

const Header = () => {

    const {sm} = useContext(BreakpointsContext)

    return sm ? <HeaderMobile/> : <HeaderDesktop/>

}

export default Header