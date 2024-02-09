import styles from './style.module.css';
import Button from '../../../widgets/components/button/Button';
import BackgroundLogoIcon from "../../../widgets/components/icons/BackgroundLogoIcon";
import TabButton from "../../../widgets/components/tab-button/TabButton";
import { useState } from "react";
import { LoginPasswordForm } from "../../../widgets/LoginPasswordForm";
import { LoginDeviceKey } from "../../../widgets/LoginDeviceKey";

const AuthDesktop = () => {
	const [tab, setTab] = useState<"PASSWORD" | "DEVICE_KEY">("PASSWORD");

	return <div className={styles.Main}>
		

		<div className={styles.MainBody}>
			{/* Header */}
			<div style={{ width: '499px', flex: '0 0 auto' }}>
				<h1 style={{ color: 'var(--gek-text-primary)', marginBottom: '18px' }}>
					Welcome to Gekkard online bank
				</h1>
			</div>

			{/* Input form */}
			<div>
				<p className={styles.FormHeader}>
					Log in using the form below
				</p>

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
			</div>

			{/* Under input form */}
			<div style={{
				width: '100%',
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				paddingTop: '60px'
			}}>
				<span className="typography-b2" style={{ color: 'var(--gek-dark-grey)' }}>
					Don’t have an account? Sign up now
				</span>

				<Button>
					Sign up
				</Button>
			</div>

			<div style={{ height: '100%', minHeight: '300px' }}></div>

			<div style={{ flex: '0 0 auto', display: 'flex', flexDirection: 'column' }}>
				<div className="typography-b2" style={{
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
				</div>

				<div style={{ color: 'var(--gek-dark-grey)', marginBottom: '3px' }}>
					Crypto exchange service is powered by AtlantEX OU (licensed partner for crypto wallet and exchange)
				</div>

				<div style={{ color: 'var(--gek-dark-grey)' }}>© Gekkoin. v."2.0.65"</div>
			</div>
		</div>

		<div className={styles.MainBackground}>
			<div className={styles.MainBackgroundLogo}>
				<BackgroundLogoIcon />
			</div>
		</div>
	</div>
}

export default AuthDesktop;
