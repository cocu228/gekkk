import { useState, ReactNode, useEffect, memo, useContext, isValidElement, Children, cloneElement } from "react";
import { useNavigate } from "react-router-dom";

import styles from "@/shared/ui/tabs-group/primary/style.module.scss";
import { isActiveClass } from "@/shared/lib/helpers";
import { CtxWalletData } from "@/widgets/wallet/transfer/model/context";

interface IResult {
  content: ReactNode[] | unknown[];
  buttons: Array<{ tag: string; name: string }>;
}

function filterChildrenByAttribute(children: ReactNode, attValue: string, buttons = []): IResult {
  return {
    content: Children.map(children, child => {
      if (isValidElement(child)) {
        const childDataTab = child.props["data-tag"] as string | undefined;

        if (childDataTab !== undefined) {
          buttons.push({ tag: childDataTab, name: child.props["data-name"] });
        }

        if (childDataTab && childDataTab !== attValue) {
          return null;
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        return child.props.hasOwnProperty("children")
          ? cloneElement(child, {
              ...child.props,
              children: filterChildrenByAttribute(child.props.children, attValue, buttons).content
            })
          : child;
      } else {
        return child;
      }
    }),
    buttons: buttons
  };
}

interface IParams {
  initValue: string;
  children: React.ReactNode;
  callInitValue?: any;
}

const TabsGroupPrimary = memo(({ children, initValue, callInitValue }: IParams) => {
  const navigate = useNavigate();
  const walletContext = useContext(CtxWalletData);
  const [state, setState] = useState(initValue);
  const { content, buttons } = filterChildrenByAttribute(children, state);

  const handleOnChangeTags = (tag: string) => () => {
    setState(tag);
    if (walletContext) {
      navigate(`/wallet?currency=${walletContext.$const}&tab=${tag}`);
    }
  };

  useEffect(() => {
    setState(initValue);
  }, [callInitValue]);

  return (
    <>
      <div className='flex justify-center'>
        <div className={styles.TabsWrapper}>
          <div className='flex justify-center flex-wrap'>
            {buttons.map(item => (
              <button
                key={`tabs-primary-button${item.tag}`}
                className={`${styles.TabBtn} ${isActiveClass(item.tag === state)}`}
                onClick={handleOnChangeTags(item.tag)}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      {content}
    </>
  );
});

export default TabsGroupPrimary;
