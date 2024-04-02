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

const HistoryPage = () => {
  const [curTab, setCurTab] = useState(historyTabs[0]);
  const { md } = useContext(BreakpointsContext);
  const { t } = useTranslation();

  const { setRefresh } = useContext(CtxRootData);

  const [isRefreshingFunds, setIsRefreshingFunds] = useState<boolean>(false);
  const [startPoint, setStartPoint] = useState(0);
  const [pullChange, setPullChange] = useState<number>();
  const refreshCont = useRef<HTMLDivElement>();

  const initLoading = () => {
    setRefresh();
    setIsRefreshingFunds(true);
    setTimeout(() => {
      setIsRefreshingFunds(false);
    }, 3000);
  };

  function endPull() {
    setStartPoint(0);
    setPullChange(0);
    if (pullChange > 220) initLoading();
  }

  useEffect(() => {
    window.addEventListener("touchstart", (e) => {
      pullStart(e, setStartPoint);
    });
    window.addEventListener("touchmove", (e) => {
      pull(e, setPullChange, startPoint);
    });
    window.addEventListener("touchend", endPull);
    return () => {
      window.removeEventListener("touchstart", (e) => {
        pullStart(e, setStartPoint);
      });
      window.removeEventListener("touchmove", (e) => {
        pull(e, setPullChange, startPoint);
      });
      window.removeEventListener("touchend", endPull);
    };
  });

  return (
    <>
      <div className="flex flex-col items-center w-100">
        {md && (
          <TabSelector
            setTab={setCurTab}
            tabNames={historyTabs}
            selectedTab={curTab.Title}
          />
        )}{" "}
      </div>
      <div className="wrapper">
        {curTab.Title === "last_transactions" ? (
          <div
            className="wrapper"
            ref={refreshCont}
            style={{ marginTop: pullChange / 3.118 || "" }}
          >
            <div className="p-2 rounded-full w-full flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`w-6 h-6 `}
                style={{
                  justifyContent: "center",
                  display: !!!pullChange && "none",
                  transform: `rotate(${pullChange}deg)`,
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            </div>
            {!md && (
              <h2 className=" font-bold p-3 text-xl">
                {t("last_transactions")}
              </h2>
            )}
            <History currTab={curTab} includeFiat={true} />
          </div>
        ) : (
          <CustomSearch />
        )}
      </div>
    </>
  );
};

export default HistoryPage;
