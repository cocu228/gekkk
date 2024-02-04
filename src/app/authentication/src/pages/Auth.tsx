import styles from './style.module.css';
import {ResetPasswordForm} from "../widgets/ResetPasswordForm.tsx";
import {SVGIcon1, SVGIcon2, SVGIcon3} from "./SVGIcon3.tsx";
// import {NoUsagesLoginPasswordForm} from "../widgets/(no-usages)LoginPasswordForm.tsx";
// import {LoginPasswordForm} from "../widgets/LoginPasswordForm";
//import {ResetPasswordForm} from "../widgets/ResetPasswordForm";
//import {RegisterDeviceKey} from "../widgets/RegisterDeviceKey";
//import {EllipticLoginPasswordForm} from "../widgets/EllipticLoginPasswordForm";

export function Auth() {

    //const md = true
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
        {/* Header */}
        <div className={styles.Header}>
            {/* LogoContainer */}
            <div className={styles.HeaderLogoContainer}>
                {/* Logo */}
                <SVGIcon1/>
            </div>

            {/* Support button */}
            <button type='button' style={{color: "#F7F7F0"}} onClick={null}>
                {/* Support icon */}
                <SVGIcon2/>
            </button>
            {/*<LoginPasswordForm/>*/}
            {/*<NoUsagesLoginPasswordForm/>*/}
        </div>

        {/* Main container */}
        <div className={styles.Main}>
            {/* ReCapcha */}
            <div className={styles.ReCapchaContainer} id="recaptcha-container"/>

            {/* Body */}
            <div style={{margin: '20px', display: 'flex', flexDirection: 'column'}}>
                {/* Header */}
                <div style={{width: '499px', flex: '0 0 auto'}}>
                    <h1 className="typography-h1" style={{color: '#29354Cff', marginBottom: '18px'}}>
                        Welcome to Gekkard online bank
                    </h1>
                </div>

                {/* Input form */}
                <div>
                    <p className="typography-b2" style={{color: '#285E69ff', marginBottom: '36px'}}>
                        Log in using the form below
                    </p>

                    {/* Background */}
                    <div style={{
                        background: 'FFFFFF',
                        padding: '24px 36px',
                        borderRadius: '8px 8px 0px 0px',
                        boxShadow: `
							3px 2px 8px 0px #A8A8A84A,
							13px 8px 15px 0px #A8A8A842,
							28px 17px 20px 0px #A8A8A826,
							50px 30px 23px 0px #A8A8A80A,
							79px 47px 26px 0px #A8A8A803
						`
                    }}>
                        <div style={{display: 'flex', flexDirection: 'column', gap: '6rem'}}>
                            <form style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.5rem',
                                boxSizing: 'border-box',
                                margin: 0,
                                padding: 0,
                                color: 'rgba(0, 0, 0, 0.88)',
                                fontSize: '14px',
                                lineHeight: 1.5714285714285714,
                                listStyle: 'none',
                                fontFamily: 'inherit'
                            }}>
                                <div style={{display: "flex", flexDirection: "column"}}>
                                    Login
                                    <input/>
                                </div>
                                <div style={{display: "flex", flexDirection: "column"}}>
                                    Password
                                    <input/>
                                </div>

                                {/* Menu buttons */}
                                <div style={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <button className="account-button" tabIndex={0} data-testid="Login">
                                        Login
                                    </button>

                                    <button type="button" className="text-button">
                                        Forgot password
                                    </button>
                                </div>

                                <div style={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <button className="account-button" tabIndex={0} data-testid="Login">
                                        Change password
                                    </button>

                                    <button className="account-button" tabIndex={0} data-testid="Login">
                                        Register device key
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <ResetPasswordForm/>

                {/* Under input form */}
                <div style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: '60px'
                }}>
					<span className="typography-b2" style={{color: '#676767ff'}}>
						Don’t have an account? Sign up now
					</span>

                    <button className="account-button">
                        Sign up
                    </button>
                </div>

                <div style={{height: '100%', minHeight: '300px'}}></div>

                <div style={{flex: '0 0 auto', display: 'flex', flexDirection: 'column'}}>
                    <div className="typography-b2" style={{
                        marginBottom: '6px', color: '285E69ff',
                        display: 'flex', justifyContent: 'space-between'
                    }}>
                        <a href="https://gekkard.com/terms-and-conditions.html" target="_blank"
                           rel="noreferrer noopener">
                            General terms and conditions
                        </a>

                        <a href="https://gekkard.com/data-protection-policy.html" target="_blank"
                           rel="noreferrer noopener">
                            Data protection policy
                        </a>

                        <a href="https://gekkard.com/legal-agreements.html" target="_blank" rel="noreferrer noopener">
                            Legal agreements
                        </a>
                    </div>

                    <div className="typography-b4" style={{color: '#676767ff', marginBottom: '3px'}}>
                        Crypto exchange service is powered by AtlantEX OU (licensed partner for crypto wallet and
                        exchange)
                    </div>

                    <div className="typography-b4-bold" style={{color: '#676767ff'}}>© Gekkard. v."2.0.65"</div>
                </div>
            </div>

            <div style={{
                position: 'relative',
                flex: '0 1 auto',
                overflow: 'hidden',
                display: 'flex',
                height: '100%',
                width: '100%',
                maxWidth: '100%',
                marginLeft: '50px',
                marginRight: '50px'
            }}>
                <div style={{position: 'absolute', top: '80px', right: '0px', width: '100%', maxWidth: '783px'}}>
                    <SVGIcon3/>
                    {/*asd*/}
                </div>
            </div>
        </div>
    </div>
}
