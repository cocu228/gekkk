import History from "@/widgets/history/ui/History";
import SecondaryTabGroup from "@/shared/ui/tabs-group/secondary";
import { useState, Fragment, useContext, useEffect, useRef } from "react";
import TabSelector from "@/shared/ui/tabSelector";
import { tabs } from "./const";
import { historyTabs } from "@/widgets/history/model/helpers";
import CustomSearch from "@/widgets/custom-search";
import { BreakpointsContext } from "@/app/providers/BreakpointsProvider";
import { useTranslation } from "react-i18next";
import { CtxRootData } from "@/processes/RootContext";
import { pull, pullStart } from "@/shared/lib";
import { useLocation, useSearchParams } from "react-router-dom";

const HistoryPage = () => {
  const [curTab, setCurTab] = useState(historyTabs[0]);
  const { md } = useContext(BreakpointsContext);
  const { t } = useTranslation();

  const [pullChange, setPullChange] = useState<number>();
  const refreshCont = useRef<HTMLDivElement>();

  const [params] = useSearchParams();
  const tab = params.get("tab");

  return (
    <>
      <div className="wrapper">
        {curTab.Title === "last_transactions" ? (
          <div
            className="wrapper"
            ref={refreshCont}
            style={{ marginTop: pullChange / 3.118 || "" }}
          >
            {!md && (
              <h2 className=" font-bold p-3 text-xl">
                {t("last_transactions")}
              </h2>
            )}
            {
              tab === 'custom' ? (
                <CustomSearch />
              ) : (
                <History currTab={curTab} includeFiat={true} />
              )
            }
            
          </div>
        ) : (
          <CustomSearch />
        )}
      </div>
    </>
  );
};

export default HistoryPage;
