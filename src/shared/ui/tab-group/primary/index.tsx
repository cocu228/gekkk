import styles from './style.module.scss'

interface TabGroupParams {
    tabs: Record<string, string>,
    activeTab: string,
    setActiveTab: (key: string) => void,
}

function PrimaryTabGroup ({
    tabs,
    setActiveTab,
    activeTab
}: TabGroupParams) {
    if (!tabs) return null;

    return (
        <div className='flex relative pt-4 mb-8 ml-[calc(-1*var(--content-pad-left))] mr-[calc(-1*var(--content-pad-right))]'>
            <div className='w-full px-4 ml-[var(--content-pad-left)] mr-[var(--content-pad-right)]'>
                <div className='flex pb-[10px]'>
                    {Object.keys(tabs).map(tab => (
                        <button
                            key={tab}
                            className={`
                                ${styles.Tab}
                                ${tab === activeTab ? 'active' : ''}
                            `}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tabs[tab]}
                        </button>
                    ))}
                </div>
            </div>

            <div className="block justify-center h-[2px] absolute bg-gray-200 mt-9 w-full"/>
        </div>
)}

export default PrimaryTabGroup;
