import History from "@/widgets/history/ui/History";
import SecondaryTabGroup from "@/shared/ui/tabs-group/secondary";
import { useState, Fragment } from "react";
import TabSelector from "@/shared/ui/tabSelector"; 
import { tabs } from "./const";
import CustomSearch from "@/widgets/custom-search";
const HistoryPage = () => {
	const [curTab, setCurTab] = useState(tabs[0]);

	return (
		<>
			<div className="flex flex-col items-center w-100">
				<TabSelector setTab={setCurTab} tabNames={tabs} selectedTab={curTab}/>
			</div>
			<div className='substrate wrapper'>
				{curTab === 'Last Transactions' ? <History/> : <CustomSearch />}
			</div>
		</>
	);
}

export default HistoryPage;
