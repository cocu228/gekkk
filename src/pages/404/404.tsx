import React, {useContext, useEffect, useState} from 'react';
import "@styles/index.scss";
import styles from "./style.module.scss";
import {BreakpointsContext} from '@/app/providers/BreakpointsProvider';
import {HelperClassName} from "@/shared/lib/helper-class-name";

const hClassName = new HelperClassName(styles)


const P404 = () => {

    const {md} = useContext(BreakpointsContext);

    return (
        <div className="flex items-center flex-col">
            <div className={hClassName.scss("Wrapper")}>
                <div className="row">
                    <img src="/img/logo.svg" alt="logo"/>
                </div>
                <div className="row pt-20">
                    <h1 className={hClassName.scss("Title")}>Page not found</h1>
                </div>
                <div className="row pt-4">
                    <p className={hClassName.scss("Desc")}>Sorry, but the page you requested was not found or has not
                        yet been created. Go to the home page
                        to continue.</p>
                </div>
            </div>
            <footer className={`text-center text-gray-500 mt-auto mb-10 font-normal mb max-w-[756px]
            ${!md ? '' : 'px-4'}`}>
                <p className='mb-4'>
                    <a
                        className={`${md ? 'text-xs' : 'text-sm'} hover:underline`}
                        href="https://gekkoin.com/source/GeneralTermsandConditions.pdf"
                        target="_blank"
                        rel="noreferrer noopener"
                    >General terms and conditions</a>
                    {' | '}
                    <a
                        className={`${md ? 'text-xs' : 'text-sm'} hover:underline`}
                        href="https://gekkoin.com/source/Privacy_policy.pdf"
                        target="_blank"
                        rel="noreferrer noopener"
                    >Privacy policy</a>
                    {' | '}
                    <a
                        className={`${md ? 'text-xs' : 'text-sm'} hover:underline`}
                        href="https://gekkoin.com/source/Cookies_policy.pdf"
                        target="_blank"
                        rel="noreferrer noopener"
                    >Cookie policy</a>
                </p>

                <p className={` ${md ? 'text-xs' : 'text-sm'}`}>
                    Crypto exchange service is powered by AtlantEX OU
                    (licensed partner for crypto wallet and exchange)
                </p>
            </footer>
        </div>
    )
}

export default P404;
