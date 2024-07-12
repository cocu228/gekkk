import { useState, ReactNode, useEffect, memo, cloneElement, Children, isValidElement } from "react";

import { isActiveClass } from "@/shared/lib/helpers";

import styles from "./style.module.scss";

interface IResult {
  content: ReactNode[] | unknown[];
  buttons: Array<{ tag: string; name: string; onClick: any }>;
}

function filterChildrenByAttribute(children: ReactNode, attValue: string, buttons = []): IResult {
  return {
    content: Children.map(children, child => {
      if (isValidElement(child)) {
        const childDataTab = child.props["data-tag"] as string | undefined;

        if (childDataTab !== undefined) {
          buttons.push({ tag: childDataTab, name: child.props["data-name"], onClick: child.props["data-onclick"] });
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
  children: ReactNode;
  callInitValue?: any;
}

const TabsGroupCustom = memo(({ children, initValue, callInitValue }: IParams) => {
  const [state, setState] = useState(initValue);
  const { content, buttons } = filterChildrenByAttribute(children, state);

  const handleOnChangeTags = (tag: string) => () => {
    setState(tag);
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
                onClick={() => {
                  handleOnChangeTags(item.tag);
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                  item.onClick();
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
  );
});

export default TabsGroupCustom;
