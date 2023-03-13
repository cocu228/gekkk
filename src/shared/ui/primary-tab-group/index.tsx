import Tab from "./ui/Tab";

interface TabGroupParams {
    tabs: any
    setActiveTab: any,
    activeTab: string,
}

const PrimaryTabGroup = ({
    tabs,
    setActiveTab,
    activeTab
}: TabGroupParams) => {
    if (!tabs) return null;

    return (
        <div className='flex relative pt-4 mb-8'>
            <div className='container mx-auto px-4'>
                <div className='flex pb-[10px]'>
                    {Object.keys(tabs).map(key => (
                        <Tab
                            onClick={() => setActiveTab(key)}
                            isActive={key === activeTab}>
                            {tabs[key]}
                        </Tab>
                ))}
            </div>
        </div>
        <div className="bg-gekGrayLine mt-9 block w-full h-[2px] absolute"/>
    </div>
)}

export default PrimaryTabGroup;
