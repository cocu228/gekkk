import HeaderDesktop from "./desktop"
import HeaderMobile from "./mobile"
import {useContext} from "react";
import {BreakpointsContext} from "@/app/providers/BreakpointsProvider";

const Header = () => {

    const {md} = useContext(BreakpointsContext)

    return md ? <HeaderMobile/> : <HeaderDesktop/>

}

export default Header