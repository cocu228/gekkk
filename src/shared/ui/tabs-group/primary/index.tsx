import React, {useState, ReactNode, useEffect, memo, useContext} from "react";
import styles from "@/shared/ui/tabs-group/primary/style.module.scss";
import {isActiveClass} from "@/shared/lib/helpers";
import {useNavigate} from "react-router-dom";
import {CtxWalletData} from "@/widgets/wallet/transfer/model/context";

interface IResult {
    content: ReactNode[] | unknown[];
    buttons: Array<{ tag: string, name: string }>
}

function filterChildrenByAttribute(children: ReactNode, attValue: string, buttons = []): IResult {

    return {
        content: React.Children.map(children, child => {

            if (React.isValidElement(child)) {

                const childDataTab = child.props['data-tag'] as string | undefined;

                if (childDataTab !== undefined) {
                    buttons.push({tag: childDataTab, name: child.props['data-name']})
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

const TabsGroupPrimary = memo(({children, initValue, callInitValue}: IParams) => {
    const navigate = useNavigate();
    const walletContext = useContext(CtxWalletData);
    const [state, setState] = useState(initValue);
    const {content, buttons} = filterChildrenByAttribute(children, state);

    useEffect(() => {
        setState(initValue);
    }, [callInitValue]);

    return <>
        <div className='flex justify-center'>
            <div className={styles.TabsWrapper}>
                <div className='flex justify-center flex-wrap'>
                    {buttons.map((item, i) => <button
                        key={"tabs-primary-button" + i}
                        className={`
                                ${styles.TabBtn}
                                ${isActiveClass(item.tag === state)}
                            `}
                        onClick={() => {
                            setState(item.tag)
                            if (walletContext) {
                                navigate(`/wallet?currency=${walletContext.$const}&tab=${item.tag}`)
                            }
                        }}>
                        {item.name}
                    </button>)}
                </div>
            </div>
        </div>
        {content}
    </>
})


export default TabsGroupPrimary;
