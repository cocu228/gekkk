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
        <div className='flex relative pt-4 mb-8 ml-[calc(-1*var(--content-pad-left))] mr-[calc(-1*var(--content-pad-right))]'>
            <div className='w-full px-4 ml-[var(--content-pad-left)] mr-[var(--content-pad-right)]'>
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

            <div className="block justify-center h-[2px] absolute bg-gray-light mt-9 w-full"/>
        </div>
)}

export default PrimaryTabGroup;
