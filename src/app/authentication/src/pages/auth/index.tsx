import { ResetPasswordForm } from "../../widgets/ResetPasswordForm";
import { useBreakpoints } from "../../app/providers/BreakpointsProvider";
import styles from './style.module.css';

import { LoginDeviceKey } from "../../widgets/LoginDeviceKey";

import BackgroundLogoIcon from "../../widgets/components/icons/BackgroundLogoIcon";
import LogoIcon from "../../widgets/components/icons/LogoIcon";
import SupportIcon from "../../widgets/components/icons/SupportIcon";

import { coerceToBase64Url, formatAsNumber, setAdvCookie } from "../../widgets/model/shared";
import { eddsa } from 'elliptic'
import { apiLogin, apiLoginOptions } from "../../shared/(orval)api/auth";
import { sha256 } from "js-sha256";
import { apiGetInfo } from "../../shared/(orval)api/gek";
import { createRef } from "preact";
import { setCookieData } from "../../shared/lib/cookies-helper";
import Button from "../../widgets/components/button/Button";
import { useState } from "preact/hooks";
import { CallResetPasswordForm } from "../..//widgets/CallResetPasswordForm";

import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';


const fServerRequest = async (data: any) => {

	const response = await apiLogin(data, {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'resolution': ("" + screen.width + "x" + screen.height),
			'device_guid': setAdvCookie()
		}
	});

	if (response.data.result === "Success") {
		let { data } = await apiGetInfo({ refresh: false });
		if (data.result.length > 0) {
			setCookieData([{ key: "accountId", value: data.result[0].account }]);
		} else {
			let { data } = await apiGetInfo({ refresh: true });
			setCookieData([{ key: "accountId", value: data.result[0].account }]);
		}

		location.replace('/');
	}

}

const Auth = () => {
	const { md } = useBreakpoints();
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const emailCode = urlParams.get('emailCode');
	const [tab, setTab] = useState<"PASSWORD" | "DEVICE_KEY">("PASSWORD");

	const refInputPassword = createRef();
	const [displayResetPassword, setDisplayResetPassword] = useState<boolean>(false);

	const onSubmit = async (e) => {

		// const emailCode = refInputCodeEmail.current.value
		// const smsCode = refInputSmsEmail.current.value
		const password = refInputPassword.current.value
		// const phone = formatAsNumber(refInputLogin.current.value)		
		const phone = formatAsNumber(phoneValue);

		const response = await apiLoginOptions({
			headers: {
				'Accept': 'application/json',
				'Access-Control-Allow-Origin': 'origin-list'
			}
		})

		if (response.data.result?.challenge) {
			const challenge = response.data.result.challenge
				.replace(/-/g, "+")
				.replace(/_/g, "/")

			const challengeUint8 = Uint8Array.from(atob(challenge), c => c.charCodeAt(0))

			const SHA256Seed = sha256(phone + password + response.data.result.rpId);

			const ec = new eddsa('ed25519');
			const key = ec.keyFromSecret(SHA256Seed);
			const pub = key.getPublic();
			const signature = key.sign(challengeUint8 as eddsa.Bytes).toBytes();

			console.log("verify signature:");
			console.log(key.verify(challengeUint8 as eddsa.Bytes, signature));
			console.log("Public key (elliptic):");
			console.log(coerceToBase64Url(pub));

			const data = {
				challenge_id: response.data.result.challenge_id,
				credential: null,
				public_key: coerceToBase64Url(pub),
				signature: coerceToBase64Url(signature)
			};

			await fServerRequest(data)

		} else {
			alert("Bad request, look at devtools network")
		}
		e.preventDefault();
	}

	const onPasswordForget = () => {
		setDisplayResetPassword(true);
	}
	const [phoneValue, setValue] = useState();

	return (
		<>
			<div className={styles.Header}>
				<div className={styles.LogoContainer}>
					<LogoIcon />
				</div>

				<div onClick={null}>
					<SupportIcon stroke={"var(--gek-background)"} />
				</div>
			</div>

			<div className={styles.Main}>
				{
					emailCode ? <ResetPasswordForm emailCode={emailCode} />
						: displayResetPassword ? <CallResetPasswordForm handleCancel={() => setDisplayResetPassword(false)} /> :
							<div className={styles.MainBody}>
								<header>
									<h2>
										Welcome to Gekkard online bank
									</h2>
									<p>
										Log in using the form below
									</p>
								</header>

								<main>
									<div className={styles.FormTab}>
										<button className={`${styles.TabButton} ${tab === 'PASSWORD' ? styles.TabButtonActive : ""}`} onClick={() => setTab('PASSWORD')} >
											User
										</button>
										<button className={`${styles.TabButton} ${tab === 'DEVICE_KEY' ? styles.TabButtonActive : ""}`} onClick={() => setTab('DEVICE_KEY')} >
											Device key
										</button>
									</div>
									<form onSubmit={onSubmit} autoComplete={"on"} className={styles.FormBody}>
										{tab != 'PASSWORD' ? <LoginDeviceKey /> :
											<>
												<div>													
													<PhoneInput flags={flags} placeholder="Enter phone number" name='user' value={phoneValue} onChange={setValue}/>
													{/* <input type={"text"} ref={refInputLogin} name='phone' /> */}
												</div>
												<div>
													<input placeholder={"Password"} type={"password"} ref={refInputPassword} name='password'/>
												</div>
												<div className={styles.FormButtons} >
													<Button disabled={!phoneValue} type="submit">Login</Button>
													<Button text onClick={onPasswordForget}>Forgot password?</Button>
												</div>
											</>
										}
									</form>
								</main>

								<details>
									<summary><h4>Don’t have an account?</h4></summary>

									<a href="https://webreg.gekkard.com/" target="_blank" rel="noreferrer noopener">
										Go to Gekkard registration form
									</a>
								</details>

								<footer>
									<nav>
										<a href="https://gekkard.com/terms-and-conditions.html" target="_blank" rel="noreferrer noopener">
											General terms and conditions
										</a>

										<a href="https://gekkard.com/data-protection-policy.html" target="_blank" rel="noreferrer noopener">
											Data protection policy
										</a>

										<a href="https://gekkard.com/legal-agreements.html" target="_blank" rel="noreferrer noopener">
											Legal agreements
										</a>
									</nav>

									<p>
										Crypto exchange service is powered by AtlantEX OU (licensed partner for crypto wallet and exchange)
									</p>
									<p>© Gekkard. v."2.0.65"</p>
								</footer>
							</div>
				}
				{
					md ? "" : <div className={styles.MainBackground}>
						<figure>
							<BackgroundLogoIcon />
						</figure>
					</div>
				}
			</div>
		</>
	);
}

export default Auth;
