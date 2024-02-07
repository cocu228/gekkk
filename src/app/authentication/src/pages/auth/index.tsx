import AuthMobile from "./Mobile";
import AuthDesktop from "./Desktop";
import Header from "../../widgets/header/Header";
import {useBreakpoints} from "../../app/providers/BreakpointsProvider";

export function Auth() {
	const {md} = useBreakpoints();
	
	return <div>
		<Header/>
		
		{md ? <AuthMobile/> : <AuthDesktop/>}
	</div>;
}
