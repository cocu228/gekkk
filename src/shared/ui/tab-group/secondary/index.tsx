import styles from './style.module.scss'

interface TabGroupParams {
    tabs: Record<string, string>,
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
            <div className="inline-flex flex-wrap rounded-[4px] phone:hidden">
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
    );
}

export default SecondaryTabGroup;
