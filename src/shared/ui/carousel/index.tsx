import styles from "./styles.module.css";
import { IconApp } from "../icons/icon-app";
import { ReactNode, Ref, useEffect, useState } from "react";

interface IParams {
    className?: string;
    children?: ReactNode;
    ref?: Ref<HTMLDivElement>;
    onSelect?: (index: number) => void;
}

function Carousel({
    ref,
    children,
    className,
    onSelect = () => {}
}: IParams) {
    const [right, setRight] = useState<number>(1);
    const [left, setLeft] = useState<number>(null);
    const [current, setCurrent] = useState<number>(0);
    const [items, setItems] = useState<ReactNode[]>(null);

    useEffect(() => {
        setItems(Array.isArray(children)
            ? children
            : [children]
        );
    }, [children])

    useEffect(() => {
        if (children) {
            onSelect(current);
        }
    }, [current])

    function handleNext() {
        setCurrent(current === items.length - 1 ? 0 : current + 1);
        setRight(right === items.length - 1 ? 0 : right + 1);
        setLeft(left === items.length - 1 ? 0 : left + 1);
    }

    function handlePrev() {
        setCurrent(current === 0 ? items.length - 1 : current - 1);
        setRight(right === 0 ? items.length - 1 : right - 1);
        setLeft(left === 0 ? items.length - 1 : left - 1);
    }

    return !items ? null : (
        <div ref={ref} className={`${className} ${styles.Container}`}>
            {items.length <= 1 ? null : (
                <button onClick={handlePrev} className={styles.NavButton}>
                    <IconApp
                        size={20}
                        code="t08"
                        color="var(--gek-light-grey)"
                        className={styles.BackIcon}
                    />
                </button>
            )}

            {items[current]}
            
            {items.length <= 1 ? null : (
                <button onClick={handleNext} className={styles.NavButton}>
                    <IconApp
                        size={20}
                        code="t08"
                        color="var(--gek-light-grey)"
                    />
                </button>
            )}
        </div>
    );
}

export default Carousel;
