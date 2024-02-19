import React, {useContext} from 'react';
import "@styles/index.scss";
import styles from "./style.module.scss";
import {BreakpointsContext} from '@/app/providers/BreakpointsProvider';
import {HelperClassName} from "@/shared/lib/helper-class-name";
import {scrollToTop} from "@/shared/lib/helpers";

const hClassName = new HelperClassName(styles)

const text = {
    title: {
        404: "Page not found",
        500: "We’ll be back soon!"
    },
    subscribe: {
        404: <p className={hClassName.scss("Desc")}>Sorry, but the page you requested was not found or has not
            yet been created. Go
            to <a className="underline text-blue-400" href="/">the home page</a> to continue.</p>,
        500: <p className={hClassName.scss("Desc")}>Sorry for the inconvenience but we’re performing some maintenance at
            the moment. We’ll be back online shortly!</p>
    }
}
const PageProblems = ({code = 404}: { code?: number }) => {

    const {md} = useContext(BreakpointsContext);

    scrollToTop()

    return (
        <div className="flex items-center flex-col">
            <div className={hClassName.scss("Wrapper")}>
                <div className="row">
                    <a href="/">
                        <img src="/img/logo.svg" alt="logo"/>
                    </a></div>
                <div className="row pt-20">
                    <h1 className={hClassName.scss("Title")}>{text.title[code]}</h1>
                </div>
                <div className="row pt-4">
                    {text.subscribe[code]}
                </div>
            </div>
            <footer className={`text-center text-gray-500 mt-auto mb-10 font-normal mb max-w-[756px]
            ${!md ? '' : 'px-4'}`}>
                <p className='mb-4'>
                    <a
                        className={`${md ? 'text-xs' : 'text-sm'} hover:underline`}
                        href="https://gekkard.com/terms-and-conditions.html"
                        target="_blank"
                        rel="noreferrer noopener"
                    >General terms and conditions</a>
                    {' | '}
                    <a
                        className={`${md ? 'text-xs' : 'text-sm'} hover:underline`}
                        href="https://gekkard.com/data-protection-policy.html"
                        target="_blank"
                        rel="noreferrer noopener"
                    >Data protection policy</a>
                    {' | '}
                    <a
                        className={`${md ? 'text-xs' : 'text-sm'} hover:underline`}
                        href="https://gekkard.com/legal-agreements.html"
                        target="_blank"
                        rel="noreferrer noopener"
                    >Legal agreements</a>
                </p>

                <p className={` ${md ? 'text-xs' : 'text-sm'} mb-2`}>
                    Crypto exchange service is powered by AtlantEX OU
                    (licensed partner for crypto wallet and exchange)
                </p>
                <span
                    className={`text-gray-500 font-semibold text-sm w-full block`}>
                    © Gekkard. v.{import.meta.env.VITE_APP_VERSION}
                </span>
            </footer>
        </div>
    )
}

export default PageProblems;
