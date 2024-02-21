import {useContext} from 'react';
import styles from './style.module.scss'
import Select from "@/shared/ui/select/Select";
import {BreakpointsContext} from '@/app/providers/BreakpointsProvider';
import {CtxOfflineMode} from "@/processes/errors-provider-context";

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
    const {offline} = useContext(CtxOfflineMode);

    return (
        <div className="wrapper">
            <div className={`${sm ? 'hidden' : ''} ${offline ? "disabled" : ""} ${styles.TabGroup}`}>
                {Object.keys(tabs).map(tab => (
                    <button
                        key={tab}
                        className={`
                            ${styles.Tab}
                            ${tab === activeTab ? 'active' : ''}
                        `}
                        onClick={() => setActiveTab(tab)}>
                        {tabs[tab]}
                    </button>
                ))}
            </div>

            <div className={sm ? 'block mb-4' : 'hidden'}>
                <Select
                    defaultValue={activeTab}
                    style={{width: '100%'}}
                    options={Object.keys(tabs).map(tab => {
                        return {value: tab, label: tabs[tab]};
                    })}
                    onChange={setActiveTab}
                />
            </div>
        </div>
    );
}

export default SecondaryTabGroup;
