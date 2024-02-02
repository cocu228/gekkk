import './style.module.css'
// import {LoginPasswordForm} from "../widgets/LoginPasswordForm";
import {ResetPasswordForm} from "../widgets/ResetPasswordForm";
import {RegisterDeviceKey} from "../widgets/RegisterDeviceKey";
import {EllipticLoginPasswordForm} from "../widgets/EllipticLoginPasswordForm";

export function Auth() {

    const md = true
    return <>
        <div style={{
            background: 'var(--new-brand-white)',
            position: 'relative',
            height: '100vh',
            width: '100vw',
            overflow: 'hidden',
        }}>
            {/*<NewHeader/>*/}
            <div style={{
                background: 'var(--new-brand-white)',
                height: 'calc(100% - 70px)',
                width: '100%',
                display: 'flex',
                overflow: 'auto',
            }}>
                <div style={{
                    width: md ? 0 : '270px',
                    flex: '0 1 auto',
                }} id={"recaptcha-container"}></div>

                <div style={{
                    width: md ? '100%' : '',
                    margin: '20px',
                    display: "flex",
                    flexDirection: 'column',

                }}>

                    <div style={{
                        width: md ? '100%' : '499px',
                        flex: '0 0 auto'
                    }}>

                        <h1 className="typography-h1" style={{
                            color: 'var(--new-dark-blue)',
                            marginBottom: '18px',
                        }}>
                            Welcome to Gekkard online bank
                        </h1>
                        <EllipticLoginPasswordForm/>
                        <div style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingTop: '60px',

                        }}>
                        <span className="typography-b2" style={{
                            color: 'var(--new-dark-grey)',
                        }}>

                            Don’t have an account? Sign up now
                        </span>
                            <button
                                className='account-button'
                            >
                                Sign up
                            </button>
                        </div>

                    </div>
                    {/*<CookiePolicyApplies/>*/}

                    <div style={{height: "100%", minHeight: '30px'}}></div>

                    {/* <p className="typography-b4" style={{
                        color: 'var(--new-light-grey)',
                        paddingTop: '60px',
                    }}>
                        Gekkard is issued by Papaya Ltd. Papaya Ltd is licensed by the Malta Financial Services Authority as an Electronic Money Institution (EMI). Registration number C55146. Copyright © 2023 Gekkard.
                    </p> */}
                </div>
                <ResetPasswordForm/>
                <RegisterDeviceKey/>
                {!md ?
                    <div style={{
                        position: 'relative',
                        flex: '0 1 auto',
                        overflow: "hidden",
                        display: 'flex',
                        alignItems: 'top',
                        height: '100%',
                        width: "100%",
                        maxWidth: "100%",
                        marginLeft: "50px",
                        marginRight: "50px"
                    }}>
                        <div style={{
                            position: 'absolute',
                            top: '80px',
                            right: 0,
                            width: '100%',

                            maxWidth: "783px",
                        }}>
                        </div>
                    </div> : null}
            </div>
        </div>
    </>
}
