import styles from './style.module.css';
import Header from "../widgets/header/Header";
import Button from "../widgets/components/button/Button";
import BackgroundLogoIcon from "../widgets/components/icons/BackgroundLogoIcon";
import {ResetPasswordForm} from "../widgets/ResetPasswordForm";
// import {NoUsagesLoginPasswordForm} from "../widgets/(no-usages)LoginPasswordForm.tsx";
// import {LoginPasswordForm} from "../widgets/LoginPasswordForm";
//import {ResetPasswordForm} from "../widgets/ResetPasswordForm";
//import {RegisterDeviceKey} from "../widgets/RegisterDeviceKey";
//import {EllipticLoginPasswordForm} from "../widgets/EllipticLoginPasswordForm";

export function Auth() {

    // const md = true
    // return <>
    //     <div style={{
    //         background: 'var(--new-brand-white)',
    //         position: 'relative',
    //         height: '100vh',
    //         width: '100vw',
    //         overflow: 'hidden',
    //     }}>
    //         {/*<NewHeader/>*/}
    //         <div style={{
    //             background: 'var(--new-brand-white)',
    //             height: 'calc(100% - 70px)',
    //             width: '100%',
    //             display: 'flex',
    //             overflow: 'auto',
    //         }}>
    //             <div style={{
    //                 width: md ? 0 : '270px',
    //                 flex: '0 1 auto',
    //             }} id={"recaptcha-container"}></div>
	//
    //             <div style={{
    //                 width: md ? '100%' : '',
    //                 margin: '20px',
    //                 display: "flex",
    //                 flexDirection: 'column',
	//
    //             }}>
	//
    //                 <div style={{
    //                     width: md ? '100%' : '499px',
    //                     flex: '0 0 auto'
    //                 }}>
	//
    //                     <h1 className="typography-h1" style={{
    //                         color: 'var(--new-dark-blue)',
    //                         marginBottom: '18px',
    //                     }}>
    //                         Welcome to Gekkard online bank
    //                     </h1>
    //                     <EllipticLoginPasswordForm/>
    //                     <div style={{
    //                         width: '100%',
    //                         display: 'flex',
    //                         justifyContent: 'space-between',
    //                         alignItems: 'center',
    //                         paddingTop: '60px',
	//
    //                     }}>
    //                     <span className="typography-b2" style={{
    //                         color: 'var(--new-dark-grey)',
    //                     }}>
	//
    //                         Don’t have an account? Sign up now
    //                     </span>
    //                         <button
    //                             className='account-button'
    //                         >
    //                             Sign up
    //                         </button>
    //                     </div>
	//
    //                 </div>
    //                 {/*<CookiePolicyApplies/>*/}
	//
    //                 <div style={{height: "100%", minHeight: '30px'}}></div>
	//
    //                 {/* <p className="typography-b4" style={{
    //                     color: 'var(--new-light-grey)',
    //                     paddingTop: '60px',
    //                 }}>
    //                     Gekkard is issued by Papaya Ltd. Papaya Ltd is licensed by the Malta Financial Services Authority as an Electronic Money Institution (EMI). Registration number C55146. Copyright © 2023 Gekkard.
    //                 </p> */}
    //             </div>
    //             <ResetPasswordForm/>
    //             <RegisterDeviceKey/>
    //             {!md ?
    //                 <div style={{
    //                     position: 'relative',
    //                     flex: '0 1 auto',
    //                     overflow: "hidden",
    //                     display: 'flex',
    //                     alignItems: 'top',
    //                     height: '100%',
    //                     width: "100%",
    //                     maxWidth: "100%",
    //                     marginLeft: "50px",
    //                     marginRight: "50px"
    //                 }}>
    //                     <div style={{
    //                         position: 'absolute',
    //                         top: '80px',
    //                         right: 0,
    //                         width: '100%',
	//
    //                         maxWidth: "783px",
    //                     }}>
    //                     </div>
    //                 </div> : null}
    //         </div>
    //     </div>
    // </>
	
	return <div>
		<Header/>
		
		<div className={styles.Main}>
			{/* ReCapcha */}
			<div className={styles.ReCapchaContainer} id="recaptcha-container"/>
			
			<div className={styles.MainBody}>
				{/* Header */}
				<div style={{width: '499px', flex: '0 0 auto'}}>
					<h1 style={{color: 'var(--text-primary)', marginBottom: '18px'}}>
						Welcome to Gekkard online bank
					</h1>
				</div>
				
				{/* Input form */}
				<div>
					<p className={styles.FormHeader}>
						Log in using the form below
					</p>
					
					<div className={styles.FormSubstrate}>
						<div className={styles.FormWrapper}>
							<form className={styles.FormBody}>
								{/* Make form field styles */}
								<div style={{display: "flex", flexDirection: "column"}}>
									Login
									<input/>
								</div>
								
								<div style={{display: "flex", flexDirection: "column"}}>
									Password
									<input/>
								</div>
								
								<div style={{
									width: '100%',
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center'
								}}>
									<Button tabIndex={0} data-testid="Login">
										Login
									</Button>
									
									<Button className="text-button">
										Forgot password
									</Button>
								</div>
								
								{/*todo: remove in future*/}
								<div style={{
									width: '100%',
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center'
								}}>
									<Button tabIndex={0}>
										Change password
									</Button>
									
									<Button tabIndex={0}>
										Register device key
									</Button>
								</div>
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
					<span className="typography-b2" style={{color: 'var(--text-additional-inverted)'}}>
						Don’t have an account? Sign up now
					</span>
					
					<Button>
						Sign up
					</Button>
				</div>
				
				<div style={{height: '100%', minHeight: '300px'}}></div>
				
				<div style={{flex: '0 0 auto', display: 'flex', flexDirection: 'column'}}>
					<div className="typography-b2" style={{marginBottom: '6px', color: '285E69ff',
						display: 'flex', justifyContent: 'space-between'}}>
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
					
					<div style={{color: 'var(--text-additional-inverted)', marginBottom: '3px'}}>
						Crypto exchange service is powered by AtlantEX OU (licensed partner for crypto wallet and exchange)
					</div>
					
					<div style={{color: 'var(--text-additional-inverted)'}}>© Gekkoin. v."2.0.65"</div>
				</div>
			</div>
			
			<div className={styles.MainBackground}>
				<div className={styles.MainBackgroundLogo}>
					<BackgroundLogoIcon/>
				</div>
			</div>
		</div>
	</div>
}
