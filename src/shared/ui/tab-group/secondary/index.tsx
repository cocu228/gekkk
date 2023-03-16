import React from 'react';
import Select from "@/shared/ui/select/Select";

interface TabGroupParams {
    tabs: {[key: string]: string},
    activeTab: string,
    setActiveTab: (key: string) => void,
}

function SecondaryTabGroup({
    tabs,
    activeTab,
    setActiveTab
}: TabGroupParams) {
    if (!tabs) return null;

    return (
        <div className="wrapper">
            <div className="inline-flex flex-wrap bg-[#F9F9FA] rounded-[4px] phone:hidden">
                {Object.keys(tabs).map(tab => (
                    <button
                        key={tab}
                        className={`
                            bg-none px-[10px] rounded-[4px] py-[6px] text-[14px] font-medium border-solid border-1 
                            ${tab === activeTab ? 'text-gray-dark border-blue' : 'text-gray border-[#F9F9FA]'}
                        `}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tabs[tab]}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default SecondaryTabGroup;
