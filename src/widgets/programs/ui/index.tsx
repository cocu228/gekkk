import {useContext} from "react";
import {BreakpointsContext} from "@/app/providers/BreakpointsProvider";
import ProgramsDesktop from "./desktop";
import ProgramsMobile from "./mobile";

const Programs = ({needMobile}) => {

    const {md} = useContext(BreakpointsContext)

    return md ? <ProgramsMobile/> : <ProgramsDesktop mobile={needMobile} />

}

export default Programs