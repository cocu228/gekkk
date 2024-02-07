import AuthMobile from "./Mobile";
import AuthDesktop from "./Desktop";
import Header from "../../widgets/header/Header";
import {useBreakpoints} from "../../app/providers/BreakpointsProvider";

const Auth = () => {
	const {md} = useBreakpoints();
	
	return <div>
		<Header/>
		
		{md ? <AuthMobile/> : <AuthDesktop/>}
	</div>;
}

export default Auth;
