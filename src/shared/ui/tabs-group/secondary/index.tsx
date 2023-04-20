import {useContext} from 'react';
import styles from './style.module.scss'
import Select from "@/shared/ui/select/Select";
import {BreakpointsContext} from '@/app/providers/BreakpointsProvider';

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
    const {sm} = useContext(BreakpointsContext);

    return (
        <div className="wrapper">
            <div className={`${sm ? 'hidden' : ''} inline-flex flex-wrap rounded-[4px]`}>
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

            <div className={sm ? 'block' : 'hidden'}>
                <Select
                    defaultValue={activeTab}
                    style={{ width: 120 }}
                    options={Object.keys(tabs).map(tab => {
                        return { value: tab, label: tabs[tab] };
                    })}
                    onChange={setActiveTab}
                />
            </div>
        </div>
    );
}

export default SecondaryTabGroup;
