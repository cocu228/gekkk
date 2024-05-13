﻿import History from "@/widgets/history/ui/History";
import CustomHistory from "@/widgets/custom-history/ui/CustomHistory";
import { useSearchParams } from "react-router-dom";

const HistoryPage = () => {
  const [params] = useSearchParams();
  const tab = params.get("tab");

  return (
    <div className="wrapper">
      {tab !== 'custom'
        ? <History includeFiat/>
        : <CustomHistory />
      }  
    </div>
  );
};

export default HistoryPage;
