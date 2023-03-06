import React, {useState} from 'react'
import ReactDOM from 'react-dom/client'
import "@/app/styles/index.scss"
import FormLoginAccount from "@/widgets/auth/ui/form-authorization";
import FormCode from "@/widgets/auth/ui/form-code/inedx";
import { ConfigProvider } from 'antd'

export type S = "authorization" | "code"

const AuthPage = () => {

    const [view, setView] = useState<S>("authorization")

    const handleView = (val: S): void => setView(val)

    return (
        <div className='grid justify-center w-screen h-full'>
            <div className='bg-white w-sm h-m rounded-lg px-40 pt-10 pb-12 my-auto'>
                <div className="grid justify-center pt-10 pb-12">
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Layer_1" x="0px" y="0px" width="120px" viewBox="0 0 105.466 35.07" enable-background="new 0 0 105.466 35.07" xml:space="preserve">
                        <g>
                        	<g fill="#262262">
                        		<path d="M45.021,12.855c0-0.854,0.427-1.487,1.333-1.487h4.238c0.82,0,1.213,0.581,1.213,1.179    c0,0.581-0.41,1.179-1.213,1.179h-3.007v2.495h2.802c0.838,0,1.248,0.581,1.248,1.179c0,0.581-0.427,1.179-1.248,1.179h-2.802    v2.597h3.161c0.82,0,1.213,0.582,1.213,1.179c0,0.581-0.411,1.179-1.213,1.179h-4.408c-0.752,0-1.316-0.512-1.316-1.281V12.855z"/>
                        		<path d="M53.949,12.531c0-0.701,0.512-1.265,1.281-1.265c0.735,0,1.281,0.479,1.281,1.265v3.691l4.204-4.477    c0.188-0.205,0.512-0.479,0.991-0.479c0.649,0,1.265,0.496,1.265,1.23c0,0.445-0.273,0.804-0.837,1.367l-3.229,3.179l3.947,4.118    c0.393,0.411,0.718,0.786,0.718,1.299c0,0.803-0.633,1.179-1.333,1.179c-0.496,0-0.821-0.291-1.299-0.803l-4.426-4.784v4.357    c0,0.667-0.512,1.23-1.281,1.23c-0.735,0-1.281-0.479-1.281-1.23V12.531z"/>
                        		<path d="M65.559,12.531c0-0.701,0.512-1.265,1.282-1.265c0.735,0,1.281,0.479,1.281,1.265v3.691l4.204-4.477    c0.188-0.205,0.513-0.479,0.991-0.479c0.65,0,1.265,0.496,1.265,1.23c0,0.445-0.274,0.804-0.838,1.367l-3.229,3.179l3.948,4.118    c0.393,0.411,0.717,0.786,0.717,1.299c0,0.803-0.632,1.179-1.333,1.179c-0.496,0-0.821-0.291-1.299-0.803l-4.426-4.784v4.357    c0,0.667-0.512,1.23-1.281,1.23c-0.735,0-1.282-0.479-1.282-1.23V12.531z"/>
                        		<path d="M90.54,12.599c0-0.854,0.546-1.333,1.282-1.333c0.734,0,1.281,0.479,1.281,1.333v9.706    c0,0.854-0.547,1.333-1.281,1.333c-0.735,0-1.282-0.479-1.282-1.333V12.599z"/>
                        		<path d="M95.092,12.599c0-0.854,0.547-1.333,1.282-1.333c0.325,0,0.854,0.256,1.076,0.564l5.417,7.228h0.034    v-6.459c0-0.854,0.547-1.333,1.281-1.333c0.735,0,1.282,0.479,1.282,1.333v9.706c0,0.854-0.547,1.333-1.282,1.333    c-0.324,0-0.837-0.256-1.076-0.564l-5.417-7.143h-0.034v6.374c0,0.854-0.547,1.333-1.281,1.333c-0.735,0-1.282-0.479-1.282-1.333    V12.599z"/>
                        		<path d="M43.03,18.094c0-0.641-0.516-1.161-1.156-1.167v-0.001h-4.418l0,0l0,0c-0.645,0-1.167,0.523-1.167,1.168    c0,0.645,0.523,1.167,1.167,1.167l0,0l0,0h2.88c-0.65,1.346-2.027,2.276-3.623,2.276c-2.222,0-4.022-1.801-4.022-4.022    c0-2.221,1.8-4.022,4.022-4.022c1.465,0,2.746,0.784,3.449,1.955c0.197,0.367,0.584,0.618,1.03,0.618    c0.645,0,1.167-0.523,1.167-1.167c0-0.266-0.09-0.509-0.239-0.706c-1.118-1.815-3.119-3.027-5.407-3.027    c-3.508,0-6.351,2.843-6.351,6.35c0,3.507,2.843,6.351,6.351,6.351c3.266,0,5.956-2.466,6.31-5.638    C43.028,18.183,43.03,18.138,43.03,18.094z"/>
                        		<path d="M82.199,11.102c-3.507,0-6.351,2.843-6.351,6.35c0,3.508,2.843,6.351,6.351,6.351s6.351-2.843,6.351-6.351    C88.549,13.944,85.706,11.102,82.199,11.102z M82.199,21.474c-2.221,0-4.022-1.801-4.022-4.022c0-2.221,1.801-4.022,4.022-4.022    s4.022,1.801,4.022,4.022C86.221,19.673,84.42,21.474,82.199,21.474z"/>
                        	</g>

                        	<linearGradient id="SVGID_LOGO" gradientUnits="userSpaceOnUse" x1="0" y1="17.5352" x2="31.4775" y2="17.5352">
                        		<stop offset="0" stopColor="#00AEEF"/>
                        		<stop offset="1" stopColor="#72BF44"/>
                        	</linearGradient>

                        	<path fill="url(#SVGID_LOGO)" d="M30.924,28.875c-0.678-1.174-1.846-1.889-3.096-2.036c-0.413-0.089-0.82-0.241-1.206-0.464   c-1.96-1.131-2.646-3.621-1.558-5.594c0.028-0.045,0.054-0.092,0.081-0.139c0.004-0.006,0.008-0.012,0.012-0.018l-0.001-0.001   c0.399-0.716,0.665-1.517,0.761-2.37c0.001-0.009,0.002-0.017,0.003-0.026c0.001-0.016,0.004-0.031,0.006-0.047h-0.003   c0.001-0.021,0.003-0.042,0.003-0.064c0-0.641-0.517-1.161-1.156-1.167v0h-4.419v0c0,0-0.001,0-0.001,0   c-0.645,0-1.167,0.522-1.167,1.167c0,0.644,0.522,1.167,1.167,1.167c0,0,0.001,0,0.001,0l0,0h2.88   c-0.65,1.347-2.028,2.275-3.623,2.275c-2.221,0-4.022-1.8-4.022-4.021c0-2.222,1.801-4.022,4.022-4.022   c1.482,0,2.775,0.802,3.473,1.995c0.203,0.345,0.577,0.578,1.006,0.578c0.645,0,1.167-0.523,1.167-1.168   c0-0.232-0.071-0.445-0.188-0.626c-1.09-1.973-0.404-4.463,1.556-5.596c0.385-0.222,0.792-0.375,1.205-0.463   c1.251-0.147,2.418-0.862,3.097-2.037c1.14-1.975,0.464-4.501-1.512-5.641c-1.975-1.141-4.5-0.464-5.641,1.512   c-0.678,1.174-0.713,2.543-0.216,3.7c0.13,0.401,0.201,0.83,0.201,1.274c0,2.269-1.821,4.11-4.08,4.146   c-0.022,0-0.045-0.002-0.068-0.002c-0.026,0-0.052,0.001-0.078,0.002c-2.255-0.042-4.07-1.881-4.07-4.146   c0-0.445,0.071-0.873,0.201-1.274c0.498-1.157,0.462-2.526-0.216-3.7c-1.14-1.976-3.666-2.652-5.641-1.512   C7.829,1.694,7.152,4.22,8.292,6.195c0.678,1.175,1.846,1.89,3.096,2.037c0.413,0.088,0.819,0.241,1.204,0.463   c1.944,1.123,2.635,3.58,1.585,5.545c-0.045,0.074-0.088,0.149-0.13,0.225c-1.173,1.902-3.654,2.539-5.603,1.414   c-0.402-0.232-0.748-0.524-1.039-0.855c-0.755-0.983-1.942-1.619-3.277-1.619C1.849,13.406,0,15.255,0,17.536   s1.849,4.129,4.129,4.129c1.336,0,2.524-0.635,3.278-1.619c0.291-0.331,0.636-0.623,1.038-0.855   c1.949-1.125,4.429-0.489,5.602,1.414c0.042,0.076,0.085,0.152,0.131,0.226c1.05,1.965,0.359,4.423-1.585,5.545   c-0.385,0.223-0.792,0.375-1.205,0.464c-1.25,0.147-2.417,0.862-3.095,2.037c-1.141,1.976-0.464,4.5,1.511,5.641   c1.976,1.14,4.5,0.463,5.641-1.512c0.678-1.174,0.714-2.543,0.216-3.7c-0.129-0.402-0.201-0.831-0.201-1.275   c0-2.265,1.815-4.104,4.07-4.146c0.026,0,0.051,0.002,0.078,0.002c0.027,0,0.054-0.001,0.081-0.002   c2.253,0.043,4.067,1.883,4.067,4.146c0,0.445-0.071,0.874-0.201,1.275c-0.498,1.156-0.462,2.525,0.216,3.7   c1.14,1.975,3.666,2.652,5.641,1.512C31.388,33.376,32.064,30.851,30.924,28.875z"/>
                        </g>
                    </svg>
                </div>

                {view === "authorization" ? <FormLoginAccount handleView={handleView}/> :
                    <FormCode handleView={handleView}/>}
            </div>

            <footer className='text-gekLightGray text-center font-light mt-auto mb-10 mb max-w-sm'>
                <p className='mb-4'>
                    <a
                        className='font-inherit'
                        href="https://gekkoin.com/source/GeneralTermsandConditions.pdf"
                        target="_blank"
                        rel="noreferrer noopener"
                    >General terms and conditions</a>
                    {' | '}
                    <a
                        className='font-inherit'
                        href="https://gekkoin.com/source/Privacy_policy.pdf"
                        target="_blank"
                        rel="noreferrer noopener"
                    >Privacy policy</a>
                    {' | '}
                    <a
                        className='font-inherit'
                        href="https://gekkoin.com/source/Cookies_policy.pdf"
                        target="_blank"
                        rel="noreferrer noopener"
                    >Cookie policy</a>
                </p>

                <p>
                    Crypto exchange service is powered by AtlantEX OU
                    (licensed partner for crypto wallet and exchange)
                </p>
            </footer>
        </div>
    )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <ConfigProvider theme = {{
        token: {
            fontFamily: 'inherit'
        },
    }}>
        <AuthPage/>
    </ConfigProvider>
)

export default AuthPage;
