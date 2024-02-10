import { ResetPasswordForm } from "../../widgets/ResetPasswordForm";
import { useBreakpoints } from "../../app/providers/BreakpointsProvider";
import styles from './style.module.css';

import { useState } from "react";
import { LoginPasswordForm } from "../../widgets/LoginPasswordForm";
import { LoginDeviceKey } from "../../widgets/LoginDeviceKey";

import BackgroundLogoIcon from "../../widgets/components/icons/BackgroundLogoIcon";
import LogoIcon from "../../widgets/components/icons/LogoIcon";
import SupportIcon from "../../widgets/components/icons/SupportIcon";

const Auth = () => {
	const { md } = useBreakpoints();
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const emailCode = urlParams.get('emailCode');
	const [tab, setTab] = useState<"PASSWORD" | "DEVICE_KEY">("PASSWORD");

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
						:
						<div className={styles.MainBody}>
							<header>
								<h1>
									Welcome to Gekkard online bank
								</h1>
								<p>
									Log in using the form below
								</p>
							</header>

							<main>
								<div className={styles.FormTab}>
									<button className={`${styles.TabButton} ${tab === 'PASSWORD' ? styles.TabButtonActive : ""}`} onClick={() => setTab('PASSWORD')} >
										Password
									</button>
									<button className={`${styles.TabButton} ${tab === 'DEVICE_KEY' ? styles.TabButtonActive : ""}`} onClick={() => setTab('DEVICE_KEY')} >
										Device key
									</button>
								</div>
								<form className={styles.FormBody}>
									{tab === 'PASSWORD'
										? <LoginPasswordForm />
										: <LoginDeviceKey />
									}
								</form>
							</main>
							
							<details>
								<summary>Don’t have an account?</summary>

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
						<figure className={styles.MainBackgroundLogo}>
							<BackgroundLogoIcon />
						</figure>
					</div>
				}
			</div>
		</>
	);
}

export default Auth;
