import React, {useState, ReactNode, useEffect, memo, useContext, ButtonHTMLAttributes, EventHandler, MouseEventHandler} from "react";
import styles from "./style.module.scss";
import {isActiveClass} from "@/shared/lib/helpers";
import {useNavigate} from "react-router-dom";
import {CtxWalletData} from "@/widgets/wallet/transfer/model/context";

interface IResult {
    content: ReactNode[] | unknown[];
    buttons: Array<{ tag: string, name: string, onClick: any }>
}

function filterChildrenByAttribute(children: ReactNode, attValue: string, buttons = []): IResult {

    return {
        content: React.Children.map(children, child => {

            if (React.isValidElement(child)) {

                const childDataTab = child.props['data-tag'] as string | undefined;

                if (childDataTab !== undefined) {
                    buttons.push({tag: childDataTab, name: child.props['data-name'], onClick: child.props['data-onclick']})
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

const TabsGroupCustom = memo(({children, initValue, callInitValue}: IParams) => {
    const [state, setState] = useState(initValue);
    const {content, buttons} = filterChildrenByAttribute(children, state);

    const handleOnChangeTags = (tag: string) => () => {
        setState(tag)
    }

    useEffect(() => {
        setState(initValue);
    }, [callInitValue]);

    return <>
        <div className='flex justify-center'>
            <div className={styles.TabsWrapper}>
                <div className='flex justify-center flex-wrap'>
                    {buttons.map((item) => (
                        <button
                            key={"tabs-primary-button" + item.tag}
                            className={`${styles.TabBtn} ${isActiveClass(item.tag === state)}`}
                            onClick={()=>{
                                handleOnChangeTags(item.tag)
                                item.onClick()
                            }}
                        >
                            {item.name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
        {content}
    </>
})


export default TabsGroupCustom;
