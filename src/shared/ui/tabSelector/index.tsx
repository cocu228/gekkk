import { Dispatch, ReactNode, SetStateAction, useId, useState } from "react";
import styles from './style.module.scss'
import { HistoryTab } from "@/widgets/history/model/types";
import { useTranslation } from "react-i18next";

interface Props {
    tabNames: HistoryTab[];
    setTab: Dispatch<SetStateAction<HistoryTab>>
    selectedTab: string;
}

export default function TabSelector(props: Props) {
    const tabHandler = (tab: HistoryTab) => {
        props.setTab(tab);
    }

    const {t} = useTranslation()

    const checkSelected = (tab: string) => tab !== props.selectedTab ? styles.unSelected : '';  

    return (
        <div className={styles.wrapper}>
            {props.tabNames.map((elem, index)=> (
                <div key={index} onClick={() => tabHandler(elem)} className={`${checkSelected(elem.Title)} ${styles.tab} h-40`}>
                    {t(elem.Title)}
                </div>
            ))}
        </div>
    );
}