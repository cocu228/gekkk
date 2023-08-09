import React, {useState, ReactNode, useEffect} from "react";
import styles from "@/shared/ui/tabs-group/primary/style.module.scss";
import {isActiveClass} from "@/shared/lib/helpers";

interface IResult {
    content: ReactNode[] | unknown[];
    buttons: string[]
}

function filterChildrenByAttribute(children: ReactNode, attValue: string, buttons = []): IResult {

    return {
        content: React.Children.map(children, child => {

            if (React.isValidElement(child)) {

                const childDataTab = child.props['data-tab'] as string | undefined;

                if (childDataTab !== undefined) {
                    buttons.push(childDataTab)
                }

                if (childDataTab && childDataTab !== attValue) {
                    return null;
                }

                return child.props.hasOwnProperty("children") ?

                    React.cloneElement(child, {
                        ...child.props,
                        children: filterChildrenByAttribute(child.props.children, attValue, buttons).content
                    }) :
                    child;

            } else {
                return child
            }
        }),
        buttons: buttons
    }

}

interface IParams {
    initValue: string;
    children: React.ReactNode;
    callInitValue?: any;
}

const TabsGroupPrimary = ({children, initValue, callInitValue}: IParams) => {

    const [state, setState] = useState(initValue);
    const {content, buttons} = filterChildrenByAttribute(children, state);


    console.log(state)
    useEffect(() => {
        setState(initValue);
    }, [callInitValue])

    return <>
        <div className={`${styles.TabsWrapper}`}>
            <div className='flex'>
                {buttons.map((item, i) => <button
                    key={"tabs-primary-button" + i}
                    className={`
                                ${styles.TabBtn}
                                ${isActiveClass(item === state)}
                            `}
                    onClick={() => setState(item)}>
                    {item.capitalize()}
                </button>)}
            </div>
        </div>
        {content}
    </>
}


export default TabsGroupPrimary