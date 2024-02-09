import AuthMobile from "./Mobile";
import AuthDesktop from "./Desktop";
import Header from "../../widgets/header/Header";
import { ResetPasswordForm } from "../../widgets/ResetPasswordForm";
import { useBreakpoints } from "../../app/providers/BreakpointsProvider";

const Auth = () => {
	const { md } = useBreakpoints();
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const emailCode = urlParams.get('emailCode');

	return (
		<>
			<Header />
			{emailCode
				? <ResetPasswordForm emailCode={emailCode} />
				: md
					? <AuthMobile />
					: <AuthDesktop />
			}
		</>
	);
}

export default Auth;
