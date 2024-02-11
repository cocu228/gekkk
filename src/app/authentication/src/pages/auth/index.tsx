import { ResetPasswordForm } from "../../widgets/ResetPasswordForm";
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

import { SignIn, SignInUser } from "../../shared";

const Auth = () => {
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const emailCode = urlParams.get('emailCode');
	const [tab, setTab] = useState<"PASSWORD" | "DEVICE_KEY">("PASSWORD");

	const refInputPassword = createRef();
	const [displayResetPassword, setDisplayResetPassword] = useState<boolean>(false);

	const onSubmit = async (e) => {
		e.preventDefault();

		// const emailCode = refInputCodeEmail.current.value
		// const smsCode = refInputSmsEmail.current.value
		const password = refInputPassword?.current?.value;
		// const phone = formatAsNumber(refInputLogin.current.value)		
		const phone = formatAsNumber(phoneValue);

		const t = (tab === 'PASSWORD' ?
			await SignInUser(phone, password)
			: await SignIn());

		if (t) {
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
										{tab != 'PASSWORD' ?
											<>
												<p>Use of a hardware-based security key is fast and easy. <a href={"https://fidoalliance.org/fido2/"}>More about FIDO2.</a></p>
												<Button type="submit">
													Login with Device Key
												</Button>
											</>
											:
											<>
												<div>
													<PhoneInput flags={flags} placeholder="Enter phone number" name='user' value={phoneValue} onChange={setValue} />
													{/* <input type={"text"} ref={refInputLogin} name='phone' /> */}
												</div>
												<div>
													<input placeholder={"Password"} type={"password"} ref={refInputPassword} name='password' />
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
				<figure>
					<div className={styles.MainBackground}><BackgroundLogoIcon /></div>
				</figure>
			</div>
		</>
	);
}

export default Auth;
