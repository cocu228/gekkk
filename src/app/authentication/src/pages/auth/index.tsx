import { ResetPasswordForm } from "../../widgets/ResetPasswordForm";
import { useBreakpoints } from "../../app/providers/BreakpointsProvider";
import styles from './style.module.css';

import TabButton from "../../widgets/components/tab-button/TabButton";
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
								<h1 style={{ color: 'var(--gek-text-primary)', marginBottom: '18px' }}>
									Welcome to Gekkard online bank
								</h1>
								<p className={styles.FormHeader}>
									Log in using the form below
								</p>
							</header>

							{/* Input form */}
							<main>
								<div style={{
									width: 'auto',
									margin: '4px 4px 0 4px',
									gap: '1px',
									display: 'grid',
									gridTemplateColumns: 'auto auto'
								}}>
									<TabButton active={tab === 'PASSWORD'} onClick={() => setTab('PASSWORD')}>
										Password
									</TabButton>

									<TabButton active={tab === 'DEVICE_KEY'} onClick={() => setTab('DEVICE_KEY')}>
										Device key
									</TabButton>
								</div>

								<div className={styles.FormSubstrate}>
									<div className={styles.FormWrapper}>
										<form className={styles.FormBody}>
											{tab === 'PASSWORD'
												? <LoginPasswordForm />
												: <LoginDeviceKey />
											}
										</form>
									</div>
								</div>
							</main>

							{/* Under input form */}
							<details style={{
								width: '100%',
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								paddingTop: '60px'
							}}>
								<summary>Don’t have an account?</summary>

								<a href="https://webreg.gekkard.com/" target="_blank" rel="noreferrer noopener">
									Go to Gekkard registration form
								</a>
							</details>

							<footer style={{ flex: '0 0 auto', display: 'flex', flexDirection: 'column' }}>
								<nav className="typography-b2" style={{
									marginBottom: '6px', color: '285E69ff',
									display: 'flex', justifyContent: 'space-between'
								}}>
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

								<div style={{ color: 'var(--gek-dark-grey)', marginBottom: '3px' }}>
									Crypto exchange service is powered by AtlantEX OU (licensed partner for crypto wallet and exchange)
								</div>

								<div style={{ color: 'var(--gek-dark-grey)' }}>© Gekkoin. v."2.0.65"</div>
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
