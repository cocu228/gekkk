import { ReactNode, useState } from "react";
import styles from './style.module.scss'

interface Props {
    tabNames: string[];
    setTab: (tabName: string) => void;
    selectedTab: string;
}

export default function TabSelector(props: Props) {
    const tabHandler = (tab: string) => {
        props.setTab(tab);
    }

    const checkSelected = (tab: string) => tab !== props.selectedTab ? styles.unSelected : '';  

    return (
        <div className={styles.wrapper}>
            {props.tabNames.map((elem)=> (
                <div onClick={() => tabHandler(elem)} className={`${checkSelected(elem)} ${styles.tab} h-40`}>
                    {elem}
                </div>
            ))}
        </div>
    );
}