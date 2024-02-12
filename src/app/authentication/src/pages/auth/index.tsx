import styles from './style.module.css';

import BackgroundLogoIcon from "../../widgets/components/icons/BackgroundLogoIcon";
import LogoIcon from "../../widgets/components/icons/LogoIcon";
import SupportIcon from "../../widgets/components/icons/SupportIcon";

import { formatAsNumber } from "../../widgets/model/shared";
import { apiGetInfo } from "../../shared/(orval)api/gek";
import { setCookieData } from "../../shared/lib/cookies-helper";
import Button from "../../widgets/components/button/Button";
import { useState } from "preact/hooks";
import { CallResetPasswordForm } from "../../widgets/CallResetPasswordForm";

import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';

import { SignIn, SignInUser } from "../../shared";

const Auth = () => {
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const emailCode = urlParams.get('emailCode');
	const [tab, setTab] = useState<"PASSWORD" | "DEVICE_KEY">("PASSWORD");

	const [displayForgotPassword, setDisplayForgotPassword] = useState<boolean>(!!emailCode);

	const onSubmit = async (e) => {
		e.preventDefault();

		// const emailCode = refInputCodeEmail.current.value
		// const smsCode = refInputSmsEmail.current.value
		// const phone = formatAsNumber(refInputLogin.current.value)				

		const t = (tab === 'PASSWORD' ?
			await SignInUser(formatAsNumber(phoneValue), passValue)
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
		setDisplayForgotPassword(true);
	}
	const [phoneValue, setPhone] = useState('');
	const [passValue, setPass] = useState('');

	return (
		<>
			<div className={styles.Header}>
				<div className={styles.LogoContainer}>
					<LogoIcon />
				</div>

				<div onClick={null}>
					<SupportIcon stroke={"white"} />
				</div>
			</div>

			<div className={styles.Main}>
				{
					 <div className={styles.MainBody}>
							<header>
								<h2>
									{displayForgotPassword
										? 'Password reset'
										: 'Welcome to Gekkard online bank'
									}
								</h2>
								<p>
									{displayForgotPassword
										? 'To start the password reset process for your Gekkard account, please,' +
										' enter the phone number that you have registered with Gekkard: The link will be sent to your personal email.'
										: 'Log in using the form below'
									}
								</p>
							</header>
							
							{displayForgotPassword ? <CallResetPasswordForm emailCode={emailCode} phone={phoneValue} handleCancel={() => {setDisplayForgotPassword(false)}}/> : (
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
													<PhoneInput flags={flags} placeholder="Enter phone number" name='user' value={phoneValue} onChange={setPhone} />
													{/* <input type={"text"} ref={refInputLogin} name='phone' /> */}
												</div>
												
												<div>
													<input placeholder={"Password"} type={"password"} value={passValue} onChange={e => setPass(e.currentTarget.value)} name='password' />
												</div>
												
												<div className={styles.FormButtons} >
													<Button disabled={!phoneValue || !passValue || passValue.length < 6} type="submit">Login</Button>
													<Button text onClick={onPasswordForget}>Forgot password?</Button>
												</div>
											</>
										}
									</form>
								</main>
							)}

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
