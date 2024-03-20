import History from "@/widgets/history/ui/History";
import SecondaryTabGroup from "@/shared/ui/tabs-group/secondary";
import { useState, Fragment, useContext } from "react";
import TabSelector from "@/shared/ui/tabSelector"; 
import { tabs } from "./const";
import { historyTabs } from "@/widgets/history/model/helpers";
import CustomSearch from "@/widgets/custom-search";
import { BreakpointsContext } from "@/app/providers/BreakpointsProvider";
import { useTranslation } from "react-i18next";

const HistoryPage = () => {
	const [curTab, setCurTab] = useState(historyTabs[0]);
	const {md} = useContext(BreakpointsContext); 
	const {t} = useTranslation()
	return (
		<>
			<div className="flex flex-col items-center w-100">
				{md && <TabSelector setTab={setCurTab} tabNames={historyTabs} selectedTab={curTab.Title}/>
}			</div>
			<div className='wrapper'>
				
				{curTab.Title === 'last_transactions' ? (
					<>
					{!md && <h2 className=" font-bold p-3 text-xl">{t("last_transactions")}</h2>}
					<History currTab={curTab} includeFiat={true}/>
					</>
				) : <CustomSearch/>}
			</div>
		</>
	);
}

export default HistoryPage;
