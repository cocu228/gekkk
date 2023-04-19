import React, {useState, ReactNode} from "react";
import styles from "@/shared/ui/tabs-group/primary/style.module.scss";
import {isActiveClass} from "@/shared/lib/helpers";


function generalCreateInitTabs(children, value) {

    let buttons: string[] = []

    function filterChildrenByAttribute(children: ReactNode, value): ReactNode[] {

        return React.Children.map(children, child => {

            if (React.isValidElement(child)) {

                const childDataTab = child.props['data-tab'] as string | undefined;

                if (childDataTab !== undefined) {
                    buttons.push(childDataTab)
                }

                if (childDataTab && childDataTab !== value) {
                    return null;
                }

                return child.props.hasOwnProperty("children") ?

                    React.cloneElement(child, {
                        ...child.props, children: filterChildrenByAttribute(child.props.children, value)
                    }) :
                    child;

            } else {
                return child
            }
        });
    }

    const content = filterChildrenByAttribute(children, value)


    return {buttons, content}
}


const TabsGroupPrimary = ({children, defaultInit}) => {

    const [state, setState] = useState(defaultInit)

    const {buttons, content} = generalCreateInitTabs(children, state)

    return <>
        <div className={`${styles.TabsWrapper}`}>
            <div className='flex pb-[10px]'>
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