import {useContext} from "react";
import {BreakpointsContext} from "@/app/providers/BreakpointsProvider";
import ProgramsDesktop from "./desktop";
import ProgramsMobile from "./mobile";

const Programs = () => {

    const {md} = useContext(BreakpointsContext)

    return md ? <ProgramsMobile/> : <ProgramsDesktop />

}

export default Programs