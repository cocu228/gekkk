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
                        <img className='min-w-[200px]' src="/img/logo.svg" alt="logo"/>
                    </a></div>
                <div className="row pt-20">
                    <h1 className={hClassName.scss("Title")}>{text.title[code]}</h1>
                </div>
                <div className="row pt-4">
                    {text.subscribe[code]}
                </div>
                <img className='w-[80%]' src="/img/errimage.jpg" />

            </div>            
        </div>
    )
}

export default PageProblems;
