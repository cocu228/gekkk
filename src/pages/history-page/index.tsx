import History from "@/widgets/history/ui/History";
import SecondaryTabGroup from "@/shared/ui/tabs-group/secondary";
import { useState, Fragment, useContext } from "react";
import TabSelector from "@/shared/ui/tabSelector"; 
import { tabs } from "./const";
import CustomSearch from "@/widgets/custom-search";
import { BreakpointsContext } from "@/app/providers/BreakpointsProvider";
const HistoryPage = () => {
	const [curTab, setCurTab] = useState(tabs[0]);
	const {md} = useContext(BreakpointsContext); 
	return (
		<>
			<div className="flex flex-col items-center w-100">
				{md && <TabSelector setTab={setCurTab} tabNames={tabs} selectedTab={curTab}/>
}			</div>
			<div className='wrapper'>
				
				{curTab === 'Last Transactions' ? (
					<>
                    <h2 className=" font-bold pt-3 text-xl">Last transactions</h2>
					<History/>
					</>
				) : <CustomSearch />}
			</div>
		</>
	);
}

export default HistoryPage;
