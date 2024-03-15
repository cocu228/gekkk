import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import styles from './style.module.scss'
import { HistoryTab } from "@/widgets/history/model/types";

interface Props {
    tabNames: HistoryTab[];
    setTab: Dispatch<SetStateAction<HistoryTab>>
    selectedTab: string;
}

export default function TabSelector(props: Props) {
    const tabHandler = (tab: HistoryTab) => {
        props.setTab(tab);
    }

    const checkSelected = (tab: string) => tab !== props.selectedTab ? styles.unSelected : '';  

    return (
        <div className={styles.wrapper}>
            {props.tabNames.map((elem)=> (
                <div onClick={() => tabHandler(elem)} className={`${checkSelected(elem.Title)} ${styles.tab} h-40`}>
                    {elem.Title}
                </div>
            ))}
        </div>
    );
}