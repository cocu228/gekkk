import React, {useState, ReactNode, useEffect, memo, useContext} from "react";
import styles from "@/shared/ui/tabs-group/primary/style.module.scss";
import {isActiveClass} from "@/shared/lib/helpers";
import {useNavigate} from "react-router-dom";
import {CtxWalletData} from "@/widgets/wallet/transfer/model/context";

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

const TabsGroupPrimary = memo(({children, initValue, callInitValue}: IParams) => {
    const navigate = useNavigate();
    const {$const} = useContext(CtxWalletData);
    const [state, setState] = useState(initValue);
    const {content, buttons} = filterChildrenByAttribute(children, state);

    useEffect(() => {

        setState(initValue);

    }, [callInitValue]);

    return <>
        <div className='mb-10'>
            <div className={styles.Underline}/>
            <div className={styles.TabsWrapper}>
                <div className='flex'>
                    {buttons.map((item, i) => <button
                        key={"tabs-primary-button" + i}
                        className={`
                                ${styles.TabBtn}
                                ${isActiveClass(item === state)}
                            `}
                        onClick={() => {
                            setState(item)
                            navigate(`/wallet/${$const}/${item}`)
                        }}>
                        {item.capitalize()}
                    </button>)}
                </div>
            </div>
        </div>
        {content}
    </>
})


export default TabsGroupPrimary;
