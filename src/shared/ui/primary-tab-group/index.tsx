import { useState } from "react";
import Tab from "./ui/Tab";

export type Tab = {
    key: string,
    title: string
}

type TabGroupParams = {
    tabs: Tab[],
    initialTabs?: Tab[],
    children: never[]
}

const PrimaryTabGroup = ({
    tabs,
}: TabGroupParams) => {
    if (!tabs) return null;

    let [activeTab, setActiveTab] = useState('topup');

    return (
        <div className='flex relative pt-4 mb-8 after:bg-gekGrayLine after:mt-9 after:block after:w-full after:h-[2px] after:absolute'>
            <div className='container mx-auto px-4'>
                <div className='flex pb-[10px]'>
                    {tabs.map(tab => (
                        <Tab
                            onClick={() => setActiveTab(tab.key)}
                            isActive={activeTab === tab.key}>
                            {tab.title}
                        </Tab>
                ))}
            </div>
        </div>
    </div>
)}

export default PrimaryTabGroup;
